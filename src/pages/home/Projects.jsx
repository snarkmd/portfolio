import React, { useRef } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { projects } from "../../assets/data";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Projects = () => {
  const swiperRef = useRef(null);
  return (
    <div className="relative px-4">
      <button
        className="absolute top-[50%] -translate-y-[50%] z-10 left-6 p-2 bg-dark bg-opacity-40 rounded-full text-white flex hover:bg-opacity-60 cursor-pointer"
        onClick={() => swiperRef.current?.slidePrev()}
      >
        <ChevronLeft size={20} />
      </button>
      <button
        className="absolute top-[50%] -translate-y-[50%] z-10 right-6 p-2 bg-dark bg-opacity-40 rounded-full text-white flex hover:bg-opacity-60 cursor-pointer"
        onClick={() => swiperRef.current?.slideNext()}
      >
        <ChevronRight size={20} />
      </button>
      <Swiper
        spaceBetween={20}
        centeredSlides={true}
        breakpoints={{
          320: { slidesPerView: 1 },
          768: { slidesPerView: 1.5 },
          1024: { slidesPerView: 2 },
          1280: { slidesPerView: 3 },
        }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        {projects.map((project, index) => (
          <SwiperSlide key={index}>
            {({ isActive }) => (
            <div
              className={`aspect-[1/1.5] md:aspect-[1.5/1] w-full flex flex-col-reverse md:flex-row overflow-hidden bg-light-100 text-dark border-2 border-dark cursor-pointer ${isActive ? "":"md:scale-85"}`}
              onClick={() => window.open(project.link, "_blank")}
            >
              {/* Left half: Brand & description */}
              <div className="md:h-full md:w-1/2 pl-2 pb-2 flex flex-col justify-end">
                <h3 className="text-2xl font-sans font-bold my-2">
                  {project.brand}
                </h3>
                <p className="text-sm">{project.description}</p>
                <p className="mt-4 text-xs font-mono italic">{project.work}</p>
              </div>
              {/* Right half: GIF/Image */}
              <div className="md:h-full md:w-1/2 flex items-center justify-center">
                <img
                  src={project.gif}
                  alt={project.brand}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Projects;
