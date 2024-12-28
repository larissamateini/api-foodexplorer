const { verify } = require('jsonwebtoken');
const AppError = require('../utils/AppError');
const authConfiguration = require('../config/auth');

function ensureAuthenticated(request, response, next) {
  
  //const token = request.cookies.token;
  const authHeader= request.headers.authorization;
  //token
  if(!authHeader) {
    throw new AppError('JWT Token não informado.', 401)
  }
  //.cookie.split('token=')
  const [, token ] = authHeader.split(" ");

  try {
    const { role, sub: user_id } = verify(token, authConfiguration.jwt.secret);

    request.user = {
      id: Number(user_id),
      role
    };

    return next();

  } catch {

    throw new AppError("JWT Token inválido.", 401);
  }
}

module.exports = ensureAuthenticated;