import { useState } from "react";
import "./App.css";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";


function App() {
  const [page, setPage] = useState(
    localStorage.getItem("token")
      ? "dashboard"
      : "home"
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    setPage("home");
  };

const [darkMode, setDarkMode] =
  useState(
    localStorage.getItem("theme")
      === "dark"
  );

  return (
    <div className="app">

      {/* HOME PAGE */}
      {page === "home" && (
        <div className="home-page">

          {/* NAVBAR */}
          <nav className="navbar">

            <h2 className="logo">
              SpendWiseFamily
            </h2>

            <div className="nav-actions">

              <button
                className="nav-btn"
                onClick={() =>{
                  console.log("LOGIN CLICKED")
                  setPage("login")
                }}
              >
                Login
              </button>

              <button
                className="primary-btn"
                onClick={() =>
                  setPage("register")
                }
              >
                Sign Up
              </button>

              <div
className={
darkMode
? "dark-theme"
: ""
}
></div>

            </div>

          </nav>

          {/* HERO */}
          <section className="hero">

            <div className="hero-badge">
              🚀 AI Powered Family Finance Tracker
            </div>

            <h1>
              Manage Family
              Expenses Smarter
            </h1>

            <p>
              Track spending,
              analyze trends,
              save more and
              grow together.
            </p>

            <div className="hero-buttons">

              <button
                className="primary-btn"
                onClick={() =>
                  setPage("register")
                }
              >
                🚀 Start Free
              </button>

            </div>

          </section>

          {/* FEATURES */}
          <section className="features">

            <div className="card">
              <h3>
                💸 Expense Tracking
              </h3>

              <p>
                Add and manage
                family expenses
                effortlessly.
              </p>
            </div>

            <div className="card">
              <h3>
                📊 Smart Analytics
              </h3>

              <p>
                Visual charts
                and spending
                insights.
              </p>
            </div>

            <div className="card">
              <h3>
                🎯 Savings Goals
              </h3>

              <p>
                Create and
                track savings
                goals together.
              </p>
            </div>

            <div className="card">
              <h3>
                🤖 AI Insights
              </h3>

              <p>
                Get intelligent
                recommendations
                for better savings.
              </p>
            </div>

          </section>

 
          {/* CTA */}
          <section
            style={{
              textAlign: "center",
              marginTop: "80px",
            }}
          >

            <h2>
              Ready To Take
              Control Of Your
              Family Finances?
            </h2>

            <br />

            <button
              className="primary-btn"
              onClick={() =>
                setPage("register")
              }
            >
              Get Started
            </button>

          </section>

          {/* FOOTER */}
          <footer className="footer">

            <h2>
              SpendWiseFamily
            </h2>

            <p>
              Expense Tracking •
              Savings Goals •
              Budget Management •
              AI Insights
            </p>

            <p>
              © 2026
              SpendWiseFamily
            </p>

          </footer>

        </div>
      )}

      {/* LOGIN */}
      {page === "login" && (
        <Login
          goToRegister={() =>
            setPage("register")
          }
          goToDashboard={() =>
            setPage("dashboard")
          }
        />
      )}

      {/* REGISTER */}
      {page === "register" && (
        <Register
          goToLogin={() =>
            setPage("login")
          }
        />
      )}

      {/* DASHBOARD */}
      {page === "dashboard" && (
        <Dashboard
  goHome={handleLogout}
  darkMode={darkMode}
  setDarkMode={setDarkMode}
/>
      )}

    </div>
  );
}

export default App;