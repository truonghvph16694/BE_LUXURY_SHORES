import mongoosePaginate from "mongoose-paginate-v2";
import mongoose, {ObjectId} from "mongoose";


const cartSchema = new mongoose.Schema({
    products:  {
        type: [],
        require: true
    }, 
    userID: {
        type: ObjectId,
        ref: "User"
    },

}, { timestamps: true });

cartSchema.plugin(mongoosePaginate);

export default mongoose.model("Cart", cartSchema);