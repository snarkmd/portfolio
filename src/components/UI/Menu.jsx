import { useEffect, useRef } from "react";
import { useMenu } from "../../context/MenuProvider";
import gsap from "gsap";
const Menu = () => {
  const containerRef = useRef(null)
  const linkRefs = useRef([])
  const addLinkRefs = (el) => {if (el && !linkRefs.current.includes(el)) linkRefs.current.push(el)}
  useEffect(()=>{
    const container = containerRef.current;
    const links = linkRefs.current;
    if (!container || !links) return;
    gsap.set(container, { clipPath: "circle(0% at 100% 0%)", opacity: 0.8});
    const tl = gsap.timeline()
    tl.to(container, { clipPath: "circle(150% at 100% 0%)", opacity: 1, duration: 0.8, ease: "steps(14)",});
    tl.fromTo(links,{opacity:0,y:30},{opacity:1,y:0,duration:0.4,stagger:0.25,ease:"power2.out"})
  },[])
  /*------------------------*/
  const { toggleMenu } = useMenu();
  const menuItems = [
    { name: "Home", link: "/" },
    { name: "WhoAmI", link: "/whoami" },
    { name: "Blog", link: "/Blog" },
  ];
  return (
    <div ref={containerRef} className="fixed flex items-center justify-center min-h-screen h-full w-full z-50 text-light-200 bg-dark">
      <ul className="space-y-12">
        {menuItems.map((item, index) => (
          <li
          ref={addLinkRefs}
            key={index}
            className="relative group font-mono font-medium tracking-wide opacity-90 hover:opacity-100 transition-opacity"
          >
            <a
              href={item.link}
              className="flex items-center"
              onClick={toggleMenu}
            >
              <span className="absolute -top-3 bg-light-200 text-dark size-4 text-[10px] flex justify-center items-center">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="pl-6 text-5xl">{item.name}</h3>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
