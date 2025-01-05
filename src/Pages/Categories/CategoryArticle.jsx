import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import getCategoryById from "../../data/explore/get_category_by_id.js";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faArrowLeft, faShareNodes } from '@fortawesome/free-solid-svg-icons';
import ShareApi from '../../NativeApis/Share.jsx';

const CategoryArticle = () => {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [relatedArticles, setRelatedArticles] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const articleData = await getCategoryById(id);
                setArticle(articleData.categoryInfo);
                setRelatedArticles(articleData.articles);
            } catch (error) {
                console.error('Error fetching article data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!article) {
        return <div>Article not found.</div>;
    }

    const { category_name, category_introText, updatedAt, category_banner, category_fullText } = article
    return (
        <>
            <header>
                <div id="read-appbar">
                    <div className="row">
                        <button onClick={() => window.history.back()}>
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </button>
                    </div>
                </div>
            </header>
            <main>
                <div className="a-chapter">
                    {/* Article Header */}
                    <section className="top-header">
                        <div className="date-time">
                            <p>{new Date(updatedAt).toLocaleDateString('en-UK', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                            <span style={{ display: 'flex', gap: '2rem' }}>
                                <ShareApi
                                    button_text={<FontAwesomeIcon icon={faShareNodes} style={{ color: "var(--text)" }} />}
                                    data_to_share={{
                                        title: category_name,
                                        text: category_fullText,
                                        url: "https://chris-zano.github.io/store.logos/",
                                    }}
                                />
                                <FontAwesomeIcon icon={faHeart} style={{ color: "var(--text)" }} />
                            </span>
                        </div>
                        <div className="article-title" id="article-title">{category_introText}</div>
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
                        <p id="article-message" dangerouslySetInnerHTML={{ __html: category_fullText }}></p>
                    </section>

                    {/* Comment Section */}
                    {/* <section className="comment-section" style={{ paddingInline: '2ch', marginTop: '2ch' }}>
                <h4>Leave a Comment</h4>
                <form method="post" action={`/comment-article/${id}`} style={{ display: 'flex', flexDirection: 'column' }}>
                    <input
                        type="text"
                        name="comment"
                        placeholder="Add a comment"
                        style={{ marginBottom: '1ch', padding: '1.2rem 2ch', borderRadius: '2ch', outline: 'unset', border: '1px solid var(--theme-icon)', fontFamily: 'inter' }}
                        required
                    />
                    <button
                        type="submit"
                        style={{ background: 'var(--primary)', border: '1ch solid var(--primary)', color: 'var(--white)', padding: '1ch 2ch', borderRadius: '2ch' }}
                    >
                        Post
                    </button>
                </form>
            </section> */}

                    {/* Comments List */}
                    {/* <section className="comments-list">
                {comments && comments.length ? (
                    <div className="comments-header">
                        <h3>Comments</h3>
                        <p>{comments.length} comment{comments.length > 1 ? 's' : ''}</p>
                    </div>
                ) : (
                    <div className="no-comments">
                        <p>No comments yet. Be the first to leave one!</p>
                    </div>
                )}

                {comments && comments.map((comment, index) => (
                    <div key={index} className="comment">
                        <div className="comment-author">
                            <div className="circle-avatar">
                                <img src="/default-avatar.jpg" alt="avatar" />
                            </div>
                            <div className="author-name">{comment.author || 'Anonymous'}</div>
                        </div>
                        <div className="comment-message">
                            <p>{comment.message}</p>
                        </div>
                    </div>
                ))}
            </section> */}

                    {/* Recommended Articles Section */}
                    <section id="recommended-readings">
                        {relatedArticles && relatedArticles.length ? (
                            <>
                                <h2>Continue Reading</h2>
                                <div className="reading-articles">
                                    {relatedArticles.map((relatedArticle) => (
                                        <Link key={relatedArticle._id} to={`/articles/article/${relatedArticle._id}`} className="reading-card">
                                            <div className="r-card-img">
                                                <img src={relatedArticle.article_image} alt="reading-card-image" />
                                            </div>
                                            <div className="card-info">
                                                <div className="rc-title">{relatedArticle.article_title.length > 20 ? `${relatedArticle.article_title.substring(0, 25)}...` : relatedArticle.article_title}</div>
                                                <div className="rc-author-datetime">
                                                    <small>{new Date(relatedArticle.updatedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</small>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <a href="/donate" style={{ textDecoration: 'underline', color: 'blue' }}>Support our mission with a donation</a>
                        )}
                    </section>
                </div>
            </main>
        </>
    );
};

export default CategoryArticle;
