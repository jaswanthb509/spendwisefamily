const express = require("express");
const router = express.Router();

const User = require("../models/User");
const jwt = require("jsonwebtoken");

/* =========================
JWT TOKEN
========================= */

const generateToken = (id) => {
return jwt.sign(
{ id },
process.env.JWT_SECRET,
{
expiresIn: "7d",
}
);
};

/* =========================
REGISTER
POST /api/auth/register
========================= */

router.post(
"/register",
async (req, res) => {
try {
const {
email,
password,
} = req.body;


  if (
    !email ||
    !password
  ) {
    return res
      .status(400)
      .json({
        message:
          "Please fill all fields",
      });
  }

  const existingUser =
    await User.findOne({
      email,
    });

  if (existingUser) {
    return res
      .status(400)
      .json({
        message:
          "User already exists",
      });
  }

  const user =
    await User.create({
      email,
      password,
    });

  res.status(201).json({
    message:
      "Registration successful",

    user: {
      _id: user._id,
      email:
        user.email,
    },
  });
} catch (error) {
  console.error(
    "REGISTER ERROR:",
    error
  );

  res.status(500).json({
    message:
      error.message,
  });
}


}
);

/* =========================
LOGIN
POST /api/auth/login
========================= */

router.post(
"/login",
async (req, res) => {
try {
const {
email,
password,
} = req.body;


  if (
    !email ||
    !password
  ) {
    return res
      .status(400)
      .json({
        message:
          "Please enter email and password",
      });
  }

  const user =
    await User.findOne({
      email,
    });

  if (!user) {
    return res
      .status(400)
      .json({
        message:
          "Invalid email",
      });
  }

  const isMatch =
    await user.matchPassword(
      password
    );

  if (!isMatch) {
    return res
      .status(400)
      .json({
        message:
          "Invalid password",
      });
  }

  const token =
    generateToken(
      user._id
    );

  res.status(200).json({
    message:
      "Login successful",

    token,

    user: {
      _id: user._id,
      email:
        user.email,
      family:
        user.family,
    },
  });
} catch (error) {
  console.error(
    "LOGIN ERROR:",
    error
  );

  res.status(500).json({
    message:
      error.message,
  });
}


}
);

module.exports = router;
