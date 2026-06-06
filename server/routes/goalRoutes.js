const express =
  require("express");

const router =
  express.Router();

const Goal =
  require("../models/Goal");

const User =
  require("../models/User");

const protect =
  require("../middleware/authMiddleware");

console.log(
  "Goal =",
  Goal
);

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

      const user =
        await User.findById(
          req.user._id
        );

      const goal =
        await Goal.create({
          family:
            user.family,
          title,
          targetAmount,
          deadline,
        });

      res.status(201).json(
        goal
      );
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

  const { amount } =
  req.body;

   goal.savedAmount +=
   Number(amount);

      await goal.save();

      res.json(goal);
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

module.exports =
  router;