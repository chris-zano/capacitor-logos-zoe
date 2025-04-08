import React from "react";
import { useLocation } from "react-router-dom";
import "../../styles/broadcasts.css";
import Carousel from "../../Components/BroadcastComponents/CarouselComponent.jsx";
import Podcasts from "../../Components/BroadcastComponents/PodcastComponent.jsx";
import getDevotionalsPodcasts from "../../data/podcasts/get_devotional_podcasts.js";
import getWofPodcasts from "../../data/podcasts/get_wof_podcasts.js";
import getVideosByCategoryName from "../../data/videos/get_videos_by_category_name.js";
import VideosComponent from "../../Components/BroadcastComponents/VideosComponent.jsx";
import getPrayersPodcasts from "../../data/podcasts/get_prayers_podcasts.js";

const BroadcastPage = () => {
  const location = useLocation();
  const fileUrl =
    location.pathname === "/broadcast"
      ? "broadcast"
      : location.pathname.split("/")[2];

  return (
    <section className="broadcasts-wrapper">
      <Carousel currentRoute={fileUrl} />

      <div className="section-widgets">
        {fileUrl === "broadcast" && (
          <Podcasts data_source={getDevotionalsPodcasts} />
        )}
        {fileUrl === "podcasts" && (
          <Podcasts data_source={getDevotionalsPodcasts} />
        )}
        {fileUrl === "word-of-power" && (
          <Podcasts data_source={getWofPodcasts} />
        )}
        {fileUrl === "prayers" && <Podcasts data_source={getPrayersPodcasts} />}
        {fileUrl === "wisdom-nuggets" && (
          <VideosComponent
            data_source={getVideosByCategoryName}
            category={fileUrl}
          />
        )}
        {fileUrl === "motivationals" && (
          <VideosComponent
            data_source={getVideosByCategoryName}
            category={fileUrl}
          />
        )}
        {fileUrl === "inspirational" && (
          <VideosComponent
            data_source={getVideosByCategoryName}
            category={fileUrl}
          />
        )}
        {fileUrl === "testimony-of-jesus" && (
          <VideosComponent
            data_source={getVideosByCategoryName}
            category={fileUrl}
          />
        )}
      </div>
    </section>
  );
};

export default BroadcastPage;
