import express from "express";
import { create, getAll, get, remove, update } from "../controllers/product_sizes";
import { authenticate } from "../middlewares/authenticate";

const router = express.Router();
router.get("/products_size", authenticate, getAll);
router.get("/products_size/:id", authenticate, get);
router.post("/products_size", authenticate, create);
router.patch("/products_size/:id", authenticate, update);
router.delete("/products_size/:id", authenticate, remove);

export default router;