import Express from "express";
import { signupUser } from "./signup.controller.js";

const signupRouter = Express.Router();

signupRouter.post("/", signupUser);

export default signupRouter;
