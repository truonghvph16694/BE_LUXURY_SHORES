import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user";
dotenv.config();

export const authenticate = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.status(401).json({
                message: "Unauthorized 1",
            });
        }
        console.log(req, res, next);
        const token = req.headers.authorization.split(" ")[1];
        console.log('token', token);
        jwt.verify(token, process.env.SECRET_KEY, async (error, payload) => {
            if (error) {
                if (error.name === "JsonWebTokenError") {
                    return res.status(401).json({
                        message: "Token không hợp lệ",
                    });
                }
                if (error.name == "TokenExpiredError") {
                    return res.status(401).json({
                        message: "Token hết hạn",
                    });
                }
            }
            console.log(payload);
            const user = await User.findById(payload.id);
            console.log('user-log:', user);
            if (!user) {
                return res.status(401).json({
                    message: "Unauthorized 2",
                });
            }
            if (user.type !== "admin") {
                return res.status(401).json({
                    message: "Bạn không có quyền truy cập tài nguyên",
                });
            }

            req.user = user;
            next();
        });
    } catch (error) {}
};

