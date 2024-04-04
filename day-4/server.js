import express from "express";
import cookieParser from "cookie-parser";
export const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cookieParser());

export const initServer = () => {
  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });
};

export const router = express.Router();
