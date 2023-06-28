import express from "express";
import { create, update, get, getAll, remove } from "../controllers/product_category";

const router = express.Router();

router.get("/product-category", getAll);
router.get("/product-category/:id", get);
router.post("/product-category", create);
router.patch("/product-category/:id", update);
router.delete("/product-category/:id", remove);

export default router;