import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import {v2 as cloudinary} from 'cloudinary';

export const uploadMulter = (req, res, next) => {
          
    cloudinary.config({ 
      cloud_name: 'dpwvvocuk', 
      api_key: '479213657589177', 
      api_secret: 'enUF5so3eD_zwIyMrnzEVcrmnwI' 
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