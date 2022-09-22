import { Router } from "express";
import * as Controller from "./controller";
import { auth } from '../middlewares/auths.js'
const characterRouter = Router();

characterRouter.route("/").get(auth,Controller.findAll);
characterRouter.route("/").post(auth,Controller.create);
characterRouter.route("/update/:id").put(auth,Controller.update);
characterRouter.route("/delete/:id").delete(auth,Controller.remove);
characterRouter.route("/detail/:id").get(auth,Controller.detail);

export default characterRouter;