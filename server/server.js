const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

const helmet = require("helmet");

const dotenv = require("dotenv");


/* ==========================
   LOAD ENV VARIABLES
========================== */

dotenv.config();


/* ==========================
   IMPORT ROUTES
========================== */

const authRoutes =
require("./routes/authRoutes");

const expenseRoutes =
require("./routes/expenseRoutes");

const memberRoutes =
require("./routes/memberRoutes");

const familyRoutes =
require("./routes/familyRoutes");

const budgetRoutes =
require("./routes/budgetRoutes");

const goalRoutes =
require("./routes/goalRoutes");

const aiRoutes =
require("./routes/aiRoutes");

const activityRoutes =
require("./routes/activityRoutes");


/* ==========================
   CREATE APP
========================== */

const app = express();

const PORT =
process.env.PORT || 5000;


/* ==========================
   MIDDLEWARES
========================== */

app.use(cors());

app.use(helmet());

app.use(express.json());


/* ==========================
   DEBUG ENV
========================== */

console.log(
"JWT Secret Loaded:",

!!process.env.JWT_SECRET
);

console.log(
"Gemini Key Loaded:",

!!process.env.GEMINI_API_KEY
);


/* ==========================
   HEALTH CHECK
========================== */

app.get(
"/",

(req,res)=>{

res.send(

"SpendWiseFamily API Running"

);

}
);


/* ==========================
   API ROUTES
========================== */

app.use(

"/api/auth",

authRoutes

);

app.use(

"/api/expenses",

expenseRoutes

);

app.use(

"/api/members",

memberRoutes

);

app.use(

"/api/family",

familyRoutes

);

app.use(

"/api/budgets",

budgetRoutes

);

app.use(

"/api/goals",

goalRoutes

);

app.use(

"/api/ai",

aiRoutes

);

app.use(

"/api/activity",

activityRoutes

);


/* ==========================
   404 ROUTE
========================== */

app.use(

(req,res)=>{

res.status(404).json({

message:

"Route not found",

});

}

);


/* ==========================
   CONNECT DATABASE
========================== */

mongoose

.connect(

process.env.MONGO_URI

)

.then(()=>{

console.log(

"✅ MongoDB connected"

);

app.listen(

PORT,

()=>{

console.log(

`✅ Server running on port ${PORT}`

);

}

);

})

.catch((error)=>{

console.log(

"❌ MongoDB Error:",

error.message

);

});