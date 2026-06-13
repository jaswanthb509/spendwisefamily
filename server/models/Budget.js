const mongoose =
  require("mongoose");

const budgetSchema =
  new mongoose.Schema(
    {
      family: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Family",
        required: true,
      },

      category: {
        type: String,
        required: true,
        trim: true,
      },

      amount: {
        type: Number,
        required: true,
        min: 0,
      },
    },
    {
      timestamps: true,
    }
  );

budgetSchema.index(
  {
    family: 1,
    category: 1,
  },
  {
    unique: true,
  }
);

module.exports =
  mongoose.model(
    "Budget",
    budgetSchema
  );