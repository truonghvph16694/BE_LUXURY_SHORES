import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const product_image_Schema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Types.ObjectId,
      // type: Number,
      required: true,
      ref: "Product",
    },
    path: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
product_image_Schema.plugin(mongoosePaginate);

export default mongoose.model("Product_image", product_image_Schema);
