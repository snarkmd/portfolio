import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { gsap } from "gsap";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Menu from "./components/UI/Menu";
import { useMenu } from "./context/MenuProvider";
const MainLayout = ({ children }) => {
  const { isMenuOpen } = useMenu();
  const location = useLocation();
  const [isPreloader, setisPreloader] = useState(location.pathname === "/");
  const cubeRefs = useRef([])
  const scriptRefs = useRef([])
  const preloaderRef = useRef(null)
  const layoutRef = useRef(null)
  const addCubeRefs = (el) => {if (el && !cubeRefs.current.includes(el)) cubeRefs.current.push(el)}
  const addScriptRefs = (el) => {if (el && !scriptRefs.current.includes(el)) scriptRefs.current.push(el)}
  useEffect(() => {
    if (!isPreloader) return;
    const cubes = cubeRefs.current
    const scripts = scriptRefs.current
    const preloader = preloaderRef.current
    const layout = layoutRef.current
    if (!preloader || !cubes || !scripts || !layout) return;
    gsap.set(cubes,{opacity:0,y:60,scale:0.95,filter: 'grayscale(0.3)'})
    const cubeAnim = () => {
      const tl = gsap.timeline({
        defaults: {duration: 0.45,ease:"power4.inOut"},
        onStart: () => cubes[0].parentNode.style.display = "grid",
        onComplete: () => cubes[0].parentNode.style.display = "none"
      })
      tl.to(cubes, {opacity:1,y:0,scale:1,duration:0.60,ease:"power4.inOut"})
      tl.to(cubes[1], {y:30})
      tl.to(cubes[0], {x:30})
      tl.to(cubes[3], {y:-30})
      tl.to(cubes[1], {x:-30})
      tl.to(cubes[5], {x:-30})
      tl.to(cubes[4], {x:30},"<")
      tl.to(cubes,{filter:'grayscale(0)',duration:0.3,ease:"expo.out"},">-=0.15")
      tl.to(cubes,{opacity:0,duration:0.35,ease:"power4.out"},">+0.25")
      return tl;
    }
    const scriptAnim = () => {
  const tl = gsap.timeline({ defaults: { ease: "power4.out",duration: 0.4, },delay:0.4 });

  // Phrase 1: "Hello there,"
  tl.fromTo(scripts[0],{ opacity: 0, y: 10, scale:0.95 },{opacity: 1, y: 0, scale:1, onStart: () => {scripts[0].style.display = "inline-block"; scripts[1].style.display = "inline-block"}});

  // Slide "Hello there," to the right
tl.to([scripts[0], scripts[1]], { x: -40 });

  // Phrase 2: "wonderer" appears next to it
  tl.fromTo(scripts[1],{ opacity: 0 },{opacity: 1 });

  // Fade out both
  tl.to([scripts[0], scripts[1]], {opacity: 0,delay:0.65,onComplete: () => {scripts[0].style.display = "none";scripts[1].style.display = "none";}});

  // Phrase 3: "Get ready to"
  tl.fromTo(scripts[2],{ opacity: 0, y: 10, scale:0.95 }, {opacity: 1,y: 0, scale:1, onStart: () => scripts[2].style.display = "inline-block"});

  // Fade out
  tl.to(scripts[2], {opacity: 0,delay:0.65, onComplete: () => scripts[2].style.display = "none"});

  // Phrase 4: "explore the unexpected."
  tl.fromTo(scripts[3],{ opacity: 0, y: 10, scale:0.95 },{opacity: 1,y: 0, scale:1, onStart: () => scripts[3].style.display = "inline-block"});

  // Final fade out
  tl.to(scripts[3], {opacity: 0,delay:0.65,onComplete: () => scripts[3].style.display = "none"});

  return tl;
};


    const layoutAnim = () => {
      const tl = gsap.timeline();
    
      tl.to(preloader, {
        opacity: 0,
        duration: 0.4,
        ease: "power1.inOut",
        display : "none",
      });
    
      tl.to( layout,{display: "initial"},"-=0.4" );
    
      return tl;
    };
 
    const tl = gsap.timeline({delay:0.5})
    tl.add(cubeAnim())
    tl.add(scriptAnim())
    tl.add(layoutAnim())
  },[])
  
  return (
<>
      {isPreloader && 
        
        <div ref={preloaderRef} className="flex justify-center items-center h-screen bg-dark text-light-200">
          <div className="hidden grid-flow-row grid-cols-3 overflow-hidden">
            {["blue","light-200","green","berry","transparent","red"].map((color,i)=>(<div key={i} ref={addCubeRefs} className={`bg-${color} w-[30px] h-[30px]`}/>))}
          </div>
          <div className="inline-block whitespace-nowrap font-mono font-extralight text-lg">
  <span ref={addScriptRefs} className="hidden mr-1">Hello there,</span>
  <span ref={addScriptRefs} className="hidden italic">wonderer</span>
  <span ref={addScriptRefs} className="hidden">Get ready to</span>
  <span ref={addScriptRefs} className="hidden">explore the unexpected.</span>
</div>
        </div>}
        
      <div ref={layoutRef} className={isPreloader ? "hidden":""}>
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
