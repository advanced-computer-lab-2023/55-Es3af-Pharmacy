const express = require('express');
const multer = require('multer');
const fs = require('fs');
const medicineModel = require("../Models/Medicine.js");
const pharmacistModel = require('../Models/pharmacist.js')
const nodemailer = require('nodemailer')
const notificationModel = require('../Models/notifications.js')

const upload = multer({ dest: 'uploads/' });

const addMedicine = async (req, res) => {
  var Name = req.body.Name;
  var newQuantity = req.body.Quantity;
  var Price = req.body.Price;
  var ActiveIngredients = req.body.ActiveIngredients;
  var medicalUse=req.body.medicalUse;

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
          medicalUse:medicalUse,
          archived: true,
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
    try {
      const Name = req.body.Name; 
      const image = {
        name: req.file.originalname,
        data: fs.readFileSync(req.file.path),
        contentType: req.file.mimetype,
      };

      medicineModel.findOneAndUpdate({ Name: Name }, { image: image }, { new: true })
        .then(doc => {
          res.status(200).send("Image uploaded for " + Name);
        })
        .catch(err => {
          res.status(500).json(err);
        });
    } catch (error) {
      console.log(error)
    }  
};

async function medicineOutOfStock () {
  var emails = ''
  var ids = []
  pharmacistModel.find({}, {email: 1, _id: 1})
  .exec()
  .then((result) => {
    console.log(result.email)
    for(var mail of result){
      emails += mail.email + ', '
      ids.push(mail._id)
    }
  })

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "55es3afclinicpharmacy@gmail.com",
      pass: "itqq jnfy kirk druf",
    },
  });

  medicineModel.find({Quantity: {$lte: 0}}, {Name: 1, Quantity: 1})
  .exec()
  .then(async (result) => {
    if(result.length != 0){
      var medNames = ''
      for(var quantity of result){
        medNames += quantity.Name + ', '
      }
      const info = await transporter.sendMail({
        from: '"Pharmacy" <55es3afclinicpharmacy@gmail.com>', // sender address
        to: emails, // list of receivers
        subject: "Medicine out of stock", // Subject line
        text: `These are the medicine out of stock: ${medNames}`, // plain text body
        html: `<b>These are the medicine out of stock:<br> ${medNames}</b>`, // html body
      });
      const newNotif = new notificationModel({
        receivers: ids,
        message: `These are the medicine out of stock: ${medNames}`
      })
      newNotif.save().catch((err) => console.error(err))
    }
  })

}
const archiveMedicine = async (req, res) => {
  
  
  const m= await medicineModel.findOne({Name: req.body.Name});
  if(m==null){
    res.status(400).send("medicine not found");
    return;
  }
  m.archived = true;
  m.save().catch((err) => res.send(err));
  res.status(200).json(m);
};

const unarchiveMedicine = async (req, res) => {
  
  const m= await medicineModel.findOne({Name: req.body.Name});
  if(m==null){
    res.status(400).send("medicine not found");
    return;
  }
  m.archived = false;
  m.save().catch((err) => res.send(err));
  res.status(200).json(m);
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
  archiveMedicine,
  unarchiveMedicine,
  medicineOutOfStock,
};
