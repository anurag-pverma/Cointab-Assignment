import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, require: true },
  passwordCount: { type: Number, default: 0 },
  loginTime: { type: String },
});

export const UserModel = mongoose.model("userDB", userSchema);



