import React, { useEffect, useState } from "react";
import getVideosByCategoryName from "../../data/videos/get_videos_by_category_name.js";
import { NavLink } from "react-router-dom";

const MotivationalsComponent = () => {
  const [nuggets, setNuggets] = useState([]);

  useEffect(() => {
    const fetchnuggets = async () => {
      const data = await getVideosByCategoryName({
        category_name: "motivationals",
      });
      setNuggets(data.slice(0, 3));
    };

    fetchnuggets();
  }, []);

  if (!nuggets || nuggets.length === 0) {
    return null;
  }

  return (
    <div className="testimony-list">
      <div className="testimony-header">
        <h2 className="section-title">Motivationals</h2>
      </div>

      {nuggets.map((nugget) => (
        <NavLink
          to={`/videos/video/${nugget._id}/${nugget.category}`}
          key={nugget._id}
          className="testimonial-card"
        >
          <div id={nugget._id} className="testimony-item">
            <div className="p-image">
              <img
                src={nugget.video_image}
                alt={nugget.video_title}
                width="100px"
              />
            </div>
            <div className="testimony-details">
              <div className="p-title">
                <p>{nugget.video_title}</p>
              </div>
              <div className="p-description">
                <p>nuggets of Jesus Christ</p>
              </div>
            </div>
            <div className="testimony-play-icon">
              <span>
                <i className="fa-regular fa-circle-play"></i>
              </span>
            </div>
          </div>
        </NavLink>
      ))}
    </div>
  );
};

export default MotivationalsComponent;
