import { useEffect, useState } from "react";
import getFaithDimensions from "../../data/articles/get_faith_dimensions.js";

function FaithDimensionsComponent() {
    const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const data = await getFaithDimensions();
      setArticles(data);
    };

    fetchArticles();
  }, []);

  if (!articles || articles.length === 0) {
    return null;
  }
  return (
    <section id="spiritual-laws" className="symbols">
      <div className="podcast-header">
        <h2 className="section-title">Faith Dimensions</h2>
        <div>
          <a href="/explore">
            <span>See More</span>
            <i className="fa-solid fa-arrow-right"></i>
          </a>
        </div>
      </div>

      <div className="symbols-list">
        {articles.map((article) => (
          <a
            key={article._id}
            href={`/articles/article/${article._id}/`}
            className="related-article-card"
          >
            <img src={article.article_image} alt={article.article_title} />

            <div className="article-details">
              <h3>{article.article_title}</h3>
              <small>
                {new Date(article.updatedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </small>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}

export default FaithDimensionsComponent