const { Router } = require("express");

const FavoriteDishesController = require("../controllers/FavoriteDishesController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const favoritesRoutes = Router();

const favoriteDishesController = new FavoriteDishesController();

favoritesRoutes.use(ensureAuthenticated);

favoritesRoutes.get("/", favoriteDishesController.index);
favoritesRoutes.post("/", favoriteDishesController.create);
favoritesRoutes.delete("/:dish_id", favoriteDishesController.delete);

module.exports = favoritesRoutes;