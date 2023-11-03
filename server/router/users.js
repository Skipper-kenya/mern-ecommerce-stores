import express from "express";
import userModel from "../models/users.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

const USER_ROLES = {
  ADMIN: "admin",
  BASIC: "basic",
};

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const createRole = (user) => {
    if (user === "Andrew") {
      return USER_ROLES.ADMIN;
    } else {
      return USER_ROLES.BASIC;
    }
  };

  try {
    const user = await userModel.findOne({ username });

    if (user) {
      return res.send({ message: "user already exists", action: "error" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      username,
      password: hashedPassword,
      role: createRole(username),
    });

    await newUser.save();

    return res.send({
      message: "user successfully created",
      action: "success",
    });
  } catch (error) {
    console.log("error at register route");
  }
});
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await userModel.findOne({ username });

  if (!user) {
    return res.send({ message: "username does not exist", action: "error" });
  }

  try {
    bcrypt.compare(password, user.password, async (err, result) => {
      if (err) {
        console.log("error comparing passwords");
      } else {
        if (result) {
          const token = jwt.sign({ id: user._id }, "authGang");
          return res.send({
            action: "success",
            userId: user._id,
            token,
            message: "you are logged in!",
          });
        } else {
          return res.send({ message: "Password did not match" });
        }
      }
    });
  } catch (error) {
    console.log("error at comparing passwords");
  }
});

export { router as AuthRoute };
