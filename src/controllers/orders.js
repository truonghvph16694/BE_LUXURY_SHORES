import dotenv from 'dotenv';
import Joi from 'joi';
import Orders from '../models/orders';

dotenv.config();


const orderSchema = Joi.object({
    // user_id: Joi.number().required(),
    province_id: Joi.string().required(),
    district_id: Joi.string().required(),
    ward_id: Joi.string().required(),
    detail_address: Joi.string().required(),
    fullname: Joi.string().required(),
    note: Joi.string().required(),
    ships: Joi.number(),
    status: Joi.number().required(),
    finish_date: Joi.date(),
    create_at: Joi.date(),
    total_price: Joi.number().required()
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
        const orders = await Orders.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'user_id',
                    foreignField: '_id',
                    as: 'user',
                },
            }, {
                $unwind: {
                    path: '$user',
                    preserveNullAndEmptyArrays:true
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
        const { error } = orderSchema.validate(req.body);
        
        if (error) {
            return res.status(400).json({
                message: error.details[0].message,
            });
        }
        const order = await Orders.create(req.body);
        // console.log(order);
        if (!order) {
            return res.json({
                message: "Không thể thêm đơn hàng",
            });
        }
        return res.json({
            message: "Thêm đơn hàng thành công",
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

