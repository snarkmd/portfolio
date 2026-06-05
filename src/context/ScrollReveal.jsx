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

    const revealTween = gsap.to(elements, {
      stagger: 0.1,
      y: 0,
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out',
      paused: true,
    });

    const trigger = ScrollTrigger.create({
      trigger: elements[0],
      start: 'top 85%',
      once: true,
      onEnter: () => revealTween.play(),
    });

    return () => {
      trigger.kill();
      revealTween.kill();
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
