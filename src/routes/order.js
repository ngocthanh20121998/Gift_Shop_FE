const express = require("express");
const router = require("express-promise-router")();
const OrderController = require("../controllers/Order");

router.route("/").post(OrderController.createOrder);

router.route("/:userID").get(OrderController.getOrderOfUser);

module.exports = router;
