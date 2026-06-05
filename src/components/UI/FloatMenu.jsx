import { Menu, MinusIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-scroll';

const menuItems = [
  { name: "WhoAmI", link: "whoami" },
  { name: "Projects", link: "projects" },
  { name: "Services", link: "services" },
  { name: "ReachMe", link: "reachme" },
];
export const FloatMenu = ({floatRef, currentSection : section}) => {


  const [isMenu, setIsMenu] = useState(false);
  const itemRefs = useRef([]);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const toggleMenu = () => {
    setIsMenu((prev) => !prev);
  };

  useEffect(() => {
    const activeItem = itemRefs.current[section];
    if (!activeItem) return;

    setIndicatorStyle({
      left: activeItem.offsetLeft,
      width: activeItem.offsetWidth,
    });
  }, [section, isMobile]);

  return (
    <div ref={floatRef}>
      {isMobile ? (
        <div className="fixed  bg-dark min-w-3/5 bottom-4 left-1/2 px-3 text-light-200 font-mono font-medium translate-x-[-50%] overflow-hidden rounded-md z-40">
          {isMenu && (
            <ul className="pt-2 font-light">
              {menuItems.map((item, index) => (
                <li
                  key={index}
                  className={`relative py-2 ${
                    index === section ? "hidden" : ""
                  }`}
                >
                  <Link to={item.link} smooth={true} duration={500}
                  onClick={() => {
                    toggleMenu();
                  }}
                  className="cursor-pointer"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <button
            type="button"
            aria-expanded={isMenu}
            aria-label="Toggle section navigation"
            className="flex justify-between items-center py-4 cursor-pointer w-full text-left"
            onClick={toggleMenu}
          >
            <span className="mr-6">
              <span className="text-[10px] opacity-60 mr-2">
                {String(section + 1).padStart(2, "0")}
              </span>
              {menuItems[section].name}
            </span>

            {isMenu ? <MinusIcon /> : <Menu />}
          </button>
        </div>
      ) : (
        <ul className="fixed flex bg-dark max-w-4/5 bottom-6 left-1/2 translate-x-[-50%] overflow-hidden rounded-md z-40">
          <span
            className="absolute top-0 bottom-0 bg-light-200 transition-all duration-300 ease-out"
            style={{
              left: indicatorStyle.left,
              width: indicatorStyle.width,
            }}
          />
          {menuItems.map((item, index) => (
            <li
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              key={index}
              className={`relative z-10 font-mono font-medium py-4 first-of-type:pl-6 last-of-type:pr-6 px-4 ${
                index === section
                  ? "text-dark"
                  : "text-light-200 hover:bg-light-200 hover:text-dark"
              } transition-colors duration-300 ease-out`}
              
            >
              <Link to={item.link} smooth={true} duration={500} className="cursor-pointer"
              >
                    <span className="text-[10px] opacity-60 mr-2">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {item.name}
                  </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
