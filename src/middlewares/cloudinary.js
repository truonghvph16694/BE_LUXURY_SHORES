import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

export const uploadMulter = (req, res, next) => {
    cloudinary.config({
        cloud_name: "ecommercer2021",
        api_key: "626155946999554",
        api_secret: "7VZ2gYWaR0ZWKGfd55uBPIjEnso",
    });

    const storage = new CloudinaryStorage({
        cloudinary: cloudinary,
        params: {
            folder: "WE17301",
            format: "png",
            public_id: "some_unique_id",
        },
    });

    const upload = multer({ storage: storage });
    req.files = upload.array("images", 10);
    next();
};