const express = require("express");
const router = require("express-promise-router")();
const CategoryController = require("../controllers/category");

router.route("/").get(CategoryController.getAll);
router.route("/:categoryID").get(CategoryController.getCategory);
router.route("/product/:categoryID").get(CategoryController.getProductCategory);
module.exports = router;
