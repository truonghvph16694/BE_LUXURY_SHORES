import { boolean } from "joi";
import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const product_colorSchema = new mongoose.Schema(
    {
        value: {
            type: String,
            require: true
        },
    },
    { timestamps: true, versionKey: false }
);
product_colorSchema.plugin(mongoosePaginate);

export default mongoose.model("Product_color", product_colorSchema);
