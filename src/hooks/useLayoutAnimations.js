import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

// Task 7: extracted GSAP setup and DOM ref collection for the layout into a dedicated animation hook.
export const useLayoutAnimations = ({
  isPreloader,
  completePreloader,
  setIsPreloader,
  pathname,
}) => {
  const cubeRefs = useRef([]);
  const scriptRefs = useRef([]);
  const preloaderRef = useRef(null);
  const layoutRef = useRef(null);
  const lastPathnameRef = useRef(pathname);
  const pendingRefClearRef = useRef(null); // Keeps StrictMode cleanup from clearing refs before the replayed effect runs.

  const addCubeRefs = (el) => {
    if (lastPathnameRef.current !== pathname) {
      cubeRefs.current = [];
      scriptRefs.current = [];
      lastPathnameRef.current = pathname;
    }
    if (el && !cubeRefs.current.includes(el)) cubeRefs.current.push(el);
  };

  const addScriptRefs = (el) => {
    if (lastPathnameRef.current !== pathname) {
      cubeRefs.current = [];
      scriptRefs.current = [];
      lastPathnameRef.current = pathname;
    }
    if (el && !scriptRefs.current.includes(el)) scriptRefs.current.push(el);
  };

  useEffect(() => {
    if (!isPreloader) return;
    if (pendingRefClearRef.current) { // Cancels deferred cleanup when React immediately replays this effect.
      cancelAnimationFrame(pendingRefClearRef.current); // Preserves mounted DOM refs for the replayed GSAP setup.
      pendingRefClearRef.current = null; // Marks the deferred cleanup as handled.
    }
    const cubes = cubeRefs.current;
    const scripts = scriptRefs.current;
    const preloader = preloaderRef.current;
    const layout = layoutRef.current;
    if (!preloader || !layout || cubes.length < 6 || scripts.length < 4) { // Guards against starting GSAP without real DOM targets.
      console.warn("[Preloader] Animation targets are missing; skipping GSAP timeline setup."); // Gives a clear diagnosis if the preloader refs are incomplete.
      return; // Avoids a broken timeline when required targets are unavailable.
    }

    let split1;
    let split2;
    let split3;
    let split4;

    gsap.set(cubes, { opacity: 0, y: 60, scale: 0.95, filter: "grayscale(0.3)" });

    const cubeAnim = () => {
      const tl = gsap.timeline({
        defaults: { duration: 0.45, ease: "power4.inOut" },
        onStart: () => {
          if (cubes[0]?.parentNode) cubes[0].parentNode.style.display = "grid";
        },
        onComplete: () => {
          if (cubes[0]?.parentNode) cubes[0].parentNode.style.display = "none";
        },
      });
      tl.to(cubes, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power4.inOut" });
      tl.to(cubes[1], { y: 30 });
      tl.to(cubes[0], { x: 30 });
      tl.to(cubes[3], { y: -30 });
      tl.to(cubes[1], { x: -30 });
      tl.to(cubes[5], { x: -30 });
      tl.to(cubes[4], { x: 30 }, "<");
      tl.to(cubes, { filter: "grayscale(0)", duration: 0.3, ease: "expo.out" }, ">-=0.15");
      tl.to(cubes, { opacity: 0, duration: 0.35, ease: "power4.out" }, ">+0.25");
      return tl;
    };

    const scriptAnim = () => {
      const tl = gsap.timeline({
        defaults: { ease: "power4.out", duration: 0.4 },
        delay: 0.4,
      });

      split1 = new SplitText(scripts[0], { type: "chars" });
      split2 = new SplitText(scripts[1], { type: "chars" });
      split3 = new SplitText(scripts[2], { type: "chars" });
      split4 = new SplitText(scripts[3], { type: "chars" });

      scripts[0].style.display = "inline-block";
      scripts[1].style.display = "inline-block";

      tl.from(split1.chars, { opacity: 0, y: 4, scale: 0.95, stagger: 0.02 });
      tl.to(scripts[0], { x: "-150%" });

      tl.fromTo(
        scripts[1],
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.4,
          onStart: () => {
            gsap.to(scripts[1], {
              duration: 1.2,
              scrambleText: {
                text: "wonderer",
                chars: "upperAndLowerCase",
                revealDelay: 0.3,
                speed: 0.4,
              },
            });
          },
        }
      );

      tl.to([scripts[0], scripts[1]], {
        opacity: 0,
        delay: 1.25,
        onComplete: () => {
          scripts[0].style.display = "none";
          scripts[1].style.display = "none";
        },
      });

      scripts[2].style.display = "inline-block";
      tl.from(split3.chars, { opacity: 0, y: 4, scale: 0.95, stagger: 0.02 });
      tl.to(scripts[2], {
        opacity: 0,
        delay: 0.65,
        onComplete: () => {
          scripts[2].style.display = "none";
        },
      });

      scripts[3].style.display = "inline-block";
      tl.from(split4.chars, { opacity: 0, y: 4, scale: 0.95, stagger: 0.02 });
      tl.to(scripts[3], {
        opacity: 0,
        delay: 0.65,
        onComplete: () => {
          scripts[3].style.display = "none";
        },
      });

      return tl;
    };

    const layoutAnim = () => {
      const tl = gsap.timeline();

      tl.to(preloader, {
        opacity: 0,
        duration: 0.4,
        ease: "power1.inOut",
        display: "none",
      });

      tl.to(layout, { display: "initial" }, "-=0.4");
      tl.eventCallback("onComplete", () => {
        setIsPreloader(false);
        completePreloader();
      });

      return tl;
    };

    const tl = gsap.timeline({ delay: 0.5 });
    tl.add(cubeAnim());
    tl.add(scriptAnim());
    tl.add(layoutAnim());

    return () => {
      tl.kill();
      pendingRefClearRef.current = requestAnimationFrame(() => { // Defers ref clearing so StrictMode's effect replay can reuse mounted refs.
        cubeRefs.current = []; // Clears stale cube refs after a real unmount or completed teardown.
        scriptRefs.current = []; // Clears stale script refs after a real unmount or completed teardown.
        pendingRefClearRef.current = null; // Resets the deferred cleanup marker after refs are cleared.
      });
      split1?.revert();
      split2?.revert();
      split3?.revert();
      split4?.revert();
    };
  }, [completePreloader, isPreloader, setIsPreloader]);

  return {
    addCubeRefs,
    addScriptRefs,
    layoutRef,
    preloaderRef,
  };
};
