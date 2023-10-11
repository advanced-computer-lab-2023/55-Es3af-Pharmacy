const { Router } = require("express");

const pharmacistController = require("../controllers/pharmacistController");

const pharmacistRoutes = new Router();

pharmacistRoutes.get("/", pharmacistController.listPharmacists);

pharmacistRoutes.get("/:id", pharmacistController.getPharmacist);

pharmacistRoutes.post("/pharm", pharmacistController.addPharm);

module.exports = { pharmacistRoutes };
