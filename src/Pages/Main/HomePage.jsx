import DevotionalComponent from "../../Components/HomeComponents/DevotionalComponent.jsx";
import PodcastComponent from "../../Components/HomeComponents/PodcastsComponent.jsx";
import RecommendedReadings from "../../Components/HomeComponents/RecommendedReadings.jsx";
import Symbols from "../../Components/HomeComponents/SymbolsComponent.jsx";
import VerseComponent from "../../Components/HomeComponents/VerseComponent.jsx";
import "../../styles/home.css";
import DecisionsComponent from "./DecisionsComponent.jsx";
import TestimoniesComponent from "./TestimoniesComponent.jsx";

const HomePage = () => {
  return (
    <>
      <VerseComponent />
      <DevotionalComponent />
      <PodcastComponent />
      <RecommendedReadings />
      <Symbols />
      <DecisionsComponent />
      <TestimoniesComponent />
    </>
  );
};

export default HomePage;
