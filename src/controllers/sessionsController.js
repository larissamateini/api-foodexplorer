const knex = require("../database/knex");
const AppError = require("../utils/AppError");

const { compare } = require("bcryptjs");
const authConfiguration = require("../config/auth");
const { sign } = require("jsonwebtoken");


class SessionsController {
  async create(request, response) {
    const { email, password } = request.body;

    //procura o usuário
    const user = await knex("users")
      .where( {email })
      .first();

    if (!user) {
      throw new AppError("E-mail incorreto/ não cadastrado.", 401);
    }

    //confere a senha
    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError("Senha incorreta.", 401);
    }

    const { secret, expiresIn } = authConfiguration.jwt;

    //cria o token de autentificação
    const token = sign({ role: user.role }, secret, {
      subject: String(user.id),
      expiresIn
    });
    
    //token inserido por cookie
    response.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      //secure: true,
      maxAge: 15 * 60 * 1000
    });

    //proteger senha
    delete user.password;

    return response.status(201).json({ user, token });
  }
}

module.exports = SessionsController;