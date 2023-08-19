import { boolean } from "joi";
import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const product_entrySchema = new mongoose.Schema(
  {
    sizeId: {
      type: mongoose.Types.ObjectId,
      ref: "Product_size",
    },
    // colorId: {
    //     type: mongoose.Types.ObjectId,
    //     ref: "Product_color",
    // },
    quantity: {
      type: Number,
      require: true,
    },
    productId: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
    },
  },
  { timestamps: true, versionKey: false }
);
product_entrySchema.plugin(mongoosePaginate);

export default mongoose.model("Product_entry", product_entrySchema);
