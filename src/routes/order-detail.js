import express from "express";
import { create, update, get, getAll, remove } from "../controllers/order-detail";
import { authenticate } from "../middlewares/authenticate";

const router = express.Router();

router.get("/order-detail", authenticate, getAll);
router.get("/order-detail/:id", authenticate, get);
router.post("/order-detail", authenticate, create);
router.patch("/order-detail/:id", authenticate, update);
router.delete("/order-detail/:id", authenticate, remove);

export default router;