import dotenv from "dotenv";
import Joi from "joi";
import Bills from "../models/bills";

dotenv.config();

const bills_Schema = Joi.object({
  // user_id: Joi.number().required(),
  code: Joi.number().required(),
  VAT: Joi.number().required(),
  total_price: Joi.number().required(),
  order_id: Joi.number().required(),
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
    const bills = await Bills.paginate({}, options);
    if (bills.length === 0) {
      return res.json({
        message: "Không có hóa đơn nào",
      });
    }
    return res.json(bills);
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

export const get = async function (req, res) {
  try {
    const bills = await Bills.findById(req.params.id);
    if (!bills) {
      return res.json({
        message: "Không có hóa đơn nào",
      });
    }
    return res.json(bills);
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

export const create = async function (req, res) {
  try {
    const { error } = bills_Schema.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }
    const bills = await Bills.create(req.body);
    // // console.log(bills);
    if (!bills) {
      return res.json({
        message: "Không thể thêm hóa đơn",
      });
    }
    return res.json({
      message: "Thêm hóa đơn thành công",
      data: bills,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

export const update = async function (req, res) {
  try {
    const bills = await Bills.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!bills) {
      return res.json({
        message: "Cập nhật hóa đơn không thành công",
      });
    }
    return res.json({
      message: "Cập nhật hóa đơn thành công",
      data: bills,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

export const remove = async function (req, res) {
  try {
    const bills = await Bills.findByIdAndDelete(req.params.id);
    if (!bills) {
      return res.json({
        message: "Hóa đơn không tồn tại",
      });
    }
    return res.json({
      message: "Xóa hóa đơn thành công",
      bills,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
