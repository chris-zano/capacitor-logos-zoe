import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as regularBookmark, faShareNodes } from '@fortawesome/free-solid-svg-icons';
import getTodaysDevotional from '../../data/devotionals/get_todays_devotional.js'; // Assuming this is the correct path
import ShareApi from '../../NativeApis/Share.jsx';
import { NavLink } from 'react-router-dom';
import BASEURL from '../../baseUrl.js';

function DevotionalComponent() {
    const [devotional, setDevotional] = useState(null);

    useEffect(() => {
        const fetchDevotional = async () => {
            const data = await getTodaysDevotional();
            setDevotional(data.devotional); // Set the devotional data to state
        };

        fetchDevotional();
    }, []);

    if (!devotional) {
        return <p>Loading...</p>;
    }

    // Formatting the date
    const date = new Date(devotional.year, new Date(`${devotional.month} 1`).getMonth(), devotional.day);
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);

    // Extract the content, similar to the logic in EJS
    const content = String(devotional.content);
    const lowerContent = content.toLowerCase();
    const themeIndex = lowerContent.indexOf('theme');
    const endIndex = lowerContent.indexOf('</p>');
    const extractedContent =
        themeIndex !== -1 && endIndex !== -1 && themeIndex < endIndex
            ? content.substring(themeIndex, endIndex) + '...'
            : content.substring(95, 200) + '...';

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
                        <ShareApi
                            button_text={<FontAwesomeIcon icon={faShareNodes} />}
                            data_to_share={
                                {
                                    title: "Todays Devotional",
                                    text: `Start Your day with the Word of God`,
                                    url: `${BASEURL}/devotionals/devotional/${devotional._id}`,
                                    dialogTitle: "Share with friends",
                                }
                            }
                        />
                    </span>
                </div>
            </div>
        </div>
    );
}

export default DevotionalComponent;
