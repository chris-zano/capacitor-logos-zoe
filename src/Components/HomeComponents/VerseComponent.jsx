import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as regularHeart, faShareNodes } from '@fortawesome/free-solid-svg-icons';
import { faHeart as solidHeart } from '@fortawesome/free-regular-svg-icons';
import { GetDailyVerse } from '/src/data/verse/get_verse_of_the_day';
import ShareApi from '../../NativeApis/Share.jsx';
import baseUrl from '../../baseUrl.js';

const VerseComponent = () => {
    const [dailyVerse, setDailyVerse] = useState({
        reference: '',
        text: '',
        version: '',
        verseurl: '#',
        notice: 'Loading...'
    });

    useEffect(() => {
        const fetchDailyVerse = async () => {
            try {
                const { reference, text, version, verseurl, notice } = await GetDailyVerse();
                setDailyVerse({ reference, text, version, verseurl, notice });
            } catch (err) {
                console.error("Failed to fetch daily verse:", err);
                setDailyVerse(prev => ({ ...prev, notice: 'Failed to load verse. Please try again later.' }));
            }
        };

        fetchDailyVerse();
    }, []);

    return (
        <section id="daily-verse">
            <div className="verse-card">
                <div className="title-text">verse of the day</div>
                <div className="verse-date" id="verse-date">
                    {new Date().toLocaleDateString('en-US', {
                        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
                    })}
                </div>

                <div className="insp-text">
                    <div className="verse-ref">
                        <a href={dailyVerse.verseurl} id="verse-ref" target="_blank" rel="noopener noreferrer">
                            {dailyVerse.reference} ({dailyVerse.version})
                        </a>
                    </div>
                </div>
                <p className="verse" id="verse-text">{dailyVerse.text}</p>
            </div>
            <div className="verse-actions">
                <ShareApi button_text={<FontAwesomeIcon icon={faShareNodes} />} data_to_share={
                    {
                        title: "Verse of the Day",
                        text: `${dailyVerse.text} - ${dailyVerse.reference} (${dailyVerse.version})`,
                        url: `${dailyVerse.verseurl}/`,
                        dialogTitle: "Share with friends",
                    }
                } />
            </div>
            <span id="notice">{dailyVerse.notice}</span>
        </section>
    );
};

export default VerseComponent;
