import Headline from "../components/UI/Headline";
import Hero from "./home/Hero";
import Projects from "./home/Projects";
import ReachMe from "./home/ReachMe";
import Services from "./home/Services";
import Skills from "./home/Skills";
import { useEffect, useRef, useState } from "react";
import { Helmet } from 'react-helmet-async';
import { FloatMenu } from "../components/UI/FloatMenu";
import { Element } from "react-scroll";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollReveal } from "../context/ScrollReveal";
gsap.registerPlugin(ScrollTrigger)
const Home = () => {
  const floatRef = useRef(null)
  const sectionRefs = useRef([])
  const [currentSection, setCurrentSection] = useState(0);
  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };
  useEffect(() => {
    const float = floatRef.current
    const sections = sectionRefs.current;
    if (!float || !sections ) return;
    gsap.set(float, {opacity:0})
  sections.forEach((ref, index) => {

      ScrollTrigger.create({
        trigger: ref,
        start: "top top",
        onEnter: () => {
          setCurrentSection(index)
          if(index === 0) gsap.to(float, { opacity: 1, duration: 0.4, delay: 0.2, ease: "power2.out",overwrite: "auto", });
          
        },
        onLeaveBack: () => {
          setCurrentSection(index)
          if(index === 0) gsap.to(float, { opacity: 0, duration: 0.3, ease: "power2.in",overwrite: "auto" });
        },
      });

  });
  }, [])
  return (
    <>
          <Helmet>
        <title>Anes | Creative Developer & Designer</title>
        <meta name="description" content="Portfolio of Anes — web developer, designer, and entrepreneur. Explore my projects and creative work." />
        <meta name="keywords" content="Anes, portfolio, web developer, designer, creative, frontend, entrepreneur" />
        <meta name="author" content="Anes" />

        {/* Open Graph for Facebook & LinkedIn */}
        <meta property="og:title" content="Anes | Creative Developer & Designer" />
        <meta property="og:description" content="Explore the portfolio of Anes — full of design, code, and creative ideas." />
        <meta property="og:image" content="https://anesmd.com/img/preview.png" />
        <meta property="og:url" content="https://anesmd.com" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Anes | Creative Developer & Designer" />
        <meta name="twitter:description" content="Explore the portfolio of Anes — full of design, code, and creative ideas." />
        <meta name="twitter:image" content="https://anesmd.com/img/preview.png" />
      </Helmet>
    
        <div>
          <FloatMenu floatRef={floatRef} currentSection={currentSection}/>
          <Hero />
            <Element name="whoami">
              <div ref={addToRefs}>
                <ScrollReveal>
              <Headline
                title={
                  <>
                    You’<em>re</em> a mosaic <br /> of all the things you{" "}
                    <em>like</em>.
                  </>
                }
                description={
                  <>
                    From pixels to prose, every piece adds up.{" "}
                    <ins className="text-symbol !w-10"></ins> Here’s how my
                    skills fit together to create something bigger.
                  </>
                }
              />
              <Skills />
              </ScrollReveal>
              </div>
              
              </Element>
              <Element name="projects">
                <div ref={addToRefs}>
              <ScrollReveal>
                    <Headline
                                title={
                                  <>
                                    Talk <em>is</em> cheap.
                                    <br /> Here’s the real <em>deal</em>.
                                  </>
                                }
                                description={
                                  <>
                                    projects that speak for themselves. Each one shaped by
                                    curiosity, creativity, and a drive to make things better.
                                  </>
                                }
                              />
              <Projects/>
              </ScrollReveal>  
              
                </div>
              </Element>
              <Element name="services">
              <div ref={addToRefs}>
                <ScrollReveal>
              <Headline
                title={
                  <>
                    Everything <em>is</em> <br /> figureoutable.
                  </>
                }
                description={
                  <>
                    Whether it’s building, designing, or strategizing, I turn
                    challenges into results. Simple as that.
                  </>
                }
              />
              <Services />
              </ScrollReveal>
              </div>
              </Element>
              <Element name="reachme">
              <div ref={addToRefs}>
                <ScrollReveal>
              <Headline
                title={
                  <>
                    As you start to <em>walk</em> on the way,
                    <br /> the way <em>appears</em>.
                  </>
                }
                description={
                  <>
                    Got an idea that's itching to come to life? Or maybe you're
                    looking to team up on something bold and exciting? Let's
                    make it happen.
                  </>
                }
              />
              <ReachMe />
              </ScrollReveal>
              </div>
              </Element>

        </div>
        </>

  );
};

export default Home;
