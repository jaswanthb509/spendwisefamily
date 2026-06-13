const express = require("express");
const router = express.Router();

const Goal = require("../models/Goal");
const Activity = require("../models/Activity");
const User = require("../models/User");

const protect =
require("../middleware/authMiddleware");

/* =====================
GET GOALS
===================== */

router.get(
"/",
protect,
async (req, res) => {


try {

  const user =
    await User.findById(
      req.user._id
    );

  const goals =
    await Goal.find({
      family:
        user.family,
    });

  res.json(goals);

} catch (error) {

  console.log(error);

  res.status(500).json({
    message:
      "Failed to load goals",
    error:
      error.message,
  });

}


}
);

/* =====================
CREATE GOAL
===================== */

router.post(
"/",
protect,
async (req, res) => {


try {

  const {
    title,
    targetAmount,
    deadline,
  } = req.body;

  if (
    !title ||
    !targetAmount
  ) {
    return res
      .status(400)
      .json({
        message:
          "Title and target amount are required",
      });
  }

  const user =
    await User.findById(
      req.user._id
    );

  if (!user.family) {
    return res
      .status(400)
      .json({
        message:
          "Join a family first",
      });
  }

  const goal =
    await Goal.create({
      family:
        user.family,

      title:
        title.trim(),

      targetAmount:
        Number(
          targetAmount
        ),

      deadline,
    });

  await Activity.create({
    family:
      user.family,

    user:
      req.user._id,

    action:
      `created goal "${goal.title}"`,
  });

  res.status(201).json({
    message:
      "Goal created successfully",

    goal,
  });

} catch (error) {

  console.log(error);

  res.status(500).json({
    message:
      "Failed to create goal",
    error:
      error.message,
  });

}


}
);

/* =====================
ADD SAVINGS
===================== */

router.put(
"/:id/save",
protect,
async (req, res) => {


try {

  const user =
    await User.findById(
      req.user._id
    );

  const goal =
    await Goal.findById(
      req.params.id
    );

  if (!goal) {
    return res
      .status(404)
      .json({
        message:
          "Goal not found",
      });
  }

  if (
    goal.family.toString() !==
    user.family.toString()
  ) {
    return res
      .status(403)
      .json({
        message:
          "Not authorized",
      });
  }

  const { amount } =
    req.body;

  if (
    !amount ||
    Number(amount) <= 0
  ) {
    return res
      .status(400)
      .json({
        message:
          "Valid amount required",
      });
  }

  if (
    goal.savedAmount >=
    goal.targetAmount
  ) {
    return res
      .status(400)
      .json({
        message:
          "Goal already achieved",
      });
  }

  goal.savedAmount =
    Math.min(
      goal.savedAmount +
        Number(amount),
      goal.targetAmount
    );

  await goal.save();

  await Activity.create({
    family:
      goal.family,

    user:
      req.user._id,

    action:
      `added ₹${amount} to "${goal.title}"`,
  });

  res.json({
    message:
      "Savings added successfully",

    goal,
  });

} catch (error) {

  console.log(error);

  res.status(500).json({
    message:
      "Failed to update goal",
    error:
      error.message,
  });

}


}
);

/* =====================
DELETE GOAL
===================== */

router.delete(
"/:id",
protect,
async (req, res) => {


try {

  const user =
    await User.findById(
      req.user._id
    );

  const goal =
    await Goal.findById(
      req.params.id
    );

  if (!goal) {
    return res
      .status(404)
      .json({
        message:
          "Goal not found",
      });
  }

  if (
    goal.family.toString() !==
    user.family.toString()
  ) {
    return res
      .status(403)
      .json({
        message:
          "Not authorized",
      });
  }

  await Activity.create({
    family:
      goal.family,

    user:
      req.user._id,

    action:
      `deleted goal "${goal.title}"`,
  });

  await goal.deleteOne();

  res.json({
    message:
      "Goal deleted successfully",
  });

} catch (error) {

  console.log(error);

  res.status(500).json({
    message:
      "Failed to delete goal",
    error:
      error.message,
  });

}


}
);

module.exports = router;
