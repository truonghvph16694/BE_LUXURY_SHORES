import express from "express";
import { create, getAll, get, remove, update } from "../controllers/product";
import { authenticate } from "../middlewares/authenticate";

const router = express.Router();

router.get("/products", authenticate, getAll);
router.get("/products/:id", authenticate, get);
router.post("/products", authenticate, create)
router.patch("/products/:id", authenticate, update);
router.delete("/products/:id", authenticate, remove);

export default router;      