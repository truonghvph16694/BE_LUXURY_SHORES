import  express  from "express";
import { create, get, getAll } from "../controllers/feedback";


const router = express.Router();


router.post("/feedback" , create);
router.get("/feedback" , getAll);
router.get("/feedback/:id" , get);

export default router;
    