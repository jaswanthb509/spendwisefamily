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

const Expense =
  require(
    "../models/Expense"
  );

const Budget =
  require(
    "../models/Budget"
  );

const Goal =
  require(
    "../models/Goal"
  );

const Family =
  require(
    "../models/Family"
  );

const User =
  require(
    "../models/User"
  );

router.post(
  "/recommend",
  protect,
  async (req, res) => {

    try {

      console.log(
        "Generating AI Insights..."
      );

      const user =
        await User.findById(
          req.user._id
        );

      const expenses =
        await Expense.find({
          family:
            user.family,
        });

      const budgets =
        await Budget.find({
          family:
            user.family,
        });

      const goals =
        await Goal.find({
          family:
            user.family,
        });

      const family =
        await Family.findById(
          user.family
        )
          .populate(
            "members.user",
            "email"
          );

      const totalExpenses =
        expenses.reduce(
          (
            sum,
            expense
          ) =>
            sum +
            Number(
              expense.amount
            ),
          0
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

      const prompt = `

You are an expert financial advisor.

Analyze the following family financial data.

Return ONLY valid HTML.

Use this format:

<h3>💰 Spending Summary</h3>
<ul>
<li>...</li>
</ul>

<h3>📊 Budget Analysis</h3>
<ul>
<li>...</li>
</ul>

<h3>🎯 Goal Progress</h3>
<ul>
<li>...</li>
</ul>

<h3>💡 Recommendations</h3>
<ul>
<li>...</li>
</ul>

<h3>⭐ Financial Health Score</h3>
<p>Score: X/10</p>

Rules:

- Keep response under 250 words
- Use simple language
- Be specific
- Mention overspending
- Mention goals
- Mention family insights
- Do NOT use markdown
- Do NOT use **
- Do NOT use code blocks

Family Members:
${JSON.stringify(
  family.members,
  null,
  2
)}

Total Expenses:
₹${totalExpenses}

Expenses:
${JSON.stringify(
  expenses,
  null,
  2
)}

Budgets:
${JSON.stringify(
  budgets,
  null,
  2
)}

Goals:
${JSON.stringify(
  goals,
  null,
  2
)}

`;

      const result =
        await model.generateContent(
          prompt
        );

      const response =
        await result.response;

      const insight =
        response.text();

      console.log(
        "AI Insights Generated"
      );

      res.json({
        recommendation:
          insight,
      });

    } catch (error) {

      console.log(
        "Gemini Error:",
        error
      );

      res.status(500).json({
        message:
          "Failed to generate AI insights",
        error:
          error.message,
      });

    }

  }
);

module.exports =
  router;