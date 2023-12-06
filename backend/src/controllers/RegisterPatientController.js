const patientModel = require("../Models/patient.js");
const bcrypt = require("bcrypt");
const { createToken } = require("../utils/auth.js");

const registerPatient = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newPatient = new patientModel({
      username: req.body.username,
      password: hashedPassword,
      name: req.body.name,
      email: req.body.email,
      dateOfBirth: req.body.dateOfBirth,
      gender: req.body.gender,
      mobile: req.body.mobile,
      emergencyContactName: req.body.emergencyContactName,
      emergencyContactMobile: req.body.emergencyContactMobile,
      amountInWallet: 0,
    });

    newPatient.save().catch((err) => console.log(err));

    const token = createToken(newPatient._id);
    const maxAge = 3 * 24 * 60 * 60;

    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).send(newPatient);
  } catch (error) {
    console.log({ error });
    res.status(400).send(error);
  }
};

module.exports = { registerPatient };
