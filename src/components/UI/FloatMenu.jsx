import { Menu, MinusIcon } from "lucide-react";
import React, { useState } from "react";
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
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const toggleMenu = () => {
    setIsMenu((prev) => !prev);
  };
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
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <div
            className="flex justify-between py-4 cursor-pointer"
            onClick={toggleMenu}
          >
            <span className="mr-6">{menuItems[section].name}</span>

            {isMenu ? <MinusIcon /> : <Menu />}
          </div>
        </div>
      ) : (
        <ul className="fixed flex bg-dark max-w-4/5 bottom-6 left-1/2 translate-x-[-50%] overflow-hidden rounded-md z-40">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className={`relative font-mono font-medium py-4 first-of-type:pl-6 last-of-type:pr-6 px-4 ${
                index === section
                  ? "bg-light-200 text-dark"
                  : "text-light-200 hover:bg-light-200 hover:text-dark"
              } transition-colors duration-300 ease-out`}
              
            >
              <Link to={item.link} smooth={true} duration={500} className="cursor-pointer"
              >
                    {item.name}
                  </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
