import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

const PrayerRequestForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    title: '',
    topic: '',
    request: '',
    anonymous: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/requests/prayer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Prayer request submitted successfully!');
        setFormData({
          name: '',
          email: '',
          title: '',
          topic: '',
          request: '',
          anonymous: false,
        });
      } else {
        const errorResponse = await response.json();
        alert('Error: ' + errorResponse.message);
      }
    } catch (error) {
      console.error('Error submitting prayer request:', error);
      alert('There was an error submitting your prayer request. Please try again.');
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--white)' }}>
      <header>
        <div
          id="read-appbar"
          style={{
            backgroundColor: 'var(--primary)',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '3.2rem',
            padding: '0 1ch',
            zIndex: 10001,
          }}
        >
          <div
            className="row"
            style={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              columnGap: '2ch',
            }}
          >
            <button
              onClick={() => window.history.back()}
              style={{
                outline: 'none',
                border: 'none',
                background: 'unset',
                fontSize: '22px',
                color: 'var(--white)',
              }}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <h2
              className="article_title-p"
              style={{
                fontSize: '1.2rem',
                color: 'var(--white)',
              }}
            >
              Submit A Prayer Request
            </h2>
          </div>
        </div>
      </header>

      <div
        className="form-container"
        style={{
          marginTop: '1rem',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <form
          method="post"
          className="prayer-req-form"
          id="prayerRequestForm"
          onSubmit={handleSubmit}
          style={{
            marginTop: '3.3rem',
            width: '90%',
            padding: '0 0 0 1ch',
          }}
        >
          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label
              htmlFor="name"
              style={{
                display: 'block',
                marginBottom: '5px',
                fontSize: '16px',
                fontWeight: 600,
              }}
            >
              Your Name (Optional)
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              style={{
                backgroundColor: 'var(--white)',
                color: 'var(--text)',
                width: '95%',
                height: '45px',
                textIndent: '1ch',
                border: '1px solid #ccc',
                borderRadius: '5px',
                fontSize: '16px',
                fontFamily: 'Raleway',
              }}
            />
          </div>

          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label
              htmlFor="email"
              style={{
                display: 'block',
                marginBottom: '5px',
                fontSize: '16px',
                fontWeight: 600,
              }}
            >
              Your Email Address (Optional)
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              style={{
                backgroundColor: 'var(--white)',
                color: 'var(--text)',
                width: '95%',
                height: '45px',
                textIndent: '1ch',
                border: '1px solid #ccc',
                borderRadius: '5px',
                fontSize: '16px',
                fontFamily: 'Raleway',
              }}
            />
          </div>

          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label
              htmlFor="title"
              style={{
                display: 'block',
                marginBottom: '5px',
                fontSize: '16px',
                fontWeight: 600,
              }}
            >
              Prayer Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Enter prayer title"
              style={{
                backgroundColor: 'var(--white)',
                color: 'var(--text)',
                width: '95%',
                height: '45px',
                textIndent: '1ch',
                border: '1px solid #ccc',
                borderRadius: '5px',
                fontSize: '16px',
                fontFamily: 'Raleway',
              }}
            />
          </div>

          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label
              htmlFor="topic"
              style={{
                display: 'block',
                marginBottom: '5px',
                fontSize: '16px',
                fontWeight: 600,
              }}
            >
              Prayer Topic
            </label>
            <select
              id="topic"
              name="topic"
              value={formData.topic}
              onChange={handleChange}
              required
              style={{
                backgroundColor: 'var(--white)',
                color: 'var(--text)',
                height: '45px',
                width: '95%',
                textIndent: '1ch',
                border: '1px solid #ccc',
                borderRadius: '5px',
                fontSize: '16px',
                fontFamily: 'Raleway',
              }}
            >
              <option value="" disabled>
                Select a topic
              </option>
              <option value="Prayer">Prayer</option>
              <option value="Praise">Praise</option>
              <option value="Love">Love</option>
              <option value="Healing">Healing</option>
              <option value="Strength">Strength</option>
              <option value="Financial">Financial</option>
              <option value="Friend">Friend</option>
              <option value="Family">Family</option>
              <option value="Relationship">Relationship</option>
              <option value="Loss">Loss</option>
              <option value="Confusion">Confusion</option>
              <option value="Loneliness">Loneliness</option>
              <option value="Suffering">Suffering</option>
              <option value="Faith">Faith</option>
              <option value="Natural Disaster">Natural Disaster</option>
              <option value="Lust">Lust</option>
              <option value="Greed">Greed</option>
              <option value="Jealousy">Jealousy</option>
              <option value="Miracle">Miracle</option>
              <option value="Spiritual">Spiritual</option>
              <option value="Wisdom">Wisdom</option>
              <option value="Other">Other</option>
              <option value="Answered Prayer">Answered Prayer</option>
            </select>
          </div>

          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label
              htmlFor="request"
              style={{
                display: 'block',
                marginBottom: '5px',
                fontSize: '16px',
                fontWeight: 600,
              }}
            >
              Your Prayer Request
            </label>
            <textarea
              id="request"
              name="request"
              value={formData.request}
              onChange={handleChange}
              required
              placeholder="Enter your prayer request"
              style={{
                backgroundColor: 'var(--white)',
                color: 'var(--text)',
                width: '95%',
                height: '200px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                resize: 'none',
              }}
            />
          </div>

          <div
            className="checkbox-group"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1ch',
              marginBottom: '15px',
            }}
          >
            <input
              type="checkbox"
              id="anonymous"
              name="anonymous"
              checked={formData.anonymous}
              onChange={handleChange}
              style={{
                cursor: 'pointer',
              }}
            />
            <label
              htmlFor="anonymous"
              style={{
                fontSize: '14px',
              }}
            >
              Submit as anonymous
            </label>
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Submit"
              style={{
                backgroundColor: 'var(--primary)',
                color: 'var(--white)',
                width: '95%',
                height: '45px',
                textIndent: '1ch',
                border: '1px solid transparent',
                borderRadius: '1ch',
                fontSize: '1rem',
                fontFamily: 'Raleway',
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default PrayerRequestForm;
