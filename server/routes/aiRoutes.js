const express = require("express");

const router = express.Router();

const { GoogleGenerativeAI } =
require("@google/generative-ai");

const protect =
require("../middleware/authMiddleware");

const User =
require("../models/User");

const Expense =
require("../models/Expense");

const Budget =
require("../models/Budget");

const Goal =
require("../models/Goal");

const Family =
require("../models/Family");


/* ==========================
   GEMINI SETUP
========================== */

const genAI =
new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const model =
genAI.getGenerativeModel({

model:"gemini-2.5-flash",

});


/* ==========================
   AI INSIGHTS
========================== */

router.post(
"/recommend",

protect,

async (req,res)=>{

try{

console.log(
"AI route hit"
);


/* USER */

const user =
await User.findById(
req.user._id
);

if(!user){

return res.status(404).json({

message:"User not found",

});

}


/* FAMILY */

if(!user.family){

return res.status(400).json({

message:
"Please create or join a family first",

});

}

const family =
await Family.findById(
user.family
).populate(

"members.user",

"firstName lastName"

);

if(!family){

return res.status(404).json({

message:
"Family not found",

});

}


/* FETCH DATA */

const expenses =
await Expense.find({

family:user.family,

});

const budgets =
await Budget.find({

family:user.family,

});

const goals =
await Goal.find({

family:user.family,

});


console.log(

"Expenses:",

expenses.length

);

console.log(

"Budgets:",

budgets.length

);

console.log(

"Goals:",

goals.length

);


/* CALCULATIONS */

const totalExpenses =

expenses.reduce(

(sum,item)=>

sum +

Number(

item.amount

),

0

);


/* PROMPT */

const prompt = `

You are a financial advisor.

Analyze this family's financial data.

Return ONLY HTML.

Maximum 250 words.

Sections:

<h3>💰 Spending Summary</h3>

<ul><li></li></ul>

<h3>📊 Budget Analysis</h3>

<ul><li></li></ul>

<h3>🎯 Goal Progress</h3>

<ul><li></li></ul>

<h3>💡 Recommendations</h3>

<ul><li></li></ul>

<h3>⭐ Financial Health</h3>

<p>Score:X/10</p>

Use simple language.

No markdown.

No **

No code blocks.


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


/* GEMINI */

const result =

await model.generateContent(

prompt

);

const response =

await result.response;

const recommendation =

response.text();


return res.status(200).json({

recommendation,

fallback:false,

});

}

catch(error){

console.log(

"AI ERROR:",

error.message

);


/* FALLBACK */

const fallback = `

<h3>💰 Spending Summary</h3>

<ul>

<li>Track your expenses regularly.</li>

<li>Reduce unnecessary spending.</li>

</ul>

<h3>📊 Budget Analysis</h3>

<ul>

<li>Create monthly budgets.</li>

<li>Stay within limits.</li>

</ul>

<h3>🎯 Goal Progress</h3>

<ul>

<li>Keep contributing to your goals.</li>

</ul>

<h3>💡 Recommendations</h3>

<ul>

<li>Review expenses weekly.</li>

<li>Save 20% of your income.</li>

</ul>

<h3>⭐ Financial Health</h3>

<p>Score:8/10</p>

`;

return res.status(200).json({

recommendation:fallback,

fallback:true,

});

}

}

);

module.exports = router;