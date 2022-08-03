const Order = require("../models/Order");
const User = require("../models/User");
const Product = require("../models/Product");
const nodemailer = require("nodemailer");
const hogan = require("hogan.js");
const fs = require("fs");
const { get } = require('http')

const formEmail = fs.readFileSync('./src/views/email.hjs', 'utf-8');
const compiled = hogan.compile(formEmail);

const createOrder = async (req, res, next) => {
  
  const newOrder = new Order(req.body);
  console.log(newOrder)
  await newOrder.save();
  const order = await Order.findById({_id: newOrder._id})
  .populate("paymentID")
  .populate("status");
  const product= new Array()
  for(var i = 0; i < order.productList.length; i++){
    const prd = await Product.findById({_id: order.productList[i].product})
    
    product.push({
      productName: prd.productName,
      price: new Intl.NumberFormat().format(prd.price-(prd.price*prd.discount/100)),
      quantity: order.productList[i].quantity
    })
  }
  console.log(product)
  const user = await User.findById({_id: order.userID})

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      post: 587,
      secure: false,
      auth: {
        user: "giftshop.datn@gmail.com",
        pass: "giftshop123",
      },
    });

    const info = await transporter.sendMail({
      from: "giftshop.datn@gmail.com", // sender address
      to: user.email, // list of receivers
      subject: 'Đơn hàng "' + order._id + '" đã được đặt hàng thành công', // Subject line
      html: compiled.render({
        orderID: order._id,
        product: product,
        payment: order.paymentID.name,
        address: order.address,
        phone: order.phoneNumber,
        totalBefore: new Intl.NumberFormat().format(order.total-30000),
        total:  new Intl.NumberFormat().format(order.total)
      }) // html body
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
  }


};
// const sendMail = async (req, res, next) => {
//   const { cartID } = req.body;
//   const order = await Order.findOne({cartID: cartID})
//   .populate("paymentID")
//   .populate("status");
//   const product= new Array()
  
//   for(var i = 0; i < order.cartID.productID.length; i++){
//     const prd = await Product.findById({_id: order.cartID.productID[i]})
    
//     product.push({
//       productName: prd.productName,
//       price: new Intl.NumberFormat().format(prd.price-(prd.price*prd.discount/100)),
//       quantity: order.cartID.quantity[i]
//     })
//   }
//   console.log(product)
//   const user = await User.findById({_id: order.cartID.userID})

//   console.log('order._id',order._id)
//   console.log('product',product)
//   console.log('order.paymentID.name',order.paymentID.name)
//   console.log('user.address',order.address)
//   console.log('user.phone',order.phone)
//   console.log('totalBefore',new Intl.NumberFormat().format(order.total-30000))
//   console.log('total',new Intl.NumberFormat().format(order.total))

//   try {
//     const transporter = nodemailer.createTransport({
//       host: "smtp.gmail.com",
//       post: 587,
//       secure: false,
//       auth: {
//         user: "giftshop.datn@gmail.com",
//         pass: "giftshop123",
//       },
//     });
//     console.log('order._id',order._id)
//     console.log('product',product)
//     console.log('order.paymentID.name',order.paymentID.name)
//     console.log('user.address',user.address)
//     console.log('user.phone',user.phone)
//     console.log('totalBefore',new Intl.NumberFormat().format(order.total-30000))
//     console.log('total',new Intl.NumberFormat().format(order.total))

//     const info = await transporter.sendMail({
//       from: "giftshop.datn@gmail.com", // sender address
//       to: user.email, // list of receivers
//       subject: 'Đơn hàng "' + order._id + '" đã được đặt hàng thành công', // Subject line
//       html: compiled.render({
//         orderID: order._id,
//         product: product,
//         payment: order.paymentID.name,
//         address: user.address,
//         phone: user.phone,
//         totalBefore: new Intl.NumberFormat().format(order.total-30000),
//         total:  new Intl.NumberFormat().format(order.total)
//       }) // html body
//     });

//     res.status(200).json({ success: true });
//   } catch (error) {
//     console.log(error);
//   }
// };


const getAllOrder = async (req, res, next) => {
  const getOrders = await Order.find({})
    .populate("paymentID")
    .populate("status");

  const orders = getOrders.reverse();

  return res.status(200).json({ orders });
};

const getOrderOfUser = async (req, res, next) => {
  const { userID } = req.params;
  console.log(userID)
  const getOrders = await Order.find({userID: userID})
  .populate("paymentID")
  .populate("status");
  const orders = getOrders.reverse()
  return res.status(200).json({ orders });
};

const updateStatusOrder = async (req, res, next) => {
  const { orderID } = req.params;
  const status = req.body;
  await Order.findByIdAndUpdate(orderID, status);
  const getOrders = await Order.find({})
    .populate("paymentID")
    .populate("status");

  const orders = getOrders.reverse();

  return res.status(200).json({ orders });
};



module.exports = {
  getAllOrder,
  createOrder,
  updateStatusOrder,
  getOrderOfUser,
  // sendMail,
};
