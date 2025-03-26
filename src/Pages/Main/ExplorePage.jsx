import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBible,
  faBuilding,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons"; // Import specific icons
import getCategories from "../../data/explore/get_categories.js";
import "../../styles/explore.css";

const ExplorePage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data.categories);
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <div className="explore-title">
        <h2 className="section-title">Explore</h2>
      </div>
      <div id="explore-grid" className="explore-grid">
        {categories.map((category, index) => {
          const isSpecialCategory =
            category.category_name === "Jesus Talk" ||
            category.category_name === "Spiritual Laws";
          const animationDelay = `${(index / 3) * 0.2}s`;

          return (
            <div
              key={category._id}
              className="grid-card"
              style={{
                animation: `fadeInUp 0.5s ease-out ${animationDelay} forwards`,
              }}
              data-url={`/categories/${category._id}`}
            >
              <a
                href={
                  isSpecialCategory
                    ? `/categories/chapters/${category._id}`
                    : `/categories/${category._id}`
                }
              >
                <div className="card-icon">
                  <FontAwesomeIcon
                    icon={category.category_icon} // Assuming `category_icon` provides a valid FontAwesome icon name
                    style={{ color: category.color }}
                  />
                </div>
                <div className="card-title">
                  <p>{category.category_name}</p>
                </div>
                <div className="card-description">
                  <p>{category.description}</p>
                </div>
              </a>
            </div>
          );
        })}
        {/* Additional grid cards for Prayer Center and Devotionals */}
        <div
          className="grid-card"
          style={{
            animation: `fadeInUp 0.5s ease-out 2s 1 forwards`,
          }}
          data-url="/prayer-center"
        >
          <a href="/prayer-center">
            <div className="card-icon">
              <FontAwesomeIcon icon={faBuilding} style={{ color: "pink" }} />
            </div>
            <div className="card-title">
              <p>Prayer Center</p>
            </div>
            <div className="card-description">
              <p>Submit a prayer request today.</p>
            </div>
          </a>
        </div>
        <div
          className="grid-card"
          style={{
            animation: `fadeInUp 0.5s ease-out 2.2s 1 forwards`,
          }}
          data-url="/devotionals"
        >
          <a href="/bible">
            <div className="card-icon">
              <FontAwesomeIcon icon={faBible} style={{ color: "blue" }} />
            </div>
            <div className="card-title">
              <p>Bible</p>
            </div>
            <div className="card-description">
              <p>
                Explore the timeless wisdom and teachings of the word of God
              </p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
