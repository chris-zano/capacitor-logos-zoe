import React, { useState } from "react";
import BASEURL from "../../baseUrl.js";
import { useNavigate } from "react-router-dom";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

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
    } finally {
      navigate("/auth/login");
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-card">
        <h1 className="auth-title">Reset Your Password</h1>
        <p className="auth-subtitle">Please enter your new password below.</p>

        {errorMessage && (
          <div className="auth-error">
            {errorMessage}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="password" className="form-label">New Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter new password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="auth-button">
            Continue
          </button>
        </form>
      </div>
      <style>{`
        .auth-page-container {
          font-family: 'Poppins';
          min-height: 100svh;
          display: flex;
          padding: 0 16px;
        }

        .auth-card {
          width: 100%;
          max-width: 28rem;
          background: white;
          border-top-left-radius: 1rem;
          border-top-right-radius: 1rem;
          padding: 1rem;
        }

        .auth-title {
          font-size: 1.5rem;
          font-weight: 700;
          text-align: center;
          color: #1e293b;
          margin-bottom: 1.5rem;
        }

        .auth-subtitle {
          font-size: 1rem;
          font-weight: 500;
          text-align: center;
          color: #64748b;
          margin-bottom: 1.5rem;
        }

        .auth-error {
          margin-bottom: 1rem;
          padding: 0.75rem;
          font-size: 0.875rem;
          color: #b91c1c;
          background-color: #fee2e2;
          border-radius: 0.5rem;
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-label {
          font-size: 0.875rem;
          font-weight: 500;
          color: #64748b;
          margin-bottom: 0.5rem;
        }

        .form-input {
          padding: 0.75rem;
          font-size: 1rem;
          border: 1px solid #e2e8f0;
          border-radius: 0.5rem;
        }

        .auth-button {
          padding: 0.75rem;
          font-size: 1rem;
          font-weight: 500;
          color: white;
          background-color: #4f46e5;
          border: none;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .auth-button:hover {
          background-color: #4338ca;
        }
      `}</style>
    </div>
  );
};

export default ResetPasswordPage;
