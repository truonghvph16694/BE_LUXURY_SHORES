import express from "express";
import { create, update, get, getAll, remove } from "../controllers/order-detail";
import { authenticate } from "../middlewares/authenticate";

const router = express.Router();

router.get("/order-detail", getAll);
router.get("/order-detail/:id", get);
router.post("/order-detail", authenticate, create);
router.patch("/order-detail/:id", authenticate, update);
router.delete("/order-detail/:id", authenticate, remove);

export default router;