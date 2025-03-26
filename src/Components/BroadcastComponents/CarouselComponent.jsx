import React from "react";
import { Link } from "react-router-dom";

const Carousel = ({ currentRoute }) => {
  console.log(currentRoute);
  return (
    <div className="row-carousel-nav">
      <Link
        to="podcasts"
        className={`btn-wrap ${currentRoute === "podcasts" || currentRoute === "broadcast" ? "active" : ""}`}
      >
        Podcasts
      </Link>

      <Link
        to="word-of-power"
        className={`btn-wrap ${currentRoute === "word-of-power" ? "active" : ""}`}
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
