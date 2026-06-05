const mongoose =
  require("mongoose");

const goalSchema =
  new mongoose.Schema(
    {
      family: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Family",
        required: true,
      },

      title: {
        type: String,
        required: true,
      },

      targetAmount: {
        type: Number,
        required: true,
      },

      savedAmount: {
        type: Number,
        default: 0,
      },

      deadline: {
        type: Date,
      },
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Goal",
    goalSchema
  );