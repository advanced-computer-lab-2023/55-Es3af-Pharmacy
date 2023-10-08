const { Router } = require('express')
const medicinController = require('../controllers/medicine.controller')

const medicineRoutes = new Router()

medicineRoutes.get("/medicine", medicinController.getMedicine);

module.exports = {medicineRoutes};