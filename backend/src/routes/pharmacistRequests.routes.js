const { Router } = require("express");

const pharmacistRequestsController = require("../controllers/PharmacistRequestsController");

const pharmacistRequestsRoutes = new Router();
pharmacistRequestsRoutes.get(
  "/",
  pharmacistRequestsController.getPharmacistReq
);

pharmacistRequestsRoutes.post("/newRequest", pharmacistRequestsController.pharmacistReq);

module.exports = { pharmacistRequestsRoutes };
