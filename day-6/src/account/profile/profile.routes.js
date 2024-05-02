import Express from "express";
import { getUserDetails } from "./profile.controller.js";

const profileRouter = Express.Router();

profileRouter.get("/", getUserDetails);

export default profileRouter;
