import React, { useEffect, useState } from "react";
import getBibleBooks from "../../data/bible/get_books.js";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

function BibleContents() {
  const [bibleContents, setBibleContents] = useState([]);
  const [error, setError] = useState(null);
  const [oldTestamentBooks, setOldTestamentBooks] = useState([]);
  const [newTestamentBooks, setNewTestamentBooks] = useState([]);

  useEffect(() => {
    const fetchBibleContents = async () => {
      try {
        const data = await getBibleBooks();
        if (data) {
          setBibleContents(data);
          setOldTestamentBooks(data.slice(0, 39));
          setNewTestamentBooks(data.slice(39));
        } else {
          throw new Error("Unexpected data format from API.");
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchBibleContents();
  }, []);

  return (
    <>
      <header>
        <div id="read-appbar">
          <div
            className="row"
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "0 3ch 0 1ch",
            }}
          >
            <button onClick={() => window.history.back()}>
              <FontAwesomeIcon icon={faArrowLeft} />
              <span
                className="poppins-regular"
                style={{
                  marginLeft: "1ch",
                }}
              >
                Books
              </span>
            </button>
          </div>
        </div>
      </header>
      <main
        style={{
          marginTop: "3.2rem",
          // padding: '0 1.5ch',
        }}
      >
        {error ? (
          <p className="error">{error}</p>
        ) : (
          <div className="bible-contents" style={{ padding: '1rem 0.5rem' }}>
            <div>
              <h2 className="poppins-bold" style={{ padding: '0 1rem' }}>Old Testament</h2>
              <ul
                style={{
                  display: "grid",
                  gridTemplateColumns: '1fr 1fr',
                  gap: "1rem"
                }}
              >
                {oldTestamentBooks.map((book, index) => (
                  <li
                    key={index}
                    className="poppins-regular"
                    style={{
                      backgroundColor: "var(--modal-background)",
                      borderRadius: "0.5rem",
                      display: "flex",
                      alignItems: "center",
                      padding: "0.7rem 1.2rem",
                      cursor: "pointer",
                      transition: "background-color 0.3s ease",
                      fontWeight: "500",
                      fontSize: "1.2rem",
                      listStyle: "none",
                    }}
                  >
                    <NavLink to={`chapters/${book}`} style={{ width: "100%" }}>
                      <span style={{ width: "100%" }}>{book.length > 12 ? book.substring(0, 12) + "..." : book}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
              <h2 className="poppins-bold">New Testament</h2>
              <ul
                style={{
                  display: "grid",
                  gridTemplateColumns: '1fr 1fr',
                  gap: "1rem"
                }}>
                {newTestamentBooks.map((book, index) => (
                  <li
                    key={index}
                    className="poppins-regular"
                    style={{
                      backgroundColor: "var(--modal-background)",
                      borderRadius: "0.5rem",
                      display: "flex",
                      alignItems: "center",
                      padding: "0.7rem 1.2rem",
                      cursor: "pointer",
                      transition: "background-color 0.3s ease",
                      fontWeight: "500",
                      fontSize: "1.2rem",
                      listStyle: "none",
                    }}
                  >
                    <NavLink to={`chapters/${book}`} style={{ width: "100%" }}>
                      <span style={{ width: "100%" }}>{book.length > 12 ? book.substring(0, 12) + "..." : book}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export default BibleContents;
