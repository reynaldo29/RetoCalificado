import { Router } from "express";
import * as Controller from "./controller";

const movieRouter = Router();

movieRouter.route("/").get(Controller.findAll);
movieRouter.route("/").post(Controller.create);
movieRouter.route("/update/:id").put(Controller.update);
movieRouter.route("/delete/:id").delete(Controller.remove);
movieRouter.route("/detail/:id").get(Controller.detail);
export default movieRouter;