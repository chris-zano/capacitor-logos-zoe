import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronLeft, faCircleChevronRight } from '@fortawesome/free-solid-svg-icons';
import LoadingSpinner from '../Loaders/LoadingSpinner.jsx';
import { useSearchParams } from 'react-router-dom';
import { AudioContext } from '../AudioProvider.jsx';

const Podcasts = ({ data_source }) => {
  const audioRef = useContext(AudioContext);
  const [podcasts, setPodcasts] = useState([]);
  const [currentPodcast, setCurrentPodcast] = useState(null);
  const [searchParams] = useSearchParams();
  const [animateBarState, setAnimateBarState] = useState(false);
  const id = searchParams.get("id");

  const getRandomImageUrl = (seed) => {
    return `https://picsum.photos/200/200?sig=${seed}`;
  };


  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const data = await data_source();
        const podcastData = data.podcasts ? data.podcasts : data.word.reverse();
        const podcastsWithImages = podcastData.map((podcast, index) => ({
          ...podcast,
          thumbnailUrl: getRandomImageUrl(index),
        }));
        setPodcasts(podcastsWithImages);
        if (id !== null) {
          const podcast = podcastsWithImages.find((podcast) => podcast._id === id);
          playPodcast(podcast);
        }
      } catch (error) {
        console.error("Failed to fetch podcasts:", error);
      }
    };

    fetchPodcasts();
  }, [id, data_source]);

  const playPodcast = (podcast) => {
    setCurrentPodcast(podcast);
    const audio = document.getElementById("audio1");
    if (audio) {
      audio.src = podcast.fileUrl;
      audio.play();
      setAnimateBarState(true);
    }
  };

  const playNextPodcast = () => {
    if (!podcasts.length) return;

    const currentIndex = podcasts.findIndex(
      (p) => p._id === currentPodcast?._id,
    );
    const nextIndex = (currentIndex + 1) % podcasts.length;
    playPodcast(podcasts[nextIndex]);
  };

  const playPreviousPodcast = () => {
    if (!podcasts.length) return;

    const currentIndex = podcasts.findIndex(
      (p) => p._id === currentPodcast?._id,
    );
    const prevIndex = (currentIndex - 1 + podcasts.length) % podcasts.length;
    playPodcast(podcasts[prevIndex]);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const handleEnded = () => playNextPodcast();
      audio.addEventListener("ended", handleEnded);
      return () => audio.removeEventListener("ended", handleEnded);
    }
  }, [currentPodcast, podcasts]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener("playing", () => setAnimateBarState(true));
      audio.addEventListener("pause", () => setAnimateBarState(false));
    }
  }, [])

  return (
    <div className="music-player">
      <div className="music-player__toolbar music-toolbar"
        style={{
          backgroundImage: `url(${currentPodcast?.thumbnailUrl || 'https://picsum.photos/200/200?sig=default'})`,
        }}
      >
        <div className="music-player__sound-wave">
          {Array(20)
            .fill(null)
            .map((_, idx) => (
              <i key={idx}
                className={animateBarState ? `bar` : `nobar`}
              ></i>
            ))}
        </div>
        <div className="music-toolbar__header">
          <div className="song-title">
            <span id="music-toolbar-title">
              {currentPodcast?.title || "No Podcast Selected"}
            </span>
          </div>
        </div>
        <div className="music-toolbar__controls">
          <div id="audio0">
            <audio id="audio1" controls>
              Your browser does not support HTML5 Audio!
            </audio>
          </div>
        </div>
        <div className="music-toolbar__navigation">
          <button type="button" id="musicPrev" onClick={playPreviousPodcast}>
            <FontAwesomeIcon icon={faCircleChevronLeft} />
          </button>
          <button type="button" id="musicNext" onClick={playNextPodcast}>
            <FontAwesomeIcon icon={faCircleChevronRight} />
          </button>
        </div>
      </div>

      <div className="r-podcast-list">
        {podcasts.length === 0 ? (
          <LoadingSpinner />
        ) : (
          podcasts.map((podcast) => (
            <div
              key={podcast._id}
              id={podcast._id}
              className={`podcast-item ${currentPodcast?._id === podcast._id ? "selected" : ""}`}
              onClick={() => playPodcast(podcast)}
              data-audio-url={podcast.fileUrl}
              data-audio-title={podcast.title}
            >
              <div>
                <img src={podcast.thumbnailUrl} alt={podcast.title} />
              </div>
              <div className="podcast-details">
                <div className="p-title">
                  <p>{podcast.title.substring(0, 40)}</p>
                </div>
                <div className="p-description">
                  <p>
                    {podcast.description.length > 55
                      ? podcast.description.substring(0, 48) + "..."
                      : podcast.description}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Podcasts;