const { hash, compare } = require("bcryptjs");
const sqliteConnection = require("../database/sqlite");
const AppError = require("../utils/AppError");

class UsersController {
  async create(request, response) {
    const { name, email, password, is_admin = false } = request.body;

    const database = await sqliteConnection();

    const userExists = await database.get(
      "SELECT * FROM users WHERE email = (?)",
      [email]
    );

    if (userExists) {
      throw new AppError("Este e-mail já está em uso.", 400);
    }

    const hashedPassword = await hash(password, 8);

    await database.run(
      "INSERT INTO users (name, email, password, is_admin) VALUES (?, ?, ?, ?)",
      [name, email, hashedPassword, is_admin]
    );

    return response.status(201).json();
  }

  //...
  async update(request, response) {
    const { name, email, password, old_password, is_admin } = request.body;
    const user_id = request.user.id;

    const database = await sqliteConnection();
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [user_id]);

    if (!user) {
      throw new AppError("Usuário não encontrado.", 400);
    }

    const emailAlreadyRegistered = await database.get(
      "SELECT * FROM users WHERE email = (?)",
      [email]
    );

    if (emailAlreadyRegistered && emailAlreadyRegistered.id !== user.id) {
      throw new AppError("Este e-mail já está em uso.", 400);
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if (password && !old_password) {
      throw new AppError("Informe a senha atual.", 400);
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError("A senha atual não confere.", 400);
      }

      user.password = await hash(password, 8);
    }

    if (is_admin !== undefined && user.id !== request.userId && !user.is_admin) {
      throw new AppError("Não autorizado.", 401);
    }

    if (is_admin !== undefined && user.is_admin) {
      user.is_admin = is_admin;
    }

    await database.run(`
      UPDATE users SET
      name = ?,
      email = ?,
      password = ?,
      is_admin = ?,
      updated_at = DATETIME('now')
      WHERE id = ?`,
      [
        user_id,
        user.name, 
        user.email, 
        user.password, 
        user.is_admin,
      ]
    );

    return response.status(200).json();
  }
}

module.exports = UsersController;
