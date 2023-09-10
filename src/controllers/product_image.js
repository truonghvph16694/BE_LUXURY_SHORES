import dotenv from "dotenv";
import Joi from "joi";
import Product_image from "../models/product_image";

dotenv.config();

const images_Schema = Joi.object({
  // product_entry_id: Joi.number().required(),
  // path: Joi.string().required()
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
    const images = await Product_image.paginate({}, options);
    if (images.length === 0) {
      return res.json({
        message: "Không có ảnh nào",
      });
    }
    return res.json(images);
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

export const get = async function (req, res) {
  try {
    const image = await Product_image.findById(req.params.id);
    if (!image) {
      return res.json({
        message: "Không có ảnh nào",
      });
    }
    return res.json(image);
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

export const create = async function (req, res) {
  try {
    const { error } = images_Schema.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }
    const image = await Product_image.create(req.body);
    // // console.log(bills);
    if (!image) {
      return res.json({
        message: "Không thể thêm ảnh",
      });
    }
    return res.json({
      message: "Thêm ảnh thành công",
      data: image,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

export const update = async function (req, res) {
  try {
    const image = await Product_image.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!image) {
      return res.json({
        message: "Cập nhật ảnh không thành công",
      });
    }
    return res.json({
      message: "Cập nhật ảnh thành công",
      data: image,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

export const remove = async function (req, res) {
  try {
    const image = await Product_image.findByIdAndDelete(req.params.id);
    if (!image) {
      return res.json({
        message: "Ảnh không tồn tại",
      });
    }
    return res.json({
      message: "Xóa ảnh thành công",
      image,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
