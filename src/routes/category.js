import  express  from "express";

import { create, get, getAll, remove, update } from "../controllers/category";
import authenticate from "../middlewares/authenticate";

const router = express.Router();

router.get("/category", getAll);
router.get("/category/:id", get);
router.post("/category" , authenticate, create);
router.delete("/category/:id", authenticate, remove);
router.patch("/category/:id", authenticate, update);
export default router;
    