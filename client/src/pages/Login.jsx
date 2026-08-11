import { useState } from "react";
import "../App.css";

function Login({ goToRegister, goToDashboard }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.DEV
    ? "http://localhost:5000"
    : "https://spendwisefamily-backend.onrender.com";

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      console.log("Login API:", `${API_URL}/api/auth/login`);

      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const data = await res.json();

      console.log("Login response:", data);

      if (res.ok && data.token) {

        localStorage.setItem("token", data.token);

        localStorage.removeItem("guestMode");

        if (data.user?._id) {
          localStorage.setItem("userId", data.user._id);
        }

        if (data.user?.firstName) {
          localStorage.setItem("firstName", data.user.firstName);
        }

        if (data.user?.lastName) {
          localStorage.setItem("lastName", data.user.lastName);
        }

        if (data.user?.email) {
          localStorage.setItem("email", data.user.email);
        }

        if (data.user?.family) {
          localStorage.setItem("family", data.user.family);
        }

        goToDashboard();
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("LOGIN ERROR:", error);

      alert(
        "Unable to connect to the server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">

      <div className="auth-card">

        <h1>Welcome Back</h1>

        <p className="auth-subtitle">
          Manage expenses, savings and family finances in one place.
        </p>

        <div className="auth-form">

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleLogin();
              }
            }}
          />

          <button
            className="primary-btn auth-btn"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </div>

        <p className="auth-footer">
          Don't have an account?{" "}

          <span
            className="link-text"
            onClick={goToRegister}
          >
            Register
          </span>
        </p>

      </div>

    </div>
  );
}

export default Login;