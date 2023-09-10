import Category from "../models/category";
import Joi from "joi";
import dotenv from "dotenv";
import slugify from "slugify";
import product from "../models/product";

dotenv.config();
const categorySchema = Joi.object({
  name: Joi.string().required(),
});
export const removeProductFromCategory = async (req, res) => {
  const categoryId = req.params.id;
  const productId = req.params.id.productId;
  // console.log("cateid", categoryId);
  // console.log("pid", productId);
  try {
    // Check if the category exists
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    // Check if the product exists
    const products = await product.find({ categoryId: categoryId });
    return products;
    // console.log("product", product);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Check if the product belongs to the specified category
    //   if (!product.category.equals(categoryId)) {
    //     return res.status(400).json({ error: 'Product does not belong to the category' });
    //   }

    // Remove the product from the category
    product.category = undefined;
    await product.save();

    res.json({ message: "Product removed from category successfully" });
  } catch (error) {
    // console.log("Failed to remove product from category", error);
    res.status(500).json({ error: "Failed to remove product from category" });
  }
};

export const getProductsByCategory = async (req, res) => {
  const categoryId = req.params.id;
  // console.log("idcate", categoryId);
  try {
    // Tìm danh mục dựa trên ID
    const category = await Category.findById(categoryId);
    // console.log("object", category);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    // Tìm các sản phẩm thuộc danh mục
    const products = await product.find({ categoryId: categoryId });
    // console.log("PR", products);
    res.json(products);
  } catch (error) {
    // console.log("Failed to fetch products", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

export const getAll = async (req, res) => {
  try {
    // const categories = await Category.find();
    const categories = await Category.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "categoryId",
          as: "products",
        },
      },
    ]);
    if (categories.length === 0) {
      return res.json({
        message: "Không có danh mục nào",
      });
    }
    return res.json(categories);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
export const get = async function (req, res) {
  try {
    const category = await Category.findById(req.params.id); //.populate("products");
    if (!category) {
      return res.json({
        message: "Không có danh mục nào",
      });
    }
    return res.json(category);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
export const readCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await _Categories.findOne({ _id: id });
    const product = await _Product
      .find({ categories: category })
      .select("-product")
      .exec();
    const series = await _ProductSeries
      .find({
        categories: category,
      })
      .select("-product-series")
      .exec();
    if (!category) {
      return res.json({
        errorCode: 404,
        message: "Category is not valid",
      });
    }
    return res.json({
      successCode: 200,
      data: category,
      product,
      series,
    });
  } catch (error) {
    return res.json({
      errorCode: 400,
      message: "Can't find category",
    });
  }
};

export const create = async function (req, res) {
  try {
    const body = req.body;
    // console.log(body);
    const { error } = categorySchema.validate(body);

    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }
    const category = await Category.create(req.body);
    // console.log(category);
    if (!category) {
      return res.json({
        message: "Không thêm được danh mục",
      });
    }
    return res.json({
      message: "Thêm danh mục thành công",
      data: category,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
export const update = async function (req, res) {
  try {
    const category2 = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    // console.log(category2);
    if (!category2) {
      return res.json({
        message: "Cập nhật danh mục không thành công",
      });
    }
    return res.json({
      message: "Cập nhật danh mục thành công",
      category2,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
export const remove = async function (req, res) {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    return res.json({
      message: "Xóa danh mục thành công",
      category,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
