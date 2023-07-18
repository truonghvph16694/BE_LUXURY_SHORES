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


























// export const signup = async (req, res) => {
//     try {
//         const body = req.body;
//         const { error } = signupSchema.validate(body, { abortEarly: false });
//         if (error) {
//             return res.status(400).json({
//                 message: error.details.map((err) => err.message),
//             });
//         }
//         //kiểm tra emai đã có chưa
//         const userExist = await User.findOne({ email: body.email });
//         if (userExist) {
//             return res.status(400).json({
//                 message: "Email đã tồn tại",
//             });
//         }
//         //Mã hóa mật khẩu
//         const hashedpassword = await bcript.hash(body.password, 10);
//         if (!hashedpassword) {
//             return res.status(400).json({
//                 message: "Sai mật khẩu",
//             });
//         }
//         const user = await User.create({
//             name: body.name,
//             email: body.email,
//             password: hashedpassword,
//         });
//         const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
//             expiresIn: "1m",
//         });
//         return res.status(200).json({
//             message: "Đăng ký thành công",
//             accessToken: token,
//             user: user,
//         });
//     } catch (error) {
//         res.status(400).send({
//             message: error.message,
//         });
//     }
// };

// export const signin = async (req, res) => {
//     try {
//         const body = req.body;
//         const { error } = signinSchema.validate(body, { abortEarly: false });
//         if (error) {
//             return res.status(400).send({
//                 message: error.details.map((err) => err.message),
//             });
//         }
//         const user = await User.findOne({ email: body.email });
//         if (!user) {
//             return res.status(400).send({
//                 message: "Tai khoan khong ton tai",
//             });
//         }
//         const isMatch = await bcript.compare(body.password, user.password);
//         if (!isMatch) {
//             return res.status(400).send({
//                 message: "Mat khau sai",
//             });
//         }
//         const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
//         return res.status(200).send({
//             message: "Đăng nhập thành công",
//             accessToken: token,
//             user,
//         });
//     } catch (error) {
//         res.status(400).send({
//             message: "Loi dang nhap",
//         });
//     }
// };

// export const logout = async (req, res, next) => {
//     try {
//         req.session.destroy((err) => {
//             if (err) {
//                 return next(err);
//             } else {
//                 return res.redirect("/");
//             }
//         });
//     } catch (error) {}
// };