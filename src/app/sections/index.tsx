'use client';

import React, { useEffect } from 'react'
import Hero from '../components/Hero'
import About from '../components/About'
import Skills from '../components/Skills'
import Works from '../components/Works'
import Projects from '../components/Projects'
import Contact from '../components/Contact';
import { useInView } from "react-intersection-observer";
import SharedItem from '../components/SharedItem';


const Sections = () => {
  const [aboutRef, aboutInView] = useInView({ threshold: 0.5 });


  return (
    <>
      {/* <SharedItem inView={aboutInView} /> */}
      <Hero />
      <About innerRef={aboutRef} />
      <Skills />
      <Projects />
      <Works />
      <Contact />
    </>
  )
}

export default Sections
