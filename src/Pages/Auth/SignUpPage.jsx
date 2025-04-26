import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import BASEURL from "../../baseUrl.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/images/icon-foreground.png";


const SignUpPage = () => {
  const [step, setStep] = useState(1);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);  // State to track loading
  const navigate = useNavigate();

  const handleNext = () => {
    if (email && password) {
      setStep(2);
    } else {
      setErrorMessage("Please fill in both email and password.");
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset error message
    setLoading(true); // Set loading state to true

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
    } finally {
      setLoading(false); // Reset loading state after request
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-card">
      <div className="logo-wrapper-login">
          <img src={logo} alt="logo" />
        </div>
        <h2 className="signin-title">Create an Account</h2>

        {errorMessage && <div className="signin-error">{errorMessage}</div>}

        {step === 1 && (
          <div className="signin-form">
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

            <button onClick={handleNext} className="submit-button">
              Next
            </button>
          </div>
        )}

        {step === 2 && (
          <form className="signin-form" onSubmit={handleSignUp}>
            <div className="form-group">
              <label htmlFor="firstname" className="form-label">First Name</label>
              <input
                id="firstname"
                type="text"
                className="form-input"
                placeholder="John"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastname" className="form-label">Last Name</label>
              <input
                id="lastname"
                type="text"
                className="form-input"
                placeholder="Doe"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                required
              />
            </div>

            <div className="checkbox-group">
              <input type="checkbox" id="terms_and_conditions" required />
              <label htmlFor="terms_and_conditions" className="terms-label">
                I agree to the{" "}
                <NavLink to="/terms-and-conditions" className="terms-link">
                  Terms and Conditions
                </NavLink>{" "}
                and{" "}
                <NavLink to="/privacy-policy" className="privacy-link">
                  Privacy Policy
                </NavLink>
              </label>
            </div>

            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? (
                <div className="spinner"></div>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>
        )}

        <div className="signin-links">
          <p>
            Already have an account?{" "}
            <NavLink to="/auth/login" className="signin-link">
              Login
            </NavLink>
          </p>
        </div>
      </div>

      <style>{`
        .signin-container {
          font-family: 'Poppins';
          min-height: 100svh;
          display: flex;
          padding: 0 16px;
        }

        .signin-card {
          width: 100%;
          max-width: 28rem;
          background: white;
          border-top-left-radius: 1rem;
          border-top-right-radius: 1rem;
          // box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          padding: 1rem;
        }

        .signin-title {
          font-size: 1.5rem;
          font-weight: 700;
          text-align: center;
          color: #1e293b;
          margin-bottom: 1.5rem;
        }

        .logo-wrapper-login {
          width: 100%;
          height: 55px;
          display: flex;
          align-items: center;
          justify-content: center;

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
          font-family: 'Poppins'
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

        .spinner {
          border: 4px solid rgba(255, 255, 255, 0.3);
          border-top: 4px solid #fff;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
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

        .checkbox-group {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .terms-label {
          font-size: 0.75rem;
          color: #374151;
        }

        .terms-link, .privacy-link {
          color: #4f46e5;
          text-decoration: none;
        }

        .terms-link:hover, .privacy-link:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default SignUpPage;
