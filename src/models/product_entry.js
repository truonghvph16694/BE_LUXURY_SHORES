import { boolean } from "joi";
import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const product_entrySchema = new mongoose.Schema(
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
        price: {
            type: Number,
            require: true
        },
        quantity: {
            type: Number,
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
product_entrySchema.plugin(mongoosePaginate);

export default mongoose.model("Product_entry", product_entrySchema);
