import { Schema, model } from "mongoose";

const userSchema = Schema(
  {
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
  },
  { timestamps: true }
);

export const UserModel = model("users", userSchema);
