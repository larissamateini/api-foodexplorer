const { Router } = require("express");

const usersRoutes = require("./users.routes");
const sessionsRoutes = require("./sessions.routes");
const dishesRoutes = require("./dishes.routes");

const appRoutes = Router();

appRoutes.use("/users", usersRoutes);
appRoutes.use("/sessions", sessionsRoutes);
appRoutes.use("/dishes", dishesRoutes);

module.exports = appRoutes;