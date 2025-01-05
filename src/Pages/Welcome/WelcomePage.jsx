import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import image1 from '../../assets/images/1.png';
import image2 from '../../assets/images/2.png';
import image3 from '../../assets/images/3.png';
import image4 from '../../assets/images/4.png';

const WelcomePage = () => {
  const images = [
    image1,
    image2,
    image3,
    image4,
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="welcome-screen">
      <div className="carousel" id="image-carousel">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`carousel-${index}`}
            className="carousel-image"
            style={{
              opacity: index === currentIndex ? 1 : 0,
              transition: "opacity 1s ease-in-out",
            }}
          />
        ))}
      </div>

      <section className="overlay-actions">
        <div className="buttons_container">
          <Link to="/auth/login">
            <button type="button" id="get-started-btn" title="Get Started">
              Get Started
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default WelcomePage;
