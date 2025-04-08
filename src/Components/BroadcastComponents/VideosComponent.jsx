import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import LoadingSpinner from "../Loaders/LoadingSpinner.jsx";
import logo from '../../assets/images/ali.jpg'
import { fetchYouTubeVideoDetails } from "../../data/videos/get_video_data.js";

function VideosComponent({ data_source, category }) {

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function extractVideoIdFromIframe(iframeHtml) {
    const match = iframeHtml.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : null;
  }

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const data = await data_source({ category_name: category });
        const tempArray = []
        // for each video, extract the video ID from the iframe HTML
        Array.from(data).forEach(async (video) => {
          const videoUrl = extractVideoIdFromIframe(video.video_fullText);
          const videoId = videoUrl;
          const res = await fetchYouTubeVideoDetails(videoId);
          video = { ...video, ...res }
          tempArray.push(video)
          if (tempArray.length === data.length) {
            setVideos(tempArray);
            console.log(tempArray);
          }
        });
      } catch (err) {
        console.log(err);
        setError("Failed to load videos. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [data_source]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="videos-container" style={{ paddingBottom: '80px' }}>
      {videos.length === 0 ? (
        <p>No content available for this category</p>
      ) : (
        videos.map((video) => {
          const cleanedIframe = video.video_fullText.replace(/\\"/g, '"');
          return (
            <a
              key={video._id}
              href={`/videos/video/${video._id}/${video.category}`}
              className="video-card"
              id={video._id}

            >

              <div className="video-thumbnail" style={{ position: 'relative' }}>
                <img src={video.video_image} alt={video.video_title} />

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
                    {video.duration}
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
                      video.video_title.length > 30
                        ? video.video_title.substring(0, 30) + "..."
                        : video.video_title
                    }
                  </span>
                  <small>{video.description.substring(0, 40) + '...'}</small>
                  <span>
                    <small>
                      {
                        video.views === "1"
                          ? video.views + " view"
                          : video.views + " views"
                      }
                    </small>{" . "}
                    <small>
                      {
                        video.likes === "1"
                          ? video.likes + " like"
                          : video.likes + " likes"
                      }
                    </small>
                  </span>
                </div>
              </div>
            </a>
          );
        })
      )}
    </div>
  );
}

export default VideosComponent;
