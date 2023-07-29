import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
    },
    isDeleteable: {
        type: Boolean,
        default: true
    },
    products: [{ type: mongoose.Types.ObjectId, ref: "Product" }]
}, { timestamps: true });

categorySchema.plugin(mongoosePaginate);

export default mongoose.model("Category", categorySchema);