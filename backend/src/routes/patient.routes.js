const { Router } = require('express')
const patientController = require('../controllers/patientController')

const patientRoutes = new Router()

patientRoutes.get('/:id', patientController.getPatient)

module.exports = { patientRoutes };