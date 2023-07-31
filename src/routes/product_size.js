import express from "express";
import { create, getAll, get, remove, update } from "../controllers/product_sizes";

const router = express.Router();
router.get("/products_size", getAll);
router.get("/products_size/:id", get);
router.post("/products_size",create);
router.patch("/products_size/:id", update);
router.delete("/products_size/:id", remove);

export default router;