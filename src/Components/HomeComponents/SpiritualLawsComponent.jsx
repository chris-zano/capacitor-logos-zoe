import { useEffect, useState } from "react";
import getSpiritualLaws from "../../data/articles/get_spiritual_laws.js";
import { NavLink } from "react-router-dom";

function SpiritualLawsComponent() {
    const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const data = await getSpiritualLaws();
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
        <h2 className="section-title">Spiritual Laws</h2>
      </div>

      <div className="symbols-list">
        {articles.map((article) => (
          <NavLink
            key={article._id}
            to={`/articles/article/${article._id}/`}
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
          </NavLink>
        ))}
      </div>
    </section>
  )
}

export default SpiritualLawsComponent