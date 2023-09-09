import dotenv from "dotenv";
import joi from "joi";
import Product from "../models/product";
import Category from "../models/category";
import product_entry from "../models/product_entry";
import product_image from "../models/product_image";
const mongoose = require("mongoose");
// import Category from "../models/category";

dotenv.config();
const productSchema = joi.object({
  name: joi.string().required(),
  description: joi.string().required(),
  categoryId: joi.string().required(),
  price: joi.number().required(),
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
    const products = await Product.aggregate([
      {
        $lookup: {
          from: "product_entries",
          localField: "_id",
          foreignField: "productId",
          as: "product_entries",
        },
      },
      // {
      //   $unwind: "$product_entries", // Tách các phần tử trong mảng product_entries thành các documents độc lập
      // },
      // {
      //   $lookup: {
      //     from: "product_sizes",
      //     localField: "product_entries.sizeId",
      //     foreignField: "_id",
      //     as: "product_entries.product_sizes",
      //   },
      // },
      {
        $lookup: {
          from: "product_images",
          localField: "_id",
          foreignField: "productId",
          as: "product_images",
        },
      },
      // {
      //     $unwind: '$product_entries.product_sizes', // (Optional) Tách màu trong mảng product_entries.color thành các documents độc lập
      // },
      // {
      //     $group: {
      //         _id: '$_id',
      //         name: { $first: '$name' }, // Giữ lại trường name trong kết quả
      //         description: { $first: '$description' },
      //         price: { $first: '$price' },
      //         image: { $first: '$image' },
      //         // Thêm các fields khác vào nếu cần
      //         product_entries: {
      //             $push: '$product_entries', // Gom lại các documents product_entries thành một mảng
      //         },
      //     },
      // },
    ]);
    console.log(products);
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
  console.log(req.params.id);
  try {
    const product = await Product.aggregate([
      // Your existing aggregation stages
      {
        $lookup: {
          from: "product_entries",
          localField: "_id",
          foreignField: "productId",
          as: "product_entries",
        },
      },
      {
        $lookup: {
          from: "product_images",
          localField: "_id",
          foreignField: "productId",
          as: "product_images",
        },
      },

      // {
      //   $unwind: "$product_entries", // Tách các phần tử trong mảng product_entries thành các documents độc lập
      // },
      // {
      //   $lookup: {
      //     from: "product_sizes",
      //     localField: "product_entries.sizeId",
      //     foreignField: "_id",
      //     as: "product_entries.product_sizes",
      //   },
      // },
      // {
      //   $unwind: "$product_entries.product_sizes", // (Optional) Tách màu trong mảng product_entries.color thành các documents độc lập
      // },
      // {
      //   $group: {
      //     _id: "$_id",
      //     name: { $first: "$name" }, // Giữ lại trường name trong kết quả
      //     description: { $first: "$description" },
      //     price: { $first: "$price" },
      //     image: { $first: "$image" },
      //     // Thêm các fields khác vào nếu cần
      //     product_entries: {
      //       $push: "$product_entries", // Gom lại các documents product_entries thành một mảng
      //     },
      //     product_entries: {
      //       $push: "$product_entries", // Gom lại các documents product_entries thành một mảng
      //     },
      //   },
      // },
      {
        $unwind: "$product_entries", // Tách các phần tử trong mảng product_entries thành các documents độc lập
      },
      {
        $lookup: {
          from: "product_sizes",
          localField: "product_entries.sizeId",
          foreignField: "_id",
          as: "product_entries.product_sizes",
        },
      },
      {
        $unwind: "$product_entries.product_sizes", // Tách size trong mảng product_entries.product_sizes thành các documents độc lập
      },

      {
        $group: {
          _id: "$_id",
          name: { $first: "$name" }, // Giữ lại trường name trong kết quả
          description: { $first: "$description" },
          price: { $first: "$price" },
          // image: { $first: "$image" },
          // Thêm các fields khác vào nếu cần
          product_entries: {
            $push: "$product_entries", // Gom lại các documents product_entries thành một mảng
          },
          product_images: {
            $push: "$product_images", // Gom lại các documents product_images thành một mảng
          },
        },
      },

      {
        $match: {
          _id: new mongoose.Types.ObjectId(req.params.id), // Create an ObjectId instance with 'new'
        },
      },
    ]);
    console.log(product);
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
  // try {
  // const { error } = productSchema.validate(req.body);
  // if (error) {
  //     return res.status(400).json({
  //         message: error.details[0].message,
  //     });
  // }

  const data = req.body;
  const product = await Product.create({
    name: data.name,
    description: data.description,
    categoryId: data.categoryId,
    price: data.price,
  });

  // lưu thuộc tính product_entry
  if (data.product_entrys) {
    data.product_entrys.map((item) => {
      product_entry.create({
        productId: product._id,
        sizeId: item.sizeId,
        quantity: item.quantity,
      });
    });
  }
  if (data.uploads) {
    data.uploads.map((item) => {
      product_image.create({
        productId: product._id,
        path: item,
      });
    });
  }

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
  // } catch (error) {
  //     return res.status(400).json({
  //         message: error,
  //     });
  // }
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
    const data = req.body;
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!product) {
      return res.json({
        message: "Cập nhật sản phẩm không thành công",
      });
    }
    // xoá hết product entry
    product_entry.deleteMany({ productId: product._id });

    // lưu thuộc tính product_entry
    if (data.product_entrys) {
      data.product_entrys.map((item) => {
        product_entry.create({
          productId: product._id,
          sizeId: item.sizeId,
          quantity: item.quantity,
        });
      });
    }
    // xoá hết ảnh cũ
    await product_image.deleteMany({ productId: product._id });

    if (data.uploads) {
      data.uploads.map((item) => {
        product_image.create({
          productId: product._id,
          path: item,
        });
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

export const getEdit = async function (req, res) {
  try {
    const product = await Product.aggregate([
      {
        $lookup: {
          from: "product_entries",
          localField: "_id",
          foreignField: "productId",
          as: "product_entries",
        },
      },
      {
        $lookup: {
          from: "product_images",
          localField: "_id",
          foreignField: "productId",
          as: "product_images",
        },
      },
      {
        $match: {
          _id: new mongoose.Types.ObjectId(req.params.id), // Create an ObjectId instance with 'new'
        },
      },
    ]);
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

export const countProduct = async function (req, res) {
  try {
    const product = await Product.aggregate([
      {
        $lookup: {
          from: "product_entries",
          localField: "_id",
          foreignField: "productId",
          as: "product_entries",
        },
      },
      {
        $lookup: {
          from: "product_images",
          localField: "_id",
          foreignField: "productId",
          as: "product_images",
        },
      },
      {
        $match: {
          _id: new mongoose.Types.ObjectId(req.params.id), // Create an ObjectId instance with 'new'
        },
      },
    ]);
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
