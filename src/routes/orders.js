import express from "express";
import { create, update, get, getAll } from "../controllers/orders";
import { authenticate } from "../middlewares/authenticate";

const router = express.Router();

router.get("/orders",  getAll);
router.get("/orders/:id",  get);
router.post("/orders", authenticate, create);
router.patch("/orders/:id", authenticate, update);

export default router;