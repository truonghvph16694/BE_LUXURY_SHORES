import express from "express";
import { create, getAll, get, remove, update } from "../controllers/product_entry";
import { authenticate } from "../middlewares/authenticate";

const router = express.Router();
router.get("/products_entry", authenticate, getAll);
router.get("/products_entry/:id", authenticate, get);
router.post("/products_entry", authenticate, create);
router.patch("/products_entry/:id", authenticate, update);
router.delete("/products_entry/:id", authenticate, remove);

export default router;