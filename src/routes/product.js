import express from "express";
import { create, getAll, get, remove, update, getEdit } from "../controllers/product";
import { authenticate } from "../middlewares/authenticate";

const router = express.Router();

router.get("/products",  getAll);
router.get("/products/:id", get);
router.get("/products-edit/:id", authenticate, getEdit);
router.post("/products", authenticate, create)
router.put("/products/:id", authenticate, update);
router.delete("/products/:id", authenticate, remove);

export default router;      