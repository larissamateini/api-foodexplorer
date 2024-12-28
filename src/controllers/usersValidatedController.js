const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class UsersValidatedController {
  async index(request, response) {
    console.log(request);
    const { user } = request;

    const checkIfUserExists = await knex("users").where({ id: user.id }).first();

    if (checkIfUserExists.length === 0) {
      throw new AppError("Não autorizado.", 401);
    }

    return response.status(201).json({ user });
  }
}

module.exports = UsersValidatedController;