
// // import mongoose from "mongoose";
// // import mongoosePaginate from "mongoose-paginate-v2";

// const product_category_Schema = new mongoose.Schema(
//     {
//         product_id:{
//             type: mongoose.Types.ObjectId,
//              ref: "products"
//         },
//         category_id:{
//             type: mongoose.Types.ObjectId,
//             ref: "category"
//         }
//     },
//     {
//         timestamps: true, versionKey: false
//     }
// );
// product_category_Schema.plugin(mongoosePaginate);

// // export default mongoose.model("Product_category",product_category_Schema);