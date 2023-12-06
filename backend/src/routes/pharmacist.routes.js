const { Router } = require("express");



const pharmacistController = require("../controllers/pharmacistController");
const patientController = require("../controllers/patientController");
const pharmacistRoutes = new Router();

pharmacistRoutes.get("/", pharmacistController.listPharmacists);
pharmacistRoutes.get("/wallet", pharmacistController.getWallet);
pharmacistRoutes.get("/salesRep" , patientController.getSales);
pharmacistRoutes.get("/:id", pharmacistController.getPharmacist);

pharmacistRoutes.post("/pharm", pharmacistController.addPharm);

module.exports = { pharmacistRoutes };
