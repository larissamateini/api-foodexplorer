const knex = require("../database/knex");

class FavoriteDishesController {
  async create(request, response) {
    const { dish_id } = request.body;
    const user_id = request.user.id;

    const favoritedDish = await knex("favorites").insert({
      user_id,
      dish_id,
    });

    return response.json(favoritedDish);
  }

  async index(request, response) {
    const user_id = request.user.id;
  
    const favoritedDishes = await knex("favorites")
      .select("dishes.*", "favorites.dish_id")
      .innerJoin("dishes", "dishes.id", "favorites.dish_id")
      .where({ user_id });
  
    return response.json(favoritedDishes);
  }  

  async delete(request, response) {
    const { dish_id } = request.params;
    const user_id = request.user.id;

    await knex("favorites")
      .where({ user_id, dish_id })
      .delete();

    return response.json();
  }
}

module.exports = FavoriteDishesController;
