import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faHome } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const AboutUsPage = () => {
    const navigate = useNavigate();

    return (
        <div>
            {/* AppBar Header */}
            <header>
                <div id="read-appbar">
                    <div
                        className="row"
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            padding: '0 3ch 0 1ch',
                        }}
                    >
                        <button onClick={() => window.history.back()}>
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </button>
                        <button onClick={() => navigate('/')}>
                            <FontAwesomeIcon icon={faHome} />
                        </button>
                    </div>
                </div>
            </header>

            {/* Content */}
            <main style={{ padding: '2rem' }}>
                <h1>About Us</h1>
                <p>
                    The Logos-Zoé app is a product of The Noah's Project (a non-for-profit organization) established in 2021. The Noah’s Project is an online Christian missionary project providing a complete ecosystem for the unbeliever to search and know the truth of Christ, and the believer to be rooted and built up in Jesus Christ.
                </p>
                <p>
                    In a day when few Christians are signing up for missionary work, global pandemic making missionary work more difficult, and the second coming of Christ being eminent, The Project sees the opportunity to bring the gospel of our Lord to unreached areas of the world as long as internet access is there. Through the marketing of our website and App, we hope to bring the saving gospel to the population online.
                </p>
                <p>
                    We trust that you will find the work of The Project necessary at such a time like this to support or partner to prepare souls for Christ's coming. God bless you more.
                </p>

                <h2>Contact</h2>
                <p>P. O. Box AF 898, Ghana</p>
                <p>Whatsapp: +233-503-192-221</p>
                <p>Email: info@noahsproject.org</p>
                <p>Website: <a href="https://www.noahsproject.org" target="_blank" rel="noopener noreferrer">www.noahsproject.org</a></p>
            </main>
        </div>
    );
};

export default AboutUsPage;
