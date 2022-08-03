const express = require("express");
const router = require("express-promise-router")();
const ProductController = require("../controllers/product");

router.route("/:productID").get(ProductController.getProduct);
router.route("/").get(ProductController.getAll);
module.exports = router;
