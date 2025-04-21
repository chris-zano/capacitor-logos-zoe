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
  const [activeTab, setActiveTab] = useState('old');

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

  const renderBookList = (books) => (
    <ul style={{
      display: "grid",
      gridTemplateColumns: '1fr 1fr',
      gap: "1rem",
      paddingTop: "1rem"
    }}>
      {books.map((book, index) => (
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
            <span style={{ width: "100%" }}>
              {book.length > 12 ? book.substring(0, 12) + "..." : book}
            </span>
          </NavLink>
        </li>
      ))}
    </ul>
  );

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
              <span className="poppins-regular" style={{ marginLeft: "1ch" }}>
              Bible Contents ( NKJV )
              </span>
            </button>
          </div>
        </div>
      </header>
      <main style={{ marginTop: "3rem" }}>
        {error ? (
          <p className="error">{error}</p>
        ) : (
          <div className="bible-contents" style={{ padding: '0.2rem 0.5rem' }}>
            <div>
              {oldTestamentBooks.length > 0 && newTestamentBooks.length > 0 && (
                <>

                  {/* Tabs */}
                  <div style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "1rem"
                  }}>
                    <button
                      onClick={() => setActiveTab('old')}
                      className={`tab-button ${activeTab === 'old' ? 'active' : ''}`}
                    >
                      Old Testament
                    </button>
                    <button
                      onClick={() => setActiveTab('new')}
                      className={`tab-button ${activeTab === 'new' ? 'active' : ''}`}
                    >
                      New Testament
                    </button>
                  </div>

                  {/* Tab Content */}
                  {activeTab === 'old' && (
                    <>
                      {renderBookList(oldTestamentBooks)}
                    </>
                  )}
                  {activeTab === 'new' && (
                    <>
                      {renderBookList(newTestamentBooks)}
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export default BibleContents;
