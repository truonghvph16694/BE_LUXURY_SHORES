import express from "express";
import { create, getAll, get, remove, update, getEdit } from "../controllers/product";
// import { authenticate } from "../middlewares/authenticate";

const router = express.Router();

router.get("/products", getAll);
router.get("/products/:id", get);
router.get("/products-edit/:id", getEdit);
router.post("/products", create)
router.put("/products/:id", update);
router.delete("/products/:id", remove);

export default router;      