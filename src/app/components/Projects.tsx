import React, { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'

const Projects = () => {
  const containerRef = useRef(null)
  const [currentProject, setCurrentProject] = useState(0)
  const [selectedProject, setSelectedProject] = useState(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Sample projects data with more details
  const projects = [
    {
      title: "AI Chat Platform",
      description: "A real-time chat application powered by artificial intelligence with natural language processing capabilities.",
      longDescription: "This comprehensive AI chat platform revolutionizes communication by integrating advanced natural language processing with real-time messaging. Built with modern React architecture and powered by OpenAI's GPT models, it provides intelligent conversation assistance, automated responses, and contextual understanding. The platform features multi-user support, conversation history, file sharing, and advanced AI analytics.",
      technologies: ["React", "Node.js", "OpenAI", "Socket.io", "MongoDB", "Redis"],
      icon: "🤖",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop",
      features: ["Real-time messaging", "AI-powered responses", "Multi-user support", "File sharing", "Conversation history"],
      github: "https://github.com/example/ai-chat",
      demo: "https://ai-chat-demo.com"
    },
    {
      title: "E-commerce Dashboard", 
      description: "Comprehensive analytics dashboard for e-commerce businesses with real-time data visualization.",
      longDescription: "A powerful business intelligence dashboard designed specifically for e-commerce operations. Features include real-time sales tracking, inventory management, customer analytics, and predictive forecasting. Built with Next.js for optimal performance and TypeScript for reliability, it integrates with multiple payment processors and provides actionable insights through interactive charts and reports.",
      technologies: ["Next.js", "TypeScript", "Chart.js", "PostgreSQL", "Stripe", "AWS"],
      icon: "📊",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      features: ["Real-time analytics", "Inventory tracking", "Sales forecasting", "Customer insights", "Payment integration"],
      github: "https://github.com/example/ecommerce-dashboard",
      demo: "https://dashboard-demo.com"
    },
    {
      title: "3D Portfolio Site",
      description: "Interactive 3D portfolio website showcasing creative projects with immersive user experience.",
      longDescription: "An innovative 3D portfolio website that pushes the boundaries of web design. Using Three.js and WebGL, it creates an immersive experience with interactive 3D models, particle systems, and smooth animations. The site features dynamic lighting, responsive 3D layouts, and optimized performance across devices. Custom shaders and post-processing effects create a unique visual experience.",
      technologies: ["Three.js", "WebGL", "GSAP", "Blender", "React", "Webpack"],
      icon: "🎨",
      image: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=400&h=300&fit=crop",
      features: ["Interactive 3D models", "Custom shaders", "Particle systems", "Responsive design", "Performance optimized"],
      github: "https://github.com/example/3d-portfolio",
      demo: "https://3d-portfolio-demo.com"
    },
    {
      title: "Mobile Fitness App",
      description: "Cross-platform fitness tracking application with workout plans and progress monitoring.",
      longDescription: "A comprehensive fitness application built with React Native that helps users achieve their health goals. Features include personalized workout plans, nutrition tracking, progress analytics, and social sharing. Integrates with health APIs and wearable devices for accurate data collection. The app includes offline support, push notifications, and gamification elements to keep users motivated.",
      technologies: ["React Native", "Firebase", "Redux", "Health Kit", "Expo", "AsyncStorage"],
      icon: "💪",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      features: ["Workout tracking", "Nutrition monitoring", "Progress analytics", "Social features", "Offline support"],
      github: "https://github.com/example/fitness-app",
      demo: "https://fitness-app-demo.com"
    },
    {
      title: "Blockchain Wallet",
      description: "Secure cryptocurrency wallet with multi-chain support and DeFi integration capabilities.",
      longDescription: "A next-generation cryptocurrency wallet that supports multiple blockchain networks including Ethereum, Bitcoin, and Polygon. Features advanced security measures, DeFi protocol integration, NFT management, and portfolio tracking. Built with Web3.js and Solidity smart contracts, it provides users with full control over their digital assets while maintaining the highest security standards.",
      technologies: ["Web3.js", "Solidity", "Ethereum", "MetaMask", "React", "Hardhat"],
      icon: "₿",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop",
      features: ["Multi-chain support", "DeFi integration", "NFT management", "Portfolio tracking", "Advanced security"],
      github: "https://github.com/example/blockchain-wallet",
      demo: "https://crypto-wallet-demo.com"
    }
  ]

  // Black hole movement and scale - bigger black hole
  const blackHoleY = useTransform(scrollYProgress, [0, 0.15, 1], [0, -350, -350])
  const blackHoleScale = useTransform(scrollYProgress, [0, 0.15, 1], [1.5, 0.8, 0.8])

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
    <>
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
        <div className="sticky top-12 h-screen flex items-center justify-center overflow-hidden">
          
          {/* Bigger Black Hole */}
          <motion.div
            style={{
              y: blackHoleY,
              scale: blackHoleScale
            }}
            className="absolute z-10"
          >
            {/* Outer glow - bigger */}
            <div className="w-96 h-96 rounded-full bg-orange-500/30 blur-3xl animate-pulse absolute -inset-12"></div>
            
            {/* Spinning accretion disks - bigger */}
            <div className="w-80 h-80 rounded-full bg-gradient-conic from-orange-500/50 via-red-500/50 to-yellow-500/50 animate-spin absolute"></div>
            <div className="w-72 h-72 rounded-full bg-gradient-conic from-orange-600/70 via-red-600/70 to-yellow-600/70 animate-spin absolute inset-4" style={{animationDirection: 'reverse', animationDuration: '6s'}}></div>
            <div className="w-64 h-64 rounded-full bg-gradient-conic from-orange-700/60 via-red-700/60 to-yellow-700/60 animate-spin absolute inset-8" style={{animationDuration: '12s'}}></div>
            
            {/* Event horizon - bigger */}
            <div className="w-80 h-80 rounded-full bg-black shadow-2xl shadow-orange-500/60 relative border border-orange-500/20">
              <div className="absolute inset-4 rounded-full bg-black shadow-inner shadow-orange-500/40"></div>
              <div className="absolute inset-12 rounded-full bg-black"></div>
              <div className="absolute inset-16 rounded-full bg-black shadow-inner"></div>
            </div>
          </motion.div>

          {/* Full Width Project Cards */}
          {projects.map((project, index) => {
            const { y, opacity, scale } = getCardAnimations(index)
            
            return (
              <motion.div
                key={index}
                style={{ y, opacity, scale }}
                className="absolute z-5 cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="w-[800px] h-80 bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-md border border-orange-500/40 rounded-2xl overflow-hidden shadow-2xl hover:border-orange-400/60 transition-all duration-300">
                  <div className="flex h-full">
                    {/* Left side - Content */}
                    <div className="flex-1 p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center mb-4">
                          <span className="text-3xl mr-3">{project.icon}</span>
                          <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                        </div>
                        <p className="text-gray-300 text-sm mb-4 leading-relaxed line-clamp-3">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.slice(0, 4).map((tech, i) => (
                            <span key={i} className="px-3 py-1 bg-orange-600/40 text-orange-200 text-xs rounded-full border border-orange-500/30">
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 4 && (
                            <span className="px-3 py-1 bg-gray-600/40 text-gray-300 text-xs rounded-full border border-gray-500/30">
                              +{project.technologies.length - 4} more
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-orange-400 text-sm font-medium hover:text-orange-300 transition-colors">
                        Click to view details →
                      </div>
                    </div>
                    
                    {/* Right side - Image */}
                    <div className="w-80 h-full relative overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-l from-transparent to-gray-900/20"></div>
                    </div>
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

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            {/* Blur Background */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
            
            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-orange-500/40 shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 w-8 h-8 bg-red-600/20 hover:bg-red-600/40 text-red-400 rounded-full flex items-center justify-center transition-colors z-10"
              >
                ✕
              </button>

              {/* Header Image */}
              <div className="h-64 relative overflow-hidden rounded-t-2xl">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                <div className="absolute bottom-6 left-6 flex items-center">
                  <span className="text-4xl mr-4">{selectedProject.icon}</span>
                  <h2 className="text-3xl font-bold text-white">{selectedProject.title}</h2>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <p className="text-gray-300 text-lg leading-relaxed mb-6">{selectedProject.longDescription}</p>
                
                {/* Features */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-white mb-3">Key Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {selectedProject.features.map((feature, i) => (
                      <div key={i} className="flex items-center text-gray-300">
                        <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technologies */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-white mb-3">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech, i) => (
                      <span key={i} className="px-4 py-2 bg-orange-600/40 text-orange-200 text-sm rounded-full border border-orange-500/30">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4">
                  <a 
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors flex items-center"
                  >
                    <span className="mr-2">📁</span>
                    View Code
                  </a>
                  <a 
                    href={selectedProject.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors flex items-center"
                  >
                    <span className="mr-2">🚀</span>
                    Live Demo
                  </a>
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