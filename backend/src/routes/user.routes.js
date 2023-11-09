const { Router } = require("express");
const userController = require("../controllers/userController");

const userRoutes = new Router();

userRoutes.post("/admin", userController.addAdmin);

userRoutes.get("/", userController.listUsers);

userRoutes.delete("/:id", userController.deleteUser);

module.exports = { userRoutes };
