const knex = require("../database/knex");
const DiskStorage = require("../providers/DiskStorage");
const AppError = require("../utils/AppError");

class DishesController {
  async create(request, response) {
    const { dish_name, description, category, price, ingredients } = request.body;
    const dish_image = request.file.filename;
    const user_id = request.user.id;

    const ingredientsTagsArray = JSON.parse(ingredients || '[]');
    const diskStorage = new DiskStorage();
    const filename = await diskStorage.saveFile(dish_image);

    const [ dish_id ] = await knex("dishes").insert({
      dish_name,
      description,
      category,
      dish_image: filename,
      price,
      user_id: user_id,
      created_by: user_id,
      updated_by: user_id,
    });

    const dishIngredients = ingredientsTagsArray.map((tag_name) => {
      return {
        tag_name,
        dish_id
      }
    });

    await knex("ingredients").insert(dishIngredients);

    return response.status(201).json(
      { message: "Prato criado com sucesso!"}
    );
  }

  async update(request, response) {
    const { newName, newDescription, newCategory, newPrice, newIngredients } = request.body;
    const newImage = request.file?.filename; //?
    const dish_id = request.params.id;
    const user_id = request.user.id;


    const dish = await knex("dishes")
      .where({ id: dish_id })
      .first();

    if(!dish) {
      throw new AppError("Prato não encontrado.", 404)
    }

    let filename;
    //se houver nova imagem
    if (newImage) {
      const diskStorage = new DiskStorage();
      //deleta imagem antiga (se houver)
      if (dish.dish_image) {
        await diskStorage.deleteFile(dish.dish_image);
      }
      //adiciona a nova imagem
      filename = await diskStorage.saveFile(newImage);

    } else {
      //se não houver nova imagem 
      filename = dish.dish_image;
    }

    const ingredients = JSON.parse(newIngredients || '[]');

    if(ingredients){
      await knex("ingredients")
        .where({ dish_id })
        .delete();

      const updatedDishIngredients = ingredients.map((tag_name) => {
        return { tag_name, dish_id }
      });

      await knex("ingredients").insert(updatedDishIngredients);
    }

    const updatedDish = {
      dish_name: newName ?? dish.dish_name,
      description: newDescription ?? dish.description,
      category: newCategory ?? dish.category,
      dish_image: filename ?? dish.dish_image,
      price: newPrice ?? dish.price,
      updated_by: user_id,
      updated_at: knex.fn.now(),
    }

    await knex("dishes")
      .where({ id : dish.id })
      .update(updatedDish);
    
    return response.status(200).json(
      { message: "Prato atualizado com sucesso!" }
    );
  }

  async delete(request, response) {
    const dish_id = request.params.id;

    await knex("dishes")
      .where({ id : dish_id })
      .delete();
    
    return response.status(200).json(
      { message: "Prato deletado." }
    );
  }

  async show(request, response) {
    const dish_id = request.params.id;

    const searchedDish = await knex("dishes")
    .where({ id: dish_id })
    .first();

    const searchedDishIngredients = await knex("ingredients")
    .where("dish_id", dish_id)
    .orderBy("tag_name");

    return response.status(200).json({
      ...searchedDish,
      ingredients: searchedDishIngredients.map(ingredient => ingredient.tag_name)
    });
  }

  async index(request, response) {
    const { searchTerm } = request.query;

    let selectedDishes;
    if(searchTerm) {
      //acha todos os pratos que têm o termo procurado
      selectedDishes = await knex("dishes")
        .select([
          "dishes.id", "dishes.dish_name", "dishes.description", "dishes.category", "dishes.dish_image", "dishes.price"
        ])
        .whereLike("dishes.dish_name", `%${searchTerm}%`)
        .orderBy("dishes.dish_name")
        .leftJoin("ingredients", "dishes.id", "ingredients.dish_id") //junção com a tabela ingredients
        .groupBy("dishes.id");
    
    } else {
      selectedDishes = await knex("dishes")
        .select([
          "dishes.id", "dishes.dish_name", "dishes.description", "dishes.category", "dishes.dish_image", "dishes.price"
        ])
        .orderBy("dishes.dish_name");
    }

    const selectedDishesWithIngredients = await Promise.all(
      selectedDishes.map(async (dish) => {
        const dishesIngredients = await knex("ingredients")
        .where("dish_id", dish.id)
        .select("tag_name");

        return {
          ...dish,
          ingredients: dishesIngredients.map(ingredient => ingredient.tag_name)
        };
      })
    );

    return response.status(200).json(selectedDishesWithIngredients);
  }
}

module.exports = DishesController;

/*const DishesRepository = require("../services/DishesRepository.js");
const { 
  CreateDishService, UpdateDishService, SearchDishService, IndexDishService, ShowDishService, DeleteDishService 
} = require("../services/DishService.js");

const DiskStorage = require("../providers/DiskStorage");

class DishesController {
  async create(request, response) {
    const { dish_name, description, category, price, ingredients } = request.body;
    const { filename } = request.file;
    const user_id = request.user.id;

    const diskStorage = new DiskStorage();
    const dish_image = await diskStorage.saveFile(filename);

    const dishesRepository = new DishesRepository();
    const createDishService = new CreateDishService(dishesRepository);

    const { dish_id } = await createDishService.execute(
      { dish_name, description, category, dish_image, price, user_id, ingredients }
    );

    return response.status(201).json({
      message: "Prato criado com sucesso!",
      dish_id
    });
  }

  async update(request, response) {
    const { newName, newDescription, newCategory, newPrice, newIngredients } = request.body;
    const newImage = request.file?.filename;
    const dish_id = request.params.id;
    const user_id = request.user.id;

    const dishesRepository = new DishesRepository();
    const updateDishService = new UpdateDishService(dishesRepository);

    await updateDishService.execute(
      { dish_id, newName, newDescription, newCategory, newImage, newPrice, newIngredients, user_id }
    );

    return response.status(200).json({
      message: "Prato atualizado com sucesso!"
    });
  }

  async index(request, response) {
    const { searchTerm } = request.query;

    const dishesRepository = new DishesRepository();
    const indexDishService = new IndexDishService(dishesRepository);
    const searchDishService = new SearchDishService(dishesRepository);

    let dishes;
    if(searchTerm) {
      dishes = await searchDishService.execute(searchTerm);
    } else {
      dishes = await indexDishService.execute();
    }

    return response.status(200).json(dishes);
  }

  async show(request, response) {
    const dish_id = request.params.id;

    const dishesRepository = new DishesRepository();
    const showDishService = new ShowDishService(dishesRepository);

    const dish = await showDishService.execute(dish_id);

    return response.status(200).json(dish);
  }

  async delete(request, response) {
    const dish_id = request.params.id;

    const dishesRepository = new DishesRepository();
    const deleteDishService = new DeleteDishService(dishesRepository);

    await deleteDishService.execute(dish_id);
    
    return response.status(204).json({ message: "Prato deletado com sucesso!" });
  }
}

module.exports = DishesController; */