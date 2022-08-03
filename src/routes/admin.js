const express = require("express");
const router = require("express-promise-router")();
const AdminController = require("../controllers/admin");
const UserController = require("../controllers/user");
const CategoryController = require("../controllers/category");
const ProductController = require("../controllers/product");
const ImageController = require("../controllers/image");
const OrderController = require("../controllers/Order");
const CommentController = require("../controllers/Comment");

router.route("/user").get(UserController.getAll);
router
  .route("/user/:userID")
  .delete(UserController.deleteUser)
  .put(UserController.updateStatus);

router
  .route("/category")
  .get(CategoryController.getAll)
  .post(CategoryController.createCategory);
router.route("/category/:categoryID").delete(CategoryController.deleteCategory);

router
  .route("/product")
  .post(ProductController.createProduct)
  .get(ProductController.getAll);
router
  .route("/product/:productID")
  .delete(ProductController.deleteProduct)
  .put(ProductController.updateProduct);
router.route("/product/image").post(ImageController.uploadImage);

router.route("/order").get(OrderController.getAllOrder);
router.route("/order/:orderID").patch(OrderController.updateStatusOrder);

router.route("/comment").get(CommentController.getAllComment);
router
  .route("/comment/:commentID")
  .patch(CommentController.updateCommentStatus)
  .delete(CommentController.deleteComment);

router.route("/statisticProduct").get(AdminController.statisticProduct);
router.route("/revenue/:value").get(AdminController.revenue)
module.exports = router;
