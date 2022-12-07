  import Router  from "express";
 
  import * as dotenv from "dotenv";
  dotenv.config();


import  {UserModel } from "../Models/userScheme.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

export const userLogin = Router();

userLogin.post("/", async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });

  const hash = user?.password;

  bcrypt.compare(password, hash, async function (err, result) {
    if (err) {
      res.send({ message: "Something went wrong please" });
    }
    if (result === true) {
      const userData = {
        name: user.name,
        email: user.email,
      };
      const WrongCount = await UserModel.updateOne(
        { email },
        { $set: { passwordCount: 0 } }
      );
      let token = jwt.sign({ userId: user?._id }, process.env.SECRET_KEY);
      res.send({
        message: "Login successful",
        token: token,
        userData: userData,
      });
    } else {
      const updateCount = await UserModel.updateOne(
        { email },
        { $inc: { passwordCount: 1 } }
      );

      const updatedUser = await UserModel.findOne({ email });

      const wrongCount = updatedUser?.passwordCount;

      if (wrongCount > 4) {
        const lastLoginTime = await UserModel.updateOne(
          { email },
          { $set: { lastLoginTime: Date.now() } }
        );
        const usersLastLogin = await UserModel.findOne({ email });

        const lastTimeLogin = usersLastLogin?.passwordCount;

        res.send({
          message: "Can not attempt more than 5 times. Try after 24 hrs",
          wrongCount: wrongCount,
          lastTimeLogin: lastTimeLogin,
        });
      } else {
        res.send({
          message: "Something went wrong",
          wrongCount: wrongCount,
        });
      }
    }
  });
});

userLogin.patch("/countupdate", async (req, res) => {
  const { email } = req.body;

  const user = await UserModel.findOne({ email });

  if (user) {
    const WrongCount = await UserModel.updateOne(
      { email },
      { $set: { passwordCount: 0 } }
    );
    const user = await UserModel.findOne({ email });

    res.send({
      message: "Count update successfully",
      wrongCount: user?.passwordCount,
    });
  } else {
    res.send({ message: "User Not Found" });
  }
});

