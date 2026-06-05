const express = require("express");

const router = express.Router();

const { GoogleGenerativeAI } =
require("@google/generative-ai");

const protect =
require("../middleware/authMiddleware");

const genAI =
  new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
  );

router.post(
  "/recommend",
  protect,
  async (req, res) => {
    try {
      const { expenses } =
        req.body;

      const model =
        genAI.getGenerativeModel({
          model:
            "gemini-1.5-flash",
        });

      const prompt = `
Analyze these family expenses:

${JSON.stringify(
  expenses
)}

Give:
1. Spending insights
2. Saving recommendations
3. Budget suggestions
`;

      const result =
        await model.generateContent(
          prompt
        );

      const response =
        result.response.text();

      res.json({
        recommendation:
          response,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message:
          "AI failed",
      });
    }
  }
);

module.exports = router;