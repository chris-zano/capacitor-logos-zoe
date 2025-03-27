import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";
import { useParams } from "react-router-dom";
import getBookChapters from "../../data/bible/get_chapters.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function BibleChapters() {
  const { book } = useParams();
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const data = await getBookChapters({ book });
        console.log({ data });
        setChapters(data.chapters);
      } catch (error) {
        console.error("Error fetching chapters:", error);
      }
    };

    fetchChapters();
  }, [book]);
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
                {book}
              </span>
            </button>
          </div>
        </div>
      </header>
      <main
        style={{
          marginTop: "3.2rem",
        }}
      >
        <ul
          style={{
            padding: "1rem 1.5ch",
            display: "grid",
            gridTemplateColumns: '1fr 1fr 1fr 1fr',
            gap: "1rem"
          }}
        >

          {chapters &&
            Array.from({ length: chapters }, (_, index) => (
              <div
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
                <NavLink
                  to={`/bible/verses/${book}/${index + 1}`}
                  style={{ width: "100%", textAlign: "center" }}
                >
                  <span style={{ width: "100%", textAlign: "center" }}>{index + 1}</span>
                </NavLink>
              </div>
            ))}
        </ul>

      </main>
    </>
  );
}

export default BibleChapters;
