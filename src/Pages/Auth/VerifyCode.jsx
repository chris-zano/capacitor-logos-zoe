import React, { useState } from "react";
import BASEURL from "../../baseUrl.js";

const VerifyCodePage = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const email = sessionStorage.getItem("temp-email");

    try {
      // Make a POST request to the verification endpoint
      const response = await fetch(`${BASEURL}/auth/verify-code`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: verificationCode, email }),
      });

      const result = await response.json();
      if (response.ok) {
        // Code verification was successful
        alert("Verification successful!");

        // Store auth state in localStorage
        localStorage.setItem("auth", JSON.stringify({ authenticated: true }));
        localStorage.setItem("user-data", JSON.stringify(result.user));

        const reset = localStorage.getItem("reset");
        if (reset !== "true") {
          window.location.replace("/");
        } else {
          localStorage.setItem("reset", "false");
          window.location.replace("/auth/new-password");
        }
      } else {
        // Display error message from server
        setErrorMessage(result.message || "Verification failed.");
      }
    } catch (error) {
      // Handle network errors or other unexpected issues
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="verification-container">
      <h3>Enter Verification Code</h3>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            id="verification-code"
            name="code"
            placeholder="Enter your code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            style={{}}
            required
          />
        </div>
        <button type="submit" className="submit-btn">
          Verify
        </button>
      </form>
    </div>
  );
};

export default VerifyCodePage;
