import { boolean } from "joi";
import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const product_sizeSchema = new mongoose.Schema(
    {
        // id: {
    
        // },
        value: {
            type: String,
            require: true
        },
        // categoryId: {
        //     type: mongoose.Types.ObjectId,
        //     ref: "category",
        // },
    },
    { timestamps: true, versionKey: false }
);
product_sizeSchema.plugin(mongoosePaginate);

export default mongoose.model("Product_size", product_sizeSchema);
