import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark as regularBookmark,
  faShareNodes,
} from "@fortawesome/free-solid-svg-icons";
import getTodaysDevotional from "../../data/devotionals/get_todays_devotional.js";
import ShareApi from "../../NativeApis/Share.jsx";
import { NavLink } from "react-router-dom";
import BASEURL from "../../baseUrl.js";
import { Share } from "@capacitor/share";
import { addDays, formatDate } from "date-fns";
import LoadingSpinner from "../Loaders/LoadingSpinner.jsx";

function DevotionalComponent() {
  const [devotional, setDevotional] = useState(null);

  useEffect(() => {
    const fetchDevotional = async () => {
      const data = await getTodaysDevotional();
      setDevotional(data.devotional);
    };

    fetchDevotional();
  }, []);

  if (!devotional) {
    return <LoadingSpinner />;
  }

  const _formattedDate = formatDate(
    `${devotional.year}-${devotional.month}-${devotional.day}`,
    "PPPP",
  );

  const content = String(devotional.content);

  const handleShare = async () => {
    if (!devotional) return;

    try {
      await Share.share({
        title: "Today's Devotional",
        text: `Start your day with the Word of God. Here's today's devotional:...`,
        url: devotional.theme_picture_url,
        files: [devotional.theme_picture_url],
        dialogTitle: "Share Today's Devotional",
      });
    } catch (error) {
      console.error("Error sharing devotional:", error);
    }
  };

  return (
    <div>
      <div className="devotional-daily">
        <NavLink to={`/devotionals/devotional/${devotional._id}`}>
          {/* Display the theme picture */}
          <img src={devotional.theme_picture_url} alt="devotional" />

          <div className="devotional-details">
            <div className="date">{_formattedDate}</div>
            {devotional.title && (
              <strong style={{ fontWeight: "600" }}>{devotional.title}</strong>
            )}

            {/* Display the intro paragraph */}
            <div
              className="intro-paragraph"
              style={{ fontFamily: "Poppins", lineHeight: "2ch" }}
              id="intro-paragraph"
              dangerouslySetInnerHTML={{
                __html: content.substring(0, 75) + "...",
              }}
            ></div>
          </div>
        </NavLink>
        {/* Bottom row with actions */}
        <div className="bottom-row">
          <span className="read-now">Devotional of the Day</span>
          <span className="actions">
            <ShareApi
              button_text={<FontAwesomeIcon icon={faShareNodes} />}
              data_to_share={{
                title: "Today's Devotional",
                text: `${devotional.day} - ${devotional.month} (${devotional.year})`,
                url: `https://chris-zano.github.io/store.logos/devotionals`,
                dialogTitle: "Share with friends",
              }}
            />
          </span>
        </div>
      </div>
    </div>
  );
}

export default DevotionalComponent;
