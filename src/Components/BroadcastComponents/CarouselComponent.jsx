import React from "react";
import { Link } from "react-router-dom";

const Carousel = ({ currentRoute }) => {
  return (
    <div className="row-carousel-nav">
      <Link
        to="podcast"
        className={`btn-wrap ${currentRoute === "podcast" || currentRoute === "broadcast" ? "active" : ""}`}
      >
        Podcasts
      </Link>

      <Link
        to="word-of-faith"
        className={`btn-wrap ${currentRoute === "word-of-faith" ? "active" : ""}`}
      >
        Word of Faith
      </Link>

      <Link
        to="prayers"
        className={`btn-wrap ${currentRoute === "prayers" ? "active" : ""}`}
      >
        Prayers
      </Link>

      <Link
        to="wisdom-nuggets"
        className={`btn-wrap ${currentRoute === "wisdom-nuggets" ? "active" : ""}`}
      >
        Wisdom Nuggets
      </Link>

      <Link
        to="motivationals"
        className={`btn-wrap ${currentRoute === "motivationals" ? "active" : ""}`}
      >
        Motivationals
      </Link>

      <Link
        to="inspirational"
        className={`btn-wrap ${currentRoute === "inspirational" ? "active" : ""}`}
      >
        5 Minute Inspirational
      </Link>

      <Link
        to="testimony-of-jesus"
        className={`btn-wrap ${currentRoute === "testimony-of-jesus" ? "active" : ""}`}
      >
        Testimony of Jesus
      </Link>
    </div>
  );
};

export default Carousel;
