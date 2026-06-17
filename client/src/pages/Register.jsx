import { useState } from "react";
import "../App.css";

function Register({ goToLogin }) {

  const [firstName, setFirstName] = useState("");

  const [lastName, setLastName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password
    ) {

      alert("Please fill all fields");

      return;
    }

    try {

      setLoading(true);

      console.log({
        firstName,
        lastName,
        email,
        password,
      });

      const res = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            firstName,
            lastName,
            email,
            password,
          }),
        }
      );

      const data =
        await res.json();

      if (res.ok) {

        alert(
          "Registration successful"
        );

        goToLogin();

      } else {

        alert(
          data.message
        );
      }

    } catch (error) {

      console.log(error);

      alert(
        "Server Error"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="auth-page">

      <div className="auth-box">

        <h2>
          Create Account
        </h2>

        <p className="auth-subtitle">

          Start managing family finances smarter

        </p>

        <input
          type="text"

          placeholder="First Name"

          value={firstName}

          onChange={(e) =>

            setFirstName(
              e.target.value
            )

          }
        />

        <input
          type="text"

          placeholder="Last Name"

          value={lastName}

          onChange={(e) =>

            setLastName(
              e.target.value
            )

          }
        />

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

          placeholder="Password"

          value={password}

          onChange={(e) =>

            setPassword(
              e.target.value
            )

          }
        />

        <button

          className="primary-btn auth-btn"

          onClick={handleRegister}

          disabled={loading}

        >

          {loading

            ? "Creating..."

            : "Create Account"}

        </button>

        <p className="switch-text">

          Already have an account?

          <span

            className="link-text"

            onClick={goToLogin}

          >

            Login

          </span>

        </p>

      </div>

    </div>

  );

}

export default Register;