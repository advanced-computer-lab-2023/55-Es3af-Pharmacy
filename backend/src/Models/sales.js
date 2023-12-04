const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const salesSchema = new Schema(
  {
    medid: {
        type: mongoose.Types.ObjectId,
      ref: 'medicine',
    },
    medicineName: {
      type: String,
      required: true,
    },
    Quantity: {
      type: Number,
      required: true,
    },
    boughtBy:{
        type: mongoose.Types.ObjectId,
        ref: 'patient',
    },
    patientName:{
        type:String,
        required:true,
    }

  },
  { timestamps: true }
);

const sales = mongoose.model("sales", salesSchema);
module.exports = sales;
