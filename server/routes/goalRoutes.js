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

/* GET GOALS */
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
      res.status(500).json({
        message:
          "Failed to load goals",
      });
    }
  }
);

/* CREATE GOAL */
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
      res.status(500).json({
        message:
          "Failed to create goal",
      });
    }
  }
);

module.exports =
  router;