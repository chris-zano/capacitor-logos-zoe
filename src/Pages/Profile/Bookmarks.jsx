import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom"; // Assuming you're using React Router
import getUserBookmarks from "../../data/user/get_user_bookmarks.js";

function Bookmarks() {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const fetchBookmarks = async () => {
      const userBookmarks = await getUserBookmarks();
      setBookmarks(userBookmarks);
    };
    fetchBookmarks();
  }, []);

  const getRedirectUrl = ({ type, id }) => {
    switch (type) {
      case 'article':
        return `/articles/article/${id}`;
      case 'devotional':
        return `/devotionals/devotional/${id}`;
      default:
        return '/';
    }
  }

  return (
    <div
    >
      <p style={{ fontSize: "1.2rem", paddingLeft: '1ch', textAlign: 'left', fontWeight: '400', fontFamily: 'Poppins', marginBottom: "1ch" }}>Bookmarks {bookmarks.length > 0 ? `(${bookmarks.length})` : null}</p>
      {bookmarks.length > 0 ? (
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          {bookmarks.map((bookmark, index) => (
            <a key={index} href={getRedirectUrl({type: bookmark.type, id: bookmark.id})} style={{
              padding: '1ch',
              display: 'flex',
              alignItems: 'center',
              gap: '1ch',
              fontFamily: 'Poppins',
              textDecoration: 'none',
              color: 'var(--text)',
              backgroundColor: 'var(--card-background)',
              borderRadius: '1.5ch',
              border: '1px solid transparent',
              padding: '1ch 1.3ch',
            }}>
              <img src={bookmark.image} alt={bookmark.title} style={{
                borderRadius: '50%',
                border: '1px solid var(--light-gray)'
              }} />
              <div className="article-details" sty>
                <p>{bookmark.title.length > 21 ? bookmark.title.substring(0, 31)+ '...' : bookmark.title}</p>
              </div>
            </a>
          ))}
        </ul>
      ) : (
        <p style={{ fontSize: "18px", color: "#666" }}>
          No bookmarks found. Start saving your favorite items! <br />
          loading...
        </p>
      )}
    </div>
  );
}

export default Bookmarks;
