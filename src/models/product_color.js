import { boolean } from "joi";
import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const product_colorSchema = new mongoose.Schema(
    {
        // product_id: {
    
        // },
        size: {
            type: String,
            require: true
        },
        color: {
            type: String,
            require: true
        },
        // status: {
        //     type: boolean,
        //     require: false
        // },

        // categoryId: {
        //     type: mongoose.Types.ObjectId,
        //     ref: "category",
        // },
    },
    { timestamps: true, versionKey: false }
);
product_colorSchema.plugin(mongoosePaginate);

export default mongoose.model("Product_color", product_colorSchema);
