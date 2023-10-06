const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const patientSchema = new Schema({
  gender: {
    type: String,
    enum: ["male", "female"],
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  emergencyContact: {
    name: {
      type: String,
    },
    mobile: {
      type: String,
    },
    relation: {
      type: String,
      enum: ["spouse", "child"],
    },
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    autoRemove: true,
  },
});

const patient = mongoose.model("patient", patientSchema);
module.exports = patient;
