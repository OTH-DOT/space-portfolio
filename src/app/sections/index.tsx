'use client';

import React, { useEffect } from 'react'
import Hero from '../components/Hero'
import About from '../components/About'
import Skills from '../components/Skills'
import Works from '../components/Works'
import Projects from '../components/Projects'
import Contact from '../components/Contact';
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";


// const SharedItem = () => {
//   const controls = useAnimation();
//   const [ref, inView] = useInView({ threshold: 0.5 });

//   useEffect(() => {
//     if (inView) {
//       controls.start({ x: "50vw" }); // Right center
//     } else {
//       controls.start({ x: "0vw" }); // Left center
//     }
//   }, [inView, controls]);

//   return (
//     <motion.div
//       animate={controls}
//       initial={{ x: "0vw" }}
//       transition={{ duration: 1 }}
//       className="fixed top-1/2 transform -translate-y-1/2"
//     >
//       {/* Your item here */}
//       <div className="w-32 h-32 bg-orange-500 rounded-full" />
//     </motion.div>
//   );
// };

const Sections = () => {
  return (
    <>
      {/* <SharedItem /> */}
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
