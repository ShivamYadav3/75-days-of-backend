import { loginTimeOutMessage } from "../../../../constant/messages/loginMessages.js";
import { verifyToken } from "../../../services/JWT/token.js";

export const getProfileValidator = (req, res, next) => {
  const userCookie = req.cookies.user;
  const user = verifyToken(userCookie);
  if (!user) {
    return res.status(401).send(loginTimeOutMessage);
  }
  next();
};
