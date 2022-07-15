import express from "express";
import { UserController } from "../controller/UserController";


export const userRouter = express.Router();

const userController = new UserController();

userRouter.post("/signup", userController.signup); //app.post("/user/signup")
userRouter.post("/login", userController.login); //app.post("/user/login")
//userRouter.post("", userController.findUser) //app.post("/user")

//router fala pro app que eh localhost:3003/user/...>

