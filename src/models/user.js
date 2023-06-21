import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
        },
        phone: {
            type: Number, 
            required: true
        }
        ,
        role: {
            type: String,
            default: "member",
        },
        gender: {
            type: String,
            default: "male",
        },
        status: {
            type: String,

        }
    },
    { timestamps: true, versionKey: false }
);

export default mongoose.model("User", userSchema);