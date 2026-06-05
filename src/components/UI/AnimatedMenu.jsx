import { useMenu } from "../../context/MenuProvider";
const AnimatedMenu = () => {
  const { toggleMenu, isMenuOpen } = useMenu();
  return (
    <div
      className={`relative cursor-pointer w-8 h-3 z-50 group ${
        isMenuOpen ? "hover:animate-spinOne" : ""
      }`}
      onClick={toggleMenu}
    >
      <span
        className={`block absolute w-full bg-dark h-[3px] top-0 right-0 transition-all duration-150 ease-in ${
          isMenuOpen ? "-rotate-45 top-1 bg-light-200" : ""
        }`}
      ></span>
      <span
        className={`block absolute w-3/4 bg-dark h-[3px] group-hover:w-full bottom-0 right-0 transition-all duration-150 ease-in ${
          isMenuOpen ? "rotate-45 bottom-1 w-full bg-light-200" : ""
        }`}
      ></span>
    </div>
  );
};

export default AnimatedMenu;
