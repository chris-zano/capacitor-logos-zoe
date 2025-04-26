import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import LoadingSpinner from "../Loaders/LoadingSpinner.jsx";
import logo from '../../assets/images/ali.jpg'
import { fetchYouTubeVideoDetails } from "../../data/videos/get_video_data.js";
import { NavLink } from "react-router-dom";

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

        // Step 1: Create video fetch promises
        const videoFetchPromises = data.map(async (video) => {
          const videoId = extractVideoIdFromIframe(video.video_fullText);
          if (!videoId) return null;

          try {
            const details = await fetchYouTubeVideoDetails(videoId);
            if (!details || details.error) return null;

            return { ...video, ...details };
          } catch (err) {
            console.warn("Failed to fetch details for video ID:", videoId, err);
            return null;
          }
        });

        // Step 2: Await all and filter valid ones
        const results = await Promise.allSettled(videoFetchPromises);
        const successfulVideos = results
          .filter(res => res.status === "fulfilled" && res.value !== null)
          .map(res => res.value);

        setVideos(successfulVideos);
      } catch (err) {
        console.error(err);
        setError("Failed to load videos. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [data_source, category]);


  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="videos-container" style={{ paddingBottom: '80px' }}>
      {videos.length === 0 ? (
        <LoadingSpinner />
      ) : (
        videos.map((video) => {
          const cleanedIframe = video.video_fullText.replace(/\\"/g, '"');
          return (
            <NavLink
              key={video._id}
              to={`/videos/video/${video._id}/${video.category}`}
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
                      backgroundColor: 'black',
                      color: 'white',
                      width: '55px',
                      height: '30px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: '5px',
                      fontSize: '0.855rem',
                      fontWeight: '400',
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
                        video.views == "undefined"
                          ? "0 views"
                          : video.views === "1"
                            ? video.views + " view"
                            : video.views + " views"
                      }
                    </small>{" . "}
                    <small>
                      {
                        video.likes === undefined
                          ? "0 likes"
                          : video.likes === "1"
                            ? video.likes + " like"
                            : video.likes + " likes"
                      }
                    </small>
                  </span>
                </div>
              </div>
            </NavLink>
          );
        })
      )}
    </div>
  );
}

export default VideosComponent;
