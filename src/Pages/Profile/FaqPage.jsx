import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faHome } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import FAQ from '../../Components/AboutComponents/FAQComponent.jsx';

const FaqPage = () => {
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
                            <span style={{ marginLeft: '2ch' }} className='poppins-regular'>FAQs</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Content */}
            <main style={{marginTop: '3.7rem', paddingBottom: "2ch" }}>
                <FAQ />
            </main>
        </div>
    );
};

export default FaqPage;
