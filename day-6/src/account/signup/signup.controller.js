import { UserModel } from "./signup.model.js";

export const signupUser = async (req, res) => {
  try {
    const payload = req.body;
    const user = new UserModel(payload);
    const response = await user.save();
    res.send({ message: "User signup successful" });
  } catch (err) {
    console.log("Err: ", err);
    res.send({ message: "User signup failed" });
  }
};
