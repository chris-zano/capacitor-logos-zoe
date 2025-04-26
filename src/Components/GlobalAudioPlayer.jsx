// GlobalAudioPlayer.jsx
import React, { useContext, useEffect } from "react";
import { AudioContext } from "./AudioContext";

const GlobalAudioPlayer = () => {
  const audioRef = useContext(AudioContext);

  useEffect(() => {
    const audio = audioRef.current;
    audio.controls = true;
    document.body.appendChild(audio);

    return () => {
      try {
        document.body.removeChild(audio);
      } catch (error) {
        console.error(error);
      }
    };
  }, [audioRef]);

  return null;
};

export default GlobalAudioPlayer;
