import Category from '../models/category'
import Joi from "joi";

const categorySchema = Joi.object({
    name: Joi.string().required(),
});
// export const create = (req, res) => {
//     const category = new Category(req.body);
//     category.save((err, data) =>{
//         if(err){
//             return res.status(400).json({
//                 error: "Không thêm được danh mục"
//         })
//     }
//     res.json({data})
// })
// }

// export const create = async (req, res) => {
//     try {
//         const category = await new Category(req.body).save();
//         return res.json({
//             successCode: 200,
//             data: category,
//         });
//     } catch (error) {
//         return res.json({
//             errorCode: 400,
//             message: "Can't add category",
//         });
//     }
// };

export const create = async (req, res) => {
    try {
        const body = req.body  ;
        console.log(body);
        const { error } = categorySchema.validate(body);
        if (error) {
            const errors = error.details.map((errorItem) => errorItem.message);
            return res.status(400).json({
                message: errors,
            });
        }

        const data = await Category.create(body);
        if (!data) {
            return res.status(400).json({ message: "Thêm danh mục thất bại" });
        }
        return res.json({
            message: "Thêm danh mục thành công",
            data,
        });
    } catch (error) {
        return res.json({
            message: error.message,
        });
    }
};

