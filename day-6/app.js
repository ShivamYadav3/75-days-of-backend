import express from "express";
import { connect } from "mongoose";
import profileRouter from "./src/account/profile/profile.routes.js";
import signinRouter from "./src/account/signin/signin.routes.js";
import signupRouter from "./src/account/signup/signup.routes.js";
import orderRouter from "./src/orders/orders.routes.js";

const app = express();
const PORT = 6000;

app.use(express.json());

app.use("/signin", signinRouter);
app.use("/signup", signupRouter);
app.use("/profile", profileRouter);
app.use("/order", orderRouter);

(async () => {
  try {
    await connect("mongodb://127.0.0.1:27017/flipkart");
    console.log("MongoDB connection successful");
  } catch (err) {
    console.log("mongodb connection failed", err);
  }
})();

app.listen(PORT, () => {
  console.log(`The server is running at http://localhost:${PORT}`);
});
