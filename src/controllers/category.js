const Category = require("../models/Category");
const Product = require("../models/Product");

const createCategory = async (req, res, next) => {
  const { categoryName, categoryLink } = req.body;

  const foundCategory = await Category.findOne({ categoryName });
  if (foundCategory)
    return res.status(401).json({ error: { message: "Danh mục đã tồn tại!" } });
  const newCategory = new Category({ categoryName, categoryLink });
  await newCategory.save();

  const getCategories = await Category.find({});
  const categories = getCategories.reverse();
  return res.status(201).json({ categories });
};

const deleteCategory = async (req, res, next) => {
  const { categoryID } = req.params;

  const product = await Product.find({ categoryID: categoryID });
  if (product!='') {
    return res
      .status(201)
      .json({
        message: "Xóa danh mục thất bại! Đã có sản phẩm trong danh mục.",
      });
  } else {
    await Category.deleteOne({ _id: categoryID });

    const getCategories = await Category.find({});
    const categories = getCategories.reverse();
    return res.status(201).json({ categories });
  }
};

const getAll = async (req, res, next) => {
  const getCategories = await Category.find({}).populate("products");
  const categories = getCategories.reverse();
  return res.status(200).json({ categories });
};

const getCategory = async (req, res, next) => {
  const { categoryID } = req.params;

  const category = await Category.findOne({
    categoryLink: categoryID,
  }).populate("products");

  return res.status(200).json({ category });
};
const getProductCategory = async (req, res, next) => {
  const { categoryID } = req.params;

  const category = await Category.findById({ _id: categoryID }).populate(
    "products"
  );

  return res.status(200).json({ category });
};

module.exports = {
  createCategory,
  deleteCategory,
  getAll,
  getCategory,
  getProductCategory,
};
