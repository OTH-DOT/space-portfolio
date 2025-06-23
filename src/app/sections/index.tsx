'use client';

import dynamic from 'next/dynamic';
import { useInView } from 'react-intersection-observer';

// Dynamically import components with SSR disabled
const Hero = dynamic(() => import('../components/Hero'), { ssr: false });
const About = dynamic(() => import('../components/About'), { ssr: false });
const Skills = dynamic(() => import('../components/Skills'), { ssr: false });
const Projects = dynamic(() => import('../components/Projects'), { ssr: false });
const Works = dynamic(() => import('../components/Works'), { ssr: false });
const Contact = dynamic(() => import('../components/Contact'), { ssr: false });
const StarsCanvas = dynamic(() => import('../components/canvas/Stars'), { ssr: false });

const Sections = () => {
  const [heroRef] = useInView({ threshold: 0.3 });
  const [aboutRef] = useInView({ threshold: 0.3 });
  const [skillsRef] = useInView({ threshold: 0.3 });
  const [projectsRef] = useInView({ threshold: 0.1 });
  const [worksRef] = useInView({ threshold: 0.3 });
  const [contactRef] = useInView({ threshold: 0.3 });

  return (
    <>
      <StarsCanvas />
      
      <section ref={heroRef}>
        <Hero />
      </section>
      
      <section ref={aboutRef}>
        <About />
      </section>
      
      <section ref={skillsRef}>
        <Skills />
      </section>
      
      <section ref={projectsRef}>
        <Projects />
      </section>
      
      <section ref={worksRef}>
        <Works />
      </section>
      
      <section ref={contactRef}>
        <Contact />
      </section>
    </>
  );
};

export default Sections;
