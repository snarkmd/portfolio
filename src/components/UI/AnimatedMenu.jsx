import { useMenu } from "../../context/MenuProvider";
const AnimatedMenu = () => {
  const { toggleMenu, isMenuOpen } = useMenu();
  return (
    <button
      type="button"
      aria-label={isMenuOpen ? "Close menu" : "Open menu"}
      aria-expanded={isMenuOpen}
      className={`relative cursor-pointer w-12 h-10 z-50 group flex items-center justify-center ${
        isMenuOpen ? "hover:animate-spinOne" : ""
      }`}
      onClick={toggleMenu}
    >
      <span className="relative block w-8 h-3">
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
      </span>
    </button>
  );
};

export default AnimatedMenu;
