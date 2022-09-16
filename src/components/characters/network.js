import { Router } from "express";
import * as Controller from "./controller";

const characterRouter = Router();

characterRouter.route("/").get(Controller.findAll);
characterRouter.route("/").post(Controller.create);

export default characterRouter;