import { useEffect, useRef } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useMenu } from "../../context/MenuProvider";
import gsap from "gsap";

// Task 1: switched overlay navigation to real router links that match declared routes.
const Menu = () => {
  const containerRef = useRef(null);
  const linkRefs = useRef([]);
  const { pathname } = useLocation();
  const setLinkRef = (el, index) => {
    linkRefs.current[index] = el;
  };

  useEffect(() => {
    const container = containerRef.current;
    const links = linkRefs.current.filter(Boolean);
    if (!container || links.length === 0) return undefined;

    const previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      gsap.set(container, {
        autoAlpha: 1,
        clipPath: "circle(0% at 100% 0%)",
      });
      gsap.set(".menu-meta", { autoAlpha: 0, y: 14 });
      gsap.set(".menu-rule", { scaleX: 0, transformOrigin: "left center" });
      gsap.set(links, {
        autoAlpha: 0,
        y: 46,
        rotateX: -12,
        transformOrigin: "50% 100%",
      });

      gsap
        .timeline()
        .to(container, {
          clipPath: "circle(150% at 100% 0%)",
          duration: 0.75,
          ease: "power4.out",
        })
        .to(
          ".menu-rule",
          { scaleX: 1, duration: 0.45, ease: "power2.out" },
          "-=0.4"
        )
        .to(
          ".menu-meta",
          { autoAlpha: 1, y: 0, duration: 0.35, stagger: 0.07, ease: "power2.out" },
          "-=0.25"
        )
        .to(
          links,
          {
            autoAlpha: 1,
            y: 0,
            rotateX: 0,
            duration: 0.52,
            stagger: 0.12,
            ease: "power3.out",
          },
          "-=0.15"
        );
    }, container);

    return () => {
      ctx.revert();
      document.body.style.overflow = previousBodyOverflow;
    };
  }, []);
  /*------------------------*/
  const { toggleMenu } = useMenu();
  const menuItems = [
    { name: "Home", link: "/" },
    { name: "WhoAmI", link: "/whoami" },
    { name: "Blog", link: "/blog" },
  ];
  return (
    <nav
      ref={containerRef}
      aria-label="Primary navigation"
      className="fixed inset-0 flex min-h-screen w-full items-center justify-center overflow-hidden z-50 text-light-200 bg-dark"
    >
      <div className="absolute inset-x-8 top-8 md:inset-x-16 pointer-events-none">
        <div className="menu-rule h-px bg-light-200/40" />
        <div className="menu-meta mt-4 flex justify-between gap-4 font-mono text-[10px] uppercase tracking-wide text-light-200/70">
          <span>Navigation</span>
          <span>{String(menuItems.length).padStart(2, "0")} routes</span>
        </div>
      </div>

      <ul className="space-y-9 md:space-y-12">
        {menuItems.map((item, index) => (
          <li
            ref={(el) => setLinkRef(el, index)}
            key={item.link}
            className="relative group font-mono font-medium tracking-wide opacity-90 hover:opacity-100 transition-opacity"
          >
            <RouterLink
              to={item.link}
              aria-current={pathname === item.link ? "page" : undefined}
              className="flex items-center outline-none"
              onClick={toggleMenu}
            >
              <span className="absolute -top-3 bg-light-200 text-dark size-4 text-[10px] flex justify-center items-center transition-transform duration-300 ease-out group-hover:-translate-y-1 group-focus-within:-translate-y-1">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="pl-6 text-5xl md:text-7xl transition-transform duration-300 ease-out group-hover:translate-x-3 group-focus-within:translate-x-3">
                {item.name}
              </h3>
              {pathname === item.link && (
                <span className="ml-4 hidden md:inline-block h-2 w-2 rounded-full bg-green" />
              )}
            </RouterLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Menu;
