import { Router } from "express";
import * as Controller from "./controller";

const genderRouter = Router();
genderRouter.route("/").get(Controller.findAll);
genderRouter.route("/").post(Controller.create);
export default genderRouter;