import { Router } from "express";
import jwtAuth from "../middleware/jwt.auth.js";
import { UserController } from "../controller/user.controller.js";

const userRoutes = Router();

const controller = new UserController();

userRoutes.post("/signup", controller.signup);
userRoutes.post("/login", controller.login);
userRoutes.get("/logout",jwtAuth,controller.logout);

export default userRoutes;