// import mongoose, { Mongoose } from "mongoose";
import Cart from "../models/cart";
import dotenv from "dotenv";
// const mongoose = require('mongoose');
const mongoose = require("mongoose");
// const { ObjectId } = mongoose.Types;

dotenv.config();

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
    const cart = await Cart.paginate({}, options);
    if (cart.length === 0) {
      return res.json({
        message: "Không có hóa đơn nào",
      });
    }
    return res.json(cart);
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
export const getCartUser = async (req, res) => {
  // // console.log("req", req.params.user_id);
  try {
    // const exitsCart = await Cart.find({
    //   userId: req.params.user_id,
    // });
    // const userId = ObjectId(req.params.user_id);

    const result = await Cart.aggregate([
      {
        $lookup: {
          from: "product_entries", // Tên bảng kết hợp
          localField: "product_entry_Id",
          foreignField: "_id",
          as: "product_entry", // Tên cho mảng kết quả
        },
      },
      {
        $unwind: "$product_entry", // Giải phóng mảng đã kết hợp để sử dụng như một đối tượng
      },

      {
        $lookup: {
          from: "products", // Tên bảng kết hợp
          localField: "product_entry.productId",
          foreignField: "_id",
          as: "product", // Tên cho mảng kết quả
        },
      },
      {
        $unwind: "$product", // Giải phóng mảng đã kết hợp để sử dụng như một đối tượng
      },
      {
        $lookup: {
          from: "product_sizes", // Tên bảng kết hợp
          localField: "product_entry.sizeId",
          foreignField: "_id",
          as: "size", // Tên cho mảng kết quả
        },
      },
      {
        $unwind: "$size", // Giải phóng mảng đã kết hợp để sử dụng như một đối tượng
      },
      {
        $lookup: {
          from: "product_images", // Tên bảng kết hợp
          localField: "product_entry.productId",
          foreignField: "productId",
          as: "images", // Tên cho mảng kết quả
        },
      },
      {
        $unwind: "$images", // Giải phóng mảng đã kết hợp để sử dụng như một đối tượng
      },
      {
        $match: {
          userId: new mongoose.Types.ObjectId(req.params.user_id),
        },
      },
    ]);

    return res.json(result);
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
export const add = async (req, res) => {
  // try {
  // const { tm_codeorder } = req.body;
  // console.log("res", req.body);
  const request = req.body;

  const exitsCart = await Cart.findOne({
    userId: request.userId,
    product_entry_Id: request.product_entry_Id,
  });
  // console.log("exitsCart", exitsCart);
  if (exitsCart) {
    // cộng quantity thêm 1
    await Cart.updateOne(
      {
        userId: request.userId,
        product_entry_Id: request.product_entry_Id,
      },
      {
        $inc: { quantity: 1 }, // Tăng giá trị quantity lên 1
      }
    );
  } else {
    // const carts = await Cart(req.body).save();
    const cartEntry = new Cart(req.body);
    const savedCartEntry = await cartEntry.save();
  }
  res.json({
    code: 200,
    // carts,
  });
  // } catch (error) {
  //   res.status(400).json(error)
  // }
};
export const changeQuantity = async (req, res) => {
  // try {
  // const { tm_codeorder } = req.body;
  // console.log("res", req.body);
  const request = req.body;

  // const exitsCart = await Cart.findOne({
  //   _id: req.params.id,
  // });
  // // console.log("exitsCart", exitsCart);
  // if (exitsCart) {
  // cộng quantity thêm 1
  // await Cart.updateOne(
  //   {
  //     userId: request.userId,
  //     product_entry_Id: request.product_entry_Id,
  //   },
  //   {
  //     quantity: request.quantity,
  //   }
  // );
  const cart = await Cart.findByIdAndUpdate({ _id: req.params.id }, req.body);
  // }
  res.json({
    code: 200,
    cart,
  });
  // } catch (error) {
  //   res.status(400).json(error)
  // }
};
export const get = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userID: req.params.id }).exec();
    res.json(cart);
  } catch (error) {
    res.status(400).json(error);
  }
};
export const update = async (req, res) => {
  try {
    const cart = await Cart.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        returnDocument: "after",
      }
    ).exec();
    res.json(cart);
  } catch (error) {
    res.status(400).json(error);
  }
};
export const remove = async (req, res) => {
  try {
    const cart = await Cart.findByIdAndRemove({ _id: req.params.id }).exec();
    res.json(cart);
  } catch (error) {
    res.status(400).json(error);
  }
};
