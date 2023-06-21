import  express  from "express";
import { create, get, getAll, update } from "../controllers/feedback";


const router = express.Router();


router.post("/feedback" , create);
router.get("/feedback" , getAll);
router.get("/feedback/:id" , get);
router.patch("/feedback/:id" , update);

export default router;
    