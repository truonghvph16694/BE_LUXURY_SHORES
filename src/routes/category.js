import  express  from "express";

import { create, get, getAll, getProductsByCategory, remove, removeProductFromCategory, update } from "../controllers/category";
const router = express.Router();

router.get("/category", getAll);
router.get("/category/:id", get);
router.get('/category/:id/products', getProductsByCategory);
router.post("/category" , create);
router.delete("/category/:id", remove);
router.put("/category/:id", update);
router.delete('/category/:id/products/', removeProductFromCategory);
export default router;
    