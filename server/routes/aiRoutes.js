require("dotenv").config();

const express = require("express");

const router = express.Router();

const {
  GoogleGenerativeAI,
} = require("@google/generative-ai");

const protect = require(
  "../middleware/authMiddleware"
);

const Expense = require("../models/Expense");

const Budget = require("../models/Budget");

const Goal = require("../models/Goal");

const Family = require("../models/Family");

const User = require("../models/User");

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const model =
  genAI.getGenerativeModel({

    model:"gemini-1.5-flash",

  });


// Retry Function

async function generateAI(prompt){

for(let i=0;i<3;i++){

try{

const result =
await model.generateContent(prompt);

const response =
await result.response;

return response.text();

}

catch(error){

console.log(
`Retry ${i+1}`
);

if(i===2){

throw error;

}

await new Promise(

resolve=>

setTimeout(

resolve,

2000

)

);

}

}

}


router.post(

"/recommend",

protect,

async(req,res)=>{

try{

console.log(
"Generating AI Insights..."
);

const user =
await User.findById(
req.user._id
);

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

const family =
await Family.findById(

user.family

).populate(

"members.user",

"email"

);


const totalExpenses =

expenses.reduce(

(sum,expense)=>

sum+

Number(

expense.amount

),

0

);


const prompt = `

You are an expert financial advisor.

Analyze this family's finances.

Return ONLY HTML.

Use:

<h3>💰 Spending Summary</h3>

<ul>
<li></li>
</ul>

<h3>📊 Budget Analysis</h3>

<ul>
<li></li>
</ul>

<h3>🎯 Goal Progress</h3>

<ul>
<li></li>
</ul>

<h3>💡 Recommendations</h3>

<ul>
<li></li>
</ul>

<h3>⭐ Financial Health</h3>

<p>Score:X/10</p>

Rules:

- Under 250 words
- Simple language
- No markdown
- No **
- No code blocks

Family:

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

const recommendation =

await generateAI(

prompt

);

return res.json({

recommendation,

});

}

catch(error){

console.log(

"Gemini Error:",

error

);


const fallback = `

<h3>💰 Spending Summary</h3>

<ul>

<li>Track your monthly expenses regularly.</li>

<li>Reduce spending in your highest category.</li>

</ul>

<h3>📊 Budget Analysis</h3>

<ul>

<li>Create realistic monthly budgets.</li>

<li>Avoid exceeding your limits.</li>

</ul>

<h3>🎯 Goal Progress</h3>

<ul>

<li>Continue contributing towards savings goals.</li>

</ul>

<h3>💡 Recommendations</h3>

<ul>

<li>Review expenses weekly.</li>

<li>Save at least 20% of your income.</li>

</ul>

<h3>⭐ Financial Health</h3>

<p>Score: 8/10</p>

`;

return res.json({

recommendation:fallback,

});

}

}

);

module.exports = router;