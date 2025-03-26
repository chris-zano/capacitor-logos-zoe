import React, { useEffect, useState } from "react";
import getBibleBooks from "../../data/bible/get_books.js";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

function BibleContents() {
  const [bibleContents, setBibleContents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBibleContents = async () => {
      try {
        const data = await getBibleBooks();
        if (data) {
          setBibleContents(data);
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
          <div className="bible-contents">
            {bibleContents.length === 0 ? (
              <p>Loading contents...</p>
            ) : (
              <ul
                style={{
                  padding: "unset",
                  margin: "unset",
                }}
              >
                {bibleContents.map((book, index) => (
                  <li
                    key={index}
                    className="poppins-regular"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "0.7rem 1.2rem",
                      borderBottom: "1px solid rgb(210 209 209 / 36%)",
                      cursor: "pointer",
                      transition: "background-color 0.3s ease",
                      fontWeight: "500",
                      fontSize: "1.2rem",
                      listStyle: "none",
                      width: "90%",
                    }}
                  >
                    <NavLink to={`chapters/${book}`} style={{ width: "100%" }}>
                      <span style={{ width: "100%" }}>{book}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </main>
    </>
  );
}

export default BibleContents;
