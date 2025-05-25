import React from 'react'
import SkillCard from './SkillCard';

const skillItem = [
  {
    imgSrc: '/figma.svg',
    label: 'Figma',
    desc: 'Design tool',
    color:'white'
  },
  {
    imgSrc: '/html.svg',
    label: 'Html',
    desc: 'html',
    color: 'rgb(228, 77, 38)',
  },
  {
    imgSrc: '/css3.svg',
    label: 'CSS',
    desc: 'User Interface',
    color: 'rgb(21, 143, 231)',
  },
  {
    imgSrc: '/javascript.svg',
    label: 'JavaScript',
    desc: 'Interaction',
    color: 'rgb(247, 223, 30)'
  },
  {
    imgSrc: '/php.svg',
    label: 'Php',
    desc: 'Hypertext Preprocessor',
    color: 'rgb(104, 132, 186)'
  },
  {
    imgSrc: '/mysql.svg',
    label: 'Mysql',
    desc: 'DB management system',
    color: 'rgb(242, 145, 17)'
  },
  {
    imgSrc: '/nodejs.svg',
    label: 'NodeJS',
    desc: 'Web Server',
    color:'rgb(32, 144, 92)'
  },
  {
    imgSrc: '/expressjs.svg',
    label: 'ExpressJS',
    desc: 'Node Framework',
    color: 'white'
  },
  {
    imgSrc: '/mongodb.svg',
    label: 'MongoDB',
    desc: 'Database',
    color: "rgb(84, 178, 110)"
  },
  {
    imgSrc: '/react.svg',
    label: 'React',
    desc: 'Framework',
    color: 'rgb(123, 215, 226)'
  },
  {
    imgSrc: '/laravel.svg',
    label: 'Laravel',
    desc: 'Framework',
    color: 'rgb(251, 80, 59)'
  },
  {
    imgSrc: '/bootstrap.svg',
    label: 'Bootstrap',
    desc: 'User Interface',
    color: 'rgb(134, 18, 251)'
  },
  {
    imgSrc: '/tailwindcss.svg',
    label: 'TailwindCSS',
    desc: 'User Interface',
    color: 'rgb(0, 155, 184)'
  },
  {
    imgSrc: '/redux.svg',
    label: 'Redux',
    desc: 'library',
    color: 'rgb(118, 74, 188)'
  },
];

const Skills = ({innerRef}) => {
  return (
    <section id="skills" ref={innerRef} className="min-h-screen flex items-center justify-center p-4 md:p-8">
      <div className="container absolute z-20">

        <h2 className='headline-2 reveal-up'>
          Essential Tools I use
        </h2>

        <p className='text-zinc-400 mt-3 mb-8 max-w-[50ch]'>
          Discover the powerful tools and technologies I use to create exceptional, 
          high-performing websites & applications.
        </p>

        <div className={"grid gap-3 grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))]"}>
          {
            skillItem.map(({color, imgSrc, label, desc}, key) => (
              <SkillCard 
                classes="reveal-up" 
                color={color} key={key} imgSrc={imgSrc} label={label} desc={desc} />
            ))
          }
        </div>

      </div>
    </section>
  )
}

export default Skills