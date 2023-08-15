import express from "express";
import {
  add,
  get,
  getAll,
  getCartUser,
  remove,
  update,
} from "../controllers/cart";

const router = express.Router();

router.post("/carts", add);
router.get("/carts", getAll);
router.get("/carts/user/:user_id", getCartUser);
router.get("/carts/:id", get);
router.patch("/carts/:id", update);
router.delete("/carts/:id", remove);

export default router;
