import Category from '../models/category'
import Joi from "joi";
import dotenv from "dotenv";
import slugify from 'slugify';

dotenv.config();
const categorySchema = Joi.object({
    name: Joi.string().required(),
});

export const getAll = async (req, res) => {
    try {
        const categories = await Category.find();
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
        const category = await Category.findById(req.params.id)  //.populate("products");
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
        const order = await Category.create(req.body);
        console.log(order);
        if (!order) {
            return res.json({
                message: "Không thêm được danh mục",
            });
        }
        return res.json({
            message: "Thêm danh mục thành công",
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
        const category2 = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        console.log(category2);
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