const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  productName: {
    type: String,
    required: true,
    unique: true,
  },
  categoryID: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
    required: true,
  },
  images: [ 
    {
      type: String
    }
   ],
  status: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model("Product", productSchema);
