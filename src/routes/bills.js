import express from "express";
import { create, update, get, getAll, remove } from "../controllers/bills";
import authenticate from "../middlewares/authenticate";

const router = express.Router();

router.get("/bills", getAll);
router.get("/bills/:id", get);
router.post("/bills", authenticate, create);
router.patch("/bills/:id", authenticate, update);
router.delete("/bills/:id", authenticate, remove);

export default router;