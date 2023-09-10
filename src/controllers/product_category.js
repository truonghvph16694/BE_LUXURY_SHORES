import dotenv from "dotenv";
import Joi from "joi";
import Product_cate from "../models/product_category";

dotenv.config();

const product_cate_Schema = Joi.object({
  // product_id: Joi.number().required(),
  // category_id: Joi.number().required()
});

export const getAll = async (req, res) => {
  const {
    _sort = "createAt",
    _order = "asc",
    _limit = 10,
    _page = 1,
  } = req.query;
  const options = {
    page: _page,
    limit: _limit,
    sort: {
      [_sort]: _order === "desc" ? -1 : 1,
    },
  };
  try {
    const product_cates = await Product_cate.paginate({}, options);
    if (product_cates.length === 0) {
      return res.json({
        message: "Không có sản phẩm nào",
      });
    }
    return res.json(product_cates);
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

export const get = async function (req, res) {
  try {
    const product_cate = await Product_cate.findById(req.params.id);
    if (!product_cate) {
      return res.json({
        message: "Không có sản phẩm nào",
      });
    }
    return res.json(product_cate);
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

export const create = async function (req, res) {
  try {
    const { error } = product_cate_Schema.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }
    const product_cate = await Product_cate.create(req.body);
    // // console.log(bills);
    if (!product_cate) {
      return res.json({
        message: "Không thể thêm sản phẩm",
      });
    }
    return res.json({
      message: "Thêm sản phẩm thành công",
      data: product_cate,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

export const update = async function (req, res) {
  try {
    const product_cate = await Product_cate.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!product_cate) {
      return res.json({
        message: "Cập nhật sản phẩm không thành công",
      });
    }
    return res.json({
      message: "Cập nhật sản phẩm thành công",
      data: product_cate,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

export const remove = async function (req, res) {
  try {
    const product_cate = await Product_cate.findByIdAndDelete(req.params.id);
    if (!product_cate) {
      return res.json({
        message: "Sản phẩm không tồn tại",
      });
    }
    return res.json({
      message: "Xóa sản phẩm thành công",
      product_cate,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
