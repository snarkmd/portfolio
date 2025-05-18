// External libraries
import { useRef } from "react";
import { Play, Pause, BadgeCheck, CircleCheck } from "lucide-react";
import { useWavesurfer } from "@wavesurfer/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

// Internal assets
import anes from "../../assets/img/anes.jpg";
import whoami from "../../assets/audo/whoami.mp3";
import { skills } from "../../assets/data";
import Headline from "../../components/UI/Headline";
const Skills = ({skillsRef}) => {
  const containerRef = useRef(null);

  const { wavesurfer, isReady, isPlaying, currentTime } = useWavesurfer({
    container: containerRef,
    url: "",
    barWidth: 3,
    barRadius: 4,
    barGap: 3,
    barMinHeight: 1,
    cursorWidth: 6,
    backend: "WebAudio",
    height: 30,
    progressColor: "#536ca3",
    responsive: true,
    waveColor: "#312c31",
    cursorColor: "transparent",
  });
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };
  const onPlayPause = () => {
    wavesurfer && wavesurfer.playPause();
  };
  return (
    <>

      <div
      ref={skillsRef}
        className="section items-center justify-center px-8 md:px-16 py-8"
      >
        <div className="grid grid-cols-1 md:grid-rows-3 md:grid-cols-6 gap-4">
          <div className="relative grain flex-col gap-2 rounded-md order-1 md:col-span-1 md:row-span-1 hidden md:flex overflow-hidden ">
            <div
              className="size-full bg-cover bg-center"
              style={{ backgroundImage: `url(${anes})` }}
            ></div>
          </div>
          <div className="overflow-hidden p-4 relative grain flex flex-col gap-2 rounded-md order-2 md:col-span-2 md:row-span-1 bg-dark">
            <div className="flex flex-col flex-grow">
              <div className="flex flex-row-reverse justify-between items-center text-light-200 text-3xl md:text-5xl">
                <span className="inline-block font-bold">✳</span>
                <span className="inline-block font-bold">✳</span>
              </div>
              <div className="relative flex items-center justify-center w-4/5 m-auto py-2 bg-light-200">
                <div className="absolute top-1/4 m-auto w-4/5 border-t border-dark"></div>
                <span className=" text-base font-semibold italic text-dark font-[cursive]">
                  Who Am I #03
                </span>
                <div className="absolute bottom-1/4 m-auto w-4/5 border-t border-dark"></div>
              </div>
              <div className="mt-3 p-2 my-1 flex justify-between items-center gap-2 bg-light-200 rounded-lg">
                <button
                  onClick={onPlayPause}
                  className=" flex items-center justify-center bg-dark p-[8px] rounded-lg hover:bg-blue transition group"
                >
                  {isPlaying ? (
                    <Pause size={16} className="text-light-100" />
                  ) : (
                    <Play size={16} className="text-light-100" />
                  )}
                </button>
                <div ref={containerRef} className="w-[90%]" />
                <span className="text-xs text-dark font-mono">
                  {formatTime(currentTime)}
                </span>
              </div>
            </div>
          </div>
          {skills.map((skill, index) => (
            <div
              key={index}
              className={`p-4 relative grain flex flex-col gap-2 border-2 border-dark shadow-[2px_2px_0px_rgba(44,49,44,1)] ${skill.layout}`}
            >
              <div className="flex justify-between items-center">
                <span
                  className={`font-sans text-xs font-medium ${
                    skill.dark
                      ? "bg-light-200 text-dark"
                      : "bg-dark text-light-100"
                  } pr-2 pl-1 py-[2px]`}
                >
                  {skill.title}
                </span>

                {skill.certified ? (
                  <span
                    className={`flex justify-between items-center gap-2 text-xs font-sans font-medium ${
                      skill.dark ? "text-light-200" : "text-dark"
                    }`}
                  >
                    <BadgeCheck className={`size-5`} alt="Certified" />
                    Certified
                  </span>
                ) : (
                  <span
                    className={`flex justify-between items-center gap-2 text-xs font-sans font-medium ${
                      skill.dark ? "text-light-200" : "text-dark"
                    }`}
                  >
                    <CircleCheck className={`size-5`} alt="Proven Experience" />
                    Proven Experience
                  </span>
                )}
              </div>
              <h3
                className={`text-xl font-sans font-semibold ${
                  skill.dark ? "text-light-200" : "text-dark"
                }`}
              >
                {skill.headline}
              </h3>

              <div className="flex flex-col h-full justify-between">
                <p
                  className={`text-sm font-sans max-w-prose text-justify ${
                    skill.dark ? "text-light-100" : "text-dark"
                  }`}
                >
                  {skill.description}
                </p>
                <ul className="flex flex-wrap gap-2 mt-1">
                  {skill.microSkills.map((micro, i) => (
                    <li
                      key={i}
                      className={`px-4 py-1 ${
                        skill.dark
                          ? "bg-light-100 text-dark"
                          : "bg-dark text-light-100"
                      } font-mono text-[10px] rounded-full`}
                    >
                      {micro}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Swiper
        modules={[Autoplay, FreeMode]}
        spaceBetween={16}
        slidesPerView="auto"
        freeMode={true}
        loop={true}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        speed={2000}
      >
        {skills.map((skill) =>
          skill.tools.map((tool, index) => (
            <SwiperSlide key={index} style={{ width: "fit-content" }}>
              <div className="grid grid-flow-col gap-2 items-center py-1 px-2 border-2 border-dark w-fit">
                <img src={tool.icon} alt={tool.name} className="h-5" />
                <span className="font-mono font-semibold text-dark whitespace-nowrap">
                  {tool.name}
                </span>
              </div>
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </>
  );
};

export default Skills;
