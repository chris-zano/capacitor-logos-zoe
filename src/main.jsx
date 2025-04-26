import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import "./fontawesome";
import App from "./App.jsx";
import { HashRouter } from "react-router-dom"; // Import HashRouter
import { AudioProvider } from "./Components/AudioProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <AudioProvider>
        <App />
      </AudioProvider>
    </HashRouter>
  </StrictMode>
);