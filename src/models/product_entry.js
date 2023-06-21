import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = new mongoose.Schema(
    {
        product_id: {
    
        },
        size: {
            type: Number
        },
        color: {
            type: String
        },
        price: {
            type: String
        },
        quantity: {
            type: Number
        },
        status: {
            type: String
        },

        // categoryId: {
        //     type: mongoose.Types.ObjectId,
        //     ref: "category",
        // },
    },
    { timestamps: true, versionKey: false }
);
productSchema.plugin(mongoosePaginate);

export default mongoose.model("Product_entry", productSchema);
