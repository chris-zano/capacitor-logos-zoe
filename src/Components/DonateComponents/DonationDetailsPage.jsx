import { useLocation } from 'react-router-dom'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const ReadAppBar = ({ title }) => {
    return (
        <div id="read-appbar" style={styles.appBar}>
            <div style={styles.row}>
                <button onClick={() => window.history.back()} style={styles.button}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <span style={styles.title}>{title}</span>
            </div>
        </div>
    );
};

function DonationDetailsPage() {
    const location = useLocation();
    const { category, imgSrc, content } = location.state;

    return (
        <>
            <ReadAppBar title={category} />
            <main style={{
                paddingTop: '4.5rem',
                paddingLeft: '2ch',
                paddingRight: '2ch',
                paddingBottom: '2ch',
            }}>
                <div className="donation-details-page">
                    <img src={imgSrc} alt={category} style={{
                        width: '90vw',
                        height: '350px',
                        borderRadius: '1ch',
                        objectFit: 'cover',
                        objectPosition: 'center',
                    }} />
                    <p style={{
                      fontFamily: 'Poppins',
                      fontSize: '1.1rem',
                      marginTop: '1.5ch',  
                    }}>{content}</p>
                </div>
            </main>
        </>
    )
}

const styles = {
    appBar: {
        backgroundColor: 'var(--theme-background)',
        borderBottom: '1px solid var(--light-gray)',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '40px',
        padding: '1ch 2ch',
    },
    row: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        columnGap: '2ch',
    },
    button: {
        outline: 'none',
        border: 'none',
        backgroundColor: 'unset',
        fontSize: '22px',
        color: 'var(--text)',
    },
    title: {
        color: 'var(--text)',
        fontSize: '1.15rem',
        fontWeight: '500',
        fontFamily: 'Poppins',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'wrap',
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 1,
    },
    iframe: {
        position: 'absolute',
        top: '3.3rem',
        left: 0,
        width: '100%',
        height: '100%',
        border: 'none',
        overflow: 'hidden',
    },
};

export default DonationDetailsPage
