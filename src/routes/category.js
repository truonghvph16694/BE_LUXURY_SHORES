import  express  from "express";

import { create } from "../controllers/category";
const router = express.Router();
router.post("/category" , create);

// module.exports = router;
export default router;
    