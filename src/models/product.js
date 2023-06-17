import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
            minLength: 3,
        },
        price: {
            type: Number,
        },

        discount: {
            type: Number
        },
        thumbnail: {
            type: Number
        },
        description: {
            type: String
        },
        created_at: {
            type: Date
        },
        updated_at: {
            type: Date
        },
        deleted: {
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

export default mongoose.model("Product", productSchema);
