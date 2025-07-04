'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react'
import { motion, useScroll, useTransform, AnimatePresence, MotionValue } from 'framer-motion'
import { ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import Image from 'next/image'

interface Project {
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  icon: string;
  images: string[];
  features: string[];
  github: string;
  demo: string | null;
}

interface AnimationProps {
  y: MotionValue<number>;
  opacity: MotionValue<number>;
  scale: MotionValue<number>;
}

const projects: Project[] = [
  {
    title: "Nommio – Restaurant Management Platform",
    description: "A comprehensive multi-branch restaurant management system with role-based interfaces.",
    longDescription: "Nommio is a full-featured restaurant management platform supporting all operational aspects across multiple branches. The system provides specialized interfaces for administrators, managers, chefs, delivery personnel, and customers. It streamlines operations from order management to delivery tracking while ensuring secure transactions and real-time communication between all stakeholders.",
    technologies: ["ReactJS", "Laravel", "Express.js", "MySQL", "MongoDB", "JWT", "Stripe", "Socket.io", "Cloudinary", "Tailwind CSS"],
    icon: "🍽️",
    images: [
      "/nommio/image1.png",
      "/nommio/image2.png",
      "/nommio/image3.png",
    ],
    features: [
      "Role-based access control (5 interfaces)",
      "Secure JWT authentication",
      "Online payments with Stripe integration",
      "Real-time messaging with Socket.io",
      "Interactive statistics dashboard",
      "Multi-branch management"
    ],
    github: "https://github.com/OTH-DOT/Nommio",
    demo: null
  },
  {
    title: "NextSkill – E-Learning Platform",
    description: "Interactive online learning platform with course tracking and quiz functionality.",
    longDescription: "NextSkill is a modern e-learning solution that enables users to enroll in courses, track their learning progress, and complete assessments. The platform features responsive course content, progress visualization, and interactive quizzes. Built with ReactJS for the frontend and Laravel for the backend, it provides a seamless learning experience across devices with clean, intuitive interfaces for both students and instructors.",
    technologies: ["ReactJS", "Laravel", "MySQL", "Stripe", "Tailwind CSS"],
    icon: "🎓",
    images: [
      "/nextskill/image1.png",
      "/nextskill/image2.png",
      "/nextskill/image3.png",
    ],
    features: [
      "Course enrollment system",
      "Progress tracking",
      "Interactive quizzes",
      "Responsive design",
      "User-friendly dashboard"
    ],
    github: "https://github.com/OTH-DOT/NextSkill",
    demo: null
  }
];

const useCardAnimations = (index: number, scrollYProgress: MotionValue<number>): AnimationProps => {
  const totalRange = 0.7 // 15% to 85%
  const cardDuration = totalRange / projects.length
  const startProgress = 0.15 + (index * cardDuration)
  const centerProgress = startProgress + (cardDuration * 0.5)
  const endProgress = startProgress + cardDuration

  const y = useTransform(scrollYProgress, 
    [startProgress, centerProgress, endProgress],
    [400, 50, -300]
  )

  const opacity = useTransform(scrollYProgress,
    [startProgress, startProgress + 0.05, endProgress - 0.05, endProgress],
    [0, 1, 1, 0]
  )

  const scale = useTransform(scrollYProgress,
    [startProgress, centerProgress, endProgress],
    [0.6, 1, 0.2]
  )

  return { y, opacity, scale }
}

const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentProject, setCurrentProject] = useState<number>(0)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0)
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 640);
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Reset image index when project changes
  useEffect(() => {
    if (selectedProject) {
      setCurrentImageIndex(0)
    }
  }, [selectedProject])

  // Navigation functions for slideshow
  const nextImage = useCallback(() => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => 
        prev === selectedProject.images.length - 1 ? 0 : prev + 1
      )
    }
  }, [selectedProject])

  const prevImage = useCallback(() => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedProject.images.length - 1 : prev - 1
      )
    }
  }, [selectedProject])

  const goToImage = (index: number) => {
    setCurrentImageIndex(index)
  }

  // Auto-slide functionality
  useEffect(() => {
    if (selectedProject && selectedProject.images.length > 1) {
      const interval = setInterval(() => {
        nextImage()
      }, 5000) // Change image every 5 seconds
      
      return () => clearInterval(interval)
    }
  }, [selectedProject, nextImage])

  // Black hole movement and scale - responsive sizing
  const blackHoleY = useTransform(scrollYProgress, [0, 0.15, 1], [0, -350, -350])
  const blackHoleScale = useTransform(scrollYProgress, [0, 0.15, 1], [1.5, 0.8, 0.8])

  // Section opacity - fade out after all projects shown
  const sectionOpacity = useTransform(scrollYProgress, [0.85, 1], [1, 0])

  // Calculate current project - removed projects.length dependency
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((progress: number) => {
      if (progress <= 0.15) {
        setCurrentProject(0)
      } else if (progress >= 0.85) {
        setCurrentProject(projects.length - 1)
      } else {
        const adjustedProgress = (progress - 0.15) / 0.7 // 15% to 85% range
        const projectIndex = Math.min(
          Math.floor(adjustedProgress * projects.length),
          projects.length - 1
        )
        setCurrentProject(Math.max(0, projectIndex))
      }
    })
    return unsubscribe
  }, [scrollYProgress])

  // Call hooks for each project at the top level
  const projectAnimations: AnimationProps[] = [
    useCardAnimations(0, scrollYProgress),
    useCardAnimations(1, scrollYProgress),
    // Add more if you have more projects
  ]

  return (
    <>
      <motion.div 
        ref={containerRef} 
        id="projects"
        className="relative h-[600vh] w-full"
        style={{ opacity: sectionOpacity }}
      >
        {/* Initial title */}
        <motion.div 
          className="absolute top-8 sm:top-16 left-1/2 transform -translate-x-1/2 text-center z-30 px-4"
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.15], [1, 0])
          }}
        >
          {/* Header */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="text-center mb-4"
                >
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-purple-400 text-sm uppercase mb-4 tracking-[0.3em] font-medium"
                  >
                    What I’ve Built
                  </motion.p>
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-5xl md:text-6xl leading-tight font-bold bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent"
                  >
                    Projects
                  </motion.h2>
                </motion.div>
          {/* <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-4">Projects</h2> */}
          <p className="text-gray-400 text-sm sm:text-base lg:text-lg">Scroll to explore my work</p>
        </motion.div>
        

        {/* Sticky container - handles all internal animations */}
        <div className="sticky top-6 sm:top-12 h-screen flex items-center justify-center overflow-hidden px-2 sm:px-4">
          
          {/* Responsive Black Hole */}
          <motion.div
            style={{
              y: blackHoleY,
              scale: blackHoleScale
            }}
            className="absolute z-10"
          >
            {/* Outer glow - responsive sizing */}
            <div className="w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 rounded-full bg-orange-500/30 blur-3xl animate-pulse absolute -inset-6 sm:-inset-8 lg:-inset-12"></div>
            
            {/* Spinning accretion disks - responsive sizing */}
            <div className="w-40 h-40 sm:w-60 sm:h-60 lg:w-80 lg:h-80 rounded-full bg-gradient-conic from-orange-500/50 via-red-500/50 to-yellow-500/50 animate-spin absolute"></div>
            <div className="w-36 h-36 sm:w-54 sm:h-54 lg:w-72 lg:h-72 rounded-full bg-gradient-conic from-orange-600/70 via-red-600/70 to-yellow-600/70 animate-spin absolute inset-2 sm:inset-3 lg:inset-4" style={{animationDirection: 'reverse', animationDuration: '6s'}}></div>
            <div className="w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 rounded-full bg-gradient-conic from-orange-700/60 via-red-700/60 to-yellow-700/60 animate-spin absolute inset-4 sm:inset-6 lg:inset-8" style={{animationDuration: '12s'}}></div>
            
            {/* Event horizon - responsive sizing */}
            <div className="w-40 h-40 sm:w-60 sm:h-60 lg:w-80 lg:h-80 rounded-full bg-black shadow-2xl shadow-orange-500/60 relative border border-orange-500/20">
              <div className="absolute inset-2 sm:inset-3 lg:inset-4 rounded-full bg-black shadow-inner shadow-orange-500/40"></div>
              <div className="absolute inset-6 sm:inset-8 lg:inset-12 rounded-full bg-black"></div>
              <div className="absolute inset-8 sm:inset-12 lg:inset-16 rounded-full bg-black shadow-inner"></div>
            </div>
          </motion.div>

          {/* Responsive Project Cards - Much Bigger */}
          {projects.map((project, index) => {
            const { y, opacity, scale } =  projectAnimations[index]
            
            return (
              <motion.div
                key={index}
                style={{ y, opacity, scale }}
                className="absolute z-5 cursor-pointer w-full max-w-[95vw] sm:max-w-[90vw] md:max-w-[85vw] lg:max-w-[900px] xl:max-w-[1000px]"
                onClick={() => setSelectedProject(project)}
              >
                <div className="w-full h-[320px] sm:h-[400px] lg:h-[480px] bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-md border border-orange-500/40 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl hover:border-orange-400/60 transition-all duration-300">
                  <div className="flex flex-col-reverse md:flex-row h-full">
                    {/* Content Section - Responsive */}
                    <div className="flex-1 p-4 sm:p-6 lg:p-8 flex flex-col mb-12 justify-between min-h-0">
                      <div className="flex-1">
                        <div className="flex items-center mb-3 sm:mb-4">
                          <span className="text-2xl sm:text-3xl lg:text-4xl mr-2 sm:mr-3">{project.icon}</span>
                          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white  whitespace-normal break-words">{project.title}</h3>
                        </div>
                        <p className="text-gray-300 text-xs sm:text-sm lg:text-base mb-3 sm:mb-4 leading-relaxed line-clamp-2 sm:line-clamp-3 lg:line-clamp-4">{project.description}</p>
                        <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                          {project.technologies.slice(0, isMobile ? 3 : 4).map((tech, i) => (
                            <span key={i} className="px-2 sm:px-3 py-1 bg-orange-600/40 text-orange-200 text-xs sm:text-sm rounded-full border border-orange-500/30">
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > (isMobile ? 3 : 4) && (
                            <span className="px-2 sm:px-3 py-1 bg-gray-600/40 text-gray-300 text-xs sm:text-sm rounded-full border border-gray-500/30">
                              +{project.technologies.length - (isMobile ? 3 : 4)} more
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-orange-400 flex items-center gap-2 text-xs sm:text-sm lg:text-base font-medium hover:text-orange-300 transition-colors">
                        <span>Click to view details</span> <ArrowRightIcon />
                      </div>
                    </div>
                    
                    {/* Image Section - Show first image */}
                    <div className="w-full flex-1 md:w-80 lg:w-96 h-48 md:h-full flex-shrink-0 relative overflow-hidden">
                      <Image 
                        src={project.images[0]} 
                        alt={project.title}
                        className="w-full h-full object-cover"
                        width={800}
                        height={600}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-transparent to-gray-900/20"></div>
                      {/* Image count indicator */}
                      <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                        {project.images.length} photos
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}

          {/* Enhanced floating particles - responsive */}
          {[...Array(isMobile ? 8 : 12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-orange-400 rounded-full pointer-events-none z-0"
              style={{
                left: `${35 + Math.random() * 30}%`,
                top: `${35 + Math.random() * 30}%`,
              }}
              animate={{
                opacity: [0, 1, 0.5, 1, 0],
                scale: [0, 1.5, 1, 2, 0],
                x: [0, Math.random() * 50 - 25],
                y: [0, Math.random() * 50 - 25],
              }}
              transition={{
                duration: Math.random() * 5 + 4,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>

        {/* Progress indicator - responsive */}
        <motion.div 
          className="absolute bottom-12 sm:bottom-16 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3 z-30 px-4"
          style={{
            opacity: useTransform(scrollYProgress, [0.15, 0.2, 0.8, 0.85], [0, 1, 1, 0])
          }}
        >
          {projects.map((_, index) => (
            <motion.div
              key={index}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full border-2 transition-all duration-500 ${
                index === currentProject
                  ? 'bg-orange-500 border-orange-400 shadow-lg shadow-orange-500/60' 
                  : 'bg-transparent border-gray-500'
              }`}
              animate={{
                scale: index === currentProject ? 1.4 : 1,
                borderColor: index === currentProject ? '#f97316' : '#6b7280'
              }}
              transition={{ duration: 0.4 }}
            />
          ))}
        </motion.div>

      </motion.div>

      {/* Project Detail Modal with Slideshow - Responsive */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4"
            onClick={() => setSelectedProject(null)}
          >
            {/* Blur Background */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
            
            {/* Modal Content - Responsive */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl sm:rounded-2xl border border-orange-500/40 shadow-2xl max-w-full sm:max-w-5xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 w-8 h-8 bg-red-600/20 hover:bg-red-600/40 text-red-400 rounded-full flex items-center justify-center transition-colors z-20 text-sm sm:text-base"
              >
                ✕
              </button>

              {/* Image Slideshow Section - Responsive */}
              <div className="h-64 sm:h-80 lg:h-96 relative overflow-hidden rounded-t-xl sm:rounded-t-2xl">
                {/* Current Image */}
                <motion.img 
                  key={currentImageIndex}
                  src={selectedProject.images[currentImageIndex]} 
                  alt={`${selectedProject.title} - Image ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                
                {/* Project Title on Image */}
                <div className="absolute bottom-3 sm:bottom-6 left-3 sm:left-6 flex items-center">
                  <span className="text-2xl sm:text-3xl lg:text-4xl mr-2 sm:mr-4">{selectedProject.icon}</span>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">{selectedProject.title}</h2>
                </div>

                {/* Navigation Arrows */}
                {selectedProject.images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        prevImage()
                      }}
                      className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
                    >
                      <ChevronLeftIcon />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        nextImage()
                      }}
                      className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
                    >
                      <ChevronRightIcon />
                    </button>
                  </>
                )}

                {/* Image Counter */}
                <div className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-black/60 text-white text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full">
                  {currentImageIndex + 1} / {selectedProject.images.length}
                </div>

                {/* Thumbnail Navigation */}
                {selectedProject.images.length > 1 && (
                  <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1 sm:space-x-2">
                    {selectedProject.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation()
                          goToImage(index)
                        }}
                        className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                          index === currentImageIndex
                            ? 'bg-orange-500 scale-125'
                            : 'bg-white/50 hover:bg-white/80'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Content - Responsive */}
              <div className="p-4 sm:p-6 lg:p-8">
                <p className="text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed mb-4 sm:mb-6">{selectedProject.longDescription}</p>
                
                {/* Features */}
                <div className="mb-4 sm:mb-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">Key Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-1 sm:gap-2">
                    {selectedProject.features.map((feature, i) => (
                      <div key={i} className="flex items-center text-gray-300 text-sm sm:text-base">
                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-500 rounded-full mr-2 sm:mr-3 flex-shrink-0"></span>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technologies */}
                <div className="mb-4 sm:mb-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">Technologies Used</h3>
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {selectedProject.technologies.map((tech, i) => (
                      <span key={i} className="px-2 sm:px-3 lg:px-4 py-1 sm:py-2 bg-orange-600/40 text-orange-200 text-xs sm:text-sm rounded-full border border-orange-500/30">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Image Gallery Thumbnails */}
                <div className="mb-4 sm:mb-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">Project Gallery</h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                    {selectedProject.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation()
                          goToImage(index)
                        }}
                        className={`aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                          index === currentImageIndex
                            ? 'border-orange-500 scale-105'
                            : 'border-gray-600 hover:border-gray-400'
                        }`}
                      >
                        <Image
                          src={image}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                          width={100} height={100}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action Buttons - Responsive */}
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                  <a 
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 sm:px-6 py-2 sm:py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors flex items-center justify-center text-sm sm:text-base"
                  >
                    <span className="mr-2">📁</span>
                    View Code
                  </a>
                  {selectedProject.demo && (
                    <a 
                      href={selectedProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 sm:px-6 py-2 sm:py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors flex items-center justify-center text-sm sm:text-base"
                    >
                      <span className="mr-2">🚀</span>
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Projects