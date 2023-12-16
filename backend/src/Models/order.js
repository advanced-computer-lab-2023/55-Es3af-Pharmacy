const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    pID: {
        type: mongoose.Types.ObjectId,
        ref: 'patient',
    },
    status: {
        type: String,
        enum: ["pending", "on the way", "delivered","CANCELLED"],
        required: false,
    },
    total:{
      type: Number,
      required: true,
    },
    address:{
      type: String,
      required: false,
    },
    wallet:{
      type:Boolean,
      default: false,
    }
    
  },
  { timestamps: true }
);

const order = mongoose.model("order", orderSchema);
module.exports = order;
