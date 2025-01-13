import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as regularBookmark, faShareNodes } from '@fortawesome/free-solid-svg-icons';
import getTodaysDevotional from '../../data/devotionals/get_todays_devotional.js';
import ShareApi from '../../NativeApis/Share.jsx';
import { NavLink } from 'react-router-dom';
import BASEURL from '../../baseUrl.js';
import { Share } from '@capacitor/share';

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
        return <p>Loading...</p>;
    }


    const date = new Date(devotional.year, new Date(`${devotional.month} 1`).getMonth(), devotional.day);
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);


    const content = String(devotional.content);
    const lowerContent = content.toLowerCase();
    const themeIndex = lowerContent.indexOf('theme');
    const endIndex = lowerContent.indexOf('</p>');
    const extractedContent =
        themeIndex !== -1 && endIndex !== -1 && themeIndex < endIndex
            ? content.substring(themeIndex, endIndex) + '...'
            : content.substring(95, 200) + '...';

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
    }

    return (
        <div>
            <div className="podcast-header">
                <h2 className="section-title">Today's Devotional</h2>
            </div>
            <div className="devotional-daily">
                <NavLink
                    to={`/devotionals/devotional/${devotional._id}`}
                >
                    {/* Display the theme picture */}
                    <img src={devotional.theme_picture_url} alt="devotional" />
                    <div className="devotional-details">
                        <div className="date">{formattedDate}</div>

                        {/* Display the intro paragraph */}
                        <div
                            className="intro-paragraph"
                            id="intro-paragraph"
                            dangerouslySetInnerHTML={{ __html: extractedContent }}
                        ></div>
                    </div>
                </NavLink>
                {/* Bottom row with actions */}
                <div className="bottom-row">
                    <span className="read-now">Devotional of the Day</span>
                    <span className="actions">
                        <FontAwesomeIcon icon={regularBookmark} />
                        <button
                            onClick={handleShare}
                            style={{
                                border: "none",
                                background: "none",
                                cursor: "pointer",
                                padding: 0,
                                marginLeft: "10px",
                            }}
                            aria-label="Share Today's Devotional"
                        >
                            <FontAwesomeIcon icon={faShareNodes} />
                        </button>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default DevotionalComponent;
