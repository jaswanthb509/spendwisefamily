const express = require("express");
const router = express.Router();

const Expense = require("../models/Expense");
const protect = require("../middleware/authMiddleware");

/* =====================
   GET ALL EXPENSES
===================== */
router.get("/", protect, async (req, res) => {
  try {
    const expenses =
      await Expense.find({
        user: req.user._id,
      });

    res.json(expenses);

  } catch (error) {
    res.status(500).json({
      message:
        "Failed to load expenses",
    });
  }
});

/* =====================
   ADD EXPENSE
===================== */
router.post("/", protect, async (req, res) => {
  try {
    const { title, amount, category } =
      req.body;

    const newExpense =
      await Expense.create({
        user: req.user._id,
        title,
        amount,
        category,
      });

    res.status(201).json(
      newExpense
    );

  } catch (error) {
    res.status(500).json({
      message:
        "Failed to add expense",
    });
  }
});

/* =====================
   UPDATE EXPENSE
===================== */
router.put("/:id", protect, async (req, res) => {
  try {
    const expense =
      await Expense.findOne({
        _id: req.params.id,
        user: req.user._id,
      });

    if (!expense) {
      return res.status(404).json({
        message:
          "Expense not found",
      });
    }

    const {
      title,
      amount,
      category,
    } = req.body;

    expense.title =
      title || expense.title;

    expense.amount =
      amount || expense.amount;

    expense.category =
      category ||
      expense.category;

    const updatedExpense =
      await expense.save();

    res.json(updatedExpense);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message:
        "Update failed",
    });
  }
});

/* =====================
   DELETE EXPENSE
===================== */
router.delete(
  "/:id",
  protect,
  async (req, res) => {
    try {
      await Expense.findOneAndDelete({
        _id: req.params.id,
        user: req.user._id,
      });

      res.json({
        message:
          "Expense deleted",
      });

    } catch (error) {
      res.status(500).json({
        message:
          "Delete failed",
      });
    }
  }
);

module.exports = router;