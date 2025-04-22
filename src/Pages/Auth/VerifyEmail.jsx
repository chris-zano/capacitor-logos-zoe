import React, { useState } from "react";
import BASEURL from "../../baseUrl.js";
import { useNavigate } from "react-router-dom";

const VerifyEmailPage = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false); // Loading state for the button
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true); // Start loading animation

    try {
      const response = await fetch(`${BASEURL}/auth/verify-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      setLoading(false); // Stop loading animation

      if (response.ok) {
        localStorage.setItem("reset", "true");
        sessionStorage.setItem("temp-email", email);
        navigate("/auth/verify-code");
      } else {
        setErrorMessage(result.message);
      }
    } catch (err) {
      setLoading(false); // Stop loading animation on error
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-card">
        <h2 className="signin-title">Confirm your email</h2>

        {errorMessage && <div className="signin-error">{errorMessage}</div>}

        <form className="signin-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              id="email"
              type="email"
              className="form-input"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? (
              <div className="loader"></div> // Loading spinner
            ) : (
              "Continue"
            )}
          </button>
        </form>
      </div>

      <style>{`
        .signin-container {
          font-family: 'Poppins';
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #ebf4ff 0%, #e0e7ff 100%);
          padding: 0 16px;
        }

        .signin-card {
          width: 100%;
          max-width: 28rem;
          background: white;
          border-radius: 1rem;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          padding: 1rem;
        }

        .signin-title {
          font-size: 1.5rem;
          font-weight: 700;
          text-align: center;
          color: #1e293b;
          margin-bottom: 1.5rem;
        }

        .signin-error {
          margin-bottom: 1rem;
          padding: 0.75rem;
          font-size: 0.875rem;
          color: #b91c1c;
          background-color: #fee2e2;
          border-radius: 0.5rem;
        }

        .signin-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-label {
          display: block;
          margin-bottom: 0.25rem;
          font-size: 0.875rem;
          font-weight: 500;
          color: #374151;
        }

        .form-input {
          font-family: 'Poppins';
          width: 100%;
          padding: 0.875rem 0;
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
          font-size: 1rem;
          text-indent: 0.5rem;
          transition: all 0.2s;
        }

        .form-input:focus {
          outline: none;
          border-color: #818cf8;
          box-shadow: 0 0 0 2px rgba(129, 140, 248, 0.2);
        }

        .submit-button {
          font-family: 'Poppins';
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #4f46e5;
          color: white;
          font-weight: 500;
          padding: 1rem 0rem;
          border-radius: 0.5rem;
          border: none;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .submit-button:hover {
          background-color: #4338ca;
        }

        .submit-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .loader {
          border: 4px solid #f3f3f3;
          border-top: 4px solid #4f46e5;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          animation: spin 2s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default VerifyEmailPage;
