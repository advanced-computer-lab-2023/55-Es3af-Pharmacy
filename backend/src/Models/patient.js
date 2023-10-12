const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userModel = require('./user.js')

const patientSchema = new Schema({
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'user',
  //   autoRemove: true,
  // },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    enum: ["male", "female", "Male", "Female"],
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  emergencyContactName: {
    type: String,
    required: true,
  },
  emergencyContactMobile: {
    type: String,
    required: true,
  },
});

//const patient = mongoose.model("patient", patientSchema);
const patient= userModel.discriminator('patient', patientSchema);
module.exports = patient;