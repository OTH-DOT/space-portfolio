'use client';
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Works from '../components/Works';
import Contact from '../components/Contact';
import SharedItem from '../components/SharedItem';
import StarsCanvas from '../components/canvas/Stars';

const Sections = () => {
  const [currentSection, setCurrentSection] = useState('hero');

  const [heroRef, heroInView] = useInView({ threshold: 0.3 });
  const [aboutRef, aboutInView] = useInView({ threshold: 0.3 });
  const [skillsRef, skillsInView] = useInView({ threshold: 0.3 });
  const [projectsRef, projectsInView] = useInView({ threshold: 0.1 }); // Lower threshold for Projects
  const [worksRef, worksInView] = useInView({ threshold: 0.3 });
  const [contactRef, contactInView] = useInView({ threshold: 0.3 });

  useEffect(() => {
    if (heroInView) setCurrentSection('hero');
    else if (aboutInView) setCurrentSection('about');
    else if (skillsInView) setCurrentSection('skills');
    else if (projectsInView) setCurrentSection('projects');
    else if (worksInView) setCurrentSection('works');
    else if (contactInView) setCurrentSection('contact');
  }, [heroInView, aboutInView, skillsInView, projectsInView, worksInView, contactInView]);

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