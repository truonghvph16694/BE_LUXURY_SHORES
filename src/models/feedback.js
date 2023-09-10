import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const feedbackSchema = new mongoose.Schema(
    {
        Order_id:{
            type: mongoose.Types.ObjectId,
            require: true,
            ref: "orders"
        },
        user_id: {
            type: mongoose.Types.ObjectId,
            require: true,
            ref: "users"
        },
        product_id: {
            type: mongoose.Types.ObjectId,
            require: true,
            ref: "products"
        },
        content: {
            type: String,
            required: true,
        }
        
    }, { timestamps: true });
feedbackSchema.plugin(mongoosePaginate);

export default mongoose.model("Feedback", feedbackSchema);