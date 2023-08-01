import { Router } from "express";
import { Create, Get, GetAll, editStatus, remove, update, signin, signup } from "../controllers/user.js";


const router = Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/User", GetAll);
router.get("/User/:id", Get);
router.post("/User",Create)
router.put("/User/:id", update);
router.delete("/User/:id", remove);
router.put("/User/status/:id", editStatus);
export default router;
