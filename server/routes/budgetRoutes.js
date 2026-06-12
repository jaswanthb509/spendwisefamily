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

      console.log(
        "Budget Request:",
        req.body
      );

      const user =
        await User.findById(
          req.user._id
        );

      if (!user) {
        return res
          .status(404)
          .json({
            message:
              "User not found",
          });
      }

      if (!user.family) {
        return res
          .status(400)
          .json({
            message:
              "You must join a family before creating budgets",
          });
      }

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

      console.log(
        "CREATE BUDGET ERROR:",
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