import React, { createContext, useState, useContext } from "react";

const SoundContext = createContext();
const soundMap = [
  "/sounds/1.mp3",
  "/sounds/2.mp3",
  "/sounds/3.mp3",
  "/sounds/4.mp3",
  "/sounds/5.mp3",
  "/sounds/5.mp3",
];
export const SoundProvider = ({ children }) => {
  const [lastPlayed, setLastPlayed] = useState(0);

  const playSound = (i) => {
    const now = Date.now();
    if (now - lastPlayed > 500) {
      // Throttle: 500ms
      const sound = new Audio(soundMap[i % soundMap.length]);
      sound.currentTime = 0;
      sound.play();
      setLastPlayed(now);
    }
  };

  return (
    <SoundContext.Provider value={{ playSound }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => useContext(SoundContext);
