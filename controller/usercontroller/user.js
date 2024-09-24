const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const SECRET_KEY = process.env.secret_key;
const UserMd = require("../../models/user");
const transporter = require("../../utils/Nodemail");
exports.signHandler = async (req, res) => {
  try {
    const { email, firstname, lastname, password } = req.body;
    console.log(req.body);

    const existingUser = await UserMd.findOne({ email });

    const createUser = await UserMd.create({
      email,
      firstname,
      lastname,
      password,
    });

    if (createUser) {
      // Set up email data
      let mailOptions = {
        from: process.env.Usermail,
        to: `${createUser.email}`,
        subject: "Welcome to our website",
        text: "you Habve successfully created an account",
        html: "<b>Hello world?</b>",
      };
      return res.json({ message: "User Created Successfully!!!", createUser });
    }
  } catch (err) {
    res.json({ message: err });
  }
};

exports.loginHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.json({ message: "Provide Both Email and Password" });
    }

    const isUser = await UserMd.findOne({ email });

    if (isUser) {
      const passVerify = await isUser?.checkPassword(password, isUser.password);
      if (passVerify) {
        const token = jwt.sign(
          {
            _id: isUser._id,
          },
          SECRET_KEY
        );
        res.cookie("token", token, {
          // httpOnly: true,
          maxAge: 3 * 60 * 1000,
        });
        return res.json({
          message:
            "Your are Logged in Successfully! Now Enjoy unlimited access.....",
          token,
        });
      } else {
        return res.json({
          message: "Password Is Incorrect....Try With a Valid One!!",
        });
      }
    } else {
      return res.json({ message: "No User Found! Email Doesn't Exists" });
    }
  } catch (err) {
    res.json({ message: err });
  }
};

exports.getusers = async (req, res) => {
  const user = await UserMd.find();
  res.json({ user });
};
