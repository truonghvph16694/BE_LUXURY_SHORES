import express from "express";
import { create, update, get, getAll } from "../controllers/orders";

const router = express.Router();

router.get("/orders", getAll);
router.get("/orders/:id", get);
router.post("/orders", create);
router.patch("/orders/:id", update);

export default router;