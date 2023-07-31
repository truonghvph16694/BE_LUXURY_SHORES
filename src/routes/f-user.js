import express from "express";
import { logout, signin,signup } from "../controllers/f-user";

const route = express.Router();

route.post("/auth/signup", signup);
route.post("/auth/signin", signin);
route.post("/auth/logout", logout);

export default route;