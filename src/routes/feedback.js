import  express  from "express";
import { create, get, getAll, remove, update } from "../controllers/feedback";
import { authenticate } from "../middlewares/authenticate";


const router = express.Router();


router.post("/feedback" , authenticate, create);
router.get("/feedback" , authenticate, getAll);
router.get("/feedback/:id" , authenticate, get);
router.patch("/feedback/:id" , authenticate, update);
router.delete("/feedback/:id" , authenticate, remove);

export default router;
    