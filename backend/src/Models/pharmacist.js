const mongoose = require("mongoose");
const userModel = require("./user");
const Schema = mongoose.Schema;


const pharmacistSchema = new Schema({

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
  hourlyRate: {
    type: Number,
    required: true,
  },
  affiliation: {
    type: String,
    required: true,
  },
  educationBackground: {
    type: String,
    required: true,
  },
  IDfile: {
    name: String,
    data: Buffer,
    contentType: String
  },
  WorkingLicenses: [{
    name: String,
    data: Buffer,
    contentType: String
  }],
  PharmacyDegree: {
    name: String,
    data: Buffer,
    contentType: String
  },
  
});

const pharmacist= userModel.discriminator('pharmacist', pharmacistSchema);
module.exports = pharmacist;
