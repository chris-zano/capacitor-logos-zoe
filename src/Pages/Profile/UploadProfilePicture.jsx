import React, { useState } from "react";
import avatar1 from "../../assets/images/avatar1.jpg";
import avatar2 from "../../assets/images/avatar2.jpg";
import avatar3 from "../../assets/images/avatar3.jpg";
import avatar4 from "../../assets/images/avatar4.jpg";
import { useNavigate } from "react-router-dom";

const avatars = [avatar1, avatar2, avatar3, avatar4];

const ChooseProfileAvatar = () => {
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const navigate = useNavigate();

  const handleAvatarSelect = (avatar) => {
    setSelectedAvatar(avatar);
  };

  const setProfileAvatar = () => {
    // Get user data from localStorage
    const userData = JSON.parse(localStorage.getItem("user-data"));

    if (userData) {
      // Update the profilePicture field
      userData.profilePicture = selectedAvatar;

      // Save the updated user data back to localStorage
      localStorage.setItem("user-data", JSON.stringify(userData));

      alert("Profile picture set successfully!");
      navigate("/profile"); // Redirect to the profile page
    } else {
      alert("No user data found. Please log in again.");
      navigate("/auth/login");
    }
  };

  return (
    <div
      style={{
        textAlign: "center",
        padding: "20px",
      }}
    >
      <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>
        Choose Your Profile Avatar
      </h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
          gap: "20px",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        {avatars.map((avatar, index) => (
          <div
            key={index}
            onClick={() => handleAvatarSelect(avatar)}
            style={{
              border:
                selectedAvatar === avatar
                  ? "2px solid #007bff"
                  : "2px solid transparent",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "border-color 0.3s, transform 0.2s",
              transform: selectedAvatar === avatar ? "scale(1.1)" : "scale(1)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={avatar}
              alt={`Avatar ${index + 1}`}
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "8px",
                objectFit: "cover",
              }}
            />
          </div>
        ))}
      </div>
      {selectedAvatar && (
        <div
          style={{
            marginTop: "20px",
            textAlign: "center",
          }}
        >
          <h2 style={{ fontSize: "20px", marginBottom: "10px" }}>
            Selected Avatar:
          </h2>
          <img
            src={selectedAvatar}
            alt="Selected Avatar"
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "8px",
              objectFit: "cover",
              border: "2px solid #007bff",
            }}
          />
          <br />
          <button
            type="button"
            style={{
              marginTop: "10px",
              padding: "10px 20px",
              fontSize: "16px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "2ch",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
            onClick={setProfileAvatar}
          >
            Set as Profile Avatar
          </button>
        </div>
      )}
    </div>
  );
};

export default ChooseProfileAvatar;
