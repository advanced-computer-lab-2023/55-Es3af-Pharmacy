const { Router } = require("express");
const medicineController = require("../controllers/medicineController");

const multer = require('multer');


const upload = multer({ dest: 'uploads/' });

const medicineRoutes = new Router();
medicineRoutes.post('/unarchiveMedicine', medicineController.unarchiveMedicine);
medicineRoutes.post("/", medicineController.addMedicine);

medicineRoutes.put("/update", medicineController.updateMedicine);

//medicineRoutes.get("/:id", medicineController.getMedicine);

medicineRoutes.get("/",medicineController.listMedicine);

medicineRoutes.get("/searchByName", medicineController.searchMedicinebyName);

medicineRoutes.get("/filter", medicineController.filterMedicinebyUse);

medicineRoutes.delete("/", medicineController.deleteMedicine);

medicineRoutes.post('/uploadImage', upload.single('image'), medicineController.uploadImage);

medicineRoutes.post('/archiveMedicine', medicineController.archiveMedicine);



module.exports = { medicineRoutes };
