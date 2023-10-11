const patient = require("../Models/patient.js");

const getPatient = async (req, res) => {
  try {
    res.send(await patient.findById(req.params.id));
  } catch (e) {
    res.status(400).send(e);
  }
};

const getPatients = async (req, res) => {
  //retrieve all patients from the database
  const patients = await patient.find({});
  console.log(patients);
  res.status(200).send(patients);
};

module.exports = { getPatient, getPatients };
