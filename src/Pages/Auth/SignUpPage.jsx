import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BASEURL from "../../baseUrl.js";

const SignUpPage = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset error message

    try {
      const response = await fetch(`${BASEURL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstname, lastname, email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        sessionStorage.setItem("temp-email", email);
        navigate("/auth/verify-code");
      } else {
        setErrorMessage(result.message);
      }
    } catch (err) {
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-page-overlay">
      <div className="login-page">
        <h2 className="login-title">Create an Account</h2>

        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="firstname">First name</label>
            <input
              type="text"
              placeholder="John"
              id="firstname"
              className="input-field"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="lastname">Last name</label>
            <input
              type="text"
              placeholder="Doe"
              id="lastname"
              className="input-field"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Email"
              id="email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Password"
              id="password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <button type="submit" className="login-btn">
              Continue
            </button>
          </div>
        </form>

        <div className="login-footer">
          <p>
            Already have an account?{" "}
            <a href="/auth/login" className="create-account-link">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
