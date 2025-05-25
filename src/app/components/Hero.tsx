import React from 'react'
import StarsCanvas from './canvas/Stars'
import EarthCanvas from './canvas/Earth'
import {motion} from 'framer-motion'

const Hero = () => {
  const scrollToContact = () => {
  document.getElementById('contact')?.scrollIntoView({
    behavior: 'smooth'
  });
};
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center">
      <StarsCanvas />
      <div className="absolute z-20 text-center space-y-4">
  <motion.h1 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="text-white text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-300 bg-clip-text text-transparent"
  >
    Hey there!
  </motion.h1>
  
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.3, duration: 0.8 }}
    className="space-y-2"
  >
    <p className="text-white/90 text-xl md:text-2xl font-medium">
      I craft <span className="text-purple-300">digital experiences</span> that users love
    </p>
    <p className="text-gray-300/80 text-lg max-w-2xl mx-auto leading-relaxed">
      Full-stack developer specializing in modern web technologies with a focus on performance, accessibility, and beautiful interfaces.
    </p>
  </motion.div>

  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.6, duration: 0.5 }}
    className="pt-4"
  >
    <button 
        onClick={scrollToContact}
      className="px-6 cursor-pointer py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full text-white font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300">
      Let's build something
    </button>
  </motion.div>
</div>
      {/* <div className="absolute z-10 bottom-[20%] right-[10%] w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64">
        <EarthCanvas />
      </div> */}
    </section>
  )
}

export default Hero
