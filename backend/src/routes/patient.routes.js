const { Router } = require('express')
const patientController = require('../controllers/patientController')
const RegisterPatientController= require('../controllers/RegisterPatientController')
const patient = require('../Models/patient')
const patientRoutes = new Router()

patientRoutes.get("/patients", patientController.getPatients)

patientRoutes.get("/Cart", patientController.viewCart );
//patientRoutes.get('/:id', patientController.getPatient)
patientRoutes.post("/createSession",patientController.checkoutSession)
patientRoutes.put('/widrawFromWallet',patientController.withdrawFromWallet)

patientRoutes.post("/checkout",patientController.checkout);

patientRoutes.post("/registerPatient", RegisterPatientController.registerPatient)


patientRoutes.post("/addToCart",patientController.addToCart);

patientRoutes.post("/removeItem",patientController.removeItem);

patientRoutes.post("/addItem",patientController.addItem);

patientRoutes.post("/addDel" ,patientController.addDelivery);

patientRoutes.get("/order", patientController.viewOrder);

patientRoutes.get("/dropdown",patientController.dropdown)

patientRoutes.delete("/cancel" , patientController.cancelOrder);

//patientRoutes.get("/dropdown",patientController.dropdown)

patientRoutes.post("/deleteMed", patientController.removeMed);


module.exports = { patientRoutes };
