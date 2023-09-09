import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const orderSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Types.ObjectId,
      // type: String,
      ref: "User",
    },
    product: {
      type: [],
      require: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    province_id: {
      type: String,
      required: true,
    },
    district_id: {
      type: String,
      required: true,
    },
    ward_id: {
      type: String,
      reuired: true,
    },
    detail_address: {
      type: String,
      required: true,
    },
    note: {
      type: String,
    },
    status: {
      type: Number,
      required: true,
      default: 0,
    },
    status_payment: {
      type: Number,
      required: true,
      default: 0,
    },
    ships: {
      type: Number,
      required: true,
      default: 30000,
    },
    created_at: {
      type: Date,
      requred: true,
      default: Date.now,
    },
    total_price: {
      type: Number,
      required: true,
    },
    payment: {
      type: Number,
      reuired: true,
      default: 0,
    },
    tm_codeorder: {
      type: String,
      require: true,
      // default: "A1111",
    },
    linkpay: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
orderSchema.plugin(mongoosePaginate);

export default mongoose.model("Orders", orderSchema);
