import Joi from "joi";
import dotenv from "dotenv";
import slugify from 'slugify';
import Feedback from '../models/feedback';

dotenv.config();
const feedbackSchema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    vote: Joi.string().required(),
});

export const getAll = async (req, res) => {
    try {
        const feedback = await Feedback.find();
        if (feedback.length === 0) {
            return res.json({
                message: "Không có Feedback nào",
            });
        }
        return res.json(feedback);
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};


export const create = async function (req, res) {
    try {
        const body = req.body;
        console.log(body);
        const { error } = feedbackSchema.validate(body);
        console.log(error);
        if (error) {
            return res.status(400).json({
                message: error.details[0].message,
            });
        }
        const feedback = await Feedback.create(req.body);
        console.log(feedback);
        if (!feedback) {
            return res.json({
                message: "Không thêm được feedback",
            });
        }
        return res.json({
            message: "Thêm feedback thành công",
            data: feedback,

        });

    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};