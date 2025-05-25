import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Copy, Linkedin, Mail, Phone } from 'lucide-react';
import EarthCanvas from './canvas/Earth';

// React DnD implementation using HTML5 drag API for smooth dragging
const About = ({ innerRef }) => {
  const contacts = [
    { id: 1, type: 'email', value: 'your@email.com', label: 'Email' },
    { id: 2, type: 'phone', value: '+1234567890', label: 'Phone' },
    { id: 3, type: 'linkedin', value: 'linkedin.com/in/yourprofile', label: 'LinkedIn' }
  ];

  const [selectedId, setSelectedId] = useState(1);
  const [copied, setCopied] = useState(false);

  const selectedContact = contacts.find(c => c.id === selectedId) || contacts[0];

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

  const DraggableHabit = ({ habit, index }) => {
    const [position, setPosition] = useState({
      x: (Math.random() - 0.5) * 200,
      y: (Math.random() - 0.5) * 120
    });
    const [isDragging, setIsDragging] = useState(false);
    const [isFloating, setIsFloating] = useState(true);
    const dragRef = useRef(null);
    const containerRef = useRef(null);

    // Floating animation when not dragging
    useEffect(() => {
      if (!isFloating || isDragging) return;

      const floatInterval = setInterval(() => {
        setPosition(prev => ({
          x: prev.x + (Math.random() - 0.5) * 20,
          y: prev.y + (Math.random() - 0.5) * 15
        }));
      }, 3000 + Math.random() * 2000);

      return () => clearInterval(floatInterval);
    }, [isFloating, isDragging]);

    // HTML5 Drag API handlers
    const handleDragStart = (e) => {
      setIsDragging(true);
      setIsFloating(false);
      
      // Set drag image to be invisible for custom drag behavior
      const dragImage = new Image();
      dragImage.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
      e.dataTransfer.setDragImage(dragImage, 0, 0);
      
      // Store initial mouse position
      const rect = dragRef.current.getBoundingClientRect();
      const offsetX = e.clientX - rect.left - rect.width / 2;
      const offsetY = e.clientY - rect.top - rect.height / 2;
      
      e.dataTransfer.setData('text/plain', JSON.stringify({
        offsetX,
        offsetY,
        habitIndex: index
      }));
    };

    const handleDragEnd = () => {
      setIsDragging(false);
      setTimeout(() => setIsFloating(true), 1000);
    };

    return (
      <div
        ref={dragRef}
        draggable={true}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        className={`absolute bg-gradient-to-r from-black/80 to-gray-900/80 text-white px-4 py-2 rounded-full cursor-grab backdrop-blur-md border border-purple-500/20 shadow-lg transition-all duration-200 select-none ${
          isDragging 
            ? 'scale-110 shadow-purple-500/50 z-50 cursor-grabbing opacity-80' 
            : 'hover:scale-105 hover:shadow-purple-500/30'
        }`}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          left: '50%',
          top: '50%',
          userSelect: 'none',
          WebkitUserSelect: 'none'
        }}
      >
        <span className="text-sm font-medium pointer-events-none">{habit}</span>
      </div>
    );
  };

  // Drop zone component
  const DropZone = ({ children }) => {
    const dropRef = useRef(null);
    const [draggedHabit, setDraggedHabit] = useState(null);

    const handleDragOver = (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (e) => {
      e.preventDefault();
      
      try {
        const data = JSON.parse(e.dataTransfer.getData('text/plain'));
        const rect = dropRef.current.getBoundingClientRect();
        
        // Calculate new position relative to container center
        const containerCenterX = rect.width / 2;
        const containerCenterY = rect.height / 2;
        
        const newX = e.clientX - rect.left - containerCenterX - data.offsetX;
        const newY = e.clientY - rect.top - containerCenterY - data.offsetY;
        
        // Constrain to container bounds
        const maxX = rect.width / 2 - 60; // Account for habit width
        const maxY = rect.height / 2 - 20; // Account for habit height
        const minX = -rect.width / 2 + 60;
        const minY = -rect.height / 2 + 20;
        
        const constrainedX = Math.max(minX, Math.min(maxX, newX));
        const constrainedY = Math.max(minY, Math.min(maxY, newY));
        
        // Update position through custom event
        const habitElement = dropRef.current.querySelector(`[data-habit-index="${data.habitIndex}"]`);
        if (habitElement) {
          habitElement.style.transform = `translate(${constrainedX}px, ${constrainedY}px)`;
        }
        
      } catch (error) {
        console.log('Drop handling error:', error);
      }
      
      setDraggedHabit(null);
    };

    const handleDragEnter = (e) => {
      e.preventDefault();
    };

    const handleDragLeave = (e) => {
      if (!dropRef.current?.contains(e.relatedTarget)) {
        setDraggedHabit(null);
      }
    };

    return (
      <div
        ref={dropRef}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        className="relative w-full h-full overflow-hidden"
      >
        {children}
      </div>
    );
  };

  // Enhanced draggable with better positioning
  const EnhancedDraggableHabit = ({ habit, index }) => {
    const [position, setPosition] = useState({
      x: (Math.random() - 0.5) * 200,
      y: (Math.random() - 0.5) * 120
    });
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const habitRef = useRef(null);

    useEffect(() => {
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
          
          // Smooth constraints
          const maxX = containerRect.width / 2 - 80;
          const maxY = containerRect.height / 2 - 25;
          const minX = -containerRect.width / 2 + 80;
          const minY = -containerRect.height / 2 + 25;
          
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
    }, [isDragging, dragOffset]);

    const handleMouseDown = (e) => {
      const rect = habitRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left - rect.width / 2,
        y: e.clientY - rect.top - rect.height / 2
      });
      setIsDragging(true);
    };

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
    <section id="about" ref={innerRef} className="min-h-screen flex items-center justify-center p-4 md:p-8">
      <div className="w-full container mx-auto flex flex-col md:flex-row gap-4 h-auto md:h-[80vh]">
        {/* Left side */}
        <div className="flex flex-col w-full md:w-1/3 gap-4">
          <div className="h-64 md:h-[70%] bg-transparent rounded-lg p-6 flex items-center justify-center">
            Left Top
          </div>
          <div className="h-48 md:h-[30%] bg-gradient-to-br from-gray-900 to-black rounded-lg p-6 flex gap-4 items-center justify-center ">
            <div className='flex flex-col gap-4 items-center'>
            {/* Numbered circles */}
            <div className="flex gap-4">
              {contacts.map((contact) => (
                <button
                  key={contact.id}
                  onClick={() => setSelectedId(contact.id)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-medium transition-all ${
                    selectedId === contact.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {contact.id}
                </button>
              ))}
            </div>

            <div>
              <p className="text-white">{selectedContact.label}</p>
            </div>

            {/* Copy button */}
            <div className="flex-1 max-w-md">
              <button
                onClick={handleCopy}
                className="w-full flex items-center justify-between py-3 px-4 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all"
              >
                {/* <div className="text-left">
                  <p className="text-sm text-gray-400">{selectedContact.label}</p>
                  <p className="text-white">{selectedContact.value}</p>
                </div> */}
                <div className="text-gray-400">
                  {copied ? (
                    <span className="text-blue-400 text-sm">Copied!</span>
                  ) : (
                    <div className='flex items-center gap-1'>
                      <Copy size={16} />
                      Copy
                    </div>
                  )}
                </div>
              </button>
            </div>
            </div>
          </div>
        </div>
        
        {/* Right side */}
        <div className="flex flex-col w-full md:w-2/3 gap-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="h-48 md:h-1/2 bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-xl p-6 md:p-8 flex flex-col justify-center border border-gray-800 shadow-lg"
          >
            <div className="mb-2 flex items-center gap-2">
              <div className="h-1 w-8 bg-blue-600 rounded-full"></div>
              <h2 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                ABOUT ME
              </h2>
            </div>
            
            <p className="text-gray-300 leading-relaxed md:leading-loose text-sm md:text-base">
              I'm a <span className="font-medium text-white">Full Stack Developer</span> specializing in modern web development. 
              My toolkit includes <span className="text-blue-400 font-medium">React.js, Next.js, TailwindCSS</span> for crafting 
              beautiful interfaces, and <span className="text-purple-400 font-medium">Node.js, Laravel, MySQL</span> for building 
              robust backends. I create <span className="italic text-gray-200">high-performance applications</span> with focus on:
            </p>
          </motion.div>

          <div className="flex flex-col sm:flex-row h-auto md:h-1/2 gap-4">
            <div className="h-48 sm:h-full flex-1 bg-gradient-to-br from-gray-900 via-purple-900 to-black rounded-lg p-6 relative overflow-hidden">
              {/* Space background elements */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={`star-${i}`}
                    className="absolute rounded-full bg-white"
                    style={{
                      width: Math.random() * 3 + 1 + 'px',
                      height: Math.random() * 3 + 1 + 'px',
                      left: Math.random() * 100 + '%',
                      top: Math.random() * 100 + '%',
                    }}
                    animate={{
                      y: [0, -120],
                      opacity: [0, 0.6, 0],
                    }}
                    transition={{
                      duration: Math.random() * 15 + 10,
                      repeat: Infinity,
                      ease: "linear",
                      delay: Math.random() * 5,
                    }}
                  />
                ))}
              </div>
              
              {/* Content */}
              <div className="relative z-10 h-full flex flex-col">
                <div className="mb-4 pointer-events-none">
                  <h3 className="text-2xl font-bold text-white mb-1">My Habits</h3>
                  <p className="text-purple-300 text-sm">Drag them smoothly around!</p>
                </div>
                
                <div className="flex-1 relative drop-zone">
                  {habits.map((habit, index) => (
                    <EnhancedDraggableHabit key={habit} habit={habit} index={index} />
                  ))}
                </div>
              </div>
            </div>
            
            <div className="h-48 relative sm:h-full flex-1 bg-gradient-to-bl from-gray-900 via-black to-gray-900 rounded-lg p-6">
              <div>
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
    </section>
  );
};

export default About;