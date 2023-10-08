const { Router } = require('express')
const medicinController = require('../controllers/medicine.controller')

const medicineRoutes = new Router()

medicineRoutes.post("/addMedicine", medicinController.addMedicine);

medicineRoutes.get("/medicine", medicinController.getMedicine);

medicineRoutes.put("/updateMedicine", medicinController.updateMedicine);

medicineRoutes.delete("/deleteMedicine", medicinController.deleteMedicine);


module.exports = {medicineRoutes};