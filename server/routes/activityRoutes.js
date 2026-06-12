const express =
  require("express");

const router =
  express.Router();

const Activity =
  require("../models/Activity");

const User =
  require("../models/User");

const protect =
  require("../middleware/authMiddleware");

router.get(
  "/",
  protect,
  async (req, res) => {
    try {
      const user =
        await User.findById(
          req.user._id
        );

      const activities =
        await Activity.find({
          family:
            user.family,
        })
          .populate(
            "user",
            "email"
          )
          .sort({
            createdAt:
              -1,
          })
          .limit(10);

          console.log(
  JSON.stringify(
    activities,
    null,
    2
  )
);

      res.json(
        activities
      );
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  }
);

module.exports = router;