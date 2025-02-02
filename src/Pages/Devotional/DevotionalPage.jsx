import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faCirclePlay,
  faBookmark,
  faShareNodes,
  faCalendarDays,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import getDevotionalById from "../../data/devotionals/get_devotional_by_id.js";
import '../../styles/devotional_page.css';
import ShareApi from "../../NativeApis/Share.jsx";
import BASEURL from "../../baseUrl.js";
import LoadingSpinner from "../../Components/Loaders/LoadingSpinner.jsx";

const DevotionalPage = ({ styles }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [devotional, setDevotional] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [devotionals, setDevotionals] = useState([]);

  const monthMapping = {
    January: 0,
    February: 1,
    March: 2,
    April: 3,
    May: 4,
    June: 5,
    July: 6,
    August: 7,
    September: 8,
    October: 9,
    November: 10,
    December: 11,
  };

  useEffect(() => {
    const fetchDevotional = async () => {
      try {
        setLoading(true);
        const data = await getDevotionalById(id);
        
        setDevotional(data.devotional);
      } catch (err) {
        setError("Failed to load the devotional. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchDevotional();
  }, [id]);

  useEffect(() => {
    const fetchDevotionals = async () => {
      try {
        const response = await fetch("https://logos-server-j2ld.onrender.com/devotionals/calendar/list");
        const data = await response.json();
        setDevotionals(
          data.sort((a, b) => {
            const monthA = monthMapping[a.month];
            const monthB = monthMapping[b.month];
            if (monthA === monthB) {
              return parseInt(a.day) - parseInt(b.day);
            }
            return monthA - monthB;
          })
        );
      } catch (error) {
        console.error("Error fetching devotionals:", error);
      }
    };
    
    fetchDevotionals();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!devotional) {
    return <p>No devotional found.</p>;
  }

  const formattedDate = new Date(
    devotional.year,
    monthMapping[devotional.month],
    devotional.day
  ).toLocaleDateString("en-US", { day: "numeric", month: "long" });

  const renderCalendar = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div className="day" key={`blank-${i}`}></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const devotional = devotionals.find((d) => {
        const devotionalDate = new Date(
          d.year,
          monthMapping[d.month],
          d.day
        );
        return (
          devotionalDate.getFullYear() === year &&
          devotionalDate.getMonth() === month &&
          devotionalDate.getDate() === day
        );
      });

      days.push(
        <div
          className={`day ${devotional ? "has-devotional" : ""}`}
          key={day}
          onClick={() =>
            devotional &&
            (window.location.href = `/devotionals/devotional/${devotional._id}`)
          }
        >
          {day}
        </div>
      );
    }

    return days;
  };

  return (
    <>
      <article className="d-chapter bg-white">
        {/* Image Section */}
        <section className="image">
          <img src={devotional.theme_picture_url} alt="" />
          <div className="close-page-btn">
            <FontAwesomeIcon
              icon={faCircleXmark}
              onClick={() => navigate('/')}
            />
          </div>
        </section>

        {/* Actions Section */}
        <section className="control-center">
          <div className="row-column">
            <div
              className="listen"
            >
              {
                devotional.type === 'old' ?
                  (
                    <div onClick={() => (window.location.href = "/broadcast")}>
                      <FontAwesomeIcon icon={faCirclePlay} />
                      <span>Listen to podcast discussion</span>
                    </div>
                  ) :
                  (
                    <>
                      <span>{devotional.title}</span>
                    </>
                  )
              }
            </div>
            <div className="bookmark-share">
              <FontAwesomeIcon
                icon={faBookmark}
                onClick={() => console.log("Bookmark added")}
              />
              <ShareApi
                button_text={<FontAwesomeIcon icon={faShareNodes} />}
                data_to_share={{
                  title: "Verse of the Day",
                  text: `${devotional.day} - ${devotional.month} (${devotional.year})`,
                  url: `${BASEURL}/devotionals/devotional/${devotional._id}`,
                  dialogTitle: "Share with friends",
                }}
              />
            </div>
          </div>
        </section>

        {/* Date Section */}
        <section className="date-section" style={{ margin: "20px 0", textAlign: "center" }}>
          <button id="current-date" className="my-4" onClick={() => setModalOpen(true)}>
            <div className="calendar-icon">
              <FontAwesomeIcon icon={faCalendarDays} />
            </div>
            <div className="date">{formattedDate}</div>
            <FontAwesomeIcon icon={faCaretDown} />
          </button>
        </section>

        {/* Message Section */}
        <section className="message-sect">

          <strong className="theme-scripture-header">
            {devotional.type === 'new' ? "THEME SCRIPTURE:" : ""}
          </strong>
          <div className="theme-scripture"
            dangerouslySetInnerHTML={{
              __html: devotional.type === 'new'
                ? devotional.scripture
                : ''
            }} ></div>

          <strong className="theme-scripture-header">{devotional.type === 'new' ? "PREPARATORY QUESTION:" : ""}</strong>
          <div className="theme-scripture" dangerouslySetInnerHTML={{ __html: devotional.type === 'new' ? devotional.questions : '' }} ></div>

          <div>
            {devotional.type === 'new' &&
              <>
                <hr className="hr-divider" />
              </>
            }
          </div>

          <div id="article-message" className="message" dangerouslySetInnerHTML={{ __html: devotional.content }}></div>
          {devotional.type === 'new' &&
            <>
              <span className="poppins-bold">By:</span> <br />
              <span className="poppins-regular">{devotional.author}</span>
            </>
          }
        </section>
      </article>

      {/* Modal */}
      {modalOpen && (
        <div id="devotionals-modal" className="modal">
          <div className="modal-content">
            <div className="calendar-header">
              <button
                onClick={() =>
                  setCurrentDate((prev) => {
                    const newDate = new Date(prev);
                    newDate.setDate(1);
                    newDate.setMonth(prev.getMonth() - 1);
                    return newDate;
                  })
                }
              >
                &lt;
              </button>
              <h4>{`${currentDate.toLocaleString("default", {
                month: "long",
              })} ${currentDate.getFullYear()}`}</h4>
              <button
                onClick={() =>
                  setCurrentDate((prev) => {
                    const newDate = new Date(prev);
                    newDate.setDate(1);
                    newDate.setMonth(prev.getMonth() + 1);
                    return newDate;
                  })
                }
              >
                &gt;
              </button>
            </div>
            <div className="calendar-grid">{renderCalendar(currentDate)}</div>
            <button id="close-modal" onClick={() => setModalOpen(false)}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Devotional Overlay Modal */}
      {overlayOpen && (
        <div id="devotional-overlay" className="modal">
          <div className="modal-content devotional-content">
            <button
              id="close-devotional"
              style={{ alignSelf: "flex-end", background: "none", border: "none", fontSize: "1.5rem", cursor: "pointer" }}
              onClick={() => setOverlayOpen(false)}
            >
              &times;
            </button>
            <div id="devotional-details">
              {/* Content dynamically loaded */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DevotionalPage;
