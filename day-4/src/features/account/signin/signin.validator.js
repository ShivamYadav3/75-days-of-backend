import {
  invalidCredentialsMessage,
  signInMandatoryFieldsMessage,
} from "../../../../constant/messages/loginMessages.js";
import { profile } from "../../../../constant/users/data.js";
import { verifyToken } from "../../../services/JWT/token.js";

export const signInValidator = (req, res, next) => {
  const { email, password } = req.body;
  // const userCookie = req.cookies.user;
  // const user = verifyToken(userCookie);
  // if (user) {
  //   next();
  //   return;
  // }
  if (!email || !password) {
    return res
      .status(401)
      .send({ data: null, meta: { message: signInMandatoryFieldsMessage } });
  }
  if (email !== profile.email || password !== profile.password) {
    return res
      .status(401)
      .send({ data: {}, meta: { message: invalidCredentialsMessage } });
  }
  next();
};
