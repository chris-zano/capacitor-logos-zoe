import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faShare,
  faCirclePlay,
} from "@fortawesome/free-solid-svg-icons";
import ShareApi from "../../NativeApis/Share.jsx";
import getVideoById from "../../data/videos/get_video_by_id.js";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../Components/Loaders/LoadingSpinner.jsx";
import logo from "../../assets/images/ali.jpg";
import { fetchYouTubeVideoDetails } from "../../data/videos/get_video_data.js";

const VideoPlayerPage = ({ match }) => {
  const params = useParams();
  const [video, setVideo] = useState(null);
  const [videos, setVideos] = useState([]);

  const { id, category } = params;

  function extractVideoIdFromIframe(iframeHtml) {
    const match = iframeHtml.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : null;
  }

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const { video, videos } = await getVideoById({ videoId: id, category });
        const videoUrl = extractVideoIdFromIframe(video.video_fullText);
        const videoId = videoUrl;
        const res = await fetchYouTubeVideoDetails(videoId);
        const _video = { ...video, ...res };
        setVideo(_video);

        const tempArray = [];
        Array.from(videos).forEach(async (video) => {
          const videoUrl = extractVideoIdFromIframe(video.video_fullText);
          const videoId = videoUrl;
          const res = await fetchYouTubeVideoDetails(videoId);
          video = { ...video, ...res }
          tempArray.push(video)
          if (tempArray.length === videos.length) {
            setVideos(tempArray);
          }
        });
      } catch (error) {
        console.error("Error fetching video data:", error);
      }
    };

    fetchVideoData();
  }, [id]);

  return (
    <div>
      <header>
        <div id="read-appbar">
          <div className="row">
            <button onClick={() => window.history.back()}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <h3
              style={{ color: "var(--text)", fontFamily: "Inter" }}
              className="article_title-p"
            >
              {video ? (video.video_title.length > 20 ? video.video_title.substring(0, 20) + "..." : video.video_title) : <LoadingSpinner />}
            </h3>
          </div>
        </div>
      </header>

      <main id="video-player-main">
        <section className="player-section">
          {video ? (
            <div className="video-player">
              <div className="iframe-container">
                {/* Dangerously set inner HTML for iframe */}
                <div
                  dangerouslySetInnerHTML={{
                    __html: video.video_fullText.replace(/\\"/g, '"'),
                  }}
                />
              </div>
              <article className="player-des">
                <div className="player-des-img">
                  <img src={logo} alt={video.description} />
                </div>
                <div className="player-des-text">
                  <span className="video-title">
                    {video.video_title}
                  </span>
                  <span className="video-description">
                    {video.description}
                  </span>
                </div>
              </article>
            </div>
          ) : (
            <p>Video not available.</p>
          )}
        </section>

        <section className="related-section">
          {videos.length === 0 ? (
            <p>No related videos available for this category.</p>
          ) : (
            <div className="related-videos-grid">
              {videos.map((v) => (
                <a
                  key={v._id}
                  href={`/videos/video/${v._id}/${v.category}`}
                  className="video-card"
                  id={v._id}

                >

                  <div className="video-thumbnail" style={{ position: 'relative' }}>
                    <img src={v.video_image} alt={v.video_title} />

                    <div>
                      <span
                        style={{
                          position: 'absolute',
                          bottom: '9%',
                          right: '2%',
                          backgroundColor: 'var(--red)',
                          color: 'white',
                          width: '55px',
                          height: '30px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: '5px',
                          fontSize: '1rem',
                          fontWeight: '500',
                        }}
                      >
                        {v.duration}
                      </span>
                    </div>
                  </div>
                  <div className="description-data">
                    <div className="des-img">
                      <img src={logo} alt="sample des-data" />
                    </div>
                    <div className="des-text">
                      <span className="vd-title">
                        {
                          v.video_title.length > 30
                            ? v.video_title.substring(0, 30) + "..."
                            : v.video_title
                        }
                      </span>
                      <small>{v.description.substring(0, 40) + '...'}</small>
                      <span>
                        <small>
                          {
                            v.views === "1"
                              ? v.views + " view"
                              : v.views + " views"
                          }
                        </small>{" . "}
                        <small>
                          {
                            v.likes === "1"
                              ? v.likes + " like"
                              : v.likes + " likes"
                          }
                        </small>
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default VideoPlayerPage;
