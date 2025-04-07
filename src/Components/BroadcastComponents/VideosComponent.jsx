import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import LoadingSpinner from "../Loaders/LoadingSpinner.jsx";

function VideosComponent({ data_source, category }) {

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const data = await data_source({ category_name: category });
        setVideos(data);
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
    <div className="videos-container" style={{paddingBottom: '80px'}}>
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

              <div className="video-thumbnail">
                <img src={video.video_image} alt={video.video_title} />

                <div className="card-overlay">
                </div>
              </div>
              <div className="description-data">
                <div className="des-img">
                  <img src={video.video_image} alt="sample des-data" />
                </div>
                <div className="des-text">
                  <h3>{video.video_title}</h3>
                  <p>{video.video_description}</p>
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
