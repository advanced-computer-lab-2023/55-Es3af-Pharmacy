const { Router } = require('express')
const patientController = require('../controllers/patientController')
const RegisterPatientController= require('../controllers/RegisterPatientController')
const patientRoutes = new Router()

patientRoutes.get("/patients", patientController.getPatients)

patientRoutes.get("/Cart", patientController.viewCart );
//patientRoutes.get('/:id', patientController.getPatient)
patientRoutes.post("/checkout",patientController.checkout);
patientRoutes.post("/registerPatient", RegisterPatientController.registerPatient)


patientRoutes.post("/addToCart",patientController.addToCart);

patientRoutes.post("/removeItem",patientController.removeItem);



module.exports = { patientRoutes };
