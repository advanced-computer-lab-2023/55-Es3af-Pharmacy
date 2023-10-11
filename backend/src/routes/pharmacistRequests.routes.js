const { Router } = require("express");

const pharmacistRequestsController = require("../controllers/PharmacistRequestsController");

const pharmacistRequestsRoutes = new Router();

pharmacistRequestsRoutes.get(
  "/",
  pharmacistRequestsController.listRequests
);

pharmacistRequestsRoutes.post("/newRequest", pharmacistRequestsController.requestPharmacist);

module.exports = { pharmacistRequestsRoutes };
