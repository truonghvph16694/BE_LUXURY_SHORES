import dotenv from "dotenv";
import Joi from "joi";
import Orders from "../models/orders";
import Cart from "../models/cart";
import ProducEntry from "../models/product_entry";
dotenv.config();

const orderSchema = Joi.object({
  // user_id: Joi.string().required(),
  fullName: Joi.string().required(),
  phone: Joi.string().required(),
  province_id: Joi.number().required(),
  district_id: Joi.number().required(),
  ward_id: Joi.number().required(),
  detail_address: Joi.string().required(),
  note: Joi.string(),
  // ships: Joi.number(),
  // status: Joi.number().required(),
  // status_payment: Joi.number(). required(),
  // create_at: Joi.date(),
  total_price: Joi.number().required(),
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
    const orders = await Orders.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: {
          path: "$user",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "order_details",
          localField: "_id",
          foreignField: "order_id",
          as: "detail",
        },
      },
    ]);
    if (orders.length === 0) {
      return res.json({
        message: "Không có đơn đặt hàng nào",
      });
    }
    return res.json(orders);
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

export const get = async function (req, res) {
  try {
    const order = await Orders.findById(req.params.id);
    if (!order) {
      return res.json({
        message: "Không có đơn đặt hàng nào",
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
  // try {
  const body = req.body;
  // console.log("object", req.body);
  const { error } = orderSchema.validate(body);

  // if (error) {
  //   return res.status(400).json({
  //     message: error.details[0].message,
  //   });
  // }
  const order = await Orders.create(body);

  body.product.map(async (entry) => {
    // Giảm quantity đi
    const productIdToUpdate = entry.product_entry_Id; // ID của sản phẩm cần cập nhật
    const decrementAmount = entry.quantity; // Số lượng giảm
    await ProducEntry.updateOne(
      { _id: productIdToUpdate },
      { $inc: { quantity: -decrementAmount } } // Sử dụng $inc để giảm giá trị
    );
  });
  // console.log(order);
  if (!order) {
    return res.json({
      message: "Không thể thêm đơn hàng",
    });
  }

  // await Cart.deleteMany({ userId: body.user_id }).exec();

  return res.json({
    message: "Thêm đơn hàng thành công",
    data: order,
    status: 200,
  });
  // } catch (error) {
  //   return res.status(400).json({
  //     message: error,
  //   });
  // }
};

export const update = async function (req, res) {
  try {
    const order = await Orders.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (req.body.status == 4) {
      order.product.map(async (entry) => {
        // Giảm quantity đi
        const productIdToUpdate = entry.product_entry_Id; // ID của sản phẩm cần cập nhật
        const decrementAmount = entry.quantity; // Số lượng giảm
        console.log("productIdToUpdate", productIdToUpdate, decrementAmount);
        await ProducEntry.updateOne(
          { _id: productIdToUpdate },
          { $inc: { quantity: +decrementAmount } } // Sử dụng $inc để giảm giá trị
        );
      });
    }
    if (!order) {
      return res.json({
        message: "Cập nhật đơn hàng không thành công",
      });
    }
    return res.json({
      message: "Cập nhật đơn hàng thành công",
      data: order,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
