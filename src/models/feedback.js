import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const feedbackSchema = new mongoose.Schema(
  {
    order_id: {
      type: mongoose.Types.ObjectId,
      //   require: true,
      ref: "Orders",
    },
    user_id: {
      type: mongoose.Types.ObjectId,
      // type: String,
      ref: "User",
    },
    product_id: {
      type: mongoose.Types.ObjectId,
      //   require: true,
      ref: "Product",
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
feedbackSchema.plugin(mongoosePaginate);

export default mongoose.model("Feedback", feedbackSchema);
