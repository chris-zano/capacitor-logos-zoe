import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faKey,
  faRightFromBracket,
  faTrash,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [emailVisible, setEmailVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("user-data"));
    if (storedUserData) {
      setUserData(storedUserData);
    } else {
      alert("No user data found. Please log in again.");
      navigate("/auth/login");
    }
  }, [navigate]);

  const showFullEmail = () => {
    setEmailVisible(!emailVisible);
  };

  const logOut = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/auth/welcome");
  };

  if (!userData) return null;

  const obfuscatedEmail = `**********${userData.email.substring(
    userData.email.indexOf("@")
  )}`;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img
          id="profile-picture"
          src={userData.profilePicture || "/images/user.png"}
          alt="Profile Picture"
          className="profile-picture"
        />
        <div className="user-details">
          <div id="u-name">
            <span id="first-name">{userData.firstname || "N/A"}</span>{" "}
            <span id="last-name">{userData.lastname || "N/A"}</span>
          </div>
          {userData.firstname !== "Guest" && (
            <span
              id="email"
              onClick={showFullEmail}
              data-visible={emailVisible.toString()}
            >
              {emailVisible ? userData.email : obfuscatedEmail}
            </span>
          )}
        </div>
      </div>

      {userData.firstname === "Guest" ? (
        <span id="sign-in" onClick={() => navigate("/auth/login")}>
          Sign in
        </span>
      ) : null}

      <ul className="action-list">
        <li>
          <FontAwesomeIcon icon={faKey} style={{ color: "var(--text)" }} />
          <a href="/auth/verify-email">Change Password</a>
          <br />
          <small>Verify your email to change your password</small>
        </li>
        <li onClick={logOut}>
          <FontAwesomeIcon
            icon={faRightFromBracket}
            style={{ color: "var(--text)" }}
          />
          <a>Logout</a>
          <br />
          <small>End your current session</small>
        </li>
        <li>
          <FontAwesomeIcon icon={faTrash} style={{ color: "var(--text)" }} />
          <a href="/delete-account">Delete Account</a>
          <br />
          <small>Deactivate your account temporarily</small>
        </li>
        <li>
          <FontAwesomeIcon icon={faBookmark} style={{ color: "var(--text)" }} />
          <a href="/bookmarks">Bookmarks</a>
          <br />
          <small>View a list of items you have saved</small>
        </li>
      </ul>
    </div>
  );
};

export default ProfilePage;
