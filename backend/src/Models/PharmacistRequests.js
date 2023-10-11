const mongoose = require("mongoose");
const userModel = require("./user");
const Schema = mongoose.Schema;


const pharmacistRequestSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  
  // type: {
  //   type: String, default: "pharmacist",
  // },
  
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
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'user',
  //   autoRemove: true,
  // },
  status: {
    type: String,
    enum : ["Pending", "Rejected"],
    default: "Pending"
  }
});

const pharmacist = mongoose.model("pharmacistRequests", pharmacistRequestSchema);
module.exports = pharmacist;
