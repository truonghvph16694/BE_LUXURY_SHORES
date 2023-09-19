import Joi from "joi";
import dotenv from "dotenv";
import slugify from "slugify";
import Feedback from "../models/feedback";
import Order from "../models/orders";

dotenv.config();
const feedbackSchema = Joi.object({
  content: Joi.string().required(),
});

export const getAll = async (req, res) => {
  try {
    const feedback = await Feedback.aggregate([
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
          from: "orders",
          localField: "order_id",
          foreignField: "_id",
          as: "order",
        },
      },
    ]);
    if (feedback.length === 0) {
      return res.json({
        message: "Không có Feedback nào",
      });
    }
    return res.json(feedback);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const get = async function (req, res) {
  try {
    const feedback = await Feedback.findById(req.params.id); //.populate("products");
    if (!feedback) {
      return res.json({
        message: "Không có feedback nào",
      });
    }
    return res.json(feedback);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
export const create = async function (req, res) {
  try {
    const body = req.body;
    console.log(body);
    const { error } = feedbackSchema.validate(body);

    const orderItem = await Order.findById(body.order_id);
    if (!orderItem) {
      return res.json({
        message: "Không thêm được feedback",
      });
    }
    let products = orderItem.product;

    products.map((item, index) => {
      if (item.product_entry_Id == body.product_entry_id) {
        products[index].is_feedback = 1;
        products[index].feedback_content = body.content;
      }
    });
    await Order.updateOne({ _id: body.order_id }, { product: products });
    // console.log(error);
    // if (error) {
    //   return res.status(400).json({
    //     message: error.details[0].message,
    //   });
    // }
    const feedback = await Feedback.create(body);
    console.log(feedback);
    if (!feedback) {
      return res.json({
        message: "Không thêm được feedback",
      });
    }
    return res.json({
      message: "Thêm feedback thành công",
      data: feedback,
      status: 200,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
export const editStatus = async function (req, res) {
  try {
    const feedback = await Feedback.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!feedback) {
      return res.json({
        message: "Cập nhật status không thành công",
      });
    }
    return res.json({
      message: "Cập nhật status thành công",
      data: feedback,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
export const update = async function (req, res) {
  try {
    const feedback = await Feedback.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!feedback) {
      return res.json({
        message: "Cập nhật Feedback không thành công",
      });
    }
    return res.json({
      message: "Cập nhật Feedback thành công",
      feedback,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
export const remove = async function (req, res) {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);
    return res.json({
      message: "Xóa feedback thành công",
      feedback,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
