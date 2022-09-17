import { Router } from "express";
import * as Controller from "./controller";

const characterRouter = Router();

characterRouter.route("/").get(Controller.findAll);
characterRouter.route("/").post(Controller.create);
characterRouter.route("/update/:id").put(Controller.update);
characterRouter.route("/delete/:id").delete(Controller.remove);
characterRouter.route("/detail/:id").get(Controller.detail);

export default characterRouter;