import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import image1 from '../../assets/images/1.png';
import image2 from '../../assets/images/2.png';
import image3 from '../../assets/images/3.png';
import image4 from '../../assets/images/4.png';
import '../../styles/welcome_page.css';

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
  }, [currentIndex, totalSlides])

  return (
    <div className="welcome-screen" data-testid="welcome-screen">
      <div className="carousel" id="image-carousel">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Welcome introduction slide ${index + 1} of ${totalSlides}`}
            className={`carousel-image ${index === currentIndex ? 'active' : ''}`}
            data-testid={`carousel-image-${index}`}
          />
        ))}
        {/* Dark overlay for text visibility */}
        <div className="dark-overlay" data-testid="dark-overlay"></div>
      </div>

      <section className="overlay-actions" data-testid="overlay-actions">
        {/* Indicators remain centered */}
        <div className="carousel-indicators" data-testid="carousel-indicators">
          {images.map((_, index) => (
            <button
              key={index}
              className={`indicator-dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              title={`Go to slide ${index + 1}`}
              data-testid={`indicator-dot-${index}`}
            />
          ))}
        </div>

        <div className="buttons_container" data-testid="buttons-container">
          {(
            <Link
              to="/auth/login"
              className="skip-link"
              title="Skip Intro"
              data-testid="skip-link"
            >
              Skip
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default WelcomePage;