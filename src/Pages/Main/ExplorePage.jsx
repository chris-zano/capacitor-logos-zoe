import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBible,
  faBuilding,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons"; // Import specific icons
import getCategories from "../../data/explore/get_categories.js";
import "../../styles/explore.css";
import { NavLink } from "react-router-dom";

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
    <div style={{
      padding: "1.7ch 1ch 80px 1ch"
    }}>
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
              <NavLink
                to={
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
              </NavLink>
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
          <NavLink to="/prayer-center">
            <div className="card-icon">
              <FontAwesomeIcon icon={faBuilding} style={{ color: "pink" }} />
            </div>
            <div className="card-title">
              <p>Prayer Center</p>
            </div>
            <div className="card-description">
              <p>Submit a prayer request today.</p>
            </div>
          </NavLink>
        </div>
        <div
          className="grid-card"
          style={{
            animation: `fadeInUp 0.5s ease-out 2.2s 1 forwards`,
          }}
          data-url="/devotionals"
        >
          <NavLink to="/bible">
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
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
