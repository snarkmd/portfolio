import { createContext, useContext, useMemo, useState } from "react";

const PreloaderContext = createContext(null);

export const PreloaderProvider = ({ children }) => {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const value = useMemo(
    () => ({ preloaderDone, setPreloaderDone }),
    [preloaderDone]
  );

  return (
    <PreloaderContext.Provider value={value}>
      {children}
    </PreloaderContext.Provider>
  );
};

export const usePreloader = () => useContext(PreloaderContext);
