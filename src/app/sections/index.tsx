'use client';

import React from 'react'
import Hero from '../components/Hero'
import About from '../components/About'
import Skills from '../components/Skills'
import Works from '../components/Works'
import Projects from '../components/Projects'
import Contact from '../components/Contact';

const Sections = () => {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Works />
      <Contact />
    </>
  )
}

export default Sections
