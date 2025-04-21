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
                  marginLeft: "2ch",
                }}
              >
                {book} {chapter}
              </span>
            </button>
          </div>
        </div>
      </header>
      <main
        style={{
          marginTop: "3.2rem",
          backgroundColor: "var(--theme-background) !important",
          height: "99.99dvh",
          overflow: "auto",
        }}
      >
        <div className="bible-contents">
          {verses.length === 0 ? (
            <p>Loading verses...</p>
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
                  className="poppins-regular"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "0.6rem",
                    fontWeight: "400",
                    fontSize: "1.1rem",
                    listStyle: "none",
                    backgroundColor:'var(--card-background)',
                    margin:'0.5rem',
                    borderRadius:'0.5rem'
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
    </>
  );
}

export default BookContent;
