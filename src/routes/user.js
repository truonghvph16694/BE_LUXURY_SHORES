import { Router } from "express";
import {  Get, GetAll, editStatus, update } from "../controllers/user.js";
import express from "express";
import { signin,signup } from "../controllers/user";
import authenticate from "../middlewares/authenticate.js";

const router = express.Router();

router.post("/auth/signup", signup);
router.post("/auth/signin", signin);
router.get("/User", GetAll);
router.get("/User/:id", Get);
router.put("/User/:id", update);
router.put("/User/status/:id", editStatus);
export default router;