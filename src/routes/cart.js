const express = require("express");
const router = require("express-promise-router")();
const CartController = require("../controllers/cart");

router.route("/")
  .post(CartController.createCart)
  
router
  .route("/:userID")
  .get(CartController.getCartOfUser);

router
  .route("/:cartID")
  .patch(CartController.updateCart)
  .get(CartController.getCart)

module.exports = router;
