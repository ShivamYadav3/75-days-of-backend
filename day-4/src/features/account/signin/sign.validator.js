import {
  invalidCredentialsMessage,
  signInMandatoryFieldsMessage,
} from "../../../../constant/messages/loginMessages";

export const signInValidator = (req, res, next) => {
  const { email, password } = req.body;
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
