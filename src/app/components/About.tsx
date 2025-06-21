import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Copy, Linkedin, Mail, Phone } from 'lucide-react';
import EarthCanvas from './canvas/Earth';
import Astronaut from './animations/Astronaut';
import StarsCanvas from './canvas/Stars';

const About = ({ innerRef }) => {
  const contacts = [
    { id: 1, type: 'email', value: 'othmanemakkour8@gmail.com', label: 'Email' },
    { id: 2, type: 'phone', value: '+212709707709', label: 'Phone' },
    { id: 3, type: 'linkedin', value: 'https://www.linkedin.com/in/othmane-makkour-79a81a245/', label: 'LinkedIn' }
  ];

  const [selectedId, setSelectedId] = useState(1);
  const [copied, setCopied] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const selectedContact = contacts.find(c => c.id === selectedId) || contacts[0];

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedContact.value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const habits = [
    "basketball",
    "calisthenics", 
    "games"
  ];

  // Simplified draggable for desktop, static for mobile
  const EnhancedDraggableHabit = ({ habit, index }) => {
    const [position, setPosition] = useState({
      x: (Math.random() - 0.5) * 120,
      y: (Math.random() - 0.5) * 80
    });
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const habitRef = useRef(null);

    useEffect(() => {
      if (isMobile) return; // Disable dragging on mobile
      
      const element = habitRef.current;
      if (!element) return;

      let animationFrame;
      
      const handleMouseMove = (e) => {
        if (!isDragging) return;
        
        animationFrame = requestAnimationFrame(() => {
          const container = element.closest('.drop-zone');
          if (!container) return;
          
          const containerRect = container.getBoundingClientRect();
          const containerCenterX = containerRect.width / 2;
          const containerCenterY = containerRect.height / 2;
          
          const newX = e.clientX - containerRect.left - containerCenterX - dragOffset.x;
          const newY = e.clientY - containerRect.top - containerCenterY - dragOffset.y;
          
          // Tighter constraints for better UX
          const maxX = Math.min(containerRect.width / 2 - 70, 100);
          const maxY = Math.min(containerRect.height / 2 - 25, 60);
          const minX = Math.max(-containerRect.width / 2 + 70, -100);
          const minY = Math.max(-containerRect.height / 2 + 25, -60);
          
          setPosition({
            x: Math.max(minX, Math.min(maxX, newX)),
            y: Math.max(minY, Math.min(maxY, newY))
          });
        });
      };

      const handleMouseUp = () => {
        setIsDragging(false);
        if (animationFrame) {
          cancelAnimationFrame(animationFrame);
        }
      };

      if (isDragging) {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
      }

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        if (animationFrame) {
          cancelAnimationFrame(animationFrame);
        }
      };
    }, [isDragging, dragOffset, isMobile]);

    const handleMouseDown = (e) => {
      if (isMobile) return; // Disable dragging on mobile
      
      const rect = habitRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left - rect.width / 2,
        y: e.clientY - rect.top - rect.height / 2
      });
      setIsDragging(true);
    };

    // Mobile: render as static flex items
    if (isMobile) {
      return (
        <div className="bg-gradient-to-r from-black/80 to-gray-900/80 text-white px-3 py-2 rounded-full backdrop-blur-md border border-purple-500/20 shadow-lg">
          <span className="text-sm font-medium">{habit}</span>
        </div>
      );
    }

    // Desktop: render as draggable
    return (
      <div
        ref={habitRef}
        data-habit-index={index}
        className={`absolute bg-gradient-to-r from-black/80 to-gray-900/80 text-white px-4 py-2 rounded-full cursor-grab backdrop-blur-md border border-purple-500/20 shadow-lg transition-all duration-150 select-none ${
          isDragging 
            ? 'scale-110 shadow-purple-500/60 z-50 cursor-grabbing' 
            : 'hover:scale-105 hover:shadow-purple-500/40'
        }`}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          left: '50%',
          top: '50%',
          userSelect: 'none',
          WebkitUserSelect: 'none'
        }}
        onMouseDown={handleMouseDown}
      >
        <span className="text-sm font-medium pointer-events-none">{habit}</span>
      </div>
    );
  };

  return (
    <section 
      id="about" 
      ref={innerRef} 
      className="min-h-screen flex items-center justify-center p-4 relative z-10"
    >
      <div className="w-full container mx-auto">
        {/* Mobile Layout */}
        <div className="block md:hidden space-y-6">
          {/* About Text */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-xl p-6 border border-gray-800 shadow-lg"
          >
            <div className="mb-4 flex items-center gap-2">
              <div className="h-1 w-8 bg-blue-600 rounded-full"></div>
              <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                ABOUT ME
              </h2>
            </div>
            
            <p className="text-gray-300 leading-relaxed text-sm">
              I'm a <span className="font-medium text-white">Full Stack Developer</span> specializing in modern web development. 
              My toolkit includes <span className="text-blue-400 font-medium">React.js, Next.js, TailwindCSS</span> for crafting 
              beautiful interfaces, and <span className="text-purple-400 font-medium">Node.js, Laravel, MySQL</span> for building 
              robust backends.
            </p>
          </motion.div>

          {/* Astronaut */}
          <div className="h-64 bg-transparent rounded-lg p-6 flex items-center justify-center">
            <Astronaut />
          </div>

          {/* Contact */}
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-lg p-6">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-3 justify-center">
                {contacts.map((contact) => (
                  <button
                    key={contact.id}
                    onClick={() => setSelectedId(contact.id)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-medium transition-all ${
                      selectedId === contact.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    {contact.id}
                  </button>
                ))}
              </div>

              <div className="text-center">
                <p className="text-white text-lg mb-2">{selectedContact.label}</p>
              </div>

              <button
                onClick={handleCopy}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all"
              >
                {copied ? (
                  <span className="text-blue-400">Copied!</span>
                ) : (
                  <>
                    <Copy size={16} />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Habits - Mobile */}
          <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-black rounded-lg p-6">
            <div className="mb-4">
              <h3 className="text-xl font-bold text-white mb-1">My Habits</h3>
              <p className="text-purple-300 text-sm">Things I enjoy doing</p>
            </div>
            
            <div className="flex flex-wrap gap-3 justify-center">
              {habits.map((habit, index) => (
                <EnhancedDraggableHabit key={habit} habit={habit} index={index} />
              ))}
            </div>
          </div>

          {/* Time Zone */}
          <div className="bg-gradient-to-bl from-gray-900 via-black to-gray-900 rounded-lg p-6 relative overflow-hidden">
            <div className="mb-4">
              <h3 className="text-xl font-bold text-white mb-1">Time Zone</h3>
              <p className="text-purple-300 text-sm">Available across all timezones</p>
            </div>
            <div className="h-40 relative">
              <EarthCanvas />
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex flex-col lg:flex-row gap-6 min-h-[80vh]">
          {/* Left side */}
          <div className="flex flex-col w-full lg:w-1/3 gap-6">
            <div className="flex-1 bg-transparent rounded-lg p-6 flex items-center justify-center min-h-[300px]">
              <Astronaut />
            </div>
            <div className="h-48 bg-gradient-to-br from-gray-900 to-black rounded-lg p-6">
              <div className="h-full flex flex-col items-center justify-center gap-4">
                <div className="flex gap-4">
                  {contacts.map((contact) => (
                    <button
                      key={contact.id}
                      onClick={() => setSelectedId(contact.id)}
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-medium transition-all ${
                        selectedId === contact.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      {contact.id}
                    </button>
                  ))}
                </div>

                <div className="text-center">
                  <p className="text-white font-medium">{selectedContact.label}</p>
                </div>

                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 py-2 px-4 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all"
                >
                  {copied ? (
                    <span className="text-blue-400 text-sm">Copied!</span>
                  ) : (
                    <>
                      <Copy size={16} />
                      <span className="text-sm">Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
          
          {/* Right side */}
          <div className="flex flex-col w-full lg:w-2/3 gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex-1 bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-xl p-8 border border-gray-800 shadow-lg min-h-[250px] flex flex-col justify-center"
            >
              <div className="mb-4 flex items-center gap-2">
                <div className="h-1 w-8 bg-blue-600 rounded-full"></div>
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                  ABOUT ME
                </h2>
              </div>
              
              <p className="text-gray-300 leading-relaxed text-base">
                I'm a <span className="font-medium text-white">Full Stack Developer</span> specializing in modern web development. 
                My toolkit includes <span className="text-blue-400 font-medium">React.js, Next.js, TailwindCSS</span> for crafting 
                beautiful interfaces, and <span className="text-purple-400 font-medium">Node.js, Laravel, MySQL</span> for building 
                robust backends. I create <span className="italic text-gray-200">high-performance applications</span> with focus on user experience.
              </p>
            </motion.div>

            <div className="flex flex-col sm:flex-row gap-6 flex-1">
              <div className="flex-1 bg-gradient-to-br from-gray-900 via-purple-900 to-black rounded-lg p-6 relative overflow-hidden min-h-[200px]">
                {/* Background stars */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {[...Array(15)].map((_, i) => (
                    <motion.div
                      key={`star-${i}`}
                      className="absolute rounded-full bg-white"
                      style={{
                        width: Math.random() * 2 + 1 + 'px',
                        height: Math.random() * 2 + 1 + 'px',
                        left: Math.random() * 100 + '%',
                        top: Math.random() * 100 + '%',
                      }}
                      animate={{
                        y: [0, -100],
                        opacity: [0, 0.6, 0],
                      }}
                      transition={{
                        duration: Math.random() * 10 + 8,
                        repeat: Infinity,
                        ease: "linear",
                        delay: Math.random() * 3,
                      }}
                    />
                  ))}
                </div>
                
                <div className="relative z-10 h-full flex flex-col">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-white mb-1">My Habits</h3>
                    <p className="text-purple-300 text-sm">Drag them around!</p>
                  </div>
                  
                  <div className="flex-1 relative drop-zone">
                    {habits.map((habit, index) => (
                      <EnhancedDraggableHabit key={habit} habit={habit} index={index} />
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="h-48 relative sm:h-full flex-1 bg-gradient-to-bl from-gray-900 via-black to-gray-900 rounded-lg p-6">
              <div className="z-10 relavite">
                <h3 className="text-2xl font-bold text-white mb-1">Time Zone</h3>
                <p className="text-purple-300 text-sm">Available across all timezones</p>
              </div>
              <div className='absolute right-0 bottom-0'>
                <EarthCanvas />
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;