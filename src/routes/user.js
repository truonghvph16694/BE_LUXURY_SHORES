import { Router } from "express";
import { Create, Get, GetAll, remove, update } from "../controllers/user.js";

const router = Router();

// router.post("/signup", signup);
// router.post("/signin", signin);
router.get("/User", GetAll);
router.get("/User/:id", Get);
router.post("/User",Create)
router.put("/User/:id", update);
router.delete("/User/:id", remove);
export default router;