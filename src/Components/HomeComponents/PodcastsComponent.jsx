import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import getRandomPodcasts from "../../data/podcasts/get_random_podcasts";
import { useNavigate } from "react-router-dom";

const PodcastComponent = () => {
  const [podcasts, setPodcasts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPodcasts = async () => {
      const data = await getRandomPodcasts();
      setPodcasts(data);
    };

    fetchPodcasts();
  }, []);

  const playPodcast = (podcast) => {
    const {category, _id} = podcast;
    const podcastUrl = `/broadcast/${category}?id=${_id}`;
    navigate(podcastUrl);
  };

  if (!podcasts || podcasts.length === 0) {
    return null;
  }

  return (
    <div className="podcast-list">
      <div className="podcast-header">
        <h2 className="section-title">Listen Now</h2>
        <div>
          <a href="/broadcast">
            <span>View All</span>
            <FontAwesomeIcon icon={faArrowRight} />
          </a>
        </div>
      </div>

      {podcasts.map((podcast) => (
        <div
          key={podcast._id}
          className="podcast-item"
          data-audio-url={podcast.fileUrl}
          onClick={() => playPodcast(podcast)}
        >
          <div className="podcast-play-icon">
            <span>
              <FontAwesomeIcon icon={faCirclePlay} />
            </span>
          </div>
          <div className="podcast-details">
            <div className="p-title">
              <p>{podcast.title}</p>
            </div>
            <div className="p-description mt-2">
              <p>
                {podcast.description.length > 55
                  ? podcast.description.substring(0, 55) + "..."
                  : podcast.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PodcastComponent;
