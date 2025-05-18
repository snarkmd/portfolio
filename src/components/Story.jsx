import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import "swiper/css";
import gsap from "gsap";
import { stories } from "../assets/data";

const Story = ({ showStories }) => {
    const containerRef = useRef()
    useEffect(() =>{
      const container = containerRef.current;
      if(!container) return;
      gsap.set(container, {y:"180px",opacity:0,scale:0.6})
      gsap.to(container,{y:0,opacity:1,scale:1.01,duration:0.5,ease:"power2.out", delay:0.15})
    },[])
    /*--------------------*/
  const [duration, setDuration] = useState(stories[0].stories[0]?.duration);
  const parentSwiperRef = useRef(null);
  const childSwiperRefs = useRef([]);
  const progressRefs = useRef([]);

  const handlePrev = () => {
    const activeIndex = parentSwiperRef.current?.activeIndex;
    const childSwiper = childSwiperRefs.current[activeIndex];
progressRefs.current[childSwiper.activeIndex].style.setProperty(
      "width",
      0 + "%"
    );
    if (childSwiper && childSwiper.activeIndex > 0) {
      childSwiper.slidePrev();
    } else {
      parentSwiperRef.current?.slidePrev();
    }
  };

  const handleNext = () => {
    const activeIndex = parentSwiperRef.current?.activeIndex;
    const childSwiper = childSwiperRefs.current[activeIndex];
progressRefs.current[childSwiper.activeIndex].style.setProperty(
      "width",
      100 + "%"
    );
    if (
      childSwiper &&
      childSwiper.activeIndex < childSwiper.slides.length - 1
    ) {
      childSwiper.slideNext();
    } else {
      parentSwiperRef.current?.slideNext();
    }
  };

  const handleChildSlideChange = (swiper, parentIndex) => {
    if (swiper.activeIndex === swiper.slides.length - 1) {
      setTimeout(() => {
        if (parentSwiperRef.current) {
          parentSwiperRef.current.slideNext();
        }
      }, duration);
    }
  };

  const onAutoplayTimeLeft = (swiper, time, progress) => {
    if (!progressRefs.current[swiper.realIndex]) return;
    progressRefs.current[swiper.realIndex].style.setProperty(
      "width",
      (1 - progress) * 100 + "%"
    );
  };
  return (
    <div ref={containerRef} className="fixed size-full top-0 left-0 bg-dark z-50 flex items-center justify-center">
      <button
        className="absolute md:top-5 md:right-5 top-8 right-4 text-light-100 z-50 cursor-pointer"
        onClick={() => showStories(false)}
      >
        <X className="size-8 md:size-10" />
      </button>
      <button
        className="absolute z-50 md:left-[calc(50%-202px)] p-2 bg-light-200 bg-opacity-40 rounded-full text-dark hidden md:flex hover:bg-opacity-60"
        onClick={handlePrev}
      >
        <ChevronLeft size={20} />
      </button>
      <button
        className="absolute z-50 md:right-[calc(50%-202px)] p-2 bg-light-200 bg-opacity-40 rounded-full text-dark hidden md:flex hover:bg-opacity-60"
        onClick={handleNext}
      >
        <ChevronRight size={20} />
      </button>

      <Swiper
        className="!overflow-hidden inset-0"
        spaceBetween={20}
        centeredSlides={true}
        slidesPerView={4}
        draggable={false}
        allowTouchMove={false}
        simulateTouch={false}
        breakpoints={{
          320: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        onSwiper={(swiper) => (parentSwiperRef.current = swiper)}
      >
        {stories.map((group, parentIndex) => (
          <SwiperSlide key={parentIndex}>
            {({ isActive }) => (
              <div className="grid place-items-center h-full md:h-screen">
                <div
                  className={`relative flex justify-center items-center aspect-[9/16] w-full h-full overflow-hidden md:rounded-md
                  ${
                    isActive
                      ? "h-full md:max-h-[90vh]"
                      : "md:scale-75 grayscale-[0.8]"
                  }`}
                >
                  {isActive ? (
                    <>
                      <div className="size-full flex md:hidden absolute top-0 left-0 z-30">
                        <div className="flex-1 h-full" onClick={handlePrev}></div>
                        <div className="flex-1 h-full" onClick={handleNext}></div>
                      </div>

                      <div className="absolute z-30 overflow-hidden top-4 w-[90%] m-auto flex gap-1 justify-between">
                        {group.stories.map((s, i) => (
                          <div
                            key={i}
                            className="overflow-hidden bg-light-100"
                            style={{
                              width: `calc(${
                                100 / group.stories.length
                              }% - 2px)`,
                            }}
                          >
                            <div
                              className="h-[3px] rounded bg-berry"
                              ref={(el) => (progressRefs.current[i] = el)}
                              style={{ width: "0%" }}
                            />
                          </div>
                        ))}
                      </div>
                      <Swiper
                        modules={[Autoplay]}
                        slidesPerView={1}
                        spaceBetween={0}
                        centeredSlides={true}
                        autoplay={{
                          delay: duration,
                          disableOnInteraction: false,
                        }}
                        loop={false}
                        onAutoplayTimeLeft={onAutoplayTimeLeft}
                        onSwiper={(swiper) =>
                          (childSwiperRefs.current[parentIndex] = swiper)
                        }
                        onSlideChange={(swiper) => {
                          handleChildSlideChange(swiper, parentIndex);
                          setDuration(
                            group.stories[swiper.activeIndex].duration || 20000
                          );
                        }}
                      >
                        {group.stories.map((story, i) => (
                          <SwiperSlide key={i}>
                            {({ isActive }) => (
                              <>
                                {story.type === "image" ? (
                                  <img
                                    src={story.src}
                                    className="w-full h-full object-cover"
                                  />
                                ) : isActive ? (
                                  <video
                                    src={story.src}
                                    className="w-full h-full object-cover"
                                    autoPlay
                                    muted
                                    loop
                                  />
                                ) : (
                                  <img
                                    src={group.thumbnail}
                                    className="w-full h-full object-cover md:rounded-lg shadow-lg"
                                  />
                                )}
                              </>
                            )}
                          </SwiperSlide>
                        ))}
                      </Swiper>
                      <div className="absolute inset-0 pointer-events-none z-20 opacity-40">
                        <div className="absolute top-0 left-0 w-full h-1/6 bg-gradient-to-b from-black to-transparent"></div>
                        <div className="absolute bottom-0 left-0 w-full h-1/6 bg-gradient-to-t from-black to-transparent"></div>
                      </div>
                    </>
                  ) : (
                    <div className="grid place-items-center h-full w-full bg-gray-500">
                      <img
                        src={group.thumbnail}
                        className="w-full h-full object-cover md:rounded-lg shadow-lg"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Story;
