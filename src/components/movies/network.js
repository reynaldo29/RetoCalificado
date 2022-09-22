import { Router } from "express";
import * as Controller from "./controller";
import { auth } from '../middlewares/auths.js'
const movieRouter = Router();

movieRouter.route("/").get(auth,Controller.findAll);
movieRouter.route("/").post(auth,Controller.create);
movieRouter.route("/update/:id").put(auth,Controller.update);
movieRouter.route("/delete/:id").delete(auth,Controller.remove);
movieRouter.route("/detail/:id").get(auth,Controller.detail);
export default movieRouter;