import Express from "express";
import { signinUser } from "./signin.contoller.js";

const signinRouter = Express.Router();

signinRouter.post("/", signinUser);

export default signinRouter;
