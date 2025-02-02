import React, { useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const ReadAppBar = ({ title }) => {
  return (
    <div id="read-appbar" style={styles.appBar}>
      <div style={styles.row}>
        <button onClick={() => window.history.back()} style={styles.button}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <h2 style={styles.title}>{title}</h2>
      </div>
    </div>
  );
};

const DonateFrame = () => {
  useEffect(() => {
    const iframe = document.querySelector('iframe');
    iframe.onload = function () {
      const iframeContent = iframe.contentWindow || iframe.contentDocument;
      try {
        const button = iframeContent.document.querySelector('.btn-main.opt-1.w-100');
        if (button) {
          button.style.display = 'none';
          button.onclick = function () {
            window.location.href = 'your-app-url://';
          };
        }
      } catch (e) {
        console.error('Cannot access iframe content: ', e);
      }
    };
  }, []);

  return <iframe src="https://paystack.com/pay/3u3-xshikb" style={styles.iframe}></iframe>;
};

const OneTimeDonationPage = () => {
  const title = 'Donate'; // Replace with the dynamic value you want to pass
  return (
    <>
      <ReadAppBar title={title} />
      <DonateFrame />
    </>
  );
};

const styles = {
  appBar: {
    backgroundColor: 'var(--primary)',
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
    color: 'var(--white)',
  },
  title: {
    color: 'var(--white)',
    fontWeight: 600,
    fontSize: '1.3rem',
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

export default OneTimeDonationPage;
