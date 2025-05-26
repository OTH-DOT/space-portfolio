import React, { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const Projects = () => {
  const containerRef = useRef(null)
  const [currentProject, setCurrentProject] = useState(0)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Sample projects data
  const projects = [
    {
      title: "AI Chat Platform",
      description: "A real-time chat application powered by artificial intelligence with natural language processing capabilities.",
      technologies: ["React", "Node.js", "OpenAI", "Socket.io"],
      icon: "🤖"
    },
    {
      title: "E-commerce Dashboard", 
      description: "Comprehensive analytics dashboard for e-commerce businesses with real-time data visualization.",
      technologies: ["Next.js", "TypeScript", "Chart.js", "PostgreSQL"],
      icon: "📊"
    },
    {
      title: "3D Portfolio Site",
      description: "Interactive 3D portfolio website showcasing creative projects with immersive user experience.",
      technologies: ["Three.js", "WebGL", "GSAP", "Blender"],
      icon: "🎨"
    },
    {
      title: "Mobile Fitness App",
      description: "Cross-platform fitness tracking application with workout plans and progress monitoring.",
      technologies: ["React Native", "Firebase", "Redux", "Health Kit"],
      icon: "💪"
    },
    {
      title: "Blockchain Wallet",
      description: "Secure cryptocurrency wallet with multi-chain support and DeFi integration capabilities.",
      technologies: ["Web3.js", "Solidity", "Ethereum", "MetaMask"],
      icon: "₿"
    }
  ]

  // Black hole movement and scale
  const blackHoleY = useTransform(scrollYProgress, [0, 0.15, 1], [0, -250, -250])
  const blackHoleScale = useTransform(scrollYProgress, [0, 0.15, 1], [1, 0.5, 0.5])

  // Section opacity - fade out after all projects shown
  const sectionOpacity = useTransform(scrollYProgress, [0.85, 1], [1, 0])

  // Calculate current project
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((progress) => {
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
  }, [scrollYProgress, projects.length])

  // Project card animations
  const getCardAnimations = (index) => {
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

  return (
    <motion.div 
      ref={containerRef} 
      id="projects"
      className="relative h-[600vh] w-full"
      style={{ opacity: sectionOpacity }}
    >
      {/* Initial title */}
      <motion.div 
        className="absolute top-16 left-1/2 transform -translate-x-1/2 text-center z-30"
        style={{
          opacity: useTransform(scrollYProgress, [0, 0.15], [1, 0])
        }}
      >
        <h2 className="text-5xl font-bold text-white mb-4">Projects</h2>
        <p className="text-gray-400 text-lg">Scroll to explore my work</p>
      </motion.div>

      {/* Sticky container - handles all internal animations */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        
        {/* Black Hole */}
        <motion.div
          style={{
            y: blackHoleY,
            scale: blackHoleScale
          }}
          className="absolute z-10"
        >
          {/* Outer glow */}
          <div className="w-80 h-80 rounded-full bg-orange-500/30 blur-3xl animate-pulse absolute -inset-8"></div>
          
          {/* Spinning accretion disks */}
          <div className="w-64 h-64 rounded-full bg-gradient-conic from-orange-500/50 via-red-500/50 to-yellow-500/50 animate-spin absolute"></div>
          <div className="w-56 h-56 rounded-full bg-gradient-conic from-orange-600/70 via-red-600/70 to-yellow-600/70 animate-spin absolute inset-4" style={{animationDirection: 'reverse', animationDuration: '6s'}}></div>
          <div className="w-48 h-48 rounded-full bg-gradient-conic from-orange-700/60 via-red-700/60 to-yellow-700/60 animate-spin absolute inset-8" style={{animationDuration: '12s'}}></div>
          
          {/* Event horizon */}
          <div className="w-64 h-64 rounded-full bg-black shadow-2xl shadow-orange-500/60 relative border border-orange-500/20">
            <div className="absolute inset-3 rounded-full bg-black shadow-inner shadow-orange-500/40"></div>
            <div className="absolute inset-8 rounded-full bg-black"></div>
            <div className="absolute inset-12 rounded-full bg-black shadow-inner"></div>
          </div>
        </motion.div>

        {/* Project Cards */}
        {projects.map((project, index) => {
          const { y, opacity, scale } = getCardAnimations(index)
          
          return (
            <motion.div
              key={index}
              style={{ y, opacity, scale }}
              className="absolute z-5 pointer-events-none"
            >
              <div className="w-80 h-96 bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-md border border-orange-500/40 rounded-2xl p-6 shadow-2xl">
                <div className="w-full h-32 bg-gradient-to-r from-orange-600 to-red-600 rounded-xl mb-4 flex items-center justify-center shadow-lg">
                  <span className="text-4xl">{project.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
                <p className="text-gray-300 text-sm mb-4 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="px-3 py-1 bg-orange-600/40 text-orange-200 text-xs rounded-full border border-orange-500/30">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )
        })}

        {/* Enhanced floating particles */}
        {[...Array(12)].map((_, i) => (
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

      {/* Progress indicator */}
      <motion.div 
        className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex space-x-3 z-30"
        style={{
          opacity: useTransform(scrollYProgress, [0.15, 0.2, 0.8, 0.85], [0, 1, 1, 0])
        }}
      >
        {projects.map((_, index) => (
          <motion.div
            key={index}
            className={`w-3 h-3 rounded-full border-2 transition-all duration-500 ${
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

      {/* Exit indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center z-30"
        style={{
          opacity: useTransform(scrollYProgress, [0.85, 0.9], [0, 1])
        }}
      >
        <p className="text-gray-400 text-sm">Continue scrolling to next section</p>
        <div className="w-6 h-6 border-2 border-gray-400 rounded-full mx-auto mt-2 flex items-center justify-center">
          <motion.div 
            className="w-2 h-2 bg-gray-400 rounded-full"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Projects