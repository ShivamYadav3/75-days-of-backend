import { verifyToken } from "../../services/JWT/token.js";

export const getUserDetails = (req, res) => {
  const { authorization } = req.headers;
  const user = verifyToken(authorization);
  return res.send({ message: authorization, user });
};
