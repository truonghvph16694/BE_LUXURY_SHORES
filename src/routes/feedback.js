import express from "express";
import { create, get, getAll, remove, update } from "../controllers/feedback";
import { authenticate } from "../middlewares/authenticate";

const router = express.Router();

router.post("/feedback", create);
router.get("/feedback", getAll);
router.get("/feedback/:id", get);
router.patch("/feedback/:id", update);
router.delete("/feedback/:id", authenticate, remove);

export default router;
