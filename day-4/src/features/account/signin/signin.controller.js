import { loginSuccessMessage } from "../../../../constant/messages/loginMessages.js";
import { profile } from "../../../../constant/users/data.js";
import { createResponse } from "../../../../utiltities/response handler/todosResponse.js";
import { generateToken } from "../../../services/JWT/token.js";

export const signInUser = (req, res) => {
  const userToken = generateToken(profile);
  const expirationTime = new Date(Date.now() + 5 * 60 * 1000);
  res.cookie("user", userToken, { expires: expirationTime });
  const response = createResponse({ ...profile }, loginSuccessMessage);
  return res.status(200).send(response);
};
