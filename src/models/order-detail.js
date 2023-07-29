
import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const order_detail_Schema = new mongoose.Schema(
    {
        product_entry_id:{
            type: mongoose.Types.ObjectId,
            ref: "Product_Entry"
        },
        order_id:{
            type: mongoose.Types.ObjectId,
            ref: "Orders"
        },
        price:{
            type: Number,
            required: true
        },
        quantity:{
            type: Number,
            required: true
        }

    },
    {
        timestamps: true, versionKey: false
    }
);
order_detail_Schema.plugin(mongoosePaginate);

export default mongoose.model("Order_detail",order_detail_Schema);