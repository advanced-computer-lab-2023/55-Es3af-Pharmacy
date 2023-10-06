const pharmacist = require("../Models/pharmacist.js");

const { default: mongoose } = require("mongoose");

const getPharmacist = async (req, res) => {
  try {
    res.send(await pharmacist.findById(req.params.id));
  } catch (e) {
    res.status(400).send(e);
  }
};

module.exports = { getPharmacist }
