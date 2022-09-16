import { Router } from "express";
import * as Controller from "./controller";

const movieRouter = Router();

movieRouter.route("/").get(Controller.findAll);
movieRouter.route("/").post(Controller.create);

export default movieRouter;