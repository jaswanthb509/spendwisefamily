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

import "../App.css";
import toast from "react-hot-toast";

function Dashboard({ goHome, darkMode, setDarkMode }) {
  const [expenses, setExpenses] = useState([]);
  const [budgets,setBudgets] = useState([]);

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

const [activities, setActivities] =
  useState([]);

const [
  editingExpense,
  setEditingExpense
] = useState(null);

const [editTitle,
  setEditTitle] =
  useState("");

const [editAmount,
  setEditAmount] =
  useState("");

const [editCategory,
  setEditCategory] =
  useState("");

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
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();
    console.log(data);

    if (res.ok) {
      setExpenses(data);
    }
    console.log("Expenses,data");
  } catch (error) {
    console.log(error);
     toast.error(
    "Something went wrong"
  );
  }
};

const updateExpense = async () => {
  try {

    const res = await fetch(
      `http://localhost:5000/api/expenses/${editingExpense._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
       body: JSON.stringify({
       title: editTitle,
       amount: editAmount,
       category: editCategory,
      })
      }
    );

    if (res.ok) {

      toast.success(
        "Expense Updated"
      );

      // clear edit mode
      setEditingExpense(null);

      // clear form
      setTitle("");
      setAmount("");
      setCategory("");

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

      fetchGoals();

      alert(
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
          "🏆 Goal Achieved!"
        );
      } else {
        toast.success(
          "💰 Savings Added"
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

    getExpenses();

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

 const getAIAdvice =
  async () => {
    try {
      toast.loading(
        "Generating AI insights...",
        {
          id: "ai",
        }
      );

      const res =
        await fetch(
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

      const data =
        await res.json();

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
    }
  };

  return (
  <div className="dash-page">

  {/* Navbar */}
  <nav className="dash-nav">

    <h2 className="dash-logo">
      SpendWiseFamily.
    </h2>

    <div className="nav-right">

      {/* Profile */}

      <div className="profile-card">

        <div className="profile-avatar">

          {
            localStorage
              .getItem("email")
              ?.charAt(0)
              .toUpperCase()
          }

        </div>

        <div>

          <h4>
            {
              localStorage.getItem(
                "email"
              )
            }
          </h4>

          <span>

  {currentMember?.role ===
  "admin"
    ? "👑 Admin"
    : "👤 Member"}

</span>

        </div>

      </div>

      {/* Notifications */}

      <div className="notification-wrapper">

        <button
          className="notification-btn"
          onClick={() =>
            setShowNotifications(
              !showNotifications
            )
          }
        >
          🔔

          {activities.length > 0 && (

            <span
              className="notification-count"
            >
              {activities.length}
            </span>

          )}

        </button>

        {showNotifications && (

          <div
            className="notification-dropdown"
          >

            <h4>
              Notifications
            </h4>

            {activities.length ===
            0 ? (

              <p>
                No notifications
              </p>

            ) : (

              activities
                .slice(0, 5)
                .map(
                  (
                    activity
                  ) => (

                    <div
                      key={
                        activity._id
                      }
                      className="notification-item"
                    >

                      <p>
                        {
                          activity.action
                        }
                      </p>

                    </div>

                  )
                )

            )}

          </div>

        )}

      </div>

      {/* Dark Mode */}

      <button
        className="theme-btn"
        onClick={() =>
          setDarkMode(
            !darkMode
          )
        }
      >
        {darkMode
          ? "☀️"
          : "🌙"}
      </button>

      {/* Logout */}

      <button
        className="logout-btn"
        onClick={logout}
      >
        Logout
      </button>

      <button
  className="export-btn"
  onClick={exportReport}
>
  📄 Export
</button>

    </div>

  </nav>

  {/* Header */}

  <div className="dash-header">

  <div className="welcome-card">

    <div className="welcome-top">

      <div>

        <h1>
          Welcome Back...
        </h1>

        <p>
          Manage expenses, budgets,
          savings goals and family
          finances in one place.
        </p>

      </div>

      <div className="welcome-badge">
        A Smart Finance Tracker
      </div>

    </div>

    <div className="welcome-stats">

      <div className="welcome-stat-card">

        <div className="stat-icon">
          💸
        </div>

        <div>

          <h3>
            {formatCurrency(total)}
          </h3>

          <span>
            Total Expenses
          </span>

        </div>

      </div>

      <div className="welcome-stat-card">

        <div className="stat-icon">
          👨‍👩‍👧‍👦
        </div>

        <div>

          <h3>
            {familyMembers.length}
          </h3>

          <span>
            Family Members
          </span>

        </div>

      </div>

      <div className="welcome-stat-card">

        <div className="stat-icon">
          🎯
        </div>

        <div>

          <h3>
            {goals.length}
          </h3>

          <span>
            Active Goals
          </span>

        </div>

      </div>

    </div>

  </div>

</div>

<div className="quick-actions">

  <button
    className="quick-btn"
    onClick={() =>
      document
        .getElementById(
          "expense-section"
        )
        ?.scrollIntoView({
          behavior:
            "smooth",
        })
    }
  >
    ➕ Expense
  </button>

  <button
    className="quick-btn"
    onClick={() =>
      document
        .getElementById(
          "goal-section"
        )
        ?.scrollIntoView({
          behavior:
            "smooth",
        })
    }
  >
    🎯 Goals
  </button>

  <button
    className="quick-btn"
    onClick={() =>
      document
        .getElementById(
          "family-section"
        )
        ?.scrollIntoView({
          behavior:
            "smooth",
        })
    }
  >
    👨‍👩‍👧 Family
  </button>

  <button
    className="quick-btn"
    onClick={exportReport}
  >
    📄 Export
  </button>

</div>

<div
  className="stat-card"
  style={{
    marginTop: "20px",
  }}
>
  <h2>
    Budget Tracking
  </h2>

  <select
    value={
      budgetCategory
    }
    onChange={(e) =>
      setBudgetCategory(
        e.target.value
      )
    }
  >
    <option value="">
      Category
    </option>

    <option value="Food">
      Food
    </option>

    <option value="Bills">
      Bills
    </option>

    <option value="Travel">
      Travel
    </option>

    <option value="Shopping">
      Shopping
    </option>
  </select>

  <input
    type="number"
    placeholder="Budget Amount"
    value={
      budgetAmount
    }
    onChange={(e) =>
      setBudgetAmount(
        e.target.value
      )
    }
  />

  <button
    className="main-btn"
    onClick={
      createBudget
    }
  >
    Set Budget
  </button>
</div>

<div
  className="stat-card"
  style={{
    marginTop: "20px",
  }}
>
  <h2>
    💰 Budget Tracking
  </h2>

  {budgets.length === 0 ? (

    <p>
      No budgets added yet
    </p>

  ) : (

    budgets.map((budget) => {

      const spent =
        getSpentAmount(
          budget.category
        );

      const percentage =
        Math.min(
          (
            spent /
            budget.amount
          ) * 100,
          100
        );

      const remaining =
        budget.amount -
        spent;

      return (

        <div
          key={budget._id}
          className="budget-card"
        >

          <div className="budget-header">

            <h3>
              {budget.category}
            </h3>

            <span>
              ₹{budget.amount}
            </span>

          </div>

          <p className="budget-text">

            {formatCurrency(
  spent
)}
            {" / "}
           {formatCurrency(
  budget.amount
)}

          </p>

          <div className="budget-progress">

            <div
              className={`budget-fill ${
                percentage >= 100
                  ? "danger"
                  : percentage >= 80
                  ? "warning"
                  : "safe"
              }`}
              style={{
                width:
                  `${percentage}%`,
              }}
            />

          </div>

          <div className="budget-footer">

            <span>
              Remaining:
              {formatCurrency(
  budget.amount -
  spent
)}
            </span>

            {percentage >=
            100 ? (

              <span className="budget-danger">
                🚨 Exceeded
              </span>

            ) : percentage >=
              80 ? (

              <span className="budget-warning">
                ⚠️ Near Limit
              </span>

            ) : (

              <span className="budget-safe">
                ✅ On Track
              </span>

            )}

          </div>

        </div>

      );

    })

  )}

</div>

<div className="chart-card">

  <h2>
    📈 Monthly Expense Trend
  </h2>

  <ResponsiveContainer
    width="100%"
    height={350}
  >

    <LineChart
      data={monthlyData}
    >

      <CartesianGrid
        strokeDasharray="3 3"
      />

      <XAxis
        dataKey="month"
      />

      <YAxis />

      <Tooltip />

      <Legend />

      <Line
        type="monotone"
        dataKey="amount"
        stroke="#2563eb"
        strokeWidth={3}
      />

    </LineChart>

  </ResponsiveContainer>

</div>

<div className="stat-card">

  <h2>
    Savings Goals
  </h2>

  <input
    type="text"
    placeholder="Goal Name"
    value={goalTitle}
    onChange={(e) =>
      setGoalTitle(
        e.target.value
      )
    }
  />

  <input
    type="number"
    placeholder="Target Amount"
    value={goalTarget}
    onChange={(e) =>
      setGoalTarget(
        e.target.value
      )
    }
  />

  <input
    type="date"
    value={goalDeadline}
    onChange={(e) =>
      setGoalDeadline(
        e.target.value
      )
    }
  />

  <button
    className="main-btn"
    onClick={
      createGoal
    }
  >
    Create Goal
  </button>

</div>

<div className="goals-section">

  <h2 className="section-title">
    🎯 Goal Progress
  </h2>

  {goals.map((goal) => {

    const percentage = Math.min(
      (goal.savedAmount /
        goal.targetAmount) *
        100,
      100
    );

    const daysLeft =
      goal.deadline
        ? Math.ceil(
            (new Date(goal.deadline) -
              new Date()) /
              (1000 * 60 * 60 * 24)
          )
        : null;

    return (

      <div
        className="goal-card"
        key={goal._id}
      >

        <div className="goal-header">

          <div>

            <h3>{goal.title}</h3>

            <p className="goal-amount">
              ₹{goal.savedAmount.toLocaleString()}
              {" / "}
              ₹{goal.targetAmount.toLocaleString()}
            </p>

          </div>

          <button
            className="delete-btn"
            onClick={() => {

              if (
                window.confirm(
                  "Delete this goal?"
                )
              ) {
                deleteGoal(goal._id);
              }

            }}
          >
            🗑 Delete
          </button>

        </div>

        {daysLeft === 0 && (
          <p className="deadline-warning">
            ⚠️ Deadline Today
          </p>
        )}

        {daysLeft > 0 && (
          <p className="deadline-normal">
            ⏳ {daysLeft} days left
          </p>
        )}

        {daysLeft < 0 && (
          <p className="deadline-overdue">
            🚨 Goal Overdue
          </p>
        )}

        <div className="progress-bar">

          <div
            className={`progress-fill ${
              percentage >= 100
                ? "success"
                : percentage >= 80
                ? "good"
                : percentage >= 50
                ? "medium"
                : "low"
            }`}
            style={{
              width: `${percentage}%`,
            }}
          />

        </div>

        <div className="progress-label">
          {percentage.toFixed(0)}%
          Complete
        </div>

        {goal.savedAmount >=
        goal.targetAmount ? (

          <div className="goal-achieved">
            🏆 Goal Achieved
          </div>

        ) : (

          <div className="savings-row">

            <input
              type="number"
              placeholder="Add savings"
              value={
                savingAmounts[
                  goal._id
                ] || ""
              }
              onChange={(e) =>
                setSavingAmounts({
                  ...savingAmounts,
                  [goal._id]:
                    e.target.value,
                })
              }
            />

            <button
              className="main-btn"
              onClick={() =>
                addSavings(
                  goal._id,
                  savingAmounts[
                    goal._id
                  ]
                )
              }
            >
              Add Savings
            </button>

          </div>

        )}

      </div>

    );

  })}

</div>

<div
  className="stat-card"
  style={{
    marginTop: "30px",
  }}
>
  <h2>
    📋 Recent Activity
  </h2>

  {activities.length > 0 ? (

    activities.map(
      (activity) => (

        <div
          key={activity._id}
          className="activity-card"
        >

          <div
            className="activity-icon"
          >

            {activity.action?.includes(
              "added"
            )
              ? "➕"
              : activity.action?.includes(
                  "updated"
                )
              ? "✏️"
              : activity.action?.includes(
                  "deleted"
                )
              ? "🗑️"
              : activity.action?.includes(
                  "goal"
                )
              ? "🎯"
              : "📌"}

          </div>

          <div
            className="activity-content"
          >

            <h4>

              {activity.user?.email ===
              family?.admin?.email
                ? "👑 "
                : "👤 "}

              {activity.user?.email ||
                "Family Member"}

            </h4>

            <p>
              {activity.action}
            </p>

            <span>

              🕒{" "}

              {new Date(
                activity.createdAt
              ).toLocaleString()}

            </span>

          </div>

        </div>

      )
    )

  ) : (

    <div
      className="empty-state"
    >

      <h3>
        📭 No Activities Yet
      </h3>

      <p>
        Start adding
        expenses, goals
        and savings to
        see activity here.
      </p>

    </div>

  )}
</div>

<div
  className="stat-card"
  style={{
    marginTop: "20px",
  }}
>
  <h2>Add Expense</h2>

  <input
    type="text"
    placeholder="Title"
    value={title}
    onChange={(e) =>
      setTitle(e.target.value)
    }
  />

  <input
    type="number"
    placeholder="Amount"
    value={amount}
    onChange={(e) =>
      setAmount(e.target.value)
    }
  />

  <select
    value={category}
    onChange={(e) =>
      setCategory(
        e.target.value
      )
    }
  >
    <option value="">
      Select Category
    </option>

    <option value="Food">
      Food
    </option>

    <option value="Bills">
      Bills
    </option>

    <option value="Travel">
      Travel
    </option>

    <option value="Shopping">
      Shopping
    </option>
  </select>

 <button
  className="main-btn"
  onClick={addExpense}
>
  Add Expense
</button>
</div>

      {/* Filters + PDF */}
      <div
        style={{
          display: "flex",
          gap: "15px",
          marginTop: "20px",
          flexWrap:
            "wrap",
        }}
      >
        <select
          value={filter}
          onChange={(e) =>
            setFilter(
              e.target.value
            )
          }
        >
          <option>All</option>
          <option>Food</option>
          <option>Bills</option>
          <option>Travel</option>
          <option>
            Shopping
          </option>
        </select>

        <select
          value={dateFilter}
          onChange={(e) =>
            setDateFilter(
              e.target.value
            )
          }
        >
          <option>
            All Time
          </option>
          <option>
            This Month
          </option>
          <option>
            Last Month
          </option>
          <option>
            This Year
          </option>
        </select>

        <button
          className="main-btn"
          onClick={
            downloadPDF
          }
        >
          Download PDF
        </button>
      </div>

      <div
  style={{
    marginTop: "20px",
  }}
>

  <button
    className="main-btn"
    onClick={getAIAdvice}
  >
    🤖 Generate AI Insights
  </button>

  {aiAdvice && (

    <div
      className="ai-card"
    >

      <div className="ai-header">

        <h2>
          🤖 AI Financial Insights
        </h2>

        <span className="ai-badge">
          Powered by Gemini
        </span>

      </div>

      <div
        className="ai-content"
        dangerouslySetInnerHTML={{
          __html: aiAdvice,
        }}
      />

    </div>

  )}

</div>

      {/* Chart */}
      <div className="chart-card">
        <h2>
          Expense Analytics
        </h2>

       <ResponsiveContainer
  width="100%"
  height={320}
>
  <PieChart>
    <Pie
      data={chartData}
      cx="50%"
      cy="50%"
      outerRadius={110}
      dataKey="value"
      label
    >
      {chartData.map(
        (
          entry,
          index
        ) => (
          <Cell
            key={index}
            fill={
              COLORS[
                index %
                  COLORS.length
              ]
            }
          />
        )
      )}
    </Pie>

    <Tooltip />
    <Legend />
  </PieChart>
</ResponsiveContainer>
      </div>

      <div className="chart-card">
  <h2>
    Member Spending
  </h2>

  <ResponsiveContainer
  width="100%"
  height={300}
>
  <BarChart
    data={memberChartData}
  >
    <CartesianGrid
      strokeDasharray="3 3"
    />

    <XAxis
      dataKey="name"
    />

    <YAxis />

    <Tooltip />

    <Bar
      dataKey="amount"
      fill="#2563eb"
    />
  </BarChart>
</ResponsiveContainer>
</div>

<div
  className="ai-card"
  style={{
    marginTop: "20px",
  }}
>
  <h2>
    AI Insights
  </h2>

  <p>
    Total Family Spending:
    {formatCurrency(total)}
  </p>

  {topCategory && (
    <p>
      Highest Spending:
      {topCategory.name}
      (₹{topCategory.value})
    </p>
  )}

  <p>
    Recommendation:
    Reduce spending in
    your highest category
    by 10%.
  </p>
</div>

{editingExpense && (
  <div
    className="stat-card"
    style={{
      marginTop: "20px",
    }}
  >
    <h2>Edit Expense</h2>

    <input
      type="text"
      placeholder="Title"
      value={editTitle}
      onChange={(e) =>
        setEditTitle(e.target.value)
      }
    />

    <input
      type="number"
      placeholder="Amount"
      value={editAmount}
      onChange={(e) =>
        setEditAmount(e.target.value)
      }
    />

    <select
      value={editCategory}
      onChange={(e) =>
        setEditCategory(e.target.value)
      }
    >
      <option value="Food">
        Food
      </option>

      <option value="Bills">
        Bills
      </option>

      <option value="Shopping">
        Shopping
      </option>

      <option value="Travel">
        Travel
      </option>
    </select>

    <button
      onClick={updateExpense}
      className="main-btn"
    >
      Save Changes
    </button>

    <button
      className="delete-btn"
      onClick={() => {
        setEditingExpense(null);
        setEditTitle("");
        setEditAmount("");
        setEditCategory("");
      }}
    >
      Cancel
    </button>
  </div>
)}

<input
  type="text"
  placeholder="🔍 Search Expenses"
  value={searchTerm}
  onChange={(e) =>
    setSearchTerm(e.target.value)
  }
/>

<select
  value={sortBy}
  onChange={(e) =>
    setSortBy(e.target.value)
  }
>
  <option value="latest">
    Latest First
  </option>

  <option value="oldest">
    Oldest First
  </option>

  <option value="highest">
    Highest Amount
  </option>

  <option value="lowest">
    Lowest Amount
  </option>
</select>


      
      {/* Expense List */}
<div
  style={{
    marginTop: "30px",
  }}
>
  {expenses.map((expense) => (

  <div
    key={expense._id}
    className="expense-card"
  >

    <div>

      <h3>
        {expense.title}
      </h3>

      <p>
        {expense.category}
      </p>

      <small>
        Added by:
        {" "}
        {expense.user?.email}
      </small>

    </div>

    <div className="expense-actions">

  <h2 className="expense-amount">
    ₹{expense.amount}
  </h2>

  <button
  className="edit-btn"
  onClick={() => {

    setEditTitle(expense.title);

    setEditAmount(expense.amount);

    setEditCategory(expense.category);

    setEditingExpense(expense);

    
  }}
>
  Edit
</button>

  <button
    className="delete-btn"
    onClick={() => deleteExpense(expense._id)}
  >
    Delete
  </button>

</div>

  </div>

))}
  
    
  
</div>

</div>
  );
}

export default Dashboard;