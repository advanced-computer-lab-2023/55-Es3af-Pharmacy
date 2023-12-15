const pharmacist = require("../Models/pharmacist.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const getPharmacist = async (req, res) => {
  try {
   
    res.send(await pharmacist.findById(req.params.id));
  } catch (e) {
    res.status(400).send(e);
  }
};


const getWallet = async (req, res) => {
 
  const token = req.cookies.jwt;
  var id;
  jwt.verify(token, "supersecret", (err, decodedToken) => {
    if (err) {
      
      res.status(401).json({ message: "You are not logged in." });
      // res.redirect('/login');
    } else {
      id = decodedToken.name;
    }
  });

  const p = await pharmacist.findById(id);
 
  res.status(200).json(p.amountInWallet);
};


const addtoWallet = async (req, res) => {

  const token = req.cookies.jwt;
  var id;
  jwt.verify(token, "supersecret", (err, decodedToken) => {
    if (err) {
      // console.log('You are not logged in.');
      // res send status 401 you are not logged in
      res.status(401).json({ message: "You are not logged in." });
      // res.redirect('/login');
    } else {
      id = decodedToken.name;
    }
  });
  const p = await pharmacist.findById(id);
  p.amountInWallet+=100;
  p.save().catch((err) => res.send(err));
  res.status(200).json(p.amountInWallet);
};



const addPharm = async (req, res) => {
  try {
    const { hourlyRate, affiliation, educationBackground } = req.body;

    res.send(await pharmacist.create({ hourlyRate, affiliation, educationBackground}));
  } catch (e) {
    res.status(400).send(e);
  }
};
const listPharmacists = async (req, res) => {
  try {
    res.send(await pharmacist.find());
  } catch (e) {
    res.status(400).send(e);
  }
};

module.exports = { getPharmacist, addPharm , listPharmacists, getWallet, addtoWallet};
