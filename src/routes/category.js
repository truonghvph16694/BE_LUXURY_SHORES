import  express  from "express";

import { create, get, getAll, remove, update } from "../controllers/category";
const router = express.Router();

router.get("/category", getAll);
router.get("/category/:id", get);
router.post("/category" , create);
router.delete("/category/:id", remove);
router.patch("/category/:id", update);
export default router;
    