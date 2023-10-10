const { Router } = require("express");

const pharmacistRequestsController = require("../controllers/PharmacistRequestsController");

const pharmacistRequestsRoutes = new Router();

pharmacistRequestsRoutes.get('/listRequests', pharmacistRequestsController.listRequests);

module.exports = { pharmacistRequestsRoutes };
