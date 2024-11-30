const knex = require("../database/knex");
const AppError = require("../utils/AppError");

async function checkAdminAuthorization(request, response, next) {
  const user_id = request.user.id;

  const user = await knex("users").where({ id: user_id }).first();

  if (!user.is_admin) {
    throw new AppError("Só administradores têm acesso a esta ação.", 401);
  }

  return next();
}

module.exports = checkAdminAuthorization;
