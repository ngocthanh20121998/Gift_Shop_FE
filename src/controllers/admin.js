const Order = require("../models/Order");
const Product = require("../models/Product");

const statisticProduct = async (req, res, next) => {
  const products = new Array();
  const newProducts = new Array();
  var index = 'x'
  const getOrders = await Order.find({status: {$ne: '609f9df356749319d461dafa'}})
  for(var i = 0 ; i <getOrders.length; i++){
    for(var j = 0 ; j <getOrders[i].productList.length; j++){
      products.push(getOrders[i].productList[j])
    }
  }
  newProducts.push(products[0])
  for ( var i = 1; i < products.length; i++ ) {
    for ( var j = 0; j < newProducts.length; j ++){
      if(newProducts[j].product.equals(products[i].product)){
        index = j
      }
    }
    if(index=='x'){
      newProducts.push(products[i]) 
    } 
    else {
      newProducts[index].quantity+=products[i].quantity
      index='x'
    }
  }
  var indexArray = new Array()
  if(newProducts.length ==0){
    res.status(200).json({message: 'Chưa có đơn hàng nào'})

  } else{
    if(newProducts.length <= 5){
      indexArray = newProducts
    }else{
      while(indexArray.length<5){
        var max = 0;
        var index;
        for(var i = 0; i < newProducts.length; i++) {
          if(newProducts[i].quantity > max) {
            max = newProducts[i].quantity
            index = i
          }
        }
        indexArray.push(newProducts[index])
        newProducts.splice(index , 1)
      }
    }

  } 

  const statistic = new Array()
  const quantity = new Array()
  for(var i = 0; i< indexArray.length; i++ ) {
    statistic.push( await Product.findById(indexArray[i].product))
    quantity.push(indexArray[i].quantity)
  }

  res.status(200).json({statistic, quantity})

};

const revenue = async (req, res, next) => {
  const { value } = req.params
  var getOrders; 
  var product = 0;
  var total = 0;
  if(value=='all'){
    getOrders = await Order.find({status: {$ne: '609f9df356749319d461dafa'}});
  }else{
    const date = Date.now()
    const date1 = date-(60*60*24*1000)*value
    getOrders = await Order.find({
        status: {$ne: '609f9df356749319d461dafa'}, 
        date : 
            {
                $lte : date,
                $gte : date1
            }
      });
  }

    for(var i = 0 ; i <getOrders.length; i++){
      for( var j = 0; j < getOrders[i].productList.length; j++){
        product += getOrders[i].productList[j].quantity
      }
      total += getOrders[i].total
    }
  res.status(200).json({product, total})
}

module.exports = {
  statisticProduct,
  revenue
};
