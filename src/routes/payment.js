const express = require("express");
const router = require("express-promise-router")();
const PaymentController = require("../controllers/payment");

router
  .route("/")
  .get(PaymentController.getAllPayment)
  .post(PaymentController.createPayment);
module.exports = router;
