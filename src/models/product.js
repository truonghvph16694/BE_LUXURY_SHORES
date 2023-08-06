import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
            minLength: 3,
        },
        description: {
            type: String
        },
        price: {
            type: Number,
            require: true
        },
        // image: {type :String},
        // created_at: {
        //     type: Date
        // },
        // updated_at: {
        //     type: Date
        // },
        categoryId: {
            type: mongoose.Types.ObjectId,
            ref: "Category",
        },
    },
    { timestamps: true, versionKey: false }
);
productSchema.plugin(mongoosePaginate);

export default mongoose.model("Product", productSchema);
