const { Router } = require("express");

const ensureAuthenticated = require('../middlewares/ensureAuthenticated');
const verifyUserAuthorization = require('../middlewares/verifyUserAuthorization');

const multer = require("multer");
const uploadConfiguration = require("../config/upload");

const DishesController = require("../controllers/dishesController");
const dishesController = new DishesController();

const upload = multer(uploadConfiguration.MULTER);

const dishesRoutes = Router();

dishesRoutes.use(ensureAuthenticated);

dishesRoutes.get('/', dishesController.index);
dishesRoutes.get('/:id', dishesController.show);
dishesRoutes.post('/', 
  verifyUserAuthorization(["admin"]), 
  upload.single("dish_image"), 
  dishesController.create
);

dishesRoutes.put('/edit/:id', 
  verifyUserAuthorization(["admin"]), 
  upload.single("newImage"), 
  dishesController.update
); 

dishesRoutes.delete('/:id', 
  verifyUserAuthorization(["admin"]), 
  dishesController.delete
);

module.exports = dishesRoutes;