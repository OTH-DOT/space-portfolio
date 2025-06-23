'use client';

import React from 'react'
import { motion } from 'framer-motion'
import { Download, Zap } from 'lucide-react'
import Image from 'next/image';

const Hero = () => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  const downloadCV = () => {
    const link = document.createElement('a');
    link.href = '/OTHMANE_MAKKOUR_CV.pdf';
    link.download = 'OTHMANE_MAKKOUR_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };



  return (
    <section id="home" 
    className="relative min-h-[calc(100vh-74px)] w-full flex items-center justify-center p-4 z-10 overflow-hidden"
    >
      
      {/* Main Content Container */}
<div className="relative z-20 px-4 container w-full  mx-auto grid grid-cols-1 lg:grid-cols-2  items-between">
        
        {/* Left Side - Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Main Heading */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3"
            >
              <div className="w-12 h-[2px] bg-gradient-to-r from-purple-400 to-pink-300"></div>
              <span className="text-purple-300 text-xl font-medium tracking-widest uppercase">
                Full-Stack Developer
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
            >
              Hey there!{' '}
              <span className="bg-gradient-to-r from-purple-400 via-pink-300 to-blue-400 bg-clip-text text-transparent">
                I craft digital experiences
              </span>{' '}
              that users love
            </motion.h1>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-gray-300/90 text-lg lg:text-xl leading-relaxed max-w-xl"
          >
            Specializing in modern web technologies with a focus on performance, 
            accessibility, and beautiful interfaces that make a difference.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button
              onClick={scrollToContact}
              className="group px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full text-white font-medium hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              Let&apos;s build something
              <Zap className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
            </button>
            
            <button
              onClick={downloadCV}
              className="group px-8 py-4 border-2 border-purple-400/30 rounded-full text-white font-medium hover:bg-purple-400/10 hover:border-purple-400/60 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" />
              Download CV
            </button>
          </motion.div>

          {/* Stats or Features */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex items-center gap-8 pt-4"
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-white">3+</div>
              <div className="text-sm text-gray-400">Years Experience</div>
            </div>
            <div className="w-px h-12 bg-gray-600"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">50+</div>
              <div className="text-sm text-gray-400">Projects Done</div>
            </div>
            <div className="w-px h-12 bg-gray-600"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">∞</div>
              <div className="text-sm text-gray-400">Passion Level</div>
            </div>
          </motion.div> */}
        </motion.div>

        {/* Right Side - Visual Space */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative max-lg:hidden flex items-center justify-center"
        >
          {/* Cosmic Energy Field */}
          <div className="relative lg:w-[400px] lg:h-[400px] xl:w-[450px] xl:h-[450px]">
            {/* Outer Glow Ring */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="absolute inset-0"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/30 via-blue-500/30 to-cyan-400/30 blur-3xl"></div>
            </motion.div>

            {/* Main Energy Sphere */}
            <motion.div
              initial={{ scale: 0, rotate: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{ 
                scale: { duration: 1.2, delay: 0.8, ease: "easeOut" },
                rotate: { duration: 20, repeat: Infinity, ease: "linear" }
              }}
              className="absolute inset-8 rounded-full bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-cyan-400/20 backdrop-blur-sm border border-white/10"
            >
              {/* Inner Rotating Rings */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-4 rounded-full border-2 border-dashed border-purple-400/40"
              ></motion.div>
              
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute inset-8 rounded-full border border-dotted border-cyan-400/30"
              ></motion.div>
            </motion.div>

            {/* Central Core */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 1.5 }}
                className="relative"
              >
                {/* Core Sphere - Perfect place for your SVG */}
                <motion.div
                  animate={{ 
                    scale: [1, 1.05, 1],
                    boxShadow: [
                      "0 0 20px rgba(168, 85, 247, 0.4)",
                      "0 0 40px rgba(59, 130, 246, 0.6)",
                      "0 0 20px rgba(168, 85, 247, 0.4)"
                    ]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="w-24 h-24 lg:w-32 lg:h-32 rounded-full bg-gradient-to-br from-purple-400/40 via-blue-500/40 to-cyan-400/40 backdrop-blur-md border border-white/20 flex items-center justify-center"
                >
                  {/* Placeholder for your SVG - add your custom SVG here */}
                  <div className="text-white/60 font-light">
                    <Image src="./OTH_LOGO.svg" alt="logo" width={75} height={75} />
                  </div>
                </motion.div>

                {/* Energy Pulses */}
                {Array.from({ length: 3 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ 
                      scale: [0, 2, 3],
                      opacity: [0, 0.6, 0]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 1,
                      ease: "easeOut"
                    }}
                    className="absolute inset-0 rounded-full border border-purple-400/30"
                  />
                ))}
              </motion.div>
            </div>

            {/* Floating Energy Particles */}
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i * 360) / 12;
              const radius = 120 + Math.random() * 40;
              const x = Math.cos(angle * Math.PI / 180) * radius;
              const y = Math.sin(angle * Math.PI / 180) * radius;
              
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                    x: [x, x + Math.random() * 20 - 10],
                    y: [y, y + Math.random() * 20 - 10]
                  }}
                  transition={{
                    duration: 4 + Math.random() * 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeInOut"
                  }}
                  className="absolute top-1/2 left-1/2 w-1 h-1 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400"
                  style={{
                    transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`
                  }}
                />
              );
            })}

            {/* Ambient Light Rays */}
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, rotate: i * 60 }}
                animate={{ 
                  opacity: [0, 0.3, 0],
                  rotate: i * 60 + 360,
                  scale: [0.8, 1.2, 0.8]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="w-1 h-32 bg-gradient-to-t from-transparent via-purple-400/20 to-transparent blur-sm"></div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-white/60"
        >
          <span className="text-sm font-light">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [2, 14, 2] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 bg-white/60 rounded-full mt-2"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero