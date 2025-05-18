// ScrollReveal.js
import { useEffect, useRef, cloneElement } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ScrollReveal = ({ children }) => {
  const refs = useRef([]);

  const addToRefs = (el) => {
    if (el && !refs.current.includes(el)) {
      refs.current.push(el);
    }
  };

  useEffect(() => {
    const elements = refs.current;
    if (!elements.length) return;

    gsap.set(elements, { y: 80, opacity: 0 });

    ScrollTrigger.create({
      trigger: elements[0],
      start: 'top top',
      onEnter: () =>
        gsap.to(elements, {
          stagger: 0.1,
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out',
        }),
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      {Array.isArray(children)
        ? children.map((child, i) =>
            cloneElement(child, { ref: addToRefs, key: i })
          )
        : cloneElement(children, { ref: addToRefs })}
    </>
  );
};
