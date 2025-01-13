import React, { useEffect, useState } from "react";

function Bookmarks() {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    // Fetch bookmarks from localStorage
    const userData = JSON.parse(localStorage.getItem("user-data"));
    if (userData && userData.bookmarks) {
      setBookmarks(userData.bookmarks);
    } else {
      setBookmarks([]);
    }
  }, []);

  return (
    <div
      style={{
        padding: "20px",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>Your Bookmarks</h1>
      {bookmarks.length > 0 ? (
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
          }}
        >
          {bookmarks.map((bookmark, index) => (
            <li
              key={index}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                overflow: "hidden",
                textAlign: "left",
                backgroundColor: "#fff",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              <img
                src={bookmark.image}
                alt={bookmark.title}
                style={{
                  width: "100%",
                  height: "150px",
                  objectFit: "cover",
                }}
              />
              <div
                style={{
                  padding: "10px",
                }}
              >
                <h2
                  style={{
                    fontSize: "16px",
                    margin: "0 0 10px",
                    color: "#333",
                  }}
                >
                  {bookmark.title}
                </h2>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ fontSize: "18px", color: "#666" }}>
          No bookmarks found. Start saving your favorite items!
        </p>
      )}
    </div>
  );
}

export default Bookmarks;
