import express from "express";
import { create, getAll, get, remove, update } from "../controllers/product";
// import { authenticate } from "../middlewares/authenticate";

const router = express.Router();

router.get("/products", getAll);
router.get("/products/:id", get);
router.post("/products", create)
router.patch("/products/:id", update);
router.delete("/products/:id", remove);

export default router;      