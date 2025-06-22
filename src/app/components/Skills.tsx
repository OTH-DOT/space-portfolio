import React, { useEffect, useState } from 'react'
import SkillCard from './SkillCard';

const skillItem = [
  // Frontend
  {
    imgSrc: '/bootstrap.svg',
    label: 'Bootstrap',
    desc: 'CSS Framework',
    color: 'rgb(134, 18, 251)',
  },
  {
    imgSrc: '/css3.svg',
    label: 'CSS',
    desc: 'User Interface',
    color: 'rgb(21, 143, 231)',
  },
  {
    imgSrc: '/html.svg',
    label: 'Html',
    desc: 'Markup Language',
    color: 'rgb(228, 77, 38)',
  },
  {
    imgSrc: '/javascript.svg',
    label: 'JavaScript',
    desc: 'Interaction',
    color: 'rgb(247, 223, 30)',
  },
  {
    imgSrc: '/nextjs-icon.svg',
    label: 'Next.js',
    desc: 'React Framework',
    color: 'white',
  },
  {
    imgSrc: '/react.svg',
    label: 'React',
    desc: 'Frontend Library',
    color: 'rgb(123, 215, 226)',
  },
  {
    imgSrc: '/redux.svg',
    label: 'Redux',
    desc: 'State Management',
    color: 'rgb(118, 74, 188)',
  },
  {
    imgSrc: '/shadcnui.svg',
    label: 'ShadCN UI',
    desc: 'UI Components',
    color: 'white',
  },
  {
    imgSrc: '/tailwindcss.svg',
    label: 'TailwindCSS',
    desc: 'Utility-first CSS',
    color: 'rgb(0, 155, 184)',
  },
  {
    imgSrc: '/typescript-icon.svg',
    label: 'TypeScript',
    desc: 'Typed JavaScript',
    color: 'rgb(0, 122, 204)',
  },

  // Backend
  {
    imgSrc: '/expressjs.svg',
    label: 'ExpressJS',
    desc: 'Node Framework',
    color: 'white',
  },
  {
    imgSrc: '/laravel.svg',
    label: 'Laravel',
    desc: 'PHP Framework',
    color: 'rgb(251, 80, 59)',
  },
  {
    imgSrc: '/nodejs.svg',
    label: 'NodeJS',
    desc: 'Web Server',
    color: 'rgb(32, 144, 92)',
  },
  {
    imgSrc: '/php.svg',
    label: 'Php',
    desc: 'Hypertext Preprocessor',
    color: 'rgb(104, 132, 186)',
  },
  // {
  //   imgSrc: '/trpc.svg',
  //   label: 'tRPC',
  //   desc: 'End-to-End API',
  //   color: 'rgb(60, 74, 191)',
  // },

  // Database
  {
    imgSrc: '/mongodb.svg',
    label: 'MongoDB',
    desc: 'NoSQL Database',
    color: 'rgb(84, 178, 110)',
  },
  {
    imgSrc: '/mysql.svg',
    label: 'Mysql',
    desc: 'Relational Database',
    color: 'rgb(242, 145, 17)',
  },
  // {
  //   imgSrc: '/supabase-icon.svg',
  //   label: 'Supabase',
  //   desc: 'BaaS with PostgreSQL',
  //   color: 'rgb(18, 190, 125)',
  // },

  // Dev Tools
  {
    imgSrc: '/axios.svg',
    label: 'Axios',
    desc: 'HTTP Client',
    color: 'rgb(52, 116, 255)',
  },
  {
    imgSrc: '/cloudinary-icon.svg',
    label: 'Cloudinary',
    desc: 'Media Management',
    color: 'rgb(44, 144, 203)',
  },
  // {
  //   imgSrc: '/docker-icon.svg',
  //   label: 'Docker',
  //   desc: 'Containerization',
  //   color: 'rgb(0, 123, 196)',
  // },
  {
    imgSrc: '/git-icon.svg',
    label: 'Git',
    desc: 'Version Control',
    color: 'rgb(240, 80, 51)',
  },
  {
    imgSrc: '/github-icon.svg',
    label: 'GitHub',
    desc: 'Code Hosting',
    color: 'white',
  },
  {
    imgSrc: '/notion-icon.svg',
    label: 'Notion',
    desc: 'Note & Doc Tool',
    color: 'white',
  },
  {
    imgSrc: '/postman-icon.svg',
    label: 'Postman',
    desc: 'API Client',
    color: 'rgb(255, 109, 63)',
  },
  {
    imgSrc: '/vercel-icon.svg',
    label: 'Vercel',
    desc: 'Hosting Platform',
    color: 'white',
  },

  // Testing
  // {
  //   imgSrc: '/jest.svg',
  //   label: 'Jest',
  //   desc: 'Testing Framework',
  //   color: 'rgb(255, 0, 102)',
  // },

  // Authentication
  {
    imgSrc: '/jwt-icon.svg',
    label: 'JWT',
    desc: 'Authentication Token',
    color: 'rgb(245, 129, 38)',
  },
  {
    imgSrc: '/oauth.svg',
    label: 'OAuth',
    desc: 'Authorization Protocol',
    color: 'rgb(37, 150, 190)',
  },

  // APIs / Libraries
  {
    imgSrc: '/apidog-icon.svg',
    label: 'Apidog',
    desc: 'API Testing',
    color: 'rgb(47, 98, 245)',
  },
  {
    imgSrc: '/chartjs.svg',
    label: 'Chart.js',
    desc: 'Chart Library',
    color: 'rgb(255, 99, 132)',
  },
  {
    imgSrc: '/socket.io.svg',
    label: 'Socket.io',
    desc: 'Realtime Communication',
    color: 'black',
  },
  {
    imgSrc: '/stripe.svg',
    label: 'Stripe',
    desc: 'Payment Gateway',
    color: 'rgb(99, 91, 255)',
  },
  // {
  //   imgSrc: '/websocket.svg',
  //   label: 'WebSocket',
  //   desc: 'Realtime Protocol',
  //   color: 'rgb(0, 183, 255)',
  // },

  // Design
  {
    imgSrc: '/figma.svg',
    label: 'Figma',
    desc: 'Design Tool',
    color: 'white',
  },

  // OS / Environment
  {
    imgSrc: '/linux-tux.svg',
    label: 'Linux(Ubuntu)',
    desc: 'Operating System',
    color: 'white',
  },

  // CMS
  {
    imgSrc: '/wordpress-icon.svg',
    label: 'WordPress',
    desc: 'Content Management System',
    color: 'rgb(33, 117, 155)',
  },
];


const Skills = ({ innerRef }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isAutoRunning, setIsAutoRunning] = useState(true);

  // Auto-cycle through cards randomly
  useEffect(() => {
    if (!isAutoRunning) return;

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * skillItem.length);
      setActiveIndex(randomIndex);
    }, 1000); // Change every 1 second

    return () => clearInterval(interval);
  }, [isAutoRunning]);

  const handleCardHover = (index: number) => {
    setHoveredIndex(index);
    setIsAutoRunning(false); // Stop auto-cycling
  };

  const handleCardLeave = () => {
    setHoveredIndex(null);
    setIsAutoRunning(true); // Resume auto-cycling
  };

  const getCardActiveState = (index: number) => {
    // If a card is being hovered, only that card is active
    if (hoveredIndex !== null) {
      return hoveredIndex === index;
    }
    // Otherwise, use the auto-cycling active index
    return activeIndex === index;
  };

  return (
    <section 
      id="skills" 
      ref={innerRef} 
      className="min-h-screen flex items-center justify-center p-4 md:p-8 relative z-10"
    >
      <div className="container">
        <h2 className='text-3xl font-bold text-white mb-4 reveal-up'>
          Essential Tools I use
        </h2>

        <p className='text-zinc-400 mt-3 mb-8 max-w-[50ch]'>
          Discover the powerful tools and technologies I use to create exceptional, 
          high-performing websites & applications.
        </p>

        <div className="grid gap-3 grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))]">
          {skillItem.map(({ color, imgSrc, label, desc }, index) => (
            <SkillCard
              classes="reveal-up"
              color={color}
              key={index}
              imgSrc={imgSrc}
              label={label}
              desc={desc}
              isActive={getCardActiveState(index)}
              onHover={() => handleCardHover(index)}
              onLeave={handleCardLeave}
            />
          ))}
        </div>
      </div>  
    </section>
  );
};

export default Skills;