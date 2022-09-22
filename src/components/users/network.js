import { Router } from "express";
import * as Controller from "./controller";
import { auth } from '../middlewares/auths.js'
const userRouter = Router();

userRouter.route("/").get(auth,Controller.findAll);
userRouter.route("/register").post(Controller.create);
userRouter.route("/login").post(Controller.login);

export default userRouter;
