
import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const billSchema = new mongoose.Schema(
    {
        user_id:{
            type: mongoose.Types.ObjectId,
            ref: "User"
        },
        // code:{
        //     type: Number,  
        //     required: true,
        // },
        VAT:{
            type: Number,
            required: true,
        },
        total_price:{
            type: Number,
             required: true
        },
        order_id:{
            type: mongoose.Types.ObjectId,
            ref: "orders"
        }
    },
    {
        timestamps: true, versionKey: false
    }
);
billSchema.plugin(mongoosePaginate);

export default mongoose.model("Bills",billSchema);