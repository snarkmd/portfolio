import { Eye } from "lucide-react";
import Story from "../../components/Story";
import gif from "../../assets/img/gif.gif";
import mairie from "../../assets/img/mairie.png";
import { useEffect, useState } from "react";
const Hero = () => {
  const [stories, showStories] = useState(false);
useEffect(() => {
    if (stories)  document.body.style.overflow = 'hidden';
    else  document.body.style.overflow = '';
    return () =>  document.body.style.overflow = '';
    
  }, [stories]);
  const [time, setTime] = useState(
    new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    }, 30000);
    return () => clearInterval(interval);
  });
  return (
    <>
      {stories && <Story showStories={showStories} />}
      <div className="!py-0 px-8 md:px-16 md:py-8 md:min-h-[calc(100vh-80px)] min-h-[calc(100vh-60px)] flex flex-col items-center gap-1">
        <p className="font-serif md:max-w-[900px] text-4xl md:text-7xl lg:8xl md:leading-[5rem] m-auto font-extralight leading-snug text-center">
          Small-<em>town</em>{" "}
          <img
            src={mairie}
            alt="la mairie de saida"
            className="w-20 md:w-28 h-auto inline align-baseline hoverScale translate-y-1"
          />{" "}
          millennial, shaped by what I do
          <span
            onClick={() => showStories(true)}
            className="sticker hoverScale w-24 h-10 md:w-28 md:h-14 bg-blue relative cursor-pointer bg-cover bg-center bg-opacity-50 bg-blend-overlay grain"
            style={{ backgroundImage: `url(${gif})` }}
          >
            {" "}
            <Eye
              size={24}
              strokeWidth={2.5}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-light-100"
            />{" "}
          </span>
          , create{" "}
          <ins className="text-symbol !size-10 !w-20 hover:bg-dark transition-colors"></ins>{" "}
          and what keeps me up at <em>night</em>.
        </p>
        <div className="flex justify-center md:justify-between items-end w-full mt-auto mb-4">
          <p className="font-mono text-[10px] inline-block text-xs">
            Oran, Algeria {time}
          </p>
        </div>
      </div>
    </>
  );
};

export default Hero;
