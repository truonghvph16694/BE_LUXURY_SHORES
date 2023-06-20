
import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const orderSchema = new mongoose.Schema(
    {
        user_id: {
            type: Number,
            required: true
        },
        province_id:{
            type: String,
            required: true
        },
        district_id: {
            type: String,
            required: true
        },
        ward_id: {
            type: String,
            reuired: true
        },
        detail_address:{
            type: String,
            required: true
        },
        fullname: {
            type: String,
            required: true
        },
        note: {
            type: String
        },
        status: {
            type: Number,
            required: true
        },
        ships:{
            type: Number,
            required: true,
            default: 20000
        },
        created_at:{
            type: Date,
            requred: true,
            default: Date.now
        },
        finish_date:{
            type: Date,
            required: true,
            default: Date.now
        },
        total_price: {
            type: Number,
            required: true
        },
        payment:{
            type: Number,
            reuired: true,
            default: 0
        }
    },
    {
        timestamps: true, versionKey: false
    }
);
orderSchema.plugin(mongoosePaginate);

export default mongoose.model("Orders",orderSchema);