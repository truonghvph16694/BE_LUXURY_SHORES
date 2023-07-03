import express from "express";
import { create, update, get, getAll, remove } from "../controllers/product_image";

const router = express.Router();

router.get("/product-images", getAll);
router.get("/product-images/:id", get);
router.post("/product-images", create);
router.patch("/product-images/:id", update);
router.delete("/product-images/:id", remove);

export default router;