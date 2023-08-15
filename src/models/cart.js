import mongoosePaginate from "mongoose-paginate-v2";
import mongoose, { ObjectId } from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    quantity: {
      type: Number,
      required: true,
    },
    // product_entry_Id: {
    //   type: ObjectId,
    //   ref: "Product_entry",
    // },
    product_entry_Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product_entry",
    },

    userId: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

cartSchema.plugin(mongoosePaginate);

export default mongoose.model("Cart", cartSchema);
