import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronLeft, faCircleChevronRight } from '@fortawesome/free-solid-svg-icons';

const Podcasts = ({ data_source }) => {
  const [podcasts, setPodcasts] = useState([]);
  const [currentPodcast, setCurrentPodcast] = useState(null);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const data = await data_source();
        setPodcasts(data.podcasts ? data.podcasts : data.word.reverse());
      } catch (error) {
        console.error('Failed to fetch podcasts:', error);
      }
    };

    fetchPodcasts();
  }, []);

  const playPodcast = (podcast) => {
    setCurrentPodcast(podcast);
    const audio = document.getElementById('audio1');
    if (audio) {
      audio.src = podcast.fileUrl;
      audio.play();
    }
  };

  const playNextPodcast = () => {
    if (!podcasts.length) return;

    const currentIndex = podcasts.findIndex((p) => p._id === currentPodcast?._id);
    const nextIndex = (currentIndex + 1) % podcasts.length;
    playPodcast(podcasts[nextIndex]);
  };

  const playPreviousPodcast = () => {
    if (!podcasts.length) return;

    const currentIndex = podcasts.findIndex((p) => p._id === currentPodcast?._id);
    const prevIndex = (currentIndex - 1 + podcasts.length) % podcasts.length;
    playPodcast(podcasts[prevIndex]);
  };

  useEffect(() => {
    const audio = document.getElementById('audio1');
    if (audio) {
      const handleEnded = () => playNextPodcast();
      audio.addEventListener('ended', handleEnded);
      return () => audio.removeEventListener('ended', handleEnded);
    }
  }, [currentPodcast, podcasts]);

  return (
    <div className="music-player">
      <div className="music-player__toolbar music-toolbar">
        <div className="music-player__sound-wave">
          {Array(20)
            .fill(null)
            .map((_, idx) => (
              <i key={idx} className="bar"></i>
            ))}
        </div>
        <div className="music-toolbar__header">
          <div className="song-title">
            <span id="music-toolbar-title">{currentPodcast?.title || 'No Podcast Selected'}</span>
          </div>
        </div>
        <div className="music-toolbar__controls">
          <div id="audio0">
            <audio id="audio1" preload controls>
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
          <span>Loading...</span>
        ) : (
          podcasts.map((podcast) => (
            <div
              key={podcast._id}
              id={podcast._id}
              className={`podcast-item ${currentPodcast?._id === podcast._id ? 'selected' : ''}`}
              onClick={() => playPodcast(podcast)}
              data-audio-url={podcast.fileUrl}
              data-audio-title={podcast.title}
            >
              <div className="podcast-details">
                <div className="p-title">
                  <p>{podcast.title.substring(0, 40)}</p>
                </div>
                <div className="p-description">
                  <p>
                    {podcast.description.length > 55
                      ? podcast.description.substring(0, 48) + '...'
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