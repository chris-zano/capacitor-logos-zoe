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

const VideoPlayerPage = ({ match }) => {
    const params = useParams();
    const [video, setVideo] = useState(null);
    const [videos, setVideos] = useState([]);

    const { id, category } = params

    useEffect(() => {
        const fetchVideoData = async () => {
            try {
                const { video, videos } = await getVideoById({ videoId: id, category }); // Fetch the video data
                setVideo(video);
                setVideos(videos);
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
                            style={{ color: "var(--white)", fontFamily: "Inter" }}
                            className="article_title-p"
                        >
                            {video ? (video.video_title.length > 20 ? video.video_title.substring(0, 20) + "..." : video.video_title) : "Loading..."}
                        </h3>
                    </div>
                </div>
            </header>

            <main id="video-player-main">
                <section className="player-section">
                    {video ? (
                        <div className="video-player">
                            <div className="iframe-container" >
                                {/* Dangerously set inner HTML for iframe */}
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: video.video_fullText.replace(/\\"/g, '"'),
                                    }}
                                />
                            </div>
                            <article className="player-des">
                                <h1 className="video-title">
                                    {video.video_title.length > 20
                                        ? video.video_title.substring(0, 20) + "..."
                                        : video.video_title}
                                </h1>
                                <div className="call-to-action">
                                    <ShareApi
                                        button_text={<><FontAwesomeIcon icon={faShare} /> <small>Share</small></>}
                                        data_to_share={{
                                            title: video.video_title,
                                            text: video.video_title,
                                            url: video.video_fullText.match(/src="(https:\/\/[^"]+)"/)[1].replace('embed', ''),
                                        }}
                                    />
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
                                    href={`/videos/video/${v._id}/${v.category}`}
                                    className="video-card"
                                    key={v._id}
                                >
                                    <h3 className="video-title">{v.video_title}</h3>
                                    <div className="video-thumbnail">
                                        <img src={v.video_image} alt={v.video_title} />
                                        <div className="card-overlay">
                                            <FontAwesomeIcon icon={faCirclePlay} />
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
