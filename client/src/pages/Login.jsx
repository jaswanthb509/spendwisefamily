import { useState } from "react";
import "../App.css";

function Login({
goToRegister,
goToDashboard,
}) {

const [email, setEmail] =
useState("");

const [password, setPassword] =
useState("");

const handleLogin = async () => {


try {

  const res = await fetch(
    "http://localhost:5000/api/auth/login",
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }
  );

  const data =
    await res.json();

  if (
    res.ok &&
    data.token
  ) {

    localStorage.setItem(
      "token",
      data.token
    );

    localStorage.setItem(
  "email",
  email
);

    goToDashboard();

  } else {

    alert(
      data.message ||
      "Login failed"
    );

  }

} catch (error) {

  console.log(error);

  alert(
    "Something went wrong"
  );

}


};

return (


<div className="auth-page">

  <div className="auth-box">

    <h2>
      Welcome Back
    </h2>

    <p className="auth-subtitle">
      Login to continue managing
      your family finances
    </p>
    

    <input
      type="email"
      placeholder="Email Address"
      value={email}
      onChange={(e) =>
        setEmail(
          e.target.value
        )
      }
    />

    <input
      type="password"
      placeholder="Enter your Password"
      value={password}
      onChange={(e) =>
        setPassword(
          e.target.value
        )
      }
    />

    <button
      className="primary-btn auth-btn"
      onClick={handleLogin}
    >
      Login
    </button>

    <p className="switch-text">
      Don't have an account?

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
