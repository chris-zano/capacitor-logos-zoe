import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BASEURL from "../../baseUrl.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const SignUpPage = () => {
  const [step, setStep] = useState(1);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
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

        {step === 1 && (
          <div className="step-one">
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
            <div
              className="input-group relative"
              style={{
                position: "relative",
              }}
            >
              <label htmlFor="password">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                id="password"
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <span
                className="absolute right-[2.5ch] bottom-[2.5ch] flex items-center"
                onClick={() => setShowPassword((prev) => !prev)}
                style={{
                  position: "absolute",
                  right: "2.5ch",
                  bottom: "2.5ch",
                  cursor: "pointer",
                }}
              >
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  className="toggle-icon"
                />
              </span>
            </div>
            <button onClick={handleNext} className="login-btn">
              Next
            </button>
          </div>
        )}

        {step === 2 && (
          <form className="step-two" onSubmit={handleSignUp}>
            <div className="input-group">
              <label htmlFor="firstname">First Name</label>
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
              <label htmlFor="lastname">Last Name</label>
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
            <button type="submit" className="login-btn">
              Sign Up
            </button>
          </form>
        )}

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
