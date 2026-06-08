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
} from "recharts";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { formatDistanceToNow } from "date-fns";

import "../App.css";
import toast from "react-hot-toast";

function Dashboard({ goHome }) {
  const [expenses, setExpenses] = useState([]);
  const [budgets,setBudgets] = useState([]);

const [budgetCategory,setBudgetCategory] = useState("");

const [budgetAmount,setBudgetAmount] = useState("");
  const [filter, setFilter] = useState("All");
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
    console.log("TOKEN =", token);

  const [aiAdvice,setAiAdvice] = useState("");
  const [activities, setActivities] = useState([]);
  const [editingExpense,
  setEditingExpense] =
  useState(null);

const [editTitle,
  setEditTitle] =
  useState("");

const [editAmount,
  setEditAmount] =
  useState("");

const [editCategory,
  setEditCategory] =
  useState("");

 useEffect(() => {
  fetchExpenses();
  fetchFamily();
  fetchBudgets();
  fetchGoals();
  fetchActivities();
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
  } catch (error) {
    console.log(error);
     toast.error(
    "Something went wrong"
  );
  }
};

const updateExpense =
  async () => {
    try {
      const res =
        await fetch(
          `http://localhost:5000/api/expenses/${editingExpense}`,
          {
            method: "PUT",
            headers: {
              "Content-Type":
                "application/json",
              Authorization:
                `Bearer ${token}`,
            },
            body: JSON.stringify({
              title:
                editTitle,
              amount:
                editAmount,
              category:
                editCategory,
            }),
          }
        );

      if (res.ok) {

      toast.success(
      "🗑 Expense updated"
      );

        setEditingExpense(
          null
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
  } catch (error) {
    console.log(error);
     toast.error(
    "Something went wrong"
  );
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
  "Activities:",
  data
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

const createBudget =
async () => {
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
      setBudgetCategory("");
      setBudgetAmount("");

      fetchBudgets();

      alert(
        "Budget Created"
      );
    }
  } catch (error) {
    console.log(error);
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

const addSavings =
  async (
    goalId,
    amount
  ) => {
    try {
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
      "💰 Savings added"
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

  let filteredExpenses = [...expenses];

  /* Category Filter */
  if (filter !== "All") {
    filteredExpenses =
      filteredExpenses.filter(
        (item) =>
          item.category
            .toLowerCase()
            ===
          filter.toLowerCase()
      );
  }

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

  /* Total */
  const total =
    filteredExpenses.reduce(
      (sum, item) =>
        sum + item.amount,
      0
    );

  /* ======================
     CHART DATA
  ====================== */

  const chartMap = {};

  filteredExpenses.forEach(
    (item) => {
      if (
        chartMap[item.category]
      ) {
        chartMap[
          item.category
        ] += item.amount;
      } else {
        chartMap[
          item.category
        ] = item.amount;
      }
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
  expenses.reduce(
    (sum, expense) =>
      sum + expense.amount,
    0
  );

const topCategory =
  chartData.length > 0
    ? [...chartData].sort(
        (a, b) =>
          b.value - a.value
      )[0]
    : null;

function getSpentAmount(category) {
  return expenses
    .filter(
      (expense) =>
        expense.category?.toLowerCase() ===
        category?.toLowerCase()
    )
    .reduce(
      (total, expense) =>
        total + Number(expense.amount),
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
      `Total Expenses: ₹${total}`,
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
          SpendWiseFamily
        </h2>

        <button
          className="logout-btn"
          onClick={logout}
        >
          Logout
        </button>
      </nav>

      {/* Header */}
      <div className="dashboard-header">
  <div>
    <h1>SpendWise Family</h1>
    <p>
      Manage family expenses
      smarter.
    </p>
  </div>
</div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Expenses</h3>
          <p>₹{total}</p>
        </div>

        <div className="stat-card">
          <h3>Total Entries</h3>
          <p>
            {
              filteredExpenses.length
            }
          </p>
        </div>
      </div>

      <div
  className="stat-card"
  style={{
    marginTop: "20px",
  }}
>
  <h2>
    Family Group
  </h2>

  {!family ? (
    <>

      <input
        type="text"
        placeholder="Family Name"
        value={
          familyName
        }
        onChange={(e) =>
          setFamilyName(
            e.target.value
          )
        }
      />

      <button
        className="main-btn"
        onClick={
          createFamily
        }
      >
        Create Family
      </button>

      <br />
      <br />

      <input
        type="text"
        placeholder="Invite Code"
        value={
          inviteCode
        }
        onChange={(e) =>
          setInviteCode(
            e.target.value
          )
        }
      />

      <button
        className="main-btn"
        onClick={
          joinFamily
        }
      >
        Join Family
      </button>

    </>
  ) : (
    <>
      <p>
        <strong>
          Family:
        </strong>{" "}
        {family.name}
      </p>

      <p>
        <strong>
          Invite Code:
        </strong>{" "}
        {
          family.inviteCode
        }
      </p>

      <h4>
        Members
      </h4>

      {family.members.map(
        (member) => (
          <p
            key={
              member._id
            }
          >
            {
              member.user
                ?.email
            }
            {" "}
            (
            {
              member.role
            }
            )
          </p>
        )
      )}
    </>
  )}
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
    Budget List
  </h2>

{budgets.map(
  (budget) => {
    const spent =
      getSpentAmount(
        budget.category
      );

    const percentage =
      Math.min(
        (
          spent /
          budget.amount
        ) *
          100,
        100
      );

     

    return (
      <div
        key={
          budget._id
        }
        style={{
          marginBottom:
            "20px",
        }}
      >
        <h4>
          {
            budget.category
          }
        </h4>

        <p>
          ₹{spent} /
          ₹
          {
            budget.amount
          }
        </p>

        <div
          style={{
            height:
              "12px",
            background:
              "#ddd",
            borderRadius:
              "20px",
          }}
        >
          <div
            style={{
              width:
                `${percentage}%`,
              height:
                "100%",
              background:
                percentage >
                80
                  ? "red"
                  : "green",
              borderRadius:
                "20px",
            }}
          />
        </div>

        <small>
          Remaining ₹
          {
            budget.amount -
            spent
          }
        </small>
      </div>
    );
  }
)}
</div>

<div className="stats-grid">

  <div className="stat-card">
    <h3>Total Expenses</h3>
    <h1>₹{totalSpent}</h1>
  </div>

  <div className="stat-card">
    <h3>Budgets</h3>
    <h1>{budgets.length}</h1>
  </div>

  <div className="stat-card">
    <h3>Goals</h3>
    <h1>{goals.length}</h1>
  </div>

  <div className="stat-card">
    <h3>Members</h3>
    <h1>{familyMembers.length}</h1>
  </div>

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

<div
  style={{
    marginTop: "20px",
  }}
>
  <h3>Goal Progress</h3>

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
            (new Date(
              goal.deadline
            ) -
              new Date()) /
              (1000 *
                60 *
                60 *
                24)
          )
        : null;

    return (
      <div
        key={goal._id}
        style={{
          marginBottom:
            "25px",
          padding: "15px",
          background:
            "#fff",
          borderRadius:
            "12px",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems:
              "center",
          }}
        >
          <h4>
            {goal.title}
          </h4>

          <button
            onClick={() => {
              if (
                window.confirm(
                  "Are you sure you want to delete this goal?"
                )
              ) {
                deleteGoal(
                  goal._id
                );
              }
            }}
            style={{
              background:
                "#ef4444",
              color: "white",
              border: "none",
              padding:
                "6px 12px",
              borderRadius:
                "6px",
              cursor:
                "pointer",
            }}
          >
            🗑 Delete
          </button>
        </div>

        {/* Deadline */}
        {daysLeft === 0 && (
  <p style={{ color: "orange" }}>
    ⚠️ Deadline Today
  </p>
)}

{daysLeft > 0 && (
  <p>
    ⏳ {daysLeft} days left
  </p>
)}

{daysLeft < 0 && (
  <p style={{ color: "red" }}>
    🚨 Goal Overdue
  </p>
)}
        {/* Amount */}
        <p>
          ₹
          {
            goal.savedAmount
          }
          / ₹
          {
            goal.targetAmount
          }
        </p>

        {/* Progress Bar */}
        <div
          style={{
            height: "12px",
            background:
              "#ddd",
            borderRadius:
              "20px",
          }}
        >
          <div
            style={{
              width:
                `${percentage}%`,
              height:
                "100%",
              background:
                percentage >=
                100
                  ? "green"
                  : percentage >=
                    80
                  ? "#2563eb"
                  : percentage >=
                    50
                  ? "orange"
                  : "red",
              borderRadius:
                "20px",
            }}
          />
        </div>

        <small>
          {percentage.toFixed(
            0
          )}
          % Complete
        </small>

        {/* Goal Achieved */}
        {goal.savedAmount >=
          goal.targetAmount && (
          <div
            style={{
              color:
                "green",
              fontWeight:
                "bold",
              marginTop:
                "10px",
            }}
          >
            🏆 Goal
            Achieved
          </div>
        )}

        <br />

        {/* Savings Input */}
        {goal.savedAmount <
        goal.targetAmount ? (
          <div
            style={{
              marginTop:
                "10px",
              display:
                "flex",
              gap: "10px",
            }}
          >
            <input
              type="number"
              placeholder="Add savings"
              value={
                savingAmounts[
                  goal._id
                ] || ""
              }
              onChange={(
                e
              ) =>
                setSavingAmounts(
                  {
                    ...savingAmounts,
                    [goal._id]:
                      e.target
                        .value,
                  }
                )
              }
            />

            <button
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
        ) : (
          <div
            style={{
              marginTop:
                "10px",
              color:
                "green",
              fontWeight:
                "bold",
            }}
          >
            🎉 Savings
            Complete
          </div>
        )}
      </div>
    );
  })}
</div>

<div
  className="stat-card"
  style={{
    marginTop: "20px",
  }}
>
  <h2>
    📜 Recent Activity
  </h2>

  {Array.isArray(
    activities
  ) &&
  activities.length > 0 ? (
    activities.map(
      (activity) => (
        <div
          key={
            activity._id
          }
          style={{
            marginBottom:
              "10px",
          }}
        >
          <strong>
            {
              activity.user
                ?.email
            }
          </strong>

          <p>
            {
              activity.action
            }
          </p>

          <small>
            {formatDistanceToNow(
              new Date(
                activity.createdAt
              ),
              {
                addSuffix:
                  true,
              }
            )}
          </small>

          <hr />
        </div>
      )
    )
  ) : (
    <p>
      No activities
      found
    </p>
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

      <button
  className="main-btn"
  onClick={
    getAIAdvice
  }
>
  Ask Gemini
</button>

<div
  style={{
    background:
      "#eff6ff",
    padding: "20px",
    borderRadius:
      "12px",
    border:
      "1px solid #bfdbfe",
    marginTop: "10px",
    whiteSpace:
      "pre-wrap",
  }}
>
  {aiAdvice}
</div>

      {/* Chart */}
      <div
        style={{
          background:
            "white",
          padding: "20px",
          borderRadius:
            "16px",
          marginTop: "30px",
        }}
      >
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

      <div
  style={{
    background: "white",
    padding: "20px",
    borderRadius: "16px",
    marginTop: "30px",
    width: "100%",
    overflowX: "auto",
  }}
>
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
  className="stat-card"
  style={{
    marginTop: "20px",
  }}
>
  <h2>
    AI Insights
  </h2>

  <p>
    Total Family Spending:
    ₹{totalSpent}
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
      marginTop:
        "20px",
    }}
  >
    <h2>
      Edit Expense
    </h2>

    <input
      type="text"
      value={editTitle}
      onChange={(e) =>
        setEditTitle(
          e.target.value
        )
      }
    />

    <input
      type="number"
      value={editAmount}
      onChange={(e) =>
        setEditAmount(
          e.target.value
        )
      }
    />

    <select
      value={
        editCategory
      }
      onChange={(e) =>
        setEditCategory(
          e.target.value
        )
      }
    >
      <option>
        Food
      </option>

      <option>
        Bills
      </option>

      <option>
        Travel
      </option>

      <option>
        Shopping
      </option>
    </select>

    <button
      onClick={
        updateExpense
      }
      className="main-btn"
    >
      Save Changes
    </button>
  </div>
)}

      
      {/* Expense List */}
<div
  style={{
    marginTop: "30px",
  }}
>
  {filteredExpenses.map(
    (item) => (
      <div
        key={item._id}
        className="expense-card"
      >
        <div>
          <h4>
            {item.title}
          </h4>

          <p>
            {item.category}
          </p>

          <small>
            Added by:{" "}
            {item.user?.email ||
              "Unknown"}
          </small>
        </div>

        <div
          style={{
            display: "flex",
            alignItems:
              "center",
            gap: "10px",
          }}
        >
          <div>
            ₹{item.amount}
          </div>

          <button
            onClick={() => {
              if (
                window.confirm(
                  "Delete this expense?"
                )
              ) {
                deleteExpense(
                  item._id
                );
              }
            }}
            style={{
              background:
                "#ef4444",
              color: "white",
              border: "none",
              padding:
                "6px 12px",
              borderRadius:
                "6px",
              cursor:
                "pointer",
            }}
          >
            🗑 Delete
          </button>

          <button
  onClick={() => {
    setEditingExpense(
      item._id
    );

    setEditTitle(
      item.title
    );

    setEditAmount(
      item.amount
    );

    setEditCategory(
      item.category
    );
  }}
  style={{
    background:
      "#2563eb",
    color: "white",
    border: "none",
    padding:
      "6px 12px",
    borderRadius:
      "6px",
    cursor:
      "pointer",
  }}
>
  ✏️ Edit
</button>
        </div>
      </div>
    )
  )}
</div>

</div>
  );
}

export default Dashboard;