import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faKey,
  faRightFromBracket,
  faTrash,
  faBookmark,
  faBell,
  faPeopleLine,
  faArrowUpFromWaterPump,
  faShield,
} from "@fortawesome/free-solid-svg-icons";
import { LocalNotifications } from "@capacitor/local-notifications";
import avatar1 from "../../assets/images/avatar1.jpg";
import { faChurch } from "@fortawesome/free-solid-svg-icons/faChurch";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons/faQuestionCircle";

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

  const checkNotificationPermissions = async () => {
    const { display } = await LocalNotifications.checkPermissions();
    return display === 'granted';
  };

  const requestNotificationPermissions = async () => {
    const { display } = await LocalNotifications.requestPermissions();
    return display === 'granted';
  };

  const scheduleDailyNotification = async () => {
    const now = new Date();
    const nextSixAM = new Date();
    nextSixAM.setHours(6, 0, 0, 0);

    if (now > nextSixAM) {
      nextSixAM.setDate(nextSixAM.getDate() + 1);
    }

    await LocalNotifications.schedule({
      notifications: [
        {
          id: 1,
          title: "Good Morning!",
          body: "Today's devotional is ready for you.",
          schedule: { at: nextSixAM },
          sound: "default",
        },
      ],
    });

    console.log("Daily notification scheduled for:", nextSixAM);
  };

  const enableNotifications = async () => {
    const hasPermission = await checkNotificationPermissions();
    console.log({ hasPermission });

    if (hasPermission) {
      alert("Notifications are already enabled!");
      return;
    }

    const userConfirmed = window.confirm(
      "Do you want to enable daily notifications?"
    );
    if (!userConfirmed) return;

    const permissionGranted = await requestNotificationPermissions();
    if (!permissionGranted) {
      alert("Notifications permission denied. Please enable it in settings.");
      return;
    }

    await LocalNotifications.cancel({ notifications: [{ id: 1 }] });
    await scheduleDailyNotification();
    alert("Daily notifications enabled!");
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
          src={userData.profilePicture === '/images/user.png' ? avatar1 : userData.profilePicture}
          alt="Profile Picture"
          className="profile-picture"
          onClick={() => navigate("/avatars")}
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
          <FontAwesomeIcon icon={faBookmark} style={{ color: "var(--text)" }} />
          <a href="/bookmarks">Bookmarks</a>
          <br />
          <small>View a list of items you have saved</small>
        </li>
        <li onClick={enableNotifications}>
          <FontAwesomeIcon icon={faBell} style={{ color: "var(--text)" }} />
          <a href="#">Notifications</a>
          <br />
          <small>Enable push notifications.</small>
        </li>
        <li>
          <FontAwesomeIcon icon={faChurch} style={{ color: "var(--text)" }} />
          <a href="/about-us">About Us</a>
          <br />
          <small>Learn more about the LOGOS ZOE</small>
        </li>
        <li>
          <FontAwesomeIcon icon={faShield} style={{ color: "var(--text)" }} />
          <a href="/about-us">Privacy Policy</a>
          <br />
          <small>Learn about how we store and handle your data</small>
        </li>
        <li>
          <FontAwesomeIcon icon={faQuestionCircle} style={{ color: "var(--text)" }} />
          <a href="/about-us">FAQs</a>
          <br />
          <small>Discover answers to most asked questions</small>
        </li>
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
      </ul>
    </div>
  );
};

export default ProfilePage;
