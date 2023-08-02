import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            require:true
        },
        email: {
            type: String,
            unique: true,
            require: true,
        },
        password: {
            type: String,
            require: true,
            minlength: 6,
        },
        type: {
            type: String,
            enum: ["admin", "member"],
            default: "member",
        },
        status: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true, versionKey: false }
);

export default mongoose.model("User", userSchema);