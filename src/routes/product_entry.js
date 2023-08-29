import express from "express";
import {
  create,
  getAll,
  get,
  remove,
  update,
} from "../controllers/product_entry";
import { authenticate } from "../middlewares/authenticate";

const router = express.Router();
router.get("/products_entry", getAll);
router.get("/products_entry/:id", get);
router.post("/products_entry", create);
router.patch("/products_entry/:id", update);
router.delete("/products_entry/:id", remove);

export default router;
