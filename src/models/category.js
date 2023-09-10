import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";
import mongoosePaginate from "mongoose-paginate-v2";

const plugins = [mongoosePaginate, mongooseDelete];

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    isDeleteable: {
      type: Boolean,
      default: true,
    },
    products: [{ type: mongoose.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true, versionKey: false }
);

categorySchema.pre("findOneAndDelete", async function (next) {
  try {
    const Product = mongoose.model("Product");
    const filter = this.getFilter();
    const categoryId = this.getQuery().$set && this.getQuery().$set.categoryId;

    // Kiểm tra xem categoryId có phải là ObjectId hợp lệ không
    const isValidObjectId = mongoose.Types.ObjectId.isValid(categoryId);

    // Tạo ObjectId hoặc sử dụng giá trị mặc định
    // const updatedCategoryId = isValidObjectId
    //   ? new mongoose.Types.ObjectId(categoryId)
    //   : new mongoose.Types.ObjectId("64fdb2450c693e0b94798fb7");
    const Category = mongoose.model("Category");
    // check xem có category là Uncategory chưa, chưa có thì tạo mới
    const category = await Category.findOneAndUpdate(
      { name: "Uncategory" },
      { name: "Uncategory" }
    );
    const update = {
      categoryId: category._id,
    };
    // chuyển tất cả product thành uncategory
    await Product.updateMany({ categoryId: filter._id }, update);
    next();
  } catch (err) {
    next(err);
  }
});
plugins.forEach((plugin) => {
  categorySchema.plugin(plugin);
});

module.exports = mongoose.model("Category", categorySchema);
