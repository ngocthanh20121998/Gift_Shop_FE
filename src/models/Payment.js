const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
  name: 
    {
      type: String,
      required: true
    }

});

module.exports = mongoose.model("Payment", PaymentSchema);