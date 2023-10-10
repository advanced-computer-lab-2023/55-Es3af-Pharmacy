const { Router } = require("express");
const medicineController = require("../controllers/medicine.controller");

const medicineRoutes = new Router();

medicineRoutes.post("/", medicineController.addMedicine);

medicineRoutes.put("/", medicineController.updateMedicine);

medicineRoutes.get("/:id", medicineController.getMedicine);

medicineRoutes.get("/", medicineController.listMedicine);

medicineRoutes.get("/searchByName", medicineController.searchMedicinebyName);

medicineRoutes.get("/filter", medicineController.filterMedicinebyUse);

medicineRoutes.delete("/", medicineController.deleteMedicine);

module.exports = { medicineRoutes };
