import React, { useEffect, useState } from "react";
import getRecommendedArticles from "../../data/articles/get_random_articles.js";
import { NavLink } from "react-router-dom";

const RecommendedReadings = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const data = await getRecommendedArticles();
      setArticles(data);
    };

    fetchArticles();
  }, []);

  if (!articles || articles.length === 0) {
    return null;
  }

  return (
    <section id="recommended-readings">
      <div className="podcast-header">
        <h2 className="section-title">Today's Highlights</h2>
      </div>

      <div className="reading-articles">
        {articles.map((article) => (
          <NavLink
            key={article._id}
            to={`/articles/article/${article._id}/`}
            className="reading-card"
          >
            <div className="r-card-img">
              <img src={article.article_image} alt="reading-card-image" />
            </div>
            <div className="card-info">
              <div className="rc-title">
                {String(article.article_title).length > 20
                  ? article.article_title.substring(0, 25) + "..."
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
          </NavLink>
        ))}
      </div>
    </section>
  );
};

export default RecommendedReadings;
