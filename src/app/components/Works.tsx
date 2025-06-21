'use client';

import { motion } from 'framer-motion';

interface Experience {
  title: string;
  company: string;
  icon: string;
  iconBg: string;
  date: string;
  points: string[];
}

const experiences: Experience[] = [
  {
    title: 'Senior Frontend Developer',
    company: 'TechNova Solutions',
    icon: '🚀',
    iconBg: '#3b82f6',
    date: 'Jan 2023 - Present',
    points: [
      'Led development of responsive web applications using React, Next.js, and TypeScript',
      'Collaborated with UX/UI designers to implement pixel-perfect, accessible interfaces',
      'Optimized application performance, reducing load times by 40% through code splitting',
      'Mentored junior developers and conducted code reviews to maintain high code quality',
    ],
  },
  {
    title: 'Full Stack Developer',
    company: 'CodeCraft Inc',
    icon: '💻',
    iconBg: '#10b981',
    date: 'Jun 2021 - Dec 2022',
    points: [
      'Developed and maintained RESTful APIs using Node.js, Express, and MongoDB',
      'Integrated real-time features using WebSockets and implemented user authentication',
      'Migrated legacy codebase from JavaScript to TypeScript, improving type safety',
      'Implemented CI/CD pipelines using GitHub Actions, reducing deployment time by 60%',
    ],
  },
  {
    title: 'Frontend Developer',
    company: 'Digital Innovations',
    icon: '🎨',
    iconBg: '#f59e0b',
    date: 'Mar 2020 - May 2021',
    points: [
      'Built responsive user interfaces using React, Vue.js, and modern CSS frameworks',
      'Worked closely with design team to translate Figma mockups into functional components',
      'Implemented state management solutions using Redux and Vuex for complex applications',
      'Conducted A/B testing and user analytics to improve user experience and conversion rates',
    ],
  },
  {
    title: 'Junior Web Developer',
    company: 'StartupHub',
    icon: '🌟',
    iconBg: '#8b5cf6',
    date: 'Sep 2019 - Feb 2020',
    points: [
      'Developed landing pages and marketing websites using HTML, CSS, and JavaScript',
      'Learned modern development practices including version control with Git',
      'Participated in agile development processes and daily standups',
      'Gained experience with WordPress development and custom theme creation',
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: (isLeft: boolean) => ({
    opacity: 0,
    x: isLeft ? -100 : 100,
    y: 50,
  }),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const iconVariants = {
  hidden: { 
    scale: 0, 
    rotate: -180,
    opacity: 0 
  },
  visible: {
    scale: 1,
    rotate: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "backOut",
      delay: 0.2,
    },
  },
};

const WorkExperience = () => {
  return (
    <section id="works" className="min-h-screen  py-20 mt-[70px] px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-purple-400 text-sm uppercase mb-4 tracking-[0.3em] font-medium"
          >
            What I have done so far
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent"
          >
            Work Experience
          </motion.h2>
        </motion.div>

        {/* Desktop Timeline Container - Hidden on mobile, visible on md and up */}
        <div className="hidden md:block relative max-w-6xl mx-auto">
          {/* Central vertical line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 via-blue-500 to-purple-500 rounded-full"></div>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-20"
          >
            {experiences.map((experience, index) => {
              const isLeft = index % 2 === 0;
              
              return (
                <div key={index} className="relative flex items-center justify-center">
                  {/* Timeline content */}
                  <div className="flex items-center w-full">
                    {/* Left side content (for even indices) or empty space (for odd indices) */}
                    <div className="w-1/2 pr-8">
                      {isLeft ? (
                        <motion.div
                          custom={true}
                          variants={cardVariants}
                          whileHover={{ 
                            scale: 1.02,
                            transition: { duration: 0.2 }
                          }}
                          className="ml-auto max-w-md"
                        >
                          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-2xl hover:shadow-purple-500/10 hover:border-purple-500/20 transition-all duration-300">
                            <h3 className="text-xl font-bold text-white mb-2">
                              {experience.title}
                            </h3>
                            <p className="text-purple-400 font-semibold mb-2">
                              {experience.company}
                            </p>
                            <p className="text-gray-400 text-sm font-medium mb-4 bg-white/5 rounded-full px-3 py-1 inline-block">
                              {experience.date}
                            </p>
                            <ul className="space-y-2">
                              {experience.points.map((point, pointIndex) => (
                                <motion.li
                                  key={pointIndex}
                                  initial={{ opacity: 0, x: -20 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  transition={{ 
                                    delay: 0.1 * pointIndex,
                                    duration: 0.4 
                                  }}
                                  viewport={{ once: true }}
                                  className="flex items-start text-gray-300 text-sm leading-relaxed"
                                >
                                  <span className="inline-block w-1.5 h-1.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                  {point}
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      ) : null}
                    </div>

                    {/* Center icon */}
                    <motion.div
                      variants={iconVariants}
                      className="absolute left-1/2 transform -translate-x-1/2 z-20"
                    >
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center text-2xl shadow-2xl border-4 border-white/20 backdrop-blur-sm relative"
                        style={{ backgroundColor: experience.iconBg }}
                      >
                        {experience.icon}
                        {/* Pulse effect */}
                        <div 
                          className="absolute inset-0 rounded-full animate-ping opacity-20"
                          style={{ backgroundColor: experience.iconBg }}
                        ></div>
                      </div>
                    </motion.div>

                    {/* Right side content (for odd indices) or empty space (for even indices) */}
                    <div className="w-1/2 pl-8">
                      {!isLeft ? (
                        <motion.div
                          custom={false}
                          variants={cardVariants}
                          whileHover={{ 
                            scale: 1.02,
                            transition: { duration: 0.2 }
                          }}
                          className="mr-auto max-w-md"
                        >
                          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-2xl hover:shadow-purple-500/10 hover:border-purple-500/20 transition-all duration-300">
                            <h3 className="text-xl font-bold text-white mb-2">
                              {experience.title}
                            </h3>
                            <p className="text-purple-400 font-semibold mb-2">
                              {experience.company}
                            </p>
                            <p className="text-gray-400 text-sm font-medium mb-4 bg-white/5 rounded-full px-3 py-1 inline-block">
                              {experience.date}
                            </p>
                            <ul className="space-y-2">
                              {experience.points.map((point, pointIndex) => (
                                <motion.li
                                  key={pointIndex}
                                  initial={{ opacity: 0, x: 20 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  transition={{ 
                                    delay: 0.1 * pointIndex,
                                    duration: 0.4 
                                  }}
                                  viewport={{ once: true }}
                                  className="flex items-start text-gray-300 text-sm leading-relaxed"
                                >
                                  <span className="inline-block w-1.5 h-1.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                  {point}
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Mobile version - show only on mobile, hidden on md and up */}
        <div className="block md:hidden relative max-w-lg mx-auto">
          {/* Left line for mobile */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-blue-500 to-purple-500"></div>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-12"
          >
            {experiences.map((experience, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, x: -50 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
                }}
                className="relative flex items-start"
              >
                {/* Icon for mobile */}
                <motion.div
                  variants={iconVariants}
                  className="absolute left-8 transform -translate-x-1/2 z-10"
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-lg shadow-xl border-2 border-white/20"
                    style={{ backgroundColor: experience.iconBg }}
                  >
                    {experience.icon}
                  </div>
                </motion.div>

                {/* Card for mobile */}
                <div className="ml-20 w-full">
                  <div className="bg-white/5 backdrop-blur-xl rounded-xl p-5 border border-white/10 shadow-xl">
                    <h3 className="text-lg font-bold text-white mb-1">
                      {experience.title}
                    </h3>
                    <p className="text-purple-400 font-semibold mb-1">
                      {experience.company}
                    </p>
                    <p className="text-gray-400 text-xs font-medium mb-3 bg-white/5 rounded-full px-3 py-1 inline-block">
                      {experience.date}
                    </p>
                    <ul className="space-y-2">
                      {experience.points.map((point, pointIndex) => (
                        <li
                          key={pointIndex}
                          className="flex items-start text-gray-300 text-xs leading-relaxed"
                        >
                          <span className="inline-block w-1 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-500/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -40, -20],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default WorkExperience;