import React, { useEffect, useState } from "react";
import getSymbols from "../../data/articles/get_symbols.js";
import { NavLink } from "react-router-dom";

const Symbols = () => {
  const [symbols, setSymbols] = useState([]);

  useEffect(() => {
    const fetchSymbols = async () => {
      const data = await getSymbols();
      setSymbols(data);
    };

    fetchSymbols();
  }, []);

  if (!symbols || symbols.length === 0) {
    return null;
  }

  return (
    <section id="symbols" className="symbols">
      <div className="podcast-header">
        <h2 className="section-title">Dream Symbols & Meanings</h2>
      </div>

      <div className="symbols-list">
        {symbols.map((symbol) => (
          <NavLink
            key={symbol._id}
            to={`/articles/article/${symbol._id}/`}
            className="related-article-card"
          >
            <img src={symbol.article_image} alt={symbol.article_title} />

            <div className="article-details">
              <h3>{symbol.article_title}</h3>
              <small>
                {new Date(symbol.updatedAt).toLocaleDateString("en-US", {
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
  );
};

export default Symbols;
