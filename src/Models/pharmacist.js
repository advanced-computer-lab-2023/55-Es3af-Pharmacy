const mongoose = require("mongoose");
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
    ref: 'User',
    autoRemove: true,
  },
});

const pharmacist = mongoose.model("pharmacist", pharmacistSchema);
module.exports = pharmacist;
