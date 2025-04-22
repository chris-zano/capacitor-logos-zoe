import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import BASEURL from "../../baseUrl.js";
import userImage from "../../assets/images/user.png";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    try {
      const response = await fetch(`${BASEURL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem("auth", JSON.stringify({ authenticated: true }));
        localStorage.setItem("user-data", JSON.stringify(result.user));
        navigate("/");
      } else {
        setErrorMessage(result.message);
      }
    } catch (err) {
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-card">
        <h2 className="signin-title">Login to Your Account</h2>

        {errorMessage && (
          <div className="signin-error">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="signin-form">
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

          <div className="form-group password-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className="form-input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="password-toggle"
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="submit-button"
          >
            {isLoading ? (
              <span className="spinner"></span>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <div className="signin-links">
          <p>
            Don't have an account?{" "}
            <a href="/auth/register" className="signin-link">
              Create one
            </a>
          </p>
          <p>
            <a href="/auth/forgot-password" className="signin-link">
              Forgot password?
            </a>
          </p>
        </div>
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

        .password-group {
          position: relative;
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

        .password-toggle {
          position: absolute;
          top: 2.25rem;
          right: 0.75rem;
          color: #6b7280;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.25rem;
        }

        .password-toggle:hover {
          color: #4b5563;
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
          padding: 1rem;
          border-radius: 0.5rem;
          border: none;
          transition: background-color 0.2s;
        }

        .submit-button:hover {
          background-color: #4338ca;
        }

        .submit-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .spinner {
          display: inline-block;
          width: 1.25rem;
          height: 1.25rem;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s ease-in-out infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .signin-links {
          margin-top: 1.5rem;
          text-align: center;
          font-size: 0.875rem;
          color: #4b5563;
        }

        .signin-links p {
          margin: 0.5rem 0;
        }

        .signin-link {
          color: #4f46e5;
          text-decoration: none;
        }

        .signin-link:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default SignInPage;