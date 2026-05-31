const mongoose =
  require("mongoose");

const budgetSchema =
  new mongoose.Schema({
    family: {
      type:
        mongoose.Schema.Types.ObjectId,
      ref: "Family",
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },
  });

module.exports =
  mongoose.model(
    "Budget",
    budgetSchema
  );