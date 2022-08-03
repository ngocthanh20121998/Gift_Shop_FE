const Category = require('../models/Category')
const Product = require('../models/Product')
const Order = require('../models/Order')
const Cart = require('../models/Cart')
const fs = require('fs')
const { get } = require('http')
const createProduct = async (req, res, next)=>{
  //create product
  const newProduct= new Product(req.body)
  await newProduct.save()

  //find category of product
  const category = await Category.findById(newProduct.categoryID)
  //add product to category
  category.products.push(newProduct)
  await category.save()
  const getProducts = await Product.find({}).populate('categoryID')
  const products = getProducts.reverse()
  return res.status(201).json({products})
}

const deleteProduct = async (req, res, next)=>{
  try {
    const { productID } = req.params
  var check = false
  const getOrders = await Order.find({status: {$ne: '609f9df356749319d461dafa'}})
  for(var i = 0; i< getOrders.length; i++){
    for(var j = 0; j< getOrders[i].productList.length; j++){
      if(getOrders[i].productList[j].product==productID)
        check = true
    }
  }
  if(check){
   return res.status(201).json({message: 'Xóa sản phẩm thất bại! Sản phẩm đã được đặt hàng.'})
  }else{
    const product = await Product.findById(productID)
    for(var i = 0 ; i< product.images.length; i++) {
      fs.unlink('./public/images/'+ product.images[i],err=>{
        if (err) {
          console.error(err)
          return
        }
      })
    }
    const cart = await Cart.find({})
    for(var i = 0; i< cart.length; i++){
      var getIndexCart = 'x';
      for(var j = 0; j< cart[i].productList.length; j++){
        if(cart[i].productList[j].product.equals(productID)){
          getIndexCart = j
        }
      }
      if(getIndexCart!='x'){
        const findCart = await Cart.findById(cart[i]._id)
        await findCart.productList.splice(getIndexCart, 1)
        findCart.save()
      }
    }


    const category = await Category.findById(product.categoryID)
    await category.products.splice(category.products.indexOf(productID), 1)
    category.save()
    product.deleteOne({_id : productID})
    const getProducts = await Product.find({}).populate('categoryID')
    const products = getProducts.reverse()
    return res.status(201).json({products})
  }
  } catch (error) {
    console.log(error)
  }

}

const updateProduct = async (req, res, next)=>{
  const { productID } = req.params
  const newProduct = req.body
  const product = await Product.findById(productID)
  const category = await Category.findById(product.categoryID)
  //find old category of product , delete product
  await category.products.splice(category.products.indexOf(productID),1)
  category.save()
  const newCategory = await Category.findById(newProduct.categoryID)
  newCategory.products.push(productID)
  newCategory.save()

  await Product.findByIdAndUpdate(productID, newProduct)
  
  const getProducts = await Product.find({}).populate('categoryID')
  const products = getProducts.reverse()
  return res.status(201).json({products})

}

const getAll = async (req, res, next)=>{
  const getProducts = await Product.find({}).populate('categoryID')
  const products = getProducts.reverse()
  return res.status(200).json({products})
}

const getProduct = async (req, res, next) => {
  const { productID } = req.params
  const product = await Product.findById(productID)
  return res.status(200).json({product})
}


module.exports = {
  createProduct,
  deleteProduct,
  getAll,
  getProduct,
  updateProduct
}