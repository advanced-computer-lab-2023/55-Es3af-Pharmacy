const pharmacistRequestModel = require("../Models/PharmacistRequests.js");
const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const storage = multer.memoryStorage();
const uploads = multer({ storage: storage });
//const docReq = require('../Models/RequestDoctor.js')

const bcrypt = require("bcrypt");
const { createToken } = require("../utils/auth.js");

const pharmacistReq = async (req, res) => {
  //console.log(req.BODY);
  try {
      
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(req.body.password, salt);  
      const newPharmacist = new pharmacistRequestModel({
      username: req.body.username,
      password: hashedPassword,
      name: req.body.name,
      email: req.body.email,
      dateOfBirth: req.body.dateOfBirth,
      hourlyRate: req.body.hourlyRate,
      affiliation: req.body.affiliation,
      educationBackground: req.body.educationBackground,
      status: req.body.status || "Pending",
    });

    // Handle file uploads
    if (req.files) {
      
      if (req.files.IDfile) {
        newPharmacist.IDfile = {
          name: req.files.IDfile[0].originalname,
          data: req.files.IDfile[0].buffer,
          contentType: req.files.IDfile[0].mimetype,
        };
      }

      if (req.files.WorkingLicenses) {
        newPharmacist.WorkingLicenses = req.files.WorkingLicenses.map((license) => ({
          name: license.originalname,
          data: license.buffer,
          contentType: license.mimetype,
        }));
      }

      if (req.files.PharmacyDegree) {
        newPharmacist.PharmacyDegree = {
          name: req.files.PharmacyDegree[0].originalname,
          data: req.files.PharmacyDegree[0].buffer,
          contentType: req.files.PharmacyDegree[0].mimetype,
        };
      }
    }

  
    newPharmacist.save().catch(err => console.log(err));
    
    const token = createToken(newPharmacist._id);
    const maxAge = 3 * 24 * 60 * 60;

    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).send(newPharmacist);
    //res.status(200).send('Pharmacist registered successfully.');
  } catch (error) {
    //console.error(error);
    res.status(400).send({ error});
  }
};

const getPharmacistReq = async (req, res) => {
  //retrieve all Doctor requests from the database
  const PharmReq = await pharmacistRequestModel.find({});
 
  res.status(200).send(PharmReq);
};

module.exports = { pharmacistReq, getPharmacistReq };

// const requestPharmacist = async (req, res) => {
//   pharmacistRequestModel
//     .findOne({ username: req.body.username })
//     .exec()
//     .then((result) => {
//       if (Object.keys(result).length === 0) {
//         pharmacistModel
//           .findOne({ email: req.body.email })
//           .exec()
//           .then((result2) => {
//             if (Object.keys(result2).length === 0) {
//               const newUser = new pharmacistModel({
//                 username: req.body.username,
//                 name: req.body.name,
//                 email: req.body.email,
//                 password: req.body.password,
//                 dateOfBirth: req.body.dateOfBirth,
//                 type: req.body.type,
//               });
//               newUser.save().catch((err) => console.log(err));
//               pharmacistModel
//                 .findOne({ username: req.body.username })
//                 .exec()
//                 .then(result)
//                 .catch((err) => {
//                   console.error(err);
//                 });
//               const newPharmacist = new pharmacistRequestModel({
//                 user: result._id,
//                 hourlyRate: req.body.hourlyRate,
//                 affiliation: req.body.affiliation,
//                 educationBackground: req.body.educationBackground,
//               });
//               newPharmacist.save().catch((err) => console.log(err));
//               res.status(200).send("Request sent.");
//             } else {
//               res.status(200).send("Email already exists.");
//               return;
//             }
//           })
//           .catch((err) => {
//             console.error(err);
//           });
//       } else {
//         res.status(200).send("Username already exists.");
//         return;
//       }
//     })
//     .catch((err) => {
//       console.error(err);
//     });
// };

// const listRequests = async (req, res) => {
//   try {
//     res.send(await pharmacistRequestModel.find());
//   } catch (e) {
//     res.status(400).send(e);
//   }
// };

// module.exports = { requestPharmacist, listRequests };
