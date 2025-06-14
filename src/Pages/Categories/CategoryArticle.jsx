import { NavLink, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import getCategoryById from "../../data/explore/get_category_by_id.js";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faArrowLeft,
  faShareNodes,
  faHome,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import ShareApi from "../../NativeApis/Share.jsx";
import LoadingSpinner from "../../Components/Loaders/LoadingSpinner.jsx";

const CategoryArticle = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isHidden, setHiddenState] = useState(true);

  const toggleHiddenState = () => {
    setHiddenState(!isHidden);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const articleData = await getCategoryById(id);
        setArticle(articleData.categoryInfo);
        setRelatedArticles(articleData.articles);
      } catch (error) {
        console.error("Error fetching article data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!article) {
    return <div>Article not found.</div>;
  }

  const {
    category_name,
    category_introText,
    updatedAt,
    category_banner,
    category_fullText,
  } = article;
  return (
    <>
      <header style={{ position: "relative" }}>
        <div id="read-appbar">
          <div
            className="row"
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "0 3ch 0 1ch",
            }}
          >
            <button onClick={() => window.history.back()}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <button onClick={toggleHiddenState}>
              <FontAwesomeIcon icon={faEllipsis} />
            </button>
          </div>
        </div>
        <div
          className={`drop-down-home-share`}
          style={{ display: `${isHidden ? "none" : "block"}` }}
        >
          <div className="drop-down-wrapper">
            <div className="drop-down-item">
              <button id="navigate-home-btn" onClick={() => navigate("/")}>
                <FontAwesomeIcon icon={faHome} />
                <span>Home</span>
              </button>
            </div>
            {/* <div className="drop-down-item">
              <button
              // onClick={ async () => {
              //   const shareData = {
              //     title: article.article_title,
              //     text: article.article_fullText,
              //     // url: window.location.href,
              //   };

              //   await Share.share(shareData);

              // }}
              >
                <FontAwesomeIcon icon={faShareNodes} />
                <span>Share</span>
              </button>
            </div> */}
            <div className="drop-down-item"></div>
          </div>
        </div>
      </header>
      <main style={{ marginTop: "3.27rem" }}>
        <div className="a-chapter">
          {/* Article Header */}
          <section className="top-header">
            <div className="date-time">
              <p>
                {new Date(updatedAt).toLocaleDateString("en-UK", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
            <div className="article-title" id="article-title">
              {category_introText}
            </div>
            <div className="author">
              <div className="circle-avatar">
                <img src={category_banner} alt={category_introText} />
              </div>
              <div className="author-name">Rev. Alex Buaben Korsah</div>
            </div>
          </section>

          {/* Article Image */}
          <section className="image">
            <img src={category_banner} alt={category_introText} />
          </section>

          {/* Article Full Text */}
          <section className="message">
            <p
              id="article-message"
              dangerouslySetInnerHTML={{ __html: category_fullText }}
            ></p>
          </section>

          {/* Recommended Articles Section */}
          <section id="cat-rec-readings">
            {relatedArticles && relatedArticles.length ? (
              <>
                <h2>Continue Reading</h2>
                <div className="reading-articles">
                  {relatedArticles.map((relatedArticle) => (
                    <Link
                      key={relatedArticle._id}
                      to={`/articles/article/${relatedArticle._id}`}
                      className="reading-card"
                    >
                      <div className="r-card-img">
                        <img
                          src={relatedArticle.article_image}
                          alt="reading-card-image"
                        />
                      </div>
                      <div className="card-info">
                        <div className="rc-title">
                          {relatedArticle.article_title.length > 20
                            ? `${relatedArticle.article_title.substring(0, 25)}...`
                            : relatedArticle.article_title}
                        </div>
                        <div className="rc-author-datetime">
                          <small>
                            {new Date(
                              relatedArticle.updatedAt,
                            ).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </small>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            ) : (
              <NavLink
                to="/donate"
                style={{ textDecoration: "underline", color: "blue" }}
              >
                Support our mission with a donation
              </NavLink>
            )}
          </section>
        </div>
      </main>
    </>
  );
};

export default CategoryArticle;
