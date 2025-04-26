import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import image1 from '../../assets/images/1.png';
import image2 from '../../assets/images/2.png';
import image3 from '../../assets/images/3.png';
import image4 from '../../assets/images/4.png';

const WelcomePage = () => {
  const images = [image1, image2, image3, image4];
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = images.length;

  const goToSlide = (index) => {
    if (index >= 0 && index < totalSlides) {
      setCurrentIndex(index);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="welcome-wrapper">
      <div className="carousel-wrapper">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index + 1}`}
            className={`carousel-image ${index === currentIndex ? 'active' : ''}`}
          />
        ))}
        <div className="dark-overlay" />
      </div>

      <div className="controls">
        <div className="indicators">
          {images.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <Link to="/auth/login" className="skip-link">
          Get Started
        </Link>
      </div>

      <style>{`
        .welcome-wrapper {
          font-family: 'Poppins', sans-serif;
          height: 100svh;
          position: relative;
          background: #ffffff;
          overflow: hidden;
        }

        .carousel-wrapper {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .carousel-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center;
          opacity: 0;
          transition: opacity 0.6s ease-in-out;
        }

        .carousel-image.active {
          opacity: 1;
          z-index: 1;
        }

        .dark-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.15);
          z-index: 2;
        }

        .controls {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 3;
          text-align: center;
        }

        .indicators {
          display: none;
        }


        .dot {
          display: none;
          height: 10px;
          width: 10px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.5);
          border: none;
          cursor: pointer;
          transition: background-color 0.3s ease, transform 0.3s ease;
        }

        .dot.active {
          background-color: #fff;
          transform: scale(1.2);
        }

        .skip-link {
        font-family: 'Poppins', sans-serif;
        font-size: 1rem;
        color: white;
        text-decoration: none;
        background-color: rgba(34, 139, 34, 0.9); /* greenish background with transparency */
        padding: 1rem 3rem;
        border-radius: 50px;
        transition: background-color 0.3s ease;
        backdrop-filter: blur(6px); /* frosted glass effect */
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2); /* soft shadow for depth */
      }

      .skip-link:hover {
        background-color: rgba(34, 139, 34, 0.7); /* darker greenish shade on hover */
      }


      `}</style>
    </div>
  );
};

export default WelcomePage;
