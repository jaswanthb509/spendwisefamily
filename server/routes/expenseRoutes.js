const express = require("express");
const router = express.Router();

const Expense = require("../models/Expense");
const User = require("../models/User");
const Activity = require("../models/Activity");

const protect =
  require("../middleware/authMiddleware");

/* =====================
   GET ALL FAMILY EXPENSES
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

      if (!user.family) {
        return res.json([]);
      }

      const expenses =
        await Expense.find({
          family:
            user.family,
        }).populate({
          path: "user",
          select: "email",
        });

      res.json(expenses);
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message:
          "Failed to load expenses",
        error:
          error.message,
      });
    }
  }
);

/* =====================
   ADD EXPENSE
===================== */

router.post(
  "/",
  protect,
  async (req, res) => {
    try {
      const {
        title,
        amount,
        category,
      } = req.body;

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

      const newExpense =
        await Expense.create({
          user:
            req.user._id,
          family:
            user.family,
          title,
          amount,
          category,
        });

      await Activity.create({
        family:
          user.family,
        user:
          req.user._id,
        action:
          `added expense "${title}" (₹${amount})`,
      });

      res.status(201).json(
        newExpense
      );
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message:
          "Failed to add expense",
        error:
          error.message,
      });
    }
  }
);

/* =====================
   UPDATE EXPENSE
===================== */

router.put(
  "/:id",
  protect,
  async (req, res) => {
    try {
      const expense =
        await Expense.findById(
          req.params.id
        );

      if (!expense) {
        return res
          .status(404)
          .json({
            message:
              "Expense not found",
          });
      }

      if (
        expense.user.toString() !==
        req.user._id.toString()
      ) {
        return res
          .status(403)
          .json({
            message:
              "Not authorized",
          });
      }

      const {
        title,
        amount,
        category,
      } = req.body;

      expense.title =
        title ||
        expense.title;

      expense.amount =
        amount ||
        expense.amount;

      expense.category =
        category ||
        expense.category;

      const updatedExpense =
        await expense.save();

      await Activity.create({
        family:
          expense.family,
        user:
          req.user._id,
        action:
          `updated expense "${expense.title}"`,
      });

      res.json(
        updatedExpense
      );
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message:
          "Update failed",
        error:
          error.message,
      });
    }
  }
);

/* =====================
   DELETE EXPENSE
===================== */

router.delete(
  "/:id",
  protect,
  async (req, res) => {
    try {
      const expense =
        await Expense.findById(
          req.params.id
        );

      if (!expense) {
        return res
          .status(404)
          .json({
            message:
              "Expense not found",
          });
      }

      if (
        expense.user.toString() !==
        req.user._id.toString()
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
          expense.family,
        user:
          req.user._id,
        action:
          `deleted expense "${expense.title}"`,
      });

      await expense.deleteOne();

      res.json({
        message:
          "Expense deleted",
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message:
          "Delete failed",
        error:
          error.message,
      });
    }
  }
);

module.exports = router;