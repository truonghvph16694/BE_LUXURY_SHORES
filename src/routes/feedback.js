import  express  from "express";
import { create } from "../controllers/feedback";


const router = express.Router();


router.post("/feedback" , create);

export default router;
    