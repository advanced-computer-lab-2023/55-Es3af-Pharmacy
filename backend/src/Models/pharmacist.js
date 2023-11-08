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
  
});

const pharmacist= userModel.discriminator('pharmacist', pharmacistSchema);
module.exports = pharmacist;
