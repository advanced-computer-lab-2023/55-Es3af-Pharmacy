const express = require('express');
const multer = require('multer');
const fs = require('fs');
const medicineModel = require("../Models/Medicine.js");

const upload = multer({ dest: 'uploads/' });

const addMedicine = async (req, res) => {

upload.single('image')(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }

  var Name = req.body.Name;
  var newQuantity = req.body.Quantity;
  var Price = req.body.Price;
  var ActiveIngredients = req.body.ActiveIngredients;
  var medicalUse=req.body.medicalUse;
  var image = {
    data: fs.readFileSync(req.file.path),
    contentType: req.file.mimetype,
  };
});
  
  const med = medicineModel
    .findOne({ Name: Name })
    .exec()
    .then((document) => {
      if (document) {
        medicineModel
          .findOneAndUpdate(
            { Name: Name },
            { Quantity: newQuantity + document.Quantity }
          )
          .catch((err) => console.log(err));
          res.send("Medicine with name "+Name+" is already in the database; quantity updated successfully");
      } else {
        const newMed = new medicineModel({
          Name: Name,
          Quantity: newQuantity,
          Price: Price,
          ActiveIngredients: ActiveIngredients,
          Sales: 0,
          medicalUse:medicalUse
        });
        res.send("Medicine with name "+Name+" is added successfully");
        newMed.save().catch((err) => console.log(err));
      }
    })
    .catch((error) => {
      console.error(error);
      return;
    });
};

const listMedicine = async (req, res) => {
  const meds = await medicineModel.find(req.query);
  res.send(meds);
};

const getMedicine = async (req, res) => {
  const med = await medicineModel.findById(req.params.id);
  res.send(med);
};

const updateMedicine = async (req, res) => {
  const {Name, Price, ActiveIngredients}= req.body;
  
 // var Name = req.body.Name;
  //var Price = req.body.Price;
  //var ActiveIngredients = req.body.ActiveIngredients;
  medicineModel
    .findOneAndUpdate(
      { Name: Name },
      { Price: Price},
      { ActiveIngredients: ActiveIngredients }
    )
    .catch((err) => console.log(err));
  res
    .status(200)
    .send("Medicine with name " + Name + " is updated successfully");
};

const deleteMedicine = async (req, res) => {
    var Name = req.body.Name;
    if(Name==null){
      res.status(400).send("Please Enter A Valid Medicine Name");
      return;
    }
    await medicineModel
      .findOne({ Name: Name })
      .then(async (document) => {
        if (document) {
          res
            .status(200)
            .send("Medicine with name " + Name + " is deleted successfully");
          await medicineModel.deleteOne({ Name: Name });
        } else {
          res.status(404).send("Medicine with name " + Name + " is not found");
        }
      })
      .catch((error) => {
        console.error(error);
        return;
      });
  };
const searchMedicinebyName = async(req, res) => {
/*     var Name = req.body.Name;
    const Medicine = await medicineModel.find({ Name: Name })
    .exec()
    .then((document) => {
      if (document) {
        res.status(200).send(Medicine);
      } else {
        res.status(404).send("Medicine with name "+Name+"is not found");
    }
})
.catch((error) => {
    console.error(error);
    return;
  }); */
  try {
    
    var Name = req.body.Name;
    const medicine = await medicineModel
      .find({ Name: Name })
      .exec();

    if (medicine) {
      res.status(200).send(medicine);
    } else {
      res.status(404).send("Medicine with name " + Name + " is not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}
const filterMedicinebyUse = async(req, res) => {
/*     var medicalUse = req.body.medicalUse;
    const Medicines = await medicineModel.find({ medicalUse: medicalUse })
    .exec()
    .then((document) => {
        if (document) {
          res.status(200).send(Medicines);
        } else {
          res.status(404).send("Medicine used to treat "+medicalUse+" is not found");
      }
  })
  .catch((error) => {
      console.error(error);
      return;
    }); */
    try {
      const medicalUse = req.body.medicalUse;
      const Medicines = await medicineModel
        .find({ medicalUse: medicalUse })
        .exec();
  
      if (Medicines.length > 0) {
        res.status(200).send(Medicines);
      } else {
        res.status(404).send("Medicine used to treat " + medicalUse + " is not found");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
}

const uploadImage = async (req, res) => {
  upload.single('image')(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }

    const Name = req.body.Name; 
    const image = {
      data: fs.readFileSync(req.file.path),
      contentType: req.file.mimetype,
    };

    medicineModel.findOneAndUpdate({ Name: Name }, { image: image }, { new: true })
      .then(doc => {
        return res.status(200).send("Image uploaded for " + Name);
      })
      .catch(err => {
        return res.status(500).json(err);
      });
  });
};








module.exports = {
  addMedicine,
  listMedicine,
  updateMedicine,
  deleteMedicine,
  getMedicine,
  searchMedicinebyName,
  filterMedicinebyUse,
  uploadImage,
};
