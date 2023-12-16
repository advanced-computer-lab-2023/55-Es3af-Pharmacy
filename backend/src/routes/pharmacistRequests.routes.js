const { Router } = require("express");
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const pharmacistRequestsController = require("../controllers/PharmacistRequestsController");

const pharmacistRequestsRoutes = new Router();
 pharmacistRequestsRoutes.get("/getPharmReq",pharmacistRequestsController.getPharmacistReq);

//pharmacistRequestsRoutes.post("/newRequest", pharmacistRequestsController.pharmacistReq);


pharmacistRequestsRoutes.post('/', upload.fields([
  { name: 'IDfile', maxCount: 1 },
  { name: 'WorkingLicenses', maxCount: 10 },
  { name: 'PharmacyDegree', maxCount: 1 },
]), pharmacistRequestsController.pharmacistReq);

module.exports = { pharmacistRequestsRoutes };
