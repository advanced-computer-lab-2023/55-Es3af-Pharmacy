const { Router } = require('express')
const patientController = require('../controllers/patientController')
const RegisterPatientController= require('../controllers/RegisterPatientController')
const patient = require('../Models/patient')
const patientRoutes = new Router()
const userController = require('../controllers/userController')

//patientRoutes.post('/updatePassword', patientController.getPassword)
patientRoutes.get("/patients", patientController.getPatients)

patientRoutes.get("/Cart", patientController.viewCart );
//patientRoutes.get('/:id', patientController.getPatient)

patientRoutes.put('/widrawFromWallet',patientController.withdrawFromWallet)

patientRoutes.post("/checkout",patientController.checkout);




patientRoutes.post("/addToCart",patientController.addToCart);

patientRoutes.post("/removeItem",patientController.removeItem);

patientRoutes.post("/addItem",patientController.addItem);

patientRoutes.post("/addDel" ,patientController.addDelivery);

//patientRoutes.get("/pastOrders", patientController.pastOrders);
patientRoutes.get("/order", patientController.viewOrder);

patientRoutes.get("/dropdown",patientController.dropdown)

patientRoutes.get("/cancel" , patientController.cancelOrder);

//patientRoutes.get("/dropdown",patientController.dropdown)

patientRoutes.post("/deleteMed", patientController.removeMed);



patientRoutes.post("/selectAddress", patientController.orderAddress);

patientRoutes.get("/wallet", patientController.getWallet);

patientRoutes.put('/updatePassword', userController.changePassword)

patientRoutes.post("/addwallet", patientController.addtoWallet);



module.exports = { patientRoutes };
