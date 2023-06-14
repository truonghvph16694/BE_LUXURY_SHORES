import mongoose from "mongoose";
const CategorySchema = mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        maxLength:32
    }
},{timeStamps: true});

module.exports = mongoose.model("Category", CategorySchema);