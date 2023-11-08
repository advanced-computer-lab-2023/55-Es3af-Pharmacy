const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const medicineSchema = new Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    ActiveIngredients: {
      type: [String], // ActiveIngredients is an array of strings
      required: true,
    },
    Quantity: {
      type: Number,
      required: true,
    },
    Price: {
      type: Number,
      required: true,
    },
    Sales: {
      type: Number,
      required: true,
    },
    medicalUse: {
      type: String,
      reqired: true,
    },
    image: {
    data: Buffer,
    contentType: String
  }
  },
  { timestamps: true }
);

const medicine = mongoose.model("medicine", medicineSchema);
module.exports = medicine;
