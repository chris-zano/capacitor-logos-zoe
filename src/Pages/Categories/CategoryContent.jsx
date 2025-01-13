import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faHeart, faHome } from "@fortawesome/free-solid-svg-icons";
import getCategoryById from "../../data/explore/get_category_by_id.js";

const CategoryContent = () => {
    const navigate = useNavigate()
    const { id } = useParams();
    const [categoryInfo, setCategoryInfo] = useState(null);
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { categoryInfo, articles } = await getCategoryById(id);
                console.log({ categoryInfo, articles });
                setCategoryInfo(categoryInfo);
                setArticles(articles);
            } catch (error) {
                console.error("Error fetching category data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!categoryInfo) {
        return <div>Category not found.</div>;
    }

    const { title: category_name, category_introText, updatedAt, category_banner, category_fullText } = categoryInfo;

    return (
        <>
            <header>
                <div id="read-appbar">
                    <div className="row" style={{display:'flex', justifyContent: 'space-between', padding: '0 3ch 0 1ch'}}>
                        <button onClick={() => window.history.back()}>
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </button>
                        <button onClick={() => navigate('/')}>
                            <FontAwesomeIcon icon={faHome} />
                        </button>
                    </div>
                </div>
            </header>
            <div className="article-page">
                {/* Landing Page Article */}
                <article className="chapter">
                    <section className="top-header">
                        <div className="date-time">
                            <p>
                                {new Date(updatedAt).toLocaleDateString("en-UK", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                })}
                            </p>
                            <FontAwesomeIcon icon={faHeart} />
                        </div>
                        <section className="category-title">
                            <p style={{ fontSize: "1.4rem", fontWeight: 600 }}>{category_introText}</p>
                        </section>
                        <div className="article-title" id="article-title">
                            {category_name}
                        </div>
                        <div className="author">
                            <div className="circle-avatar">
                                <img src={category_banner} alt={category_name} />
                            </div>
                            <div className="author-name">Rev. Alex Buaben Korsah</div>
                        </div>
                    </section>

                    <section className="image">
                        <img src={category_banner} alt={category_name} />
                    </section>

                    <section id="message-overview" dangerouslySetInnerHTML={{ __html: category_fullText.length > 350 ? `${category_fullText.substring(0, 350)}...` : category_fullText }}></section>

                    <section className="continue-reading-btn">
                        <Link to={`/categories/article/${categoryInfo._id}`}>
                            <button type="button">Continue Reading</button>
                        </Link>
                    </section>
                </article>

                {/* Related Articles Section */}
                <section id="recommended-readings">
                    <h2 className="header-title">{articles.length > 0 ? "Related Articles" : ""}</h2>
                    <div className="reading-articles">
                        {articles.map((article) => (
                            <Link key={article._id} to={`/articles/article/${article._id}`} className="reading-card">
                                <div className="r-card-img">
                                    <img src={article.article_image} alt="reading-card-image" />
                                </div>
                                <div className="card-info">
                                    <div className="rc-title">
                                        {article.article_title.length > 20
                                            ? `${article.article_title.substring(0, 25)}...`
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
                            </Link>
                        ))}
                    </div>
                </section>
            </div>
        </>
    );
};

export default CategoryContent;
