import Express from "express";
import { getOrdersList } from "./orders.controller.js";

const orderRouter = Express.Router();

orderRouter.get("/", getOrdersList);

export default orderRouter;
