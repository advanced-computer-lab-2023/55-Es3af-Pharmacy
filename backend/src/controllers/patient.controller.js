const patient = require("../Models/patient.js");
const { default: mongoose } = require("mongoose");

const getPatient = async (req, res) => {
  try {
    res.send(await patient.findById(req.params.id));
  } catch (e) {
    res.status(400).send(e);
  }
};

module.exports = { getPatient }