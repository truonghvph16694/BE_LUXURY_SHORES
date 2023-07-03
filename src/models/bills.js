
import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const billSchema = new mongoose.Schema(
    {
        user_id:{
            type: mongoose.Types.ObjectId,
            // type: Number,
            required: true,
            ref: "User"
        },
        code:{
            type: Number,  
            required: true,
        },
        VAT:{
            type: Number,
            required: true,
        },
        total_price:{
            type: Number,
             required: true
        },
        order_id:{
            // type: Number,
            type: mongoose.Types.ObjectId,
            required: true,
            ref: "Orders"
        }
    },
    {
        timestamps: true, versionKey: false
    }
);
billSchema.plugin(mongoosePaginate);

export default mongoose.model("Bills",billSchema);