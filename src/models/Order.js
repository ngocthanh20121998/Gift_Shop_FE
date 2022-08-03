const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  productList: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
        required: true,
      }
    }
  ],
  userID: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  userName: {
    type : String,
    required: true,
    default: ''
  },
  phoneNumber: {
    type: String,
    required: true,
    default: ''
  },
  address: {
    type: String,
    required: true,
    default: ''
  },
  total: {
    type: Number,
    required: true,
    default: ''
  },
  paymentID: {
    type: Schema.Types.ObjectId,
    ref: "Payment"
  },
  date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: Schema.Types.ObjectId,
    ref: "OrderStatus"
  }
});

module.exports = mongoose.model("Order", orderSchema);
