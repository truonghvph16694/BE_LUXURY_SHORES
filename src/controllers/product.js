import dotenv from "dotenv";
import joi from "joi";
import Product from "../models/product";
import Category from "../models/category";
import product_entry from "../models/product_entry";
// import Category from "../models/category";

dotenv.config();
const productSchema = joi.object({
    name: joi.string().required(),
    description: joi.string().required(),
    categoryId: joi.string().required(),
    price: joi.number().required(),
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
        const products = await Product.aggregate([
            {
                $lookup: {
                    from: 'product_entries',
                    localField: '_id',
                    foreignField: 'productId',
                    as: 'product_entries',
                },
            },{
                $unwind: '$product_entries', // Tách các phần tử trong mảng product_entries thành các documents độc lập
            },
            {
                $lookup: {
                    from: 'product_colors',
                    localField: 'product_entries.colorId',
                    foreignField: '_id',
                    as: 'product_entries.product_colors',
                },
            },
            {
                $unwind: '$product_entries.product_colors', // (Optional) Tách màu trong mảng product_entries.color thành các documents độc lập
            },
            {
                $lookup: {
                    from: 'product_sizes',
                    localField: 'product_entries.sizeId',
                    foreignField: '_id',
                    as: 'product_entries.product_sizes',
                },
            },
            {
                $unwind: '$product_entries.product_sizes', // (Optional) Tách màu trong mảng product_entries.color thành các documents độc lập
            },
            {
                $group: {
                    _id: '$_id',
                    name: { $first: '$name' }, // Giữ lại trường name trong kết quả
                    description: { $first: '$description' },
                    price: { $first: '$price' },
                    image: { $first: '$image' },
                    // Thêm các fields khác vào nếu cần
                    product_entries: {
                        $push: '$product_entries', // Gom lại các documents product_entries thành một mảng
                    },
                },
            },
      
            
        ]);
        console.log(products)
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
// export const get = async function (req, res) {
//     try {
//         const product = await Product.findById(req.params.id).populate("categoryId");
//         if (!product) {
//             return res.json({
//                 message: "Không có sản phẩm nào",
//             });
//         }
//         return res.json(product);
//     } catch (error) {
//         return res.status(400).json({
//             message: error,
//         });
//     }
// };
export const get = async function (req, res) {
    try {
        const product = await Product.findById(req.params.id)
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
        // const { error } = productSchema.validate(req.body);
        // if (error) {
        //     return res.status(400).json({
        //         message: error.details[0].message,
        //     });
        // }
        const data = req.body;
        const product = await Product.create({ name: data.name, description: data.description, categoryId: data.categoryId, price:data.price, image: data.image });
        // them nhieu product_entry
        data.product_entrys.map((item) => {
            product_entry.create({ productId: product._id, colorId: item.colorId, sizeId: item.sizeId , quantity: item.quantity });
        });
        if (!product) {
            return res.json({
                message: "Không thêm sản phẩm",
            });
        }
        await Category.findByIdAndUpdate(product.categoryId, {
            $addToSet: {
                products: product._id,
            },
        });

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
// export const update = async function (req, res) {
//     try {
//         const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         if (!product) {
//             return res.json({
//                 message: "Cập nhật sản phẩm không thành công",
//             });
//         }
//         return res.json({
//             message: "Cập nhật sản phẩm thành công",
//             data: product,
//         });
//     } catch (error) {
//         return res.status(400).json({
//             message: error,
//         });
//     }
// };

// export const remove = async function (req, res) {
//     try {
//         const product = await Product.findByIdAndDelete(req.params.id);
//         return res.json({
//             message: "Xóa sản phẩm thành công",
//             product,
//         });
//     } catch (error) {
//         return res.status(400).json({
//             message: error,
//         });
//     }
// };
export const update = async function (req, res) {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
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
        const product = await Product.findByIdAndDelete(req.params.id);
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
