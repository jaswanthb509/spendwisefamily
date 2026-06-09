import { useState } from "react";
import "./App.css";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {
  const [page, setPage] =
    useState(
      localStorage.getItem(
        "token"
      )
        ? "dashboard"
        : "home"
    );

  const handleLogout = () => {
    localStorage.removeItem(
      "token"
    );

    setPage("home");
  };

  return (
    <div className="app">

      {/* HOME */}
      {page === "home" && (
        <div className="home-page">

          <nav className="navbar">
            <h2 className="logo">
              SpendWiseFamily.
            </h2>

            <div className="nav-actions">
              <button
                className="nav-btn"
                onClick={() =>
                  setPage(
                    "login"
                  )
                }
              >
                Login
              </button>

              <button
                className="primary-btn"
                onClick={() =>
                  setPage(
                    "register"
                  )
                }
              >
                Get Started
              </button>
            </div>
          </nav>

          <section className="hero">
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
                  setPage(
                    "register"
                  )
                }
              >
                Start Free
              </button>

              <button
                className="secondary-btn"
                onClick={() =>
                  setPage(
                    "login"
                  )
                }
              >
                Login
              </button>
            </div>
          </section>

          <section className="features">

            <div className="card">
              <h3>
                Expense Tracking
              </h3>
              <p>
                Add and manage
                expenses easily.
              </p>
            </div>

            <div className="card">
              <h3>
                Smart Charts
              </h3>
              <p>
                Visual analytics
                of spending.
              </p>
            </div>

            <div className="card">
              <h3>
                PDF Reports
              </h3>
              <p>
                Export reports
                anytime.
              </p>
            </div>

          </section>

          <footer className="footer">
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
            setPage(
              "register"
            )
          }
          goToDashboard={() =>
            setPage(
              "dashboard"
            )
          }
        />
      )}

      {/* REGISTER */}
      {page === "register" && (
        <Register
          goToLogin={() =>
            setPage(
              "login"
            )
          }
        />
      )}

      {/* DASHBOARD */}
      {page ===
        "dashboard" && (
        <Dashboard
          goHome={
            handleLogout
          }
        />
      )}

    </div>
  );
}

export default App;