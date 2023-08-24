import dotenv from "dotenv";
import Joi from "joi";
import orderDetail from "../models/order-detail";

dotenv.config();

const order_detail_Schema = Joi.object({
  // product_entry_id: Joi.number().required(),
  // order_id: Joi.number().required(),
  price: Joi.number().required(),
  quantity: Joi.number().required(),
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
    const order = await orderDetail.aggregate([
      {
        $lookup: {
          from: "product_entries",
          localField: "product_entry_id",
          foreignField: "_id",
          as: "product_entries",
        },
      },
      {
        $unwind: {
          path: "$user",
          preserveNullAndEmptyArrays: true,
        },
      },
    ]);
    if (order.length === 0) {
      return res.json({
        message: "Không có sản phẩm nào",
      });
    }
    return res.json(order);
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

export const get = async function (req, res) {
  try {
    const order = await orderDetail.findById(req.params.id);
    if (!order) {
      return res.json({
        message: "Không có sản phẩm nào",
      });
    }
    return res.json(order);
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

export const create = async function (req, res) {
  try {
    const { error } = order_detail_Schema.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }
    const order = await orderDetail.create(req.body);
    // console.log(order);
    if (!order) {
      return res.json({
        message: "Không thể thêm sản phẩm",
      });
    }
    return res.json({
      message: "Thêm sản phẩm thành công",
      data: order,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

export const update = async function (req, res) {
  try {
    const order = await orderDetail.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!order) {
      return res.json({
        message: "Cập nhật sản phẩm không thành công",
      });
    }
    return res.json({
      message: "Cập nhật sản phẩm thành công",
      data: order,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

export const remove = async function (req, res) {
  try {
    const order = await orderDetail.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.json({
        message: "Sản phẩm không tồn tại",
      });
    }
    return res.json({
      message: "Xóa sản phẩm thành công",
      order,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
