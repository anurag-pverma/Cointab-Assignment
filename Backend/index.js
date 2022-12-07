import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
const username = process.env.MONGO_DB_USERNAME;
const passport = process.env.MONGO_DB_PASSWORD;
const url = process.env.MONGO_DB_URL;
import {userLogin} from "./Controllers/userLogin.js";
import {userSignUp} from "./Controllers/userSignUp.js";
const PORT = 8000;

const app = express();
app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
  res.send("WELCOME TO MY HOME");
});

app.get("/login", userLogin);
app.get("/signup", userSignUp);


app.listen(PORT, async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${username}:${passport}@${url}/?retryWrites=true&w=majority`
    );

    console.log(`DATA BASE CONNECTED SUCCESSFULLY`);
  } catch (error) {
    console.log("Error getting");
    console.log(error);
  }
  console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
});
