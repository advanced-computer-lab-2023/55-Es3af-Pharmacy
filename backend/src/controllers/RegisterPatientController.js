const patientModel = require("../Models/patient.js");

const registerPatient = async (req, res) => {
  try {
    const newPatient = new patientModel({
      username: req.body.username,
      password: req.body.password,
      name: req.body.name,
      email: req.body.email,
      dateOfBirth: req.body.dateOfBirth,
      gender: req.body.gender,
      mobile: req.body.mobile,
      emergencyContact: req.body.emergencyContact,
    });
    newPatient.save().catch((err) => console.log(err));
    res.status(200).send("Patient Registered.");
  } catch (error) {
    registerPatient.status(400).send({ error: error });
  }
};

module.exports = { registerPatient };
