import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const orderSchema = new mongoose.Schema(
    {
        user_id: {
            type: Number,
            // required: true
        },
        fullname: {
            type: String,
            // required: true
        },
        email: {
            type: String,
            // required: true
        },
        phoneNumber: {
            type: String,
            // required: true
        },
        address: {
            type: String,
            // required: true
        },
        note: {
            type: String
        },
        order_date: {
            type: Date,
            default: Date.now
        },
        status: {
            type: Number,
            // required: true
        },
        total_money: {
            type: Number,
            // required: true
        }
    },
    {
        timestamps: true, versionKey: false
    }
);
orderSchema.plugin(mongoosePaginate);

export default mongoose.model("Orders",orderSchema);