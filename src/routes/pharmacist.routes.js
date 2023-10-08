const { Router } = require('express')
const pharmacistController = require('../controllers/pharmacist.controller')
const medicineController = require('../controllers/medicine.controller')

const pharmacistRoutes = new Router()


pharmacistRoutes.get('/:id', pharmacistController.getPharmacist);

pharmacistRoutes.post("/addMedicine", medicineController.addMedicine);

pharmacistRoutes.get("/medicine", medicineController.getMedicine);

pharmacistRoutes.put("/updateMedicine", medicineController.updateMedicine);

pharmacistRoutes.delete("/deleteMedicine", medicineController.deleteMedicine);


module.exports = { pharmacistRoutes };