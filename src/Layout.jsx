import { useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Menu from "./components/UI/Menu";
import { useMenu } from "./context/MenuProvider";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { useLayoutAnimations } from "./hooks/useLayoutAnimations";
import { usePreloaderLogic } from "./hooks/usePreloaderLogic";

gsap.registerPlugin(SplitText, ScrambleTextPlugin);

// Task 7: Layout now composes dedicated preloader and animation hooks instead of owning all lifecycle logic directly.
// Task 8: renamed the preloader state setter to setIsPreloader for consistent React naming.
const MainLayout = ({ children }) => {
  const { isMenuOpen } = useMenu();
  const location = useLocation();
  const { completePreloader, isPreloader, setIsPreloader } = usePreloaderLogic(
    location.pathname
  );
  const { preloaderRef, layoutRef, addCubeRefs, addScriptRefs } =
    useLayoutAnimations({
      isPreloader,
      completePreloader,
      setIsPreloader,
      pathname: location.pathname,
    });

  return (
    <>
      {isPreloader && (
        <div ref={preloaderRef} className="flex justify-center items-center h-screen bg-dark text-light-200">
          <div className="hidden grid-flow-row grid-cols-3 overflow-hidden absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {["blue", "light-200", "green", "berry", "transparent", "red"].map((color, i) => (
              <div key={i} ref={addCubeRefs} className={`bg-${color} w-[30px] h-[30px]`} />
            ))}
          </div>
          <div className="relative w-full h-[120px]">
            <span ref={addScriptRefs} className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden">
              Hello there,
            </span>

            <span ref={addScriptRefs} className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden italic">
              wonderer
            </span>

            <span ref={addScriptRefs} className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden">
              Get ready to
            </span>

            <span ref={addScriptRefs} className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden">
              explore the unexpected.
            </span>
          </div>
        </div>
      )}

      <div ref={layoutRef} className={isPreloader ? "hidden" : ""}>
        {isMenuOpen && <Menu />}
        <div className="flex flex-col min-h-screen bg-light-100">
          <Header />
          <main className="flex-grow relative">{children}</main>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
