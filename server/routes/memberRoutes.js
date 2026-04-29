const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const FamilyMember = require("../models/FamilyMember");

/* GET MEMBERS */
router.get("/", protect, async (req, res) => {
  try {
    const members =
      await FamilyMember.find({
        user: req.user._id,
      });

    res.json(members);

  } catch (error) {
    res.status(500).json({
      message:
        "Failed to load members",
    });
  }
});

/* ADD MEMBER */
router.post("/", protect, async (req, res) => {
  try {
    const { name, relation } =
      req.body;

    const member =
      await FamilyMember.create({
        user: req.user._id,
        name,
        relation,
      });

    res.status(201).json(member);

  } catch (error) {
    res.status(500).json({
      message:
        "Failed to add member",
    });
  }
});

/* DELETE MEMBER */
router.delete("/:id", protect, async (req, res) => {
  try {
    await FamilyMember.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    res.json({
      message:
        "Member deleted",
    });

  } catch (error) {
    res.status(500).json({
      message:
        "Delete failed",
    });
  }
});

module.exports = router;