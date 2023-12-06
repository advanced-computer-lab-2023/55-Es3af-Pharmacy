const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pastOrderSchema = new Schema(
  {
    pID: {
        type: mongoose.Types.ObjectId,
        ref: 'patient',
    },
    status: {
        type: String,
        enum: ["delivered","CANCELLED"],
        required: false,
    },
    total:{
      type: Number,
      required: true,
    },
    address:{
      type: String,
      required: false,
    }
    
  },
  { timestamps: true }
);

const pastOrders = mongoose.model("pastOrder", pastOrderSchema);
module.exports = pastOrders;
