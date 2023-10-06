const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const medicineSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  activeIngredients: {
    type: [String], // ActiveIngredients is an array of strings
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  }
}, { timestamps: true });

const medicine = mongoose.model('medicine', medicineSchema);
module.exports = medicine;
