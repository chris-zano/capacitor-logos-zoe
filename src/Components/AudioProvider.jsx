// AudioContext.jsx
import React, { createContext, useRef } from "react";

export const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const audioRef = useRef(new Audio());

  return (
    <AudioContext.Provider value={audioRef}>
      {children}
    </AudioContext.Provider>
  );
};
