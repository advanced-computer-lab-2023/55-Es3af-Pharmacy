const { Router } = require('express')
const medicinController = require('../controllers/medicine.controller')

const medicineRoutes = new Router()

medicineRoutes.post("/", medicinController.addMedicine);

medicineRoutes.get("/", medicinController.getMedicine);

medicineRoutes.put("/", medicinController.updateMedicine);

medicineRoutes.delete("/", medicinController.deleteMedicine);


module.exports = {medicineRoutes};