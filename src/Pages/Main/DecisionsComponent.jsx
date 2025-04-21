import React, { useEffect, useState } from "react";
import getDecisions from "../../data/articles/get_decisions.js";

const DecisionsComponent = () => {
  const [decisions, setDecisions] = useState([]);

  useEffect(() => {
    const fetchDecisions = async () => {
      const data = await getDecisions();
      setDecisions(data);
    };

    fetchDecisions();
  }, []);

  if (!decisions || decisions.length === 0) {
    return null;
  }

  return (
    <section id="recommended-readings">
      <div className="podcast-header">
        <h2 className="section-title">Steps of Faith</h2>
        <div>
          {/* <a href="/explore">
            <span>See More</span>
            <i className="fa-solid fa-arrow-right"></i>
          </a> */}
        </div>
      </div>

      <div className="reading-articles">
        {decisions.map((article) => (
          <a
            key={article._id}
            href={`/articles/article/${article._id}/`}
            className="reading-card"
          >
            <div className="r-card-img">
              <img src={article.article_image} alt="reading-card-image" />
            </div>
            <div className="card-info">
              <div className="rc-title">
                {String(article.article_title).length > 30
                  ? article.article_title.substring(0, 30) + "..."
                  : article.article_title}
              </div>
              <div className="rc-author-datetime">
                <small>
                  {new Date(article.updatedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </small>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default DecisionsComponent;
