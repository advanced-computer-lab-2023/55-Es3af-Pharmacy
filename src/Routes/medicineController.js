const medicineModel = require('../Models/Medicine.js');
const { default: mongoose } = require('mongoose');

const addMedicine = async(req,res) => {
   var Name=req.body.Name;
   var Quantity=req.body.Quantity;
   var Price=req.body.Price;
   var ActiveIngredients=req.body.ActiveIngredients;
   const newMed= new medicineModel({
    Name: Name,
    Quantity: Quantity,
    Price: Price,
    ActiveIngredients: ActiveIngredients
   });
   newMed.save().catch(err => console.log(err));
   console.log(Name," is added successfully");
   res.status(200).send(Name+" is added successfully");
}

const getMedicine = async (req, res) => {
   const meds= await medicineModel.find({});
   console.log(meds);
   res.status(200).send(meds);
  }


const updateMedicine = async (req, res) => {
    var Name=req.body.Name;
    var Price=req.body.Price;
    var ActiveIngredients=req.body.ActiveIngredients;
    medicineModel.findOneAndUpdate({Name: Name}, {Price: Price, ActiveIngredients:ActiveIngredients})
    .catch(err => console.log(err));
    res.status(200).send("Medicine with name"+Name+" is updated successfully");
  }

const deleteMedicine = async (req, res) => {
    var Name=req.body.Name;
    await medicineModel.deleteOne({Name:Name});
    res.status(200).send("Medicine with name"+Name+" is deleted successfully");
  }


module.exports = {addMedicine, getMedicine, updateMedicine, deleteMedicine};