import User from "../models/user";
import dotenv from "dotenv";
import joi from "joi";

dotenv.config();
const userSchema = joi.object({
    fullname: joi.string().required(),
    email: joi.string().required(),
    password: joi.string().required(),
    phone: joi.string().required(),
    email: joi.string().required(),
});
export const GetAll =  async (req, res) => {
    try {
        const users = await User.find();
        if (users.length === 0) {
            return res.json({
                message: "Không có User nào",
            });
        }
        return res.json(users);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
  }
  export const Get = async function (req, res) {
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            return res.json({
                message: "Không có sản phẩm nào",
            });
        }
        return res.json(user);
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};
export const Create = async (req,res) => {
    try {
        const body = req.body;
        console.log(body);
        const { error } = userSchema.validate(body);
        
        if (error) {
            return res.status(400).json({
                message: error.details[0].message,
            });
        }
        const user = await User.create(req.body);
        if (!user) {
            return res.json({
                message: "Không thêm được user",
            });
        }
        return res.json({
            message: "Thêm user thành công",
            data: user,

        });

    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
}
export const update = async function (req, res) {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            return res.json({
                message: "Cập nhật user không thành công",
            });
        }
        return res.json({
            message: "Cập nhật user thành công",
            data: user,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};
export const editStatus = async function (req, res) {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            return res.json({
                message: "Cập nhật status không thành công",
            });
        }
        return res.json({
            message: "Cập nhật status thành công",
            data: user,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};
export const remove = async function (req, res) {
    try {
        const user = await User.findOneAndDelete(req.params.id);
        console.log(user);
        return res.json({
            message: "Xóa user thành công",
            user,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};



