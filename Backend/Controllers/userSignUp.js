 import Router from  "express"
import  {UserModel} from  "../Models/userScheme.js";
import bcrypt from "bcryptjs"

export const userSignUp = Router();

userSignUp.post("/", async (req, res) => {
  const { name, email, password } = req.body;

  bcrypt.hash(password, 8, async function (err, hash) {
    if (err) {
      res.send({ message: "Something went wrong" });
    }

    try {
      const userData = new UserModel({
        name,
        email,
        password: hash,
      });
      await userData.save();
      console.log(userData);
      res.status(201).send({ message: "Signup sucessful" });
    } catch (error) {
      res.send({ message: "Something went wrong" });
    }
  });
});

