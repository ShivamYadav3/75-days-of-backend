import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const jwtPassword = process.env.jwtPassword;

export const generateToken = () => {
  const token = jwt.sign({ id: profile.id }, jwtPassword);
  return token;
};

export const verifyToken = (authorization) => {
  return jwt.verify(authorization, jwtPassword);
};
