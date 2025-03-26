import React, { useState } from "react";
import BASEURL from "../../baseUrl.js";

const VerifyEmailPage = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await fetch(`${BASEURL}/auth/verify-email`, {
        // const response = await fetch(`http://localhost:3123/auth/verify-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem("reset", "true");
        sessionStorage.setItem("temp-email", email);
        window.location.href = "/auth/verify-code";
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
        <h2 className="login-title">Confirm your email</h2>

        {errorMessage && (
          <div id="error-message" className="error-message">
            {errorMessage}
          </div>
        )}

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email"></label>
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
            <button type="submit" className="login-btn">
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
