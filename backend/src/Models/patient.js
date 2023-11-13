const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userModel = require('./user.js')


const patientSchema = new Schema({
  
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
    enum: ["male", "female"],
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
  cart: 
   [{
    medID:{
      type: mongoose.Types.ObjectId,
      ref: 'medicine',
    },
    medName:{
      type: String
    },
    medPrice:{
      type:Number
    },
    qty:{
      type:Number,
      required: true,
      default: 1,
    },
   }],
   cartTotal:{
      type:Number,
      required: false,
      default: 0,
   },
   delivery: {
    type: [String], 
    required: false,
    default: [],
  },
  amountInWallet:{
    type:Number,
    default:0,
  }
  

});

//const patient = mongoose.model("patient", patientSchema);
const patient= userModel.discriminator('patient', patientSchema);
module.exports = patient;
