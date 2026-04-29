import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend
} from "recharts";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import "../App.css";

function Dashboard({ goHome }) {
  const [expenses, setExpenses] = useState([]);
  const [filter, setFilter] = useState("All");
  const [dateFilter, setDateFilter] =
    useState("All Time");

  const token =
    localStorage.getItem("token");

  useEffect(() => {
    fetchExpenses();
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

      const data = await res.json();

      if (res.ok) {
        setExpenses(data);
      }

    } catch (error) {
      console.log(error);
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
      <div className="dash-header">
        <h1>Dashboard 👋</h1>

        <p>
          Smart family finance
          insights
        </p>
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

      {/* Chart */}
      <div
        style={{
          background:
            "white",
          padding: "30px",
          borderRadius:
            "16px",
          marginTop: "30px",
        }}
      >
        <h2>
          Expense Analytics
        </h2>

        <PieChart
          width={450}
          height={320}
        >
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
      </div>

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
                  {
                    item.category
                  }
                </p>
              </div>

              <div>
                ₹
                {item.amount}
              </div>
            </div>
          )
        )}
      </div>

    </div>
  );
}

export default Dashboard;