import { useEffect, useState } from "react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";


import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { formatDistanceToNow } from "date-fns";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Summary from "../components/Summary";
import BudgetSection from "../components/BudgetSection";

import AISection from "../components/AISection";

import ActivitySection from "../components/ActivitySection";
import ExpenseForm from "../components/ExpenseForm";

import ExpenseList from "../components/ExpenseList";

import FamilyCard from "../components/FamilyCard";

import GoalsSection from "../components/GoalsSection";

import AnalyticsSection from "../components/AnalyticsSection";


import "../App.css";
import toast from "react-hot-toast";

function Dashboard({ goHome, darkMode, setDarkMode }) {
  const [expenses, setExpenses] = useState([]);
  const [budgets,setBudgets] = useState([]);
  const [
  activeSection,
  setActiveSection
] = useState(
  "dashboard"
);

const [budgetCategory,setBudgetCategory] = useState("");

const [budgetAmount,setBudgetAmount] = useState("");
  const [filter, setFilter] = useState("All");
  const [searchTerm,
  setSearchTerm] =
  useState("");

const [sortBy,
  setSortBy] =
  useState("latest");

  const [dateFilter, setDateFilter] =
    useState("All Time");

  const [family, setFamily] =
  useState(null);

  const [familyName,
  setFamilyName] =
  useState("");

  const [title, setTitle] = useState("");
const [amount, setAmount] = useState("");
const [savingAmounts, setSavingAmounts] =useState({});
const [category, setCategory] = useState("");
const [goals,
setGoals] =
useState([]);

const [goalTitle,
setGoalTitle] =
useState("");

const [goalTarget,
setGoalTarget] =
useState("");

const [goalDeadline,
setGoalDeadline] =
useState("");

  const [inviteCode,
  setInviteCode] =
  useState("");

  const token =
  localStorage.getItem("token");

console.log(
  "TOKEN =",
  token
);

const [aiAdvice, setAiAdvice] =
  useState("");
const [loadingAI,setLoadingAI]=useState(false);

const [activities, setActivities] =
  useState([]);

const [
  familyMembers,
  setFamilyMembers
] = useState([]);

const [showNotifications,
  setShowNotifications] =
  useState(false);


// Theme Effect
useEffect(() => {

  if (darkMode) {

    document.body.classList.add(
      "dark-mode"
    );

    localStorage.setItem(
      "theme",
      "dark"
    );

  } else {

    document.body.classList.remove(
      "dark-mode"
    );

    localStorage.setItem(
      "theme",
      "light"
    );

  }

}, [darkMode]);


// Initial Data Loading
useEffect(() => {

  fetchExpenses();
  fetchFamily();
  fetchBudgets();
  fetchGoals();
  fetchActivities();
  fetchFamilyMembers();

}, []);


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

    setExpenses(data);

  }

  catch(error){

    console.log(error);

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

      fetchExpenses();

      fetchActivities();

    }

    else {

      toast.error(

        "Update Failed"

      );

    }

  }

  catch (error) {

    console.log(

      error

    );

    toast.error(

      "Something went wrong"

    );

  }

};

const fetchFamily = async () => {
  try {
    const res = await fetch(
      "http://localhost:5000/api/family/me",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    if (res.ok) {
      setFamily(data);
    }
    console.log("Family Members:", data);
  } catch (error) {
    console.log(error);
     toast.error(
    "Something went wrong"
  );
  }
};

const fetchFamilyMembers = async () => {
  try {
    const res = await fetch(
      "http://localhost:5000/api/family/me",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    setFamilyMembers(
      data.members || []
    );
  } catch (error) {
    console.log(error);
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
  } catch (error) {
    console.log(error);
     toast.error(
    "Something went wrong"
  );
  }
};

const fetchGoals =
async () => {
  try {
    const res =
      await fetch(
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
  } catch (error) {
    console.log(error);
     toast.error(
    "Something went wrong"
  );
  }
};

const fetchActivities =
  async () => {
    try {
      const res =
        await fetch(
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

console.log(
  JSON.stringify(
    data,
    null,
    2
  )
);

if (
  Array.isArray(data)
) {
  setActivities(data);
} else {
  setActivities([]);
}
    } catch (error) {
      console.log(error);
       toast.error(
    "Something went wrong"
  );
    }
  };

const createFamily = async () => {
  try {
    const res = await fetch(
      "http://localhost:5000/api/family/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: familyName,
        }),
      }
    );

    const data = await res.json();

    if (res.ok) {
      alert("Family Created");
      fetchFamily();
      await fetchActivities();
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.log(error);
     toast.error(
    "Something went wrong"
  );
  }
};

const joinFamily = async () => {
  try {
    const res = await fetch(
      "http://localhost:5000/api/family/join",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          inviteCode,
        }),
      }
    );

    const data = await res.json();

    if (res.ok) {
      alert("Joined Family");
      fetchFamily();
      await fetchActivities();
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.log(error);
     toast.error(
    "Something went wrong"
  );
  }
};

const addExpense = async () => {
  try {
    const res = await fetch(
      "http://localhost:5000/api/expenses",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          amount: Number(amount),
          category,
        }),
      }
    );

    const data = await res.json();

if (res.ok) {
  setTitle("");
  setAmount("");
  setCategory("");

  fetchExpenses();
  fetchActivities();

  toast.success(
    "Expense added successfully"
  );
} else {
  toast.error(
    data.message
  );
}
  } catch (error) {
    console.log(error);

    toast.error(
    "Something went wrong");
  }
};


const deleteExpense =
  async (expenseId) => {
    try {
      const res =
        await fetch(
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
        "🗑 Expense deleted"
      );

        fetchExpenses();
        fetchActivities();
      }
    } catch (error) {
      console.log(error);
       toast.error(
    "Something went wrong"
  );
    }
  };

const createBudget = async () => {

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

    console.log(
      "Budget Response:",
      data
    );

    if (res.ok) {

      setBudgetCategory("");
      setBudgetAmount("");

      fetchBudgets();

      toast.success(
        "Budget Created Successfully"
      );

    } else {

      toast.error(
        data.message ||
        "Failed to create budget"
      );

    }

  } catch (error) {

    console.log(
      "Create Budget Error:",
      error
    );

    toast.error(
      "Something went wrong"
    );

  }

};

const createGoal =
async () => {
  try {
    const res =
      await fetch(
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
    "🎯 Goal created"
     );

      setGoalTitle("");
      setGoalTarget("");
      setGoalDeadline("");

      await fetchGoals();
      await fetchActivities();

      toast.success(
"Goal Created"
);
    }
  } catch (error) {
    console.log(error);
    toast.error(
    "Something went wrong"
  );
  }
};

const exportReport = () => {

  const doc = new jsPDF();

  doc.setFontSize(20);

  doc.text(
    "SpendWiseFamily Report",
    14,
    20
  );

  doc.setFontSize(12);

  doc.text(
    `Generated: ${
      new Date()
        .toLocaleDateString()
    }`,
    14,
    30
  );

  /* Expenses */

  autoTable(doc, {

    startY: 40,

    head: [[
      "Title",
      "Category",
      "Amount"
    ]],

    body: expenses.map(
      (expense) => [

        expense.title,

        expense.category,

        `{formatCurrency(
  expense.amount
)}`

      ]
    ),

  });

  /* Goals */

  autoTable(doc, {

    startY:
      doc.lastAutoTable
        .finalY + 15,

    head: [[
      "Goal",
      "Saved",
      "Target"
    ]],

    body: goals.map(
      (goal) => [

        goal.title,

        `{formatCurrency(
  goal.savedAmount
)}`,

        `{formatCurrency(
  goal.targetAmount
)}`

      ]
    ),

  });

  /* Budgets */

  autoTable(doc, {

    startY:
      doc.lastAutoTable
        .finalY + 15,

    head: [[
      "Category",
      "Budget"
    ]],

    body: budgets.map(
      (budget) => [

        budget.category,

        `₹${budget.amount}`

      ]
    ),

  });

  doc.save(
    "SpendWise_Report.pdf"
  );

  toast.success(
    "📄 Report Downloaded"
  );

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

      if (
        data.savedAmount >=
        data.targetAmount
      ) {
        toast.success(
          "Goal Achieved!"
        );
      } else {
        toast.success(
          "Savings Added"
        );
      }

      setSavingAmounts(
        (prev) => ({
          ...prev,
          [goalId]: "",
        })
      );

      fetchGoals();
      fetchActivities();
    }

  } catch (error) {

    console.log(error);

    toast.error(
      "Something went wrong"
    );
  }
};

  const deleteGoal =
  async (goalId) => {
    try {
      const res =
        await fetch(
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
    "Goal deleted"
     ); 
        fetchGoals();
        await fetchActivities();
      }
    } catch (error) {
      console.log(error);
      toast.error(
    "Something went wrong"
  );
    }
  };


const logout = () => {
  localStorage.removeItem("token");
  goHome();
};
  /* ======================
     FILTER LOGIC
  ====================== */

 let filteredExpenses =
  expenses
    .filter((expense) =>
      expense.title
        ?.toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        )
    )
    .sort((a, b) => {

      if (
        sortBy === "highest"
      ) {
        return (
          Number(b.amount) -
          Number(a.amount)
        );
      }

      if (
        sortBy === "lowest"
      ) {
        return (
          Number(a.amount) -
          Number(b.amount)
        );
      }

      if (
        sortBy === "oldest"
      ) {
        return (
          new Date(a.date) -
          new Date(b.date)
        );
      }

      return (
        new Date(b.date) -
        new Date(a.date)
      );

    });

  /* Date Filter */
  const now = new Date();

  filteredExpenses =
    filteredExpenses.filter(
      (item) => {
        const itemDate =
          new Date(item.date);

        if (
          dateFilter ===
          "This Month"
        ) {
          return (
            itemDate.getMonth() ===
              now.getMonth() &&
            itemDate.getFullYear() ===
              now.getFullYear()
          );
        }

        if (
          dateFilter ===
          "Last Month"
        ) {
          const lastMonth =
            new Date(
              now.getFullYear(),
              now.getMonth() -
                1
            );

          return (
            itemDate.getMonth() ===
              lastMonth.getMonth() &&
            itemDate.getFullYear() ===
              lastMonth.getFullYear()
          );
        }

        if (
          dateFilter ===
          "This Year"
        ) {
          return (
            itemDate.getFullYear() ===
            now.getFullYear()
          );
        }

        return true;
      }
    );

    const editExpense = async (
  expense
) => {

  const newTitle = prompt(
    "Edit title",
    expense.title
  );

  if (!newTitle) return;

  try {

    const res =
      await fetch(
        `http://localhost:5000/api/expenses/${expense._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
            Authorization:
              `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...expense,
            title: newTitle,
          }),
        }
      );

    const data =
      await res.json();

    console.log(data);

    fetchExpenses();

  } catch (err) {
    console.log(err);
  }
};

  /* Total */
  const total =
    filteredExpenses.reduce(
      (sum, item) =>
        sum + item.amount,
      0
    );

  const currentUserEmail =
  localStorage.getItem(
    "email"
  );

const currentMember =
  family?.members?.find(
    (member) =>
      member.user?.email ===
      currentUserEmail
  );

  /* ======================
     CHART DATA
  ====================== */

const chartMap = {};

filteredExpenses.forEach(
  (item) => {

    chartMap[
      item.category
    ] =

      (
        chartMap[
          item.category
        ] || 0
      ) +

      Number(
        item.amount
      );

  }
);

  const chartData =
    Object.keys(chartMap).map(
      (key) => ({
        name: key,
        value:
          chartMap[key],
      })
    );

const totalSpent =

  filteredExpenses.reduce(

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

const topCategory =
  chartData.length > 0
    ? [...chartData].sort(
        (a, b) =>
          b.value - a.value
      )[0]
    : null;

function getSpentAmount(
  category
) {

  return filteredExpenses

    .filter(
      (expense) =>

        expense.category
          ?.toLowerCase() ===

        category
          ?.toLowerCase()

    )

    .reduce(
      (
        total,
        expense
      ) =>

        total +
        Number(
          expense.amount
        ),

      0
    );

}

    const memberMap = {};

filteredExpenses.forEach(
  (expense) => {
    const email =
      expense.user?.email ||
      "Unknown";

    if (memberMap[email]) {
      memberMap[email] +=
        expense.amount;
    } else {
      memberMap[email] =
        expense.amount;
    }
  }
);

const memberChartData =
  Object.keys(memberMap).map(
    (email) => ({
      name: email,
      amount:
        memberMap[email],
    })
  );

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
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }
  ).format(
    Number(amount) || 0
  );

};
  /* ======================
     PDF REPORT
  ====================== */

  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text(
      "SpendWiseFamily Expense Report",
      14,
      20
    );

    doc.setFontSize(12);

    doc.text(
      `Total Expenses: {formatCurrency(total)}`,
      14,
      30
    );

    doc.text(
      `Generated: ${new Date().toLocaleDateString()}`,
      14,
      38
    );

    const rows =
      filteredExpenses.map(
        (item) => [
          item.title,
          item.category,
          `₹${item.amount}`,
          new Date(
            item.date
          ).toLocaleDateString(),
        ]
      );

    autoTable(doc, {
      startY: 48,
      head: [
        [
          "Title",
          "Category",
          "Amount",
          "Date",
        ],
      ],
      body: rows,
    });

    doc.save(
      "expense-report.pdf"
    );
  };

  const getCategorySpent = (
  category
) => {

  return expenses
    .filter(
      (expense) =>
        expense.category ===
        category
    )
    .reduce(
      (total, expense) =>
        total +
        Number(
          expense.amount
        ),
      0
    );

};

const monthlyData = expenses.reduce(
  (acc, expense) => {

    const month =
      new Date(
        expense.date
      ).toLocaleString(
        "default",
        {
          month: "short",
        }
      );

    const existing =
      acc.find(
        (item) =>
          item.month === month
      );

    if (existing) {

      existing.amount +=
        Number(
          expense.amount
        );

    } else {

      acc.push({
        month,
        amount: Number(
          expense.amount
        ),
      });

    }

    return acc;

  },
  []
);

const getAIAdvice = async () => {

  try {

    setLoadingAI(true);

    toast.loading(

      "Generating AI insights...",

      {

        id: "ai",

      }

    );

    const res = await fetch(

      "http://localhost:5000/api/ai/recommend",

      {

        method: "POST",

        headers: {

          "Content-Type":

            "application/json",

          Authorization:

            `Bearer ${token}`,

        },

        body: JSON.stringify({

          expenses,

          goals,

          budgets,

        }),

      }

    );

    const data = await res.json();

    if (res.ok) {

      setAiAdvice(

        data.recommendation

      );

      toast.success(

        "AI insights generated",

        {

          id: "ai",

        }

      );

    } else {

      setAiAdvice(

        "AI insights are currently unavailable. Please try again later."

      );

      toast.error(

        data.message ||

          "AI service unavailable",

        {

          id: "ai",

        }

      );

    }

  } catch (error) {

    console.log(error);

    setAiAdvice(

`📊 Financial Summary

• Track spending regularly.

• Focus on your highest spending category.

• Continue contributing towards active savings goals.

• Maintain a monthly budget for better financial discipline.

⚠️ AI service is temporarily unavailable.`

    );

    toast.error(

      "AI service unavailable",

      {

        id: "ai",

      }

    );

  } finally {

    setLoadingAI(false);

  }

};

  const budgetScore =
  budgets.length > 0
    ? 10
    : 5;

const goalScore =
  goals.length > 0
    ? 10
    : 5;

const expenseScore =
  total > 0
    ? 8
    : 5;

const healthScore = (
  (
    budgetScore +
    goalScore +
    expenseScore
  ) / 3
).toFixed(1);

  return (
  <div className="dash-page">

{/* Navbar */}

<Navbar

activities={activities}

showNotifications={
  showNotifications
}

setShowNotifications={
  setShowNotifications
}

darkMode={darkMode}

setDarkMode={
  setDarkMode
}

logout={logout}

exportReport={
  exportReport
}

currentMember={
  currentMember
}

/>

<div className="dashboard-layout">

  {/* Sidebar */}

  <Sidebar

activeSection={activeSection}

setActiveSection={setActiveSection}

/>

  {/* Content Area */}

<main className="content-area">

{/* Dashboard */}

{activeSection ===
"dashboard" && (

<Summary

total={total}

familyMembers={familyMembers}

goals={goals}

healthScore={healthScore}

formatCurrency={formatCurrency}

exportReport={exportReport}

setActiveSection={setActiveSection}

topCategory={topCategory}

/>

)}


{/* Expenses */}

{activeSection ===
"expenses" && (

<>

<ExpenseForm

onAdd={async () => {

await fetchExpenses();

await fetchActivities();

}}

/>

<ExpenseList

expenses={filteredExpenses}

deleteExpense={deleteExpense}

updateExpense={updateExpense}

/>

</>

)}


{/* Budgets */}

{activeSection ===
"budgets" && (

<BudgetSection

budgetCategory={
budgetCategory
}

setBudgetCategory={
setBudgetCategory
}

budgetAmount={
budgetAmount
}

setBudgetAmount={
setBudgetAmount
}

createBudget={
createBudget
}

budgets={
budgets
}

getSpentAmount={
getSpentAmount
}

/>

)}


{/* Goals */}

{activeSection ===
"goals" && (

<GoalsSection

goals={goals}

goalTitle={
goalTitle
}

setGoalTitle={
setGoalTitle
}

goalAmount={
goalTarget
}

setGoalAmount={
setGoalTarget
}

goalDeadline={
goalDeadline
}

setGoalDeadline={
setGoalDeadline
}

createGoal={
createGoal
}

addSavings={
addSavings
}

deleteGoal={
deleteGoal
}

savingAmounts={
savingAmounts
}

setSavingAmounts={
setSavingAmounts
}

/>

)}


{/* Family */}

{activeSection ===
"family" && (

<FamilyCard

family={family}

familyMembers={
familyMembers
}

familyName={
familyName
}

setFamilyName={
setFamilyName
}

inviteCode={
inviteCode
}

setInviteCode={
setInviteCode
}

createFamily={
createFamily
}

joinFamily={
joinFamily
}

/>

)}


{/* Analytics */}

{activeSection ===
"analytics" && (

<AnalyticsSection

chartData={
chartData
}

monthlyData={
monthlyData
}

memberChartData={
memberChartData
}

/>

)}


{/* AI */}

{activeSection ===
"ai" && (

<AISection

  getAIAdvice={

    getAIAdvice

  }

  aiAdvice={

    aiAdvice

  }

  loadingAI={

    loadingAI

  }

/>

)}


{/* Activity */}

{activeSection ===
"activity" && (

<ActivitySection

activities={
activities
}

/>

)}

</main>
</div>

</div>
  );
}

export default Dashboard;