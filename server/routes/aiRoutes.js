require("dotenv").config();

const express = require("express");
const router = express.Router();

const {
  GoogleGenerativeAI,
} = require("@google/generative-ai");

const protect =
  require("../middleware/authMiddleware");

router.post(
  "/recommend",
  protect,
  async (req, res) => {
    try {
      console.log(
        "Route Key:",
        process.env.GEMINI_API_KEY
      );

      const genAI =
        new GoogleGenerativeAI(
          process.env.GEMINI_API_KEY
        );

      const model =
        genAI.getGenerativeModel({
          model: "gemini-2.0-flash",
        });

      const { expenses } =
        req.body;

      const prompt = `
Analyze these family expenses:

${JSON.stringify(expenses)}

Provide:
1. Spending insights
2. Saving recommendations
3. Budget suggestions
`;

      const result =
        await model.generateContent(
          prompt
        );

      const response =
        await result.response.text();

      res.json({
        recommendation:
          response,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "AI failed",
        error:
          error.message,
      });
    }
  }
);

module.exports = router;