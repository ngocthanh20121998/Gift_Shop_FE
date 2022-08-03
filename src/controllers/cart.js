const Cart = require("../models/Cart");
const Product = require("../models/Product");

const createCart = async (req, res, next) => {
  const newCart = new Cart(req.body);
  await newCart.save();

  return res.status(200).json({ newCart });
};

const updateCart = async (req, res, next) => {
  const { cartID } = req.params;
  const newCart = req.body;
  await Cart.findByIdAndUpdate(cartID, newCart);
  const cart = await Cart.findById(cartID).populate("product");
  console.log(cart)
  return res.status(200).json({ cart });
};


const getCart = async (req, res, next)=> {
  const {cartID} = req.params

  const cart = await Cart.findById(cartID)
  return res.status(200).json({ cart });
}

const getCartOfUser = async (req, res, next)=> {
  const userID = req.params
  console.log(userID)
  const cart = await Cart.findOne(userID)
  console.log(cart)
  if(cart!=null){
    console.log('true')
    return res.status(200).json({ cart });
  }else{
    const cart = new Cart(userID);
    await cart.save();
    return res.status(200).json({ cart });
  }

}



module.exports = {
  createCart,
  updateCart,
  getCart,
  getCartOfUser
};
