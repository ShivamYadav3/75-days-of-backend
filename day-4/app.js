import { app, initServer } from "./server.js";
import todoRouter from "./src/features/todos/todos.routes.js";
import profileRouter from "./src/account/profile/profile.routes.js";
import signInUser from "./src/account/signin/signin.routes.js";
import express from "express";

app.use(express.json());

initServer();
app.use("/", todoRouter);
app.use("/profile", profileRouter);
app.use("/signin", signInUser);
