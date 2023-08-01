import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const feedbackSchema = new mongoose.Schema(
    {
        Order_detail_id:{
            type: Number,
            require: true,
        },
        title: {
            type: String,
            require: true,
        },
        content: {
            type: String,
            required: true,
        },
        vote: {
            type: String,
            require: true
        },
        status: {
            type: Boolean,
            require: false,
        }
    }, { timestamps: true });
feedbackSchema.plugin(mongoosePaginate);

export default mongoose.model("Feedback", feedbackSchema);