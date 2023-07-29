import User from "../models/user";
import dotenv from "dotenv";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { signinSchema, signupSchema } from "../schema/user";


dotenv.config();
const salt = bcrypt.genSaltSync(10);


export const signup = async (req, res) => {
    try {
        const body = req.body;
        const { error } = signupSchema.validate(body, { abortEarly: false });
        if (error) {
            return res.status(400).json({
                message: error.details.map((err) => err.message),
            });
        }
        //kiểm tra emai đã có chưa
        const userExist = await User.findOne({ email: body.email });
        if (userExist) {
            return res.status(400).json({
                message: "Email đã tồn tại",
            });
        }
        //Mã hóa mật khẩu
        const hashedpassword =  bcrypt.hashSync(body.password, salt);
        if (!hashedpassword) {
            return res.status(400).json({
                message: "Sai mật khẩu",
            });
        }
        const user = await User.create({
            fullname: body.fullname,
            email: body.email,
            password: hashedpassword,
            phone: body.phone
        });
        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
            expiresIn: "5m",
        });
        return res.status(200).json({
            message: "Đăng ký thành công",
            accessToken: token,
            user: user,
        });
    } catch (error) {
        res.status(400).send({
            message: error.message,
        });
    }
};


export const signin = async (req, res) => {
    try {
        const body = req.body;
        const { error } = signinSchema.validate(body, { abortEarly: false });
        if (error) {
            return res.status(400).send({
                message: error.details.map((err) => err.message),
            });
        }
        const user = await User.findOne({ email: body.email });
        if (!user) {
            return res.status(400).send({
                message: "Tài khoản không tồn tại",
            });
        }
        const isMatch =  bcrypt.compareSync(body.password, user.password);
        if (!isMatch) {
            return res.status(400).send({
                message: "Tài khoản hoặc mật khẩu sai",
            });
        }
        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {expiresIn: "5m"});
        return res.status(200).send({
            message: "Đăng nhập thành công",
            accessToken: token,
            user,
        });
    } catch (error) {
        res.status(400).send({
            message: "Lỗi đăng nhập",
        });
    }
};


export const logout = async (req, res, next) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                return next(err);
            } else {
                return res.redirect("/");
            }
        });
    } catch (error) {}
};