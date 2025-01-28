import React, { useState } from "react";
import BASEURL from "../../baseUrl.js";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const email = sessionStorage.getItem("temp-email");
      const response = await fetch(`${BASEURL}/auth/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      
      if (response.ok) {
        localStorage.setItem("reset", "true");
      } else {
        setErrorMessage(result.message);
      }
    } catch (err) {
      setErrorMessage("An error occurred. Please try again.");
    }
    window.location.href = "/auth/login";
  };

  return (
    <div className="login-page-overlay">
      <div className="login-page">
        <h2 className="login-title">Create a new password</h2>

        {errorMessage && <div id="error-message" className="error-message">{errorMessage}</div>}

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="password"></label>
            <input
              type="password"
              placeholder="Enter your new password"
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
      </div>
    </div>
  );
};

export default ResetPasswordPage;
