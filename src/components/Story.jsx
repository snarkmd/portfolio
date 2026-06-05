import { useEffect, useRef, useCallback, useReducer } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import gsap from "gsap";
import { stories } from "../assets/stories";

// ─── Constants ────────────────────────────────────────────────────────────────
const ANIMATION_DURATION = 0.45;
const ANIMATION_EASE = "power3.out";
const ANIMATION_ENTRY_Y = "200px";
const ANIMATION_ENTRY_SCALE = 0.7;

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Returns the duration (ms) for a given story item.
 * Falls back to 5000ms if not specified.
 */
const getStoryDuration = (group, storyIndex) =>
  group.stories[storyIndex]?.duration ?? 5000;

// ─── Sub-components ──────────────────────────────────────────────────────────

/**
 * ProgressBar
 * A single thin progress segment. Uses CSS transform: scaleX() for GPU-composited
 * animation — zero layout thrash, same approach used by Instagram and Facebook.
 *
 * State is driven externally via the `status` prop:
 *   "done"    → bar instantly fills (previous stories)
 *   "active"  → bar animates from 0 → 100% over `duration` ms
 *   "pending" → bar stays empty (future stories)
 */
const ProgressBar = ({ status, duration }) => {
  const fillRef = useRef(null);
  const rafRef = useRef(null);
  const startTimeRef = useRef(null);

  useEffect(() => {
    const fill = fillRef.current;
    if (!fill) return;

    // Cancel any running animation first
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    if (status === "done") {
      fill.style.transform = "scaleX(1)";
      fill.style.transition = "none";
      return;
    }

    if (status === "pending") {
      fill.style.transform = "scaleX(0)";
      fill.style.transition = "none";
      return;
    }

    // status === "active": drive with RAF for smooth, cancellable progress
    fill.style.transform = "scaleX(0)";
    fill.style.transition = "none";
    startTimeRef.current = null;

    const tick = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      fill.style.transform = `scaleX(${progress})`;

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [status, duration]);

  return (
    <div
      className="flex-1 h-[3px] rounded-full overflow-hidden bg-white/30"
      role="progressbar"
      aria-valuenow={status === "done" ? 100 : status === "active" ? 50 : 0}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        ref={fillRef}
        className="h-full w-full bg-white rounded-full origin-left"
        style={{ transform: "scaleX(0)", willChange: "transform" }}
      />
    </div>
  );
};

/**
 * StorySlide
 * Renders a single image or video slide. Videos only play when active.
 */
const StorySlide = ({ story, group, isActive }) => {
  if (story.type === "image") {
    return (
      <img
        src={story.src}
        alt=""
        draggable={false}
        className="w-full h-full object-cover select-none"
      />
    );
  }

  if (story.type === "video") {
    return isActive ? (
      <video
        src={story.src}
        className="w-full h-full object-cover"
        autoPlay
        muted
        playsInline
        // Note: loop removed intentionally — the timer handles advancement
      />
    ) : (
      <img
        src={group.thumbnail}
        alt=""
        draggable={false}
        className="w-full h-full object-cover select-none"
      />
    );
  }

  return null;
};

// ─── Main Component ───────────────────────────────────────────────────────────

const Story = ({ showStories }) => {
  // ── Refs ──
  const containerRef = useRef(null);
  const parentSwiperRef = useRef(null);
  const childSwiperRefs = useRef([]);

  // Tracks [parentIndex, storyIndex] of the currently active story
  const activePositionRef = useRef({ parentIndex: 0, storyIndex: 0 });

  // RAF timer for auto-advancing stories
  const rafRef = useRef(null);
  const timerStartRef = useRef(null);

  // Forces a re-render when active position changes (needed to update ProgressBar props)
  const [, forceUpdate] = useReducer((n) => n + 1, 0);

  // ── Entry animation ──
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    gsap.set(container, {
      y: ANIMATION_ENTRY_Y,
      opacity: 0,
      scale: ANIMATION_ENTRY_SCALE,
    });

    const tween = gsap.to(container, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: ANIMATION_DURATION,
      ease: ANIMATION_EASE,
      delay: 0.05,
    });

    return () => {
      tween.kill();
    };
  }, []);

  // ── Timer management ──

  const cancelTimer = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    timerStartRef.current = null;
  }, []);

  /**
   * Stable ref to the advance function so startTimer never captures a stale closure.
   * Updated synchronously before any timer starts.
   */
  const advanceForwardRef = useRef(null);

  /**
   * Starts the RAF-based auto-advance timer for the current story.
   * Calls advanceForwardRef.current when duration elapses, which is always
   * the latest version of the function — no stale closure issues.
   */
  const startTimer = useCallback(
    (duration) => {
      cancelTimer();
      timerStartRef.current = null;

      const tick = (timestamp) => {
        if (!timerStartRef.current) timerStartRef.current = timestamp;
        const elapsed = timestamp - timerStartRef.current;

        if (elapsed >= duration) {
          advanceForwardRef.current?.();
          return;
        }

        rafRef.current = requestAnimationFrame(tick);
      };

      rafRef.current = requestAnimationFrame(tick);
    },
    [cancelTimer]
  );

  // ── Navigation logic ──

  const navigateTo = useCallback(
    (parentIndex, storyIndex) => {
      cancelTimer();

      const clampedParent = Math.max(0, Math.min(parentIndex, stories.length - 1));
      const group = stories[clampedParent];
      const clampedStory = Math.max(0, Math.min(storyIndex, group.stories.length - 1));

      activePositionRef.current = {
        parentIndex: clampedParent,
        storyIndex: clampedStory,
      };

      // Sync parent Swiper without animation (speed: 0) to avoid visual glitch
      if (parentSwiperRef.current?.activeIndex !== clampedParent) {
        parentSwiperRef.current?.slideTo(clampedParent, 0);
      }
      childSwiperRefs.current[clampedParent]?.slideTo(clampedStory, 0);

      forceUpdate();

      const duration = getStoryDuration(group, clampedStory);
      startTimer(duration);
    },
    [cancelTimer, startTimer]
  );

  /**
   * Moves to the next story in the current group, or the next group.
   * Closes the overlay when all stories have been viewed.
   */
  const advanceForward = useCallback(() => {
    const { parentIndex, storyIndex } = activePositionRef.current;
    const group = stories[parentIndex];

    if (storyIndex < group.stories.length - 1) {
      navigateTo(parentIndex, storyIndex + 1);
    } else if (parentIndex < stories.length - 1) {
      navigateTo(parentIndex + 1, 0);
    } else {
      showStories(false);
    }
  }, [navigateTo, showStories]);

  // Keep the ref in sync with the latest advanceForward
  advanceForwardRef.current = advanceForward;

  /**
   * Moves to the previous story in the current group, or the end of the previous group.
   */
  const advanceBack = useCallback(() => {
    const { parentIndex, storyIndex } = activePositionRef.current;

    if (storyIndex > 0) {
      navigateTo(parentIndex, storyIndex - 1);
    } else if (parentIndex > 0) {
      const prevGroup = stories[parentIndex - 1];
      navigateTo(parentIndex - 1, prevGroup.stories.length - 1);
    }
    // Already at the very first story — intentionally do nothing
  }, [navigateTo]);

  // Start timer on mount for the first story
  useEffect(() => {
    const { parentIndex, storyIndex } = activePositionRef.current;
    const duration = getStoryDuration(stories[parentIndex], storyIndex);
    startTimer(duration);

    return () => {
      cancelTimer();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  // ^ Intentionally empty deps: this runs once on mount only.

  // ── Derived state for rendering ──
  const { parentIndex: activeParent, storyIndex: activeStory } =
    activePositionRef.current;

  // ── Render ──
  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-dark z-50 flex items-center justify-center"
    >
      {/* Close button */}
      <button
        type="button"
        className="absolute top-8 right-4 md:top-5 md:right-5 text-white z-50 cursor-pointer p-1 rounded-full hover:bg-white/10 transition-colors"
        onClick={() => showStories(false)}
        aria-label="Close stories"
      >
        <X className="size-8 md:size-10" />
      </button>

      {/* Desktop: previous group button */}
      <button
        type="button"
        className="absolute z-50 md:left-[calc(50%-220px)] p-2 bg-white/25 rounded-full text-white hidden md:flex hover:bg-white/40 transition-colors cursor-pointer"
        onClick={advanceBack}
        aria-label="Previous story"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Desktop: next group button */}
      <button
        type="button"
        className="absolute z-50 md:right-[calc(50%-220px)] p-2 bg-white/25 rounded-full text-white hidden md:flex hover:bg-white/40 transition-colors cursor-pointer"
        onClick={advanceForward}
        aria-label="Next story"
      >
        <ChevronRight size={20} />
      </button>

      {/* Parent Swiper — groups of stories */}
      <Swiper
        className="!w-full !h-full"
        spaceBetween={16}
        centeredSlides
        slidesPerView={1}
        allowTouchMove={false}
        simulateTouch={false}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        onSwiper={(swiper) => {
          parentSwiperRef.current = swiper;
        }}
      >
        {stories.map((group, parentIndex) => {
          const isGroupActive = parentIndex === activeParent;

          return (
            <SwiperSlide key={`group-${parentIndex}`}>
              <div className="grid place-items-center h-full md:h-screen">
                <div
                  className={`relative flex justify-center items-center aspect-[9/16] w-full overflow-hidden transition-transform duration-300 md:rounded-xl ${
                    isGroupActive
                      ? "md:max-h-[90vh]"
                      : "md:scale-[0.72] grayscale-[0.85]"
                  }`}
                >
                  {isGroupActive ? (
                    <>
                      {/* ── Mobile tap zones ── */}
                      <div className="absolute inset-0 flex md:hidden z-30">
                        <button
                          type="button"
                          className="flex-1 h-full"
                          onClick={advanceBack}
                          aria-label="Previous story"
                        />
                        <button
                          type="button"
                          className="flex-1 h-full"
                          onClick={advanceForward}
                          aria-label="Next story"
                        />
                      </div>

                      {/* ── Progress bars ── */}
                      <div className="absolute top-4 inset-x-0 z-30 flex items-center gap-1 px-3">
                        {group.stories.map((story, index) => {
                          let status;
                          if (index < activeStory) status = "done";
                          else if (index === activeStory) status = "active";
                          else status = "pending";

                          return (
                            <ProgressBar
                              key={`progress-${parentIndex}-${index}`}
                              status={status}
                              duration={story.duration ?? 5000}
                            />
                          );
                        })}
                      </div>

                      {/* ── Child Swiper — individual slides ── */}
                      <Swiper
                        className="!w-full !h-full"
                        slidesPerView={1}
                        allowTouchMove={false}
                        simulateTouch={false}
                        onSwiper={(swiper) => {
                          childSwiperRefs.current[parentIndex] = swiper;
                        }}
                      >
                        {group.stories.map((story, index) => (
                          <SwiperSlide key={`story-${parentIndex}-${index}`}>
                            {({ isActive: isSlideActive }) => (
                              <StorySlide
                                story={story}
                                group={group}
                                isActive={isSlideActive && isGroupActive}
                              />
                            )}
                          </SwiperSlide>
                        ))}
                      </Swiper>

                      {/* ── Gradient overlays for readability ── */}
                      <div className="absolute inset-0 pointer-events-none z-20">
                        <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-black/60 to-transparent" />
                        <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-black/50 to-transparent" />
                      </div>
                    </>
                  ) : (
                    /* ── Inactive group thumbnail ── */
                    <div className="w-full h-full bg-dark">
                      <img
                        src={group.thumbnail}
                        alt=""
                        draggable={false}
                        className="w-full h-full object-cover md:rounded-xl select-none"
                      />
                    </div>
                  )}
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Story;
