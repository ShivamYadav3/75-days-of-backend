import { app, initServer } from "./server.js";
import todoRouter from "./src/features/todos/todos.routes.js";
import express from "express";

app.use(express.json());

initServer();
app.use("/", todoRouter);
