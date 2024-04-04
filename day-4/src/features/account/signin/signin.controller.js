import { loginSuccessMessage } from "../../../../constant/messages/loginMessages.js";
import { profile } from "../../../../constant/users/data.js";
import { generateToken } from "../../../services/JWT/token.js";

export const signInUser = (req, res) => {
  const userToken = generateToken(profile);
  res.cookie("token", userToken);
  return res.status(200).send({
    data: {
      // token: userToken,
    },
    meta: { message: loginSuccessMessage },
  });
};
