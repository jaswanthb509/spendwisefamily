import { useState, useEffect } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Summary from "../components/Summary";

import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";

import BudgetSection from "../components/BudgetSection";

import GoalsSection from "../components/GoalsSection";

import FamilyCard from "../components/FamilyCard";

import AnalyticsSection from "../components/AnalyticsSection";

import AISection from "../components/AiSection";

import ActivitySection from "../components/ActivitySection";

import toast from "react-hot-toast";

import "../App.css";

function Dashboard({

  goHome,

  darkMode,

  setDarkMode,

}) {

  const token =
    localStorage.getItem(
      "token"
    );


  const [

    activeSection,

    setActiveSection

  ] = useState(

    "dashboard"

  );


  const [

    expenses,

    setExpenses

  ] = useState([]);

  const [

    budgets,

    setBudgets

  ] = useState([]);

  const [

    goals,

    setGoals

  ] = useState([]);

 const isGuest =

localStorage.getItem(

"guestMode"

)==="true";

const [guestActions,

setGuestActions]=

useState(0);

const [showGuestPopup,

setShowGuestPopup]=

useState(false);

  const [

    activities,

    setActivities

  ] = useState([]);

  const [

    family,

    setFamily

  ] = useState(null);

  const [

    familyMembers,

    setFamilyMembers

  ] = useState([]);


  const [

    showNotifications,

    setShowNotifications

  ] = useState(false);

  const [

    loadingAI,

    setLoadingAI

  ] = useState(false);

  const [

    aiAdvice,

    setAiAdvice

  ] = useState("");


  const [

    savingAmounts,

    setSavingAmounts

  ] = useState({});

  const [

    goalTitle,

    setGoalTitle

  ] = useState("");

  const [

    goalTarget,

    setGoalTarget

  ] = useState("");

  const [

    goalDeadline,

    setGoalDeadline

  ] = useState("");


  const [

    budgetCategory,

    setBudgetCategory

  ] = useState("");

  const [

    budgetAmount,

    setBudgetAmount

  ] = useState("");


  const [

    familyName,

    setFamilyName

  ] = useState("");

  const [

    inviteCode,

    setInviteCode

  ] = useState("");


  const filteredExpenses =

    expenses;

    useEffect(() => {

    loadDashboard();

  }, []);

  const loadDashboard =

  async () => {

    await Promise.all([

      fetchExpenses(),

      fetchFamily(),

      fetchBudgets(),

      fetchGoals(),

      fetchActivities(),

    ]);

  };


const fetchExpenses = async () => {

  try {

    const res = await fetch(

      "http://localhost:5000/api/expenses",

      {

        headers: {

          Authorization:

            `Bearer ${token}`,

        },

      }

    );

    const data =

      await res.json();

    if (res.ok) {

      setExpenses(data);

    }

  }

  catch (error) {

    console.log(error);

    toast.error(

      "Failed to load expenses"

    );

  }

};

const updateExpense = async (

  id,

  updatedData

) => {

  try {

    const res = await fetch(

      `http://localhost:5000/api/expenses/${id}`,

      {

        method: "PUT",

        headers: {

          "Content-Type":

            "application/json",

          Authorization:

            `Bearer ${token}`,

        },

        body: JSON.stringify(

          updatedData

        ),

      }

    );

    if (res.ok) {

      toast.success(

        "Expense Updated"

      );

      await fetchExpenses();

      await fetchActivities();

    }

    else {

      toast.error(

        "Update Failed"

      );

    }

  }

  catch (error) {

    console.log(error);

    toast.error(

      "Something went wrong"

    );

  }

};


const fetchFamily = async () => {

  if (!token) {

    console.log("No token found");

    return;

  }

  try {

    console.log("Fetching family...");

    const res = await fetch(

      "http://localhost:5000/api/family/me",

      {

        method: "GET",

        headers: {

          Authorization: `Bearer ${token}`,

          "Content-Type": "application/json",

        },

      }

    );

    console.log("Family Status:", res.status);

    const data = await res.json();

    console.log("Family Data:", data);

    if (!res.ok) {

      setFamily(null);

      setFamilyMembers([]);

      return;

    }

    setFamily(data);

    setFamilyMembers(

      data.members || []

    );

  }

  catch (error) {

    console.log(

      "Fetch Family Error:",

      error

    );

    setFamily(null);

    setFamilyMembers([]);

  }

};

const fetchBudgets = async () => {

  try {

    const res = await fetch(

      "http://localhost:5000/api/budgets",

      {

        headers: {

          Authorization:

            `Bearer ${token}`,

        },

      }

    );

    const data =

      await res.json();

    if (res.ok) {

      setBudgets(data);

    }

  }

  catch (error) {

    console.log(error);

    toast.error(

      "Failed to load budgets"

    );

  }

};


const fetchGoals = async () => {

  try {

    const res = await fetch(

      "http://localhost:5000/api/goals",

      {

        headers: {

          Authorization:

            `Bearer ${token}`,

        },

      }

    );

    const data =

      await res.json();

    if (res.ok) {

      setGoals(data);

    }

  }

  catch (error) {

    console.log(error);

    toast.error(

      "Failed to load goals"

    );

  }

};

const fetchActivities = async () => {

  try {

    const res = await fetch(

      "http://localhost:5000/api/activity",

      {

        headers: {

          Authorization:

            `Bearer ${token}`,

        },

      }

    );

    const data =

      await res.json();

    setActivities(

      Array.isArray(data)

      ? data

      : []

    );

  }

  catch (error) {

    console.log(error);

    setActivities([]);

  }

};


const createFamily = async () => {

  if (!familyName) {

    toast.error(

      "Enter family name"

    );

    return;

  }

  try {

    const res = await fetch(

      "http://localhost:5000/api/family/create",

      {

        method: "POST",

        headers: {

          "Content-Type":

            "application/json",

          Authorization:

            `Bearer ${token}`,

        },

        body: JSON.stringify({

          name: familyName,

        }),

      }

    );

    const data =

      await res.json();

    if (res.ok) {

      toast.success(

        "Family Created"

      );

      setFamilyName("");

      await fetchFamily();

      await fetchActivities();

    }

    else {

      toast.error(

        data.message

      );

    }

  }

  catch (error) {

    console.log(error);

    toast.error(

      "Something went wrong"

    );

  }

};


const joinFamily = async () => {

  if (!inviteCode) {

    toast.error(

      "Enter invite code"

    );

    return;

  }

  try {

    const res = await fetch(

      "http://localhost:5000/api/family/join",

      {

        method: "POST",

        headers: {

          "Content-Type":

            "application/json",

          Authorization:

            `Bearer ${token}`,

        },

        body: JSON.stringify({

          inviteCode,

        }),

      }

    );

    const data =

      await res.json();

    if (res.ok) {

      toast.success(

        "Joined Family"

      );

      setInviteCode("");

      await fetchFamily();

      await fetchActivities();

    }

    else {

      toast.error(

        data.message

      );

    }

  }

  catch (error) {

    console.log(error);

    toast.error(

      "Something went wrong"

    );

  }

};


const deleteExpense = async (

  expenseId

) => {

  try {

    const res = await fetch(

      `http://localhost:5000/api/expenses/${expenseId}`,

      {

        method: "DELETE",

        headers: {

          Authorization:

            `Bearer ${token}`,

        },

      }

    );

    if (res.ok) {

      toast.success(

        "Expense deleted"

      );

      await fetchExpenses();

      await fetchActivities();

    }

  }

  catch (error) {

    console.log(error);

    toast.error(

      "Something went wrong"

    );

  }

};


const createBudget = async () => {

  if(isGuest){

toast.error(

"Please login to continue"

);

return;

}

  if(

!handleGuestAction()

){

return;

}

  if (

    !budgetCategory ||

    !budgetAmount  


  ) {

    toast.error(

      "Fill all fields"

    );

    return;

  }

  try {

    const res = await fetch(

      "http://localhost:5000/api/budgets",

      {

        method: "POST",

        headers: {

          "Content-Type":

            "application/json",

          Authorization:

            `Bearer ${token}`,

        },

        body: JSON.stringify({

          category:

            budgetCategory,

          amount:

            Number(

              budgetAmount

            ),

        }),

      }

    );

    const data =

      await res.json();

    if (res.ok) {

      toast.success(

        "Budget Created"

      );

      setBudgetCategory("");

      setBudgetAmount("");

      await fetchBudgets();

      await fetchActivities();

    }

    else {

      toast.error(

        data.message

      );

    }

  }

  catch (error) {

    console.log(error);

    toast.error(

      "Something went wrong"

    );

  }

};


const createGoal = async () => {

  if(isGuest){

toast.error(

"Please login to continue"

);

return;

}

  if(

!handleGuestAction()

){

return;

}

  if (

    !goalTitle ||

    !goalTarget ||

    !goalDeadline

  ) {

    toast.error(

      "Fill all fields"

    );

    return;

  }

  try {

    const res = await fetch(

      "http://localhost:5000/api/goals",

      {

        method: "POST",

        headers: {

          "Content-Type":

            "application/json",

          Authorization:

            `Bearer ${token}`,

        },

        body: JSON.stringify({

          title:

            goalTitle,

          targetAmount:

            Number(

              goalTarget

            ),

          deadline:

            goalDeadline,

        }),

      }

    );

    const data =

      await res.json();

    if (res.ok) {

      toast.success(

        "Goal Created"

      );

      setGoalTitle("");

      setGoalTarget("");

      setGoalDeadline("");

      await fetchGoals();

      await fetchActivities();

    }

    else {

      toast.error(

        data.message

      );

    }

  }

  catch (error) {

    console.log(error);

    toast.error(

      "Something went wrong"

    );

  }

};


const addSavings = async (

  goalId

) => {

  try {

    const res = await fetch(

      `http://localhost:5000/api/goals/${goalId}/save`,

      {

        method: "PUT",

        headers: {

          "Content-Type":

            "application/json",

          Authorization:

            `Bearer ${token}`,

        },

        body: JSON.stringify({

          amount: Number(

            savingAmounts[goalId]

          ),

        }),

      }

    );

    const data =

      await res.json();

    if (res.ok) {

      toast.success(

        data.savedAmount >=

        data.targetAmount

        ?

        "Goal Achieved"

        :

        "Savings Added"

      );

      setSavingAmounts(

        (prev)=>({

          ...prev,

          [goalId]:"",

        })

      );

      await fetchGoals();

      await fetchActivities();

    }

  }

  catch (error) {

    console.log(error);

    toast.error(

      "Something went wrong"

    );

  }

};

const deleteGoal = async (

  goalId

) => {

  try {

    const res = await fetch(

      `http://localhost:5000/api/goals/${goalId}`,

      {

        method: "DELETE",

        headers: {

          Authorization:

            `Bearer ${token}`,

        },

      }

    );

    if (res.ok) {

      toast.success(

        "Goal Deleted"

      );

      await fetchGoals();

      await fetchActivities();

    }

  }

  catch (error) {

    console.log(error);

    toast.error(

      "Something went wrong"

    );

  }

};


const logout = () => {

  localStorage.clear();

  goHome();

};

const handleGuestAction=()=>{

if(!isGuest)

return true;

if(guestActions>=2){

setShowGuestPopup(

true

);

return false;

}

setGuestActions(

prev=>prev+1

);

return true;

};

const total =

expenses.reduce(

(sum,item)=>

sum +

Number(

item.amount

),

0

);


const chartMap = {};

filteredExpenses.forEach(

(expense)=>{

const category =

expense.category ||

"Other";

chartMap[category] =

(

chartMap[category]

|| 0

)

+

Number(

expense.amount

);

}

);

const chartData =

Object.keys(

chartMap

).map(

(key)=>({

name:key,

value:

chartMap[key],

})

);


const memberMap = {};

filteredExpenses.forEach(

(expense)=>{

const name =

expense.user

?

`${expense.user.firstName || ""} ${expense.user.lastName || ""}`

:

"Unknown";

memberMap[name] =

(

memberMap[name]

|| 0

)

+

Number(

expense.amount

);

}

);

const memberChartData =

Object.keys(

memberMap

).map(

(name)=>({

name,

amount:

memberMap[name],

})

);


const monthlyData =

expenses.reduce(

(acc,expense)=>{

const date =

expense.createdAt ||

expense.date;

const month =

new Date(

date

).toLocaleString(

"default",

{

month:"short",

}

);

const existing =

acc.find(

(item)=>

item.month===month

);

if(existing){

existing.amount +=

Number(

expense.amount

);

}

else{

acc.push({

month,

amount:Number(

expense.amount

),

});

}

return acc;

},

[]

);


const getSpentAmount = (

category

) => {

return filteredExpenses

.filter(

(expense)=>

expense.category

?.toLowerCase()

===

category

?.toLowerCase()

)

.reduce(

(total,expense)=>

total +

Number(

expense.amount

),

0

);

};


const COLORS = [

"#2563eb",

"#10b981",

"#f59e0b",

"#ef4444",

"#8b5cf6",

];


const formatCurrency = (

amount

) => {

return new Intl.NumberFormat(

"en-IN",

{

style:"currency",

currency:"INR",

maximumFractionDigits:0,

}

).format(

Number(amount) || 0

);

};


const budgetScore =

budgets.length

? 10

: 4;

const goalScore =

goals.length

? 10

: 4;

const expenseScore =

total > 0

? 8

: 4;

const savingsScore =

goals.some(

(goal)=>

goal.savedAmount > 0

)

? 10

: 5;

const healthScore = (

(

budgetScore +

goalScore +

expenseScore +

savingsScore

) / 4

).toFixed(1);


const getAIAdvice = async () => {

try{

setLoadingAI(true);

toast.loading(

"Generating AI insights...",

{

id:"ai",

}

);

const res = await fetch(

"http://localhost:5000/api/ai/recommend",

{

method:"POST",

headers:{

"Content-Type":

"application/json",

Authorization:

`Bearer ${token}`,

},

}

);

const data =

await res.json();

if(res.ok){

setAiAdvice(

data.recommendation

);

toast.success(

"AI insights generated",

{

id:"ai",

}

);

}

else{

throw new Error();

}

}

catch(error){

console.log(error);

setAiAdvice(`

<h3>1. Spending Summary</h3>

<ul>

<li>Track expenses regularly.</li>

<li>Reduce unnecessary spending.</li>

</ul>

<h3>2. Budget Analysis</h3>

<ul>

<li>Create budgets for all categories.</li>

<li>Avoid overspending.</li>

</ul>

<h3>3. Goal Progress</h3>

<ul>

<li>Keep contributing to active goals.</li>

</ul>

<h3>4. Recommendations</h3>

<ul>

<li>Review expenses weekly.</li>

<li>Save at least 20% of income.</li>

</ul>

<h3>5. Financial Health</h3>

<p>Score: ${healthScore}/10</p>

`);

toast.error(

"AI service unavailable",

{

id:"ai",

}

);

}

finally{

setLoadingAI(false);

}

};

const exportReport = () => {

toast.success(

"Export feature coming soon"

);

};

 return (

<div className="dash-page">

<Navbar

activities={activities}

showNotifications={showNotifications}

setShowNotifications={setShowNotifications}

darkMode={darkMode}

setDarkMode={setDarkMode}

logout={logout}

exportReport={exportReport}

currentMember={

familyMembers.find(

(member)=>

member.user?._id===

localStorage.getItem(

"userId"

)

)

}

/>

<div className="dashboard-layout">

<Sidebar

activeSection={activeSection}

setActiveSection={setActiveSection}

/>


<main className="content-area">


{activeSection==="dashboard" && (

<Summary

total={total}

familyMembers={familyMembers}

goals={goals}

healthScore={healthScore}

formatCurrency={formatCurrency}

exportReport={exportReport}

setActiveSection={setActiveSection}

/>

)}


{activeSection==="expenses" && (

<>

<ExpenseForm

darkMode={darkMode}

onAdd={async()=>{

await fetchExpenses();

await fetchActivities();

isGuest={isGuest};

}}

/>

<ExpenseList

expenses={filteredExpenses}

deleteExpense={deleteExpense}

updateExpense={updateExpense}

/>

</>

)}


{activeSection==="budgets" && (

<BudgetSection

budgetCategory={budgetCategory}

setBudgetCategory={setBudgetCategory}

budgetAmount={budgetAmount}

setBudgetAmount={setBudgetAmount}

createBudget={createBudget}

budgets={budgets}

getSpentAmount={getSpentAmount}

isGuest={isGuest}

/>

)}


{activeSection==="goals" && (

<GoalsSection

goals={goals}

goalTitle={goalTitle}

setGoalTitle={setGoalTitle}

goalAmount={goalTarget}

setGoalAmount={setGoalTarget}

goalDeadline={goalDeadline}

setGoalDeadline={setGoalDeadline}

createGoal={createGoal}

addSavings={addSavings}

deleteGoal={deleteGoal}

savingAmounts={savingAmounts}

setSavingAmounts={setSavingAmounts}

isGuest={isGuest}

/>

)}


{activeSection==="family" && (

<FamilyCard

family={family}

familyMembers={familyMembers}

familyName={familyName}

setFamilyName={setFamilyName}

inviteCode={inviteCode}

setInviteCode={setInviteCode}

createFamily={createFamily}

joinFamily={joinFamily}

/>

)}

{activeSection==="analytics" && (

<AnalyticsSection

chartData={chartData}

monthlyData={monthlyData}

memberChartData={memberChartData}

COLORS={COLORS}

/>

)}


{activeSection==="ai" && (

<AISection

getAIAdvice={getAIAdvice}

aiAdvice={aiAdvice}

loadingAI={loadingAI}

isGuest={isGuest}

/>

)}


{activeSection==="activity" && (

<ActivitySection

activities={activities}

/>

)}

</main>

</div>

</div>

);

}

export default Dashboard;
