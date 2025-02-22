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


  const profileItems = [
    {
      route: "/bookmarks",
      icon: faBookmark,
      title: "Bookmarks",
      subtitle: "View a list of items you have saved",
      handler: null
    },
    {
      route: "#",
      icon: faBell,
      title: "Notifications",
      subtitle: "Enable push notifications.",
      handler: enableNotifications
    },
    {
      route: "/about-us",
      icon: faChurch,
      title: "About Us",
      subtitle: "Learn more about the LOGOS ZOE",
      handler: null
    },
    {
      route: "/privacy-policy",
      icon: faShield,
      title: "Privacy Policy",
      subtitle: "Learn about how we store and handle your data",
      handler: null
    },
    {
      route: "/faqs",
      icon: faQuestionCircle,
      title: "FAQs",
      subtitle: "Discover answers to most asked questions",
      handler: null
    },
    {
      route: "/auth/verify-email",
      icon: faKey,
      title: "Change Password",
      subtitle: "Verify your email to change your password",
      handler: null
    },
    {
      route: "#",
      icon: faRightFromBracket,
      title: "Logout",
      subtitle: "End your current session",
      handler: logOut
    }
  ];

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
        {profileItems.map((item, index) => (
          <ProfileListItem
            key={index}
            route={item.route}
            icon={item.icon}
            title={item.title}
            subtitle={item.subtitle}
            handler={item.handler}
          />
        ))}
      </ul>
    </div>
  );
};

const ProfileListItem = ({ route, icon, title, handler, subtitle }) => {

  return (
    <li onClick={handler}>
      <a href={route}>
        <FontAwesomeIcon
          icon={icon}
          style={{ color: "var(--text)" }}
        />
        <span>{title}</span>
        <br />
        <small>{subtitle}</small>
      </a>
    </li>
  )
}

export default ProfilePage;
