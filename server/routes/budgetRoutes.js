const express = require("express");

const router = express.Router();

const Budget = require("../models/Budget");

const User = require("../models/User");

const protect = require("../middleware/authMiddleware");


/* ===========================
   GET ALL BUDGETS
=========================== */

router.get(
  "/",
  protect,
  async (req, res) => {

    try {

      const user =
        await User.findById(
          req.user._id
        );

      if (!user) {

        return res.status(404).json({

          message:
            "User not found",

        });

      }

      if (!user.family) {

        return res.json([]);

      }

      const budgets =
        await Budget.find({

          family:
            user.family,

        });

      res.status(200).json(

        budgets

      );

    }

    catch (error) {

      console.log(

        "GET BUDGET ERROR:",

        error

      );

      res.status(500).json({

        message:

          error.message,

      });

    }

  }

);


/* ===========================
   CREATE BUDGET
=========================== */

router.post(
  "/",
  protect,
  async (req, res) => {

    try {

      console.log(

        "Budget Request:",

        req.body

      );

      const {

        category,

        amount,

      } = req.body;


      if (

        !category ||

        amount === undefined

      ) {

        return res.status(400).json({

          message:

            "Category and amount are required",

        });

      }


      const user =
        await User.findById(

          req.user._id

        );


      if (!user) {

        return res.status(404).json({

          message:

            "User not found",

        });

      }


      if (!user.family) {

        return res.status(400).json({

          message:

            "Please join or create a family first",

        });

      }


      const existingBudget =
        await Budget.findOne({

          family:

            user.family,

          category:

            category.trim(),

        });


      if (

        existingBudget

      ) {

        return res.status(400).json({

          message:

            `${category} budget already exists`,

        });

      }


      const budget =
        await Budget.create({

          family:

            user.family,

          category:

            category.trim(),

          amount:

            Number(amount),

        });


      res.status(201).json({

        message:

          "Budget created successfully",

        budget,

      });

    }

    catch (error) {

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


/* ===========================
   DELETE BUDGET
=========================== */

router.delete(
  "/:id",
  protect,
  async (req, res) => {

    try {

      const budget =
        await Budget.findById(

          req.params.id

        );


      if (!budget) {

        return res.status(404).json({

          message:

            "Budget not found",

        });

      }


      await Budget.findByIdAndDelete(

        req.params.id

      );


      res.status(200).json({

        message:

          "Budget deleted",

        });

    }

    catch (error) {

      console.log(

        "DELETE BUDGET ERROR:",

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