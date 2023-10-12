const { Router } = require('express')
const patientController = require('../controllers/patientController')
const RegisterPatientController= require('../controllers/RegisterPatientController')
const patientRoutes = new Router()

patientRoutes.get("/patients", patientController.getPatients)
patientRoutes.get('/:id', patientController.getPatient)
patientRoutes.post("/registerPatient", RegisterPatientController.registerPatient)


module.exports = { patientRoutes };
