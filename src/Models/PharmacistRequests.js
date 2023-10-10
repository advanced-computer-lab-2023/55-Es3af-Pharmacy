const mongoose = require("mongoose");
const user = require("./user");
const Schema = mongoose.Schema;


const pharmacistSchema = new Schema({
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
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    autoRemove: true,
  },
  status: {
    type: String,
    enum : ["Pending", "Rejected"],
    default: "Pending"
  }
});

const pharmacist = mongoose.model("pharmacist", pharmacistSchema);
module.exports = pharmacist;
