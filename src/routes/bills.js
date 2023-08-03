import express from "express";
import { create, update, get, getAll, remove } from "../controllers/bills";
// import { authenticate } from "../middlewares/authenticate";

const router = express.Router();

router.get("/bills", getAll);
router.get("/bills/:id", get);
router.post("/bills",  create);
router.patch("/bills/:id",  update);
router.delete("/bills/:id",  remove);

export default router;