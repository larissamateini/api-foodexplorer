const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");

const DishesController = require("../controllers/DishesController");

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const checkAdminAuthorization = require("../middlewares/checkAdminAuthorization");

const dishesRoutes = Router();
const upload = multer(uploadConfig.MULTER);

const dishesController = new DishesController();

dishesRoutes.use(ensureAuthenticated);

dishesRoutes.get("/", dishesController.index);
dishesRoutes.get("/:id", dishesController.show);
dishesRoutes.delete("/:id", checkAdminAuthorization, dishesController.delete);
dishesRoutes.post("/", checkAdminAuthorization, upload.single("image"), dishesController.create);
dishesRoutes.patch("/:id", checkAdminAuthorization, upload.single("image"), dishesController.update);

module.exports = dishesRoutes;