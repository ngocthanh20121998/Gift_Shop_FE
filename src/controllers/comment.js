const Comment = require("../models/Comment");

const createComment = async (req, res, next) => {
  const comment = new Comment(req.body);
  await comment.save();
  return res.status(200).json({ message: "Bình luận của bạn đã được gởi!" });
};

const getAllComment = async (req, res, next) => {
  const getComments = await Comment.find({})  
    .populate("userID")
    .populate("productID");

    const comments = getComments.reverse()
  return res.status(200).json({ comments });
};

const getCommentOfProduct = async (req, res, next) => {
  const {productID} = req.params;
  const getComments = await Comment.find({productID: productID,status: true})
  .populate("userID")
  .populate("productID");
  
  const comments = getComments.reverse()
  return res.status(200).json({ comments });
};

const updateCommentStatus = async (req, res, next) => {
  const { commentID } = req.params;
  const status = req.body;
  await Comment.findByIdAndUpdate(commentID, status);

  const getComments = await Comment.find({})
  .populate("userID")
  .populate("productID");
  const comments = getComments.reverse()
  return res.status(200).json({ comments });
};

const deleteComment = async (req, res, next) => {
  const {commentID} = req.params
  await Comment.deleteOne({_id: commentID})
  const getComments = await Comment.find({})
  .populate("userID")
  .populate("productID");
  const comments = getComments.reverse()
  return res.status(200).json({ comments });
}
module.exports = {
  createComment,
  deleteComment,
  getAllComment,
  getCommentOfProduct,
  updateCommentStatus
};
