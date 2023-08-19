import  express  from "express";

import { create, get, getAll, getProductsByCategory, remove, removeProductFromCategory, update } from "../controllers/category";
import { authenticate } from "../middlewares/authenticate";
const router = express.Router();

router.get("/category", authenticate, getAll);
router.get("/category/:id", authenticate, get);
router.get('/category/:id/products', authenticate, getProductsByCategory);
router.post("/category" , authenticate, create);
router.delete("/category/:id", authenticate, remove);
router.put("/category/:id", authenticate, update);
router.delete('/category/:id/products/', authenticate, removeProductFromCategory);
export default router;
    