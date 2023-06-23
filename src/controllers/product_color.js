import dotenv from "dotenv";
import joi from "joi";
import Product_color from "../models/product_color";
// import Category from "../models/category";
// import Category from "../models/category";

dotenv.config();
const product_colorSchema = joi.object({
    value: joi.string().required(),
    // categoryId: joi.string().required(),
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
        const products = await Product_color.paginate({}, options);
        if (products.length === 0) {
            return res.json({
                message: "Không có sản phẩm nào",
            });
        }
        return res.json(products);
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};

export const get = async function (req, res) {
    try {
        const product = await Product_color.findById(req.params.id)
        if (!product) {
            return res.json({
                message: "Không có sản phẩm nào",
            });
        }
        return res.json(product);
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};
export const create = async function (req, res) {
    try {
        const { error } = product_colorSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: error.details[0].message,
            });
        }
        const product = await Product_color.create(req.body);
        if (!product) {
            return res.json({
                message: "Không thêm sản phẩm",
            });
        }
        // await Category.findByIdAndUpdate(product.categoryId, {
        //     $addToSet: {
        //         products: product._id,
        //     },
        // });

        return res.json({
            message: "Thêm sản phẩm thành công",
            data: product,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};
export const update = async function (req, res) {
    try {
        const product = await Product_color.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) {
            return res.json({
                message: "Cập nhật sản phẩm không thành công",
            });
        }
        return res.json({
            message: "Cập nhật sản phẩm thành công",
            data: product,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};

export const remove = async function (req, res) {
    try {
        const product = await Product_color.findByIdAndDelete(req.params.id);
        return res.json({
            message: "Xóa sản phẩm thành công",
            product,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};
