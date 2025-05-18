import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { gsap } from "gsap";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Menu from "./components/UI/Menu";
import { useMenu } from "./context/MenuProvider";
import { Helmet } from 'react-helmet-async';
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
    gsap.set(cubes,{opacity:0,y:60,filter: 'grayscale(0.3)'})
    const cubeAnim = () => {
      const tl = gsap.timeline({
        defaults: {duration: 0.45,ease:"power3.inOut"},
        onStart: () => cubes[0].parentNode.style.display = "grid",
        onComplete: () => cubes[0].parentNode.style.display = "none"
      })
      tl.to(cubes, {opacity:1,y:0,duration:0.60,ease:"power3.inOut"})
      tl.to(cubes[1], {y:30})
      tl.to(cubes[0], {x:30})
      tl.to(cubes[3], {y:-30})
      tl.to(cubes[1], {x:-30})
      tl.to(cubes[5], {x:-30})
      tl.to(cubes[4], {x:30},"<")
      tl.to(cubes,{filter:'grayscale(0)',duration:0.3,ease:"expo.out"},">-=0.15")
      tl.to(cubes,{opacity:0,duration:0.35,ease:"expo.in"},">+0.25")
      return tl;
    }
    const scriptAnim = () => {
      const tl = gsap.timeline({defaults:{duration:1, ease:"power1.inOut"}, delay:0.4})
      tl.fromTo(scripts[0],{opacity:0},{opacity:1,yoyo:true,repeat:1,
        onStart: ()=> scripts[0].style.display = "block",
        onComplete: () => scripts[0].style.display = "none"
      })
      tl.fromTo(scripts[1],{opacity:0},{opacity:1,
        onStart: ()=> scripts[1].style.display = "block",
      })
      tl.to(scripts[1],{y:-180, duration:0.6, opacity:0, 
        onComplete: () => scripts[1].style.display = "none"})
      return tl;
    }
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
<Helmet>
  <script type="application/ld+json">
    {`
      {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Anes",
        "url": "https://anesmd.com",
        "sameAs": [
          "https://www.linkedin.com/in/bentoumi-anes",
          "https://github.com/snark_md",
          "https://x.com/snark_md",
          "https://facebook.com/bentoumiAnes",
          "https://www.behance.net/snarkmd",
          "https://medium.com/@benanes"
        ],
        "jobTitle": "Entrepreneur, Web Developer, Designer, medical doctor",
        "worksFor": {
          "@type": "Organization",
          "name": "Hawks Creative Agency"
        },
        "image": "https://anesmd.com/img/anes.jpg"
      }
    `}
  </script>
</Helmet>
      {isPreloader && 
        
        <div ref={preloaderRef} className="flex justify-center items-center h-screen bg-dark text-light-200">
          <div className="hidden grid-flow-row grid-cols-3 overflow-hidden">
            {["blue","light-200","green","berry","transparent","red"].map((color,i)=>(<div key={i} ref={addCubeRefs} className={`bg-${color} w-[30px] h-[30px]`}/>))}
          </div>
          <div >
            <span ref={addScriptRefs} className="hidden">are you ready ?</span>
            <span ref={addScriptRefs} className="hidden">Welcome</span>
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
