import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

export const uploadMulter = (req, res, next) => {

    cloudinary.config({
        cloud_name: 'datn2023',
        api_key: '599889761454191',
        api_secret: 'KxapOdFY80vXtK4K7rMjFcWBEnA'
    });

    const storage = new CloudinaryStorage({
        cloudinary: cloudinary,
        params: {
            folder: "images",
            format: "png",
            public_id: "some_unique_id",
        },
    });

    const upload = multer({ storage: storage });
    req.files = upload.array("images", 10);
    next();
};