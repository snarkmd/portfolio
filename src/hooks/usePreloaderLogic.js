import { useCallback, useEffect, useState } from "react";
import { usePreloader } from "../context/PreloaderContext";

const PRELOADER_STORAGE_KEY = "preloader_last_shown";
const PRELOADER_SUPPRESS_MS = 60 * 60 * 1000;

const shouldShowPreloader = (pathname) => {
  if (pathname !== "/") return false;

  try {
    const lastShown = localStorage.getItem(PRELOADER_STORAGE_KEY);
    if (!lastShown) return true;

    const lastShownAt = Number(lastShown);
    if (!Number.isFinite(lastShownAt)) return true;

    return Date.now() - lastShownAt >= PRELOADER_SUPPRESS_MS;
  } catch {
    return true;
  }
};

// Task 7: extracted preloader state and completion coordination into a dedicated custom hook.
export const usePreloaderLogic = (pathname) => {
  const { preloaderDone, setPreloaderDone } = usePreloader();
  const [isPreloader, setIsPreloader] = useState(() => shouldShowPreloader(pathname));

  useEffect(() => {
    const shouldShow = shouldShowPreloader(pathname);
    setIsPreloader(shouldShow);
    setPreloaderDone(!shouldShow);
  }, [pathname, setPreloaderDone]);

  const completePreloader = useCallback(() => {
    try {
      localStorage.setItem(PRELOADER_STORAGE_KEY, String(Date.now()));
    } catch {
      // localStorage can be unavailable in restricted browsing modes.
    }
    setPreloaderDone(true);
  }, [setPreloaderDone]);

  return {
    completePreloader,
    isPreloader,
    preloaderDone,
    setIsPreloader,
  };
};
