import { verifyToken } from "../../../services/JWT/token.js";

export const getUserDetails = (req, res) => {
  const userCookie = req.cookies.user;
  const user = verifyToken(userCookie);
  return res.send({ message: userCookie, user });
};
