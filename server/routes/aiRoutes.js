require("dotenv").config();

const express =
  require("express");

const router =
  express.Router();

const {
  GoogleGenerativeAI,
} = require(
  "@google/generative-ai"
);

const protect =
  require(
    "../middleware/authMiddleware"
  );

router.post(
  "/recommend",
  protect,
  async (req, res) => {
    try {
      console.log(
        "Gemini request started"
      );

      const genAI =
        new GoogleGenerativeAI(
          process.env.GEMINI_API_KEY
        );

      const model =
        genAI.getGenerativeModel({
          model:
            "gemini-2.5-flash",
        });

      const result =
        await model.generateContent(
          "Give me 3 money saving tips."
        );

      const response =
        result.response.text();

      console.log(
        "Gemini response received"
      );

      res.json({
        recommendation:
          response,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message:
          error.message,
      });
    }
  }
);

module.exports =
  router;