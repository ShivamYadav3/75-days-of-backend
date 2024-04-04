import { profile } from "../../../../constant/users/data.js";
import { generateToken } from "../../../services/JWT/token.js";

export const signInUser = (req, res) => {
  const { email, password } = req.body;
  if (email !== profile.email || password !== profile.password) {
    return res
      .status(401)
      .send({ data: {}, meta: { message: "Your credentials are invalid" } });
  }

  const userToken = generateToken();
  return res.status(200).send({
    data: {
      token: userToken,
    },
    meta: { message: "You're logged in" },
  });
};
