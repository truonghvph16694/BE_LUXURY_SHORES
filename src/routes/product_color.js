import express from "express";
import { create, getAll, get, remove, update } from "../controllers/product_color";

const router = express.Router();
router.get("/products_color", getAll);
router.get("/products_color/:id", get);
router.post("/products_color",create);
router.patch("/products_color/:id", update);
router.delete("/products_color/:id", remove);

export default router;