const { Router } = require("express");

const UsersController = require("../controllers/usersController");
const UsersValidatedController = require("../controllers/usersValidatedController");

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const usersRoutes = Router();
const usersController = new UsersController();
const usersValidatedController = new UsersValidatedController();

usersRoutes.post('/', usersController.create);
usersRoutes.get("/validated", ensureAuthenticated, usersValidatedController.index);

module.exports = usersRoutes;