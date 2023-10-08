const medicineModel = require('../Models/Medicine.js');

const addMedicine = async (req, res) => {
    var Name = req.body.Name;
    var newQuantity = req.body.Quantity;
    var Price = req.body.Price;
    var ActiveIngredients = req.body.ActiveIngredients;

    medicineModel.findOne({ Name: Name })
        .exec()
        .then((document) => {
            if (document) {
                medicineModel.findOneAndUpdate({ Name: Name }, { Quantity: newQuantity + document.Quantity })
                .catch(err => console.log(err));
            }
            else {
                const newMed = new medicineModel({
                    Name: Name,
                    Quantity: newQuantity,
                    Price: Price,
                    ActiveIngredients: ActiveIngredients,
                    Sales: 0,
                });
                newMed.save().catch(err => console.log(err));
            }
        })
    .catch ((error) =>{
        console.error(error);
        return;
    }
);
console.log(Name, " is added successfully");
res.status(200).send(Name + " is added successfully");
}

const getMedicine = async (req, res) => {
    const meds = await medicineModel.find({});
    console.log(meds);
    res.status(200).send(meds);
}


const updateMedicine = async (req, res) => {
    var Name = req.body.Name;
    var Price = req.body.Price;
    var ActiveIngredients = req.body.ActiveIngredients;
    medicineModel.findOneAndUpdate({ Name: Name }, { Price: Price, ActiveIngredients: ActiveIngredients })
        .catch(err => console.log(err));
    res.status(200).send("Medicine with name " + Name + " is updated successfully");
}

const deleteMedicine = async (req, res) => {
    var Name = req.body.Name;
    await medicineModel.findOne({Name: Name})
    .then(async (document)=>{
        if(document){
            res.status(200).send("Medicine with name " + Name + " is deleted successfully");
            await medicineModel.deleteOne({ Name: Name })
        }
        else{
            res.status(404).send("Medicine with name "+ Name+" is not found");
        }
    })
    .catch ((error) =>{
        console.error(error);
        return;
    });
}


module.exports = { addMedicine, getMedicine, updateMedicine, deleteMedicine };