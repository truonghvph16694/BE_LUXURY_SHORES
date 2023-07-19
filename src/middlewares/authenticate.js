import jwt from 'jsonwebtoken'
import User from '../models/user'

const authenticate = async (req, res, next) => {
    try {
        let accessToken = req.headers.authorization
        accessToken = accessToken.split(" ")[1]

        if (!accessToken) {
            throw new Error("Bạn chưa đăng nhập");
        }

        const {_id} = jwt.verify(accessToken, process.env.SECRET_KEY)
        const user = await User.findById(_id)
        if(!user || user.type !== "admin"){
            throw new Error("Bạn không có quyền truy cập tài nguyên này");
        }

        next()
    } catch(err) {
        res.status(500).send({
            message: err.message || "Token không hợp lệ"
        })
    }
}

export default authenticate