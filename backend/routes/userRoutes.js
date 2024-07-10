import express, { Router } from "express"
import userController from "../controllers/userController.js"

const userRouter = express.Router();

userRouter.post("/register",userController.RegisterUser);
userRouter.post("/login",userController.LoginUser);

export default userRouter
