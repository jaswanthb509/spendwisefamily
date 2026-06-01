const express = require("express");
const router = express.Router();

const Budget =
  require("../models/Budget");

const User =
  require("../models/User");

const protect =
  require("../middleware/authMiddleware");

/* GET BUDGETS */
router.get(
  "/",
  protect,
  async (req, res) => {
    try {
      const user =
        await User.findById(
          req.user._id
        );

      const budgets =
        await Budget.find({
          family:
            user.family,
        });

      res.json(budgets);
    } catch (error) {
      res.status(500).json({
        message:
          "Failed to load budgets",
      });
    }
  }
);

/* CREATE BUDGET */
router.post(
  "/",
  protect,
  async (req, res) => {
    try {
      const {
        category,
        amount,
      } = req.body;

      const user =
        await User.findById(
          req.user._id
        );

      const budget =
        await Budget.create({
          family:
            user.family,
          category,
          amount,
        });

      res.status(201).json(
        budget
      );
    } catch (error) {
      res.status(500).json({
        message:
          "Failed to create budget",
      });
    }
  }
);

module.exports = router;