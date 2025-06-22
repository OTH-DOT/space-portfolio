'use client';
import { useInView } from 'react-intersection-observer';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Works from '../components/Works';
import Contact from '../components/Contact';
import StarsCanvas from '../components/canvas/Stars';

const Sections = () => {

  const [heroRef] = useInView({ threshold: 0.3 });
  const [aboutRef] = useInView({ threshold: 0.3 });
  const [skillsRef] = useInView({ threshold: 0.3 });
  const [projectsRef] = useInView({ threshold: 0.1 }); // Lower threshold for Projects
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
      
      <section ref={worksRef}> {/* Fixed: separate section for Works */}
        <Works />
      </section>
      
      <section ref={contactRef}>
        <Contact />
      </section>
    </>
  );
};

export default Sections;