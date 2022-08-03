const OrderStatus = require("../models/OrderStatus");

const createOrderStatus = async (req, res, next) => {
  const status = new OrderStatus(req.body)
  await status.save()
  return res.status(200).json({ status });

}

const getAllOrderStatus= async (req, res, next) => {
  const status = await OrderStatus.find({})

  return res.status(200).json({ status });

}

module.exports = {
  getAllOrderStatus,
  createOrderStatus
};
