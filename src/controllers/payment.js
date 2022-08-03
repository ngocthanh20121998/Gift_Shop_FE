const Payment = require("../models/Payment");

const createPayment = async (req, res, next) => {
  const payment = new Payment(req.body)
  await payment.save()
  return res.status(200).json({ payment });

}

const getAllPayment = async (req, res, next) => {
  const payments = await Payment.find({})

  return res.status(200).json({ payments });

}

module.exports = {
  getAllPayment,
  createPayment
};
