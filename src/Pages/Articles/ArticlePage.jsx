import { faBookmark, faTrash } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faShareNodes, faHome, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import getArticleById from "../../data/articles/get_article_by_id.js";
import { Share } from "@capacitor/share";
import userImage from '../../assets/images/logo.png'
import BASEURL from "../../baseUrl.js";
import getUserNameFromLocalStorage from "../../data/user/get_user_name.js";
import { formatDate } from "date-fns";
import addToBookmarks from '../../data/user/add_to_bookmarks.js';
import LoadingSpinner from '../../Components/Loaders/LoadingSpinner.jsx';


const ArticlePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [articleData, setArticleData] = useState(null);
  const [isHidden, setHiddenState] = useState(true);
  const [comments, setComments] = useState([]);
  const [commentValue, setCommentValue] = useState("");

  const fetchComments = async () => {
    try {
      const response = await fetch(`${BASEURL}/articles/${articleData.article._id}/comments`);
      const data = await response.json();
      console.log({ comments: data });
      setComments(data.comments.reverse());
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const fetchArticle = async () => {
    try {
      const data = await getArticleById(id);
      console.log({ data });
      setArticleData(data);
    } catch (error) {
      console.error("Error fetching article data:", error);
    }
  };

  useEffect(() => {
    fetchArticle();
  }, [id]);

  useEffect(() => {
    if (articleData) {
      fetchComments();
    }
  }, [articleData]);

  const postComment = async (e) => {
    e.preventDefault();
    try {
      const _username = getUserNameFromLocalStorage();
      if (!_username) {
        alert('You must be logged in to post a comment.');
        setCommentValue("");
        fetchComments();
        return;
      }
      if (commentValue.trim() === "") {
        alert('Comment cannot be empty.');
        fetchComments();
        return;
      }
      const response = await fetch(`${BASEURL}/articles/${articleData.article._id}/comments/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          comment: commentValue,
          username: _username,
        }),
      });
      await response.json();

      setCommentValue("");
      fetchComments();

    } catch (error) {
      console.error("Error posting comment:", error);
    }
  }

  if (!articleData) {
    return <LoadingSpinner />;
  }

  const { article, relatedArticles } = articleData;


  const updateCommentValue = (e) => {
    setCommentValue(e.target.value)
  }

  const toggleHiddenState = () => {
    setHiddenState(!isHidden)
  }

  return (
    <>
      <header style={{ position: 'relative' }}>
        <div id="read-appbar">
          <div className="row" style={{ display: 'flex', justifyContent: 'space-between', padding: '0 3ch 0 1ch' }}>
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
          style={{ display: `${isHidden ? 'none' : 'block'}` }}
        >
          <div className="drop-down-wrapper">
            <div className="drop-down-item">
              <button
                id="navigate-home-btn"
                onClick={() => navigate('/')}
              >
                <FontAwesomeIcon icon={faHome} />
                <span>Home</span>
              </button>
            </div>
            <div className="drop-down-item">
              <button
                onClick={async () => {
                  const shareData = {
                    title: article.article_title,
                    text: article.article_fullText,
                    url: article.article_image
                  };

                  await Share.share(shareData);
                }}
              >
                <FontAwesomeIcon icon={faShareNodes} />
                <span>Share</span>
              </button>
            </div>
            <div className="drop-down-item">
              <button type="button"
                onClick={() => addToBookmarks({ item_id: article._id, item_type: 'article' })}
              >
                <FontAwesomeIcon icon={faBookmark} />
                <span>Save</span>
              </button>
            </div>
          </div>
        </div>
      </header>
      <div>
        {/* Article Section */}
        <main style={{ marginTop: '3.27rem' }}>
          <article className="a-chapter mt-3">
            <section className="top-header">
              <div className="date-time">
                <p>
                  {new Intl.DateTimeFormat("en-UK", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }).format(new Date(article.updatedAt))}
                </p>
              </div>
              <div className="article-title" id="article-title">
                {article.article_title}
              </div>
              <div className="author">
                <div className="circle-avatar">
                  <img src={article.article_image} alt="Author Avatar" style={{
                    border: '1px solid #ccccde'
                  }} />
                </div>
                <div className="author-name">Rev. Alex Buaben Korsah</div>
              </div>
            </section>

            <section className="image">
              <img src={article.article_image} alt="Article" style={{
                border: '1px solid #ccccde'
              }} />
            </section>

            <section className="message">
              <p id="article-message" dangerouslySetInnerHTML={{ __html: article.article_fullText }}></p>
            </section>
          </article>
        </main>

        {/* Recommended Readings */}
        <section id="recommended-readings">
          {relatedArticles && relatedArticles.length > 0 ? (
            <>
              <h2>Continue Reading</h2>
              <div className="reading-articles">
                {relatedArticles.map((related, index) => (
                  <a
                    href={`/articles/article/${related._id}/`}
                    className="reading-card"
                    key={index}
                  >
                    <div className="r-card-img">
                      <img src={related.article_image} alt="reading-card" />
                    </div>
                    <div className="card-info">
                      <div className="rc-title">
                        {related.article_title.length > 20
                          ? related.article_title.substring(0, 25) + "..."
                          : related.article_title}
                      </div>
                      <div className="rc-author-datetime">
                        <small>
                          {new Date(related.updatedAt).toLocaleDateString("en-US", {
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
            </>
          ) : (
            <a href="/donate" style={{ textDecoration: "underline", color: "blue" }}>
              Support our mission with a donation
            </a>
          )}
        </section>

        <section className="comment-section" style={{ paddingInline: "2ch", marginTop: "2ch" }}>
          <h4>Leave a Comment</h4>
          <form
            method="post"
            style={{ display: "flex", flexDirection: "column" }}
            onSubmit={postComment}
          >
            <input
              type="text"
              name="comment"
              placeholder="Add a comment"
              style={{
                marginBottom: "1ch",
                padding: "1.2rem 2ch",
                borderRadius: "2ch",
                outline: "unset",
                border: "1px solid var(--theme-icon)",
                fontFamily: "Inter",
              }}
              required
              value={commentValue}
              onChange={updateCommentValue}
            />
            <button
              type="submit"
              style={{
                background: "var(--primary)",
                border: "1ch solid var(--primary)",
                color: "var(--white)",
                padding: "1ch 2ch",
                borderRadius: "2ch",
              }}
            >
              Post
            </button>
          </form>
        </section>

        {/* Comments List */}
        <section className="comments-list" style={{ padding: '1ch' }}>
          {comments && comments.length > 0 ? (
            <>
              <div className="comments-header">
                <h3>Comments</h3>
                <p>
                  {comments.length} comment{comments.length > 1 ? "s" : ""}
                </p>
              </div>
              {comments.map((comment, index) => (
                <div style={{
                  padding: '1ch 2ch',
                  marginBottom: '.5ch',
                  border: '1px solid #ccccde',
                  borderRadius: '1ch'
                }} key={index}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1ch',
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1ch',
                    }}>
                      <div style={{
                        width: '2.5rem',
                        height: '2.5rem',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        border: '1px solid #ccccde'
                      }}>
                        <img src={userImage} alt="avatar" style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                        }} />
                      </div>
                      <div className="author-name">
                        <span style={{ fontSize: '0.87rem', fontFamily: 'Poppins' }}>{comment.username || "Anonymous"}</span><br />
                        <small style={{ fontSize: '0.67rem', fontFamily: 'Poppins' }}>{`${formatDate(new Date(comment.date).toISOString(), "PPP")}`}</small>
                      </div>
                    </div>
                    {comment.username === getUserNameFromLocalStorage() ? (
                      <div className="comment-actions">
                        <button
                          onClick={async () => {
                            const response = await fetch(`${BASEURL}/articles/${articleData.article._id}/comments/${comment.date}/delete?user=${comment.username}`, {
                              method: 'DELETE',
                            });
                            await response.json();
                            fetchComments();
                          }}
                          style={{
                            backgroundColor: 'unset',
                            border: 'none'
                          }}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>
                    ) : null}
                  </div>
                  <div className="comment-message">
                    <p>{comment.comment}</p>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="no-comments">
              <p>No comments yet. Be the first to leave one!</p>
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default ArticlePage;
