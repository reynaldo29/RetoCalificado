import { Router } from "express";
import * as Controller from "./controller";
import { auth } from '../middlewares/auths.js'

const genderRouter = Router();
genderRouter.route("/").get(auth,Controller.findAll);
genderRouter.route("/").post(auth,Controller.create);
export default genderRouter;