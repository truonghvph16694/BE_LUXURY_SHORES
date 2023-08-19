import express from "express";
import { create, update, get, getAll, remove } from "../controllers/product_category";
import { authenticate } from "../middlewares/authenticate";

const router = express.Router();

router.get("/product-category", authenticate, getAll);
router.get("/product-category/:id", authenticate, get);
router.post("/product-category", authenticate, create);
router.patch("/product-category/:id", authenticate, update);
router.delete("/product-category/:id", authenticate, remove);

export default router;