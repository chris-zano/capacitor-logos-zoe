import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import userImage from "../../assets/images/user.png";
import BASEURL from "../../baseUrl.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

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
        headers: {
          "Content-Type": "application/json",
        },
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
    <div className="login-page-overlay">
      <div className="login-page">
        <h2 className="login-title">Login</h2>

        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <form className="login-form" onSubmit={handleSubmit}>
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
          
          <div className="input-group">
            <button type="submit" className="login-btn">
              {
                !isLoading ? (
                  "Login"
                ) : (
                  <div className="loading-spinner">Loading....</div>
                )
              }
            </button>
          </div>
        </form>

        <div className="login-footer">
          <p>
            Don't have an account?{" "}
            <a href="/auth/register" className="create-account-link">
              Create one
            </a>
          </p>
          <a href="/auth/forgot-password" className="forgot-password-link">
            Forgot password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
