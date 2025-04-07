import DevotionalComponent from "../../Components/HomeComponents/DevotionalComponent.jsx";
import FaithDimensionsComponent from "../../Components/HomeComponents/FaithDimensionsComponent.jsx";
import MotivationalsComponent from "../../Components/HomeComponents/MotivationalsComponent.jsx";
import PodcastComponent from "../../Components/HomeComponents/PodcastsComponent.jsx";
import RecommendedReadings from "../../Components/HomeComponents/RecommendedReadings.jsx";
import SpiritualLawsComponent from "../../Components/HomeComponents/SpiritualLawsComponent.jsx";
import Symbols from "../../Components/HomeComponents/SymbolsComponent.jsx";
import VerseComponent from "../../Components/HomeComponents/VerseComponent.jsx";
import "../../styles/home.css";
import DecisionsComponent from "./DecisionsComponent.jsx";
import TestimoniesComponent from "./TestimoniesComponent.jsx";
import WisdomNuggetsComponent from "./WisdomNuggetsComponent.jsx";

const HomePage = () => {
  return (
    <section style={{
      padding: "0.1ch 1ch 80px 1ch"
    }}>
      <VerseComponent />
      <DevotionalComponent />
      <PodcastComponent />
      <RecommendedReadings />
      <Symbols />
      <DecisionsComponent />
      <TestimoniesComponent />
      <SpiritualLawsComponent />
      <WisdomNuggetsComponent />
      <FaithDimensionsComponent />
      <MotivationalsComponent />
    </section>
  );
};

export default HomePage;
