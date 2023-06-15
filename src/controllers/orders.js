import dotenv from 'dotenv';
import Joi from 'joi';
import Orders from '../models/orders';

dotenv.config();


const orderSchema = Joi.object({
    user_id: Joi.number(),
    fullname: Joi.string(),
    email: Joi.string(),
    phoneNumber: Joi.string(),
    address: Joi.string(),
    note: Joi.string(),
    order_date: Joi.date(),
    status: Joi.number(),
    total_money: Joi.number()
});

export const getAll = async (req, res) => {
    const { _sort = "createAt", _order = "asc", _limit = 10, _page = 1 } = req.query;
    const options = {
        page: _page,
        limit: _limit,
        sort: {
            [_sort]: _order === "desc" ? -1 : 1,
        }, 
    };
    try {
        const orders = await Orders.paginate({}, options);
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
        const order = await Orders.findById(req.params.id)
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
    try {
        const body = req.body;
        console.log(body);
        const { error } = orderSchema.validate(body);
        
        if (error) {
            return res.status(400).json({
                message: error.details[0].message,
            });
        }
        const order = await Orders.create(req.body);
        console.log(order);
        // if (!order) {
        //     return res.json({
        //         message: "Không thể thêm đơn hàng",
        //     });
        // }
        // return res.json({
        //     message: "Thêm đơn hàng thành công",
        //     data: order,

        // });

    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};

export const update = async function (req, res) {
    try {
        const order = await Orders.findByIdAndUpdate(req.params.id, req.body, { new: true });
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

