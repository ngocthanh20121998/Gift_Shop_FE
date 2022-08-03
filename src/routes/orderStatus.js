const express = require("express");
const router = require("express-promise-router")();
const OrderStatusController = require("../controllers/orderStatus");

router
  .route("/")
  .get(OrderStatusController.getAllOrderStatus)
  .post(OrderStatusController.createOrderStatus);
module.exports = router;
