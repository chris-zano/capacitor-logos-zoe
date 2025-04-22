import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getBookAndChapterVerses from "../../data/bible/get_verses.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function BookContent() {
  const { book, chapter } = useParams();
  const [verses, setVerses] = useState([]);

  useEffect(() => {
    const fetchVerses = async () => {
      try {
        const data = await getBookAndChapterVerses({ book, chapter });
        console.log(data);
        setVerses(data.verses);
      } catch (error) {
        console.error("Error fetching verses:", error);
      }
    };

    fetchVerses();
  }, [book, chapter]);

  return (
    <>
      <header>
        <div id="read-appbar">
          <div className="row" style={{ display: "flex", justifyContent: "space-between", padding: "0 3ch 0 1ch" }}>
            <button onClick={() => window.history.back()} className="back-btn">
              <FontAwesomeIcon icon={faArrowLeft} />
              <span className="poppins-regular" style={{ marginLeft: "2ch" }}>
                {book} {chapter}
              </span>
            </button>
          </div>
        </div>
      </header>

      <main
        style={{
          fontFamily:'Poppins',
          marginTop: "3.2rem",
          backgroundColor: "var(--theme-background)",
          height: "99.99dvh",
          overflow: "auto",
        }}
      >
        <div className="bible-contents">
          {verses.length === 0 ? (
            <p className="loading-text">Loading verses...</p>
          ) : (
            <ul
              style={{
                padding: "unset",
                margin: "unset",
              }}
            >
              {verses.verses.verses.map((verse, index) => (
                <li
                  key={index}
                  className="verse-item"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "0.6rem",
                    fontWeight: "400",
                    fontSize: "1.1rem",
                    listStyle: "none",
                    backgroundColor: "var(--card-background)",
                    margin: "0.5rem",
                    borderRadius: "0.5rem",
                  }}
                >
                  <div>
                    <sup style={{ marginRight: "1.2ch" }}>[{index + 1}]</sup>
                    <span>{verse}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>

      <style>{`
        .back-btn {
          background: transparent;
          border: none;
          display: flex;
          align-items: center;
          font-family: 'Poppins';
          color: var(--primary-text);
          font-size: 1.1rem;
          cursor: pointer;
          transition: color 0.3s ease;
        }

        .back-btn:hover {
          color: var(--primary-accent);
        }

        .loading-text {
          text-align: center;
          font-family: 'Poppins';
          font-size: 1rem;
          color: var(--primary-text);
        }

        .verse-item {
          display: flex;
          align-items: center;
          padding: 0.6rem;
          font-weight: 400;
          font-size: 1.1rem;
          list-style: none;
          background-color: var(--card-background);
          margin: 0.5rem;
          border-radius: 0.5rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </>
  );
}

export default BookContent;
