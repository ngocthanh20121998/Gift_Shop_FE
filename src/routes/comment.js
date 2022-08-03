const express = require("express");
const router = require("express-promise-router")();
const CommentController = require("../controllers/Comment");

router
  .route("/")
  .post(CommentController.createComment);

router.route("/:productID").get(CommentController.getCommentOfProduct)

module.exports = router;
