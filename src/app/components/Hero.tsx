import React from 'react'
import StarsCanvas from './canvas/Stars'
import EarthCanvas from './canvas/Earth'

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center">
      <StarsCanvas />
      <div className='content absolute z-20 text-center'>
        <h1 className='text-white text-6xl font-bold mb-4'>Hello!</h1>
        <p className='text-white text-xl opacity-90'>
          I am a Full Stack Developer
        </p>
        <p className='text-gray-300 text-lg mt-2'>
          Building amazing web experiences with passion and precision
        </p>
      </div>
      <div className="absolute z-10 bottom-[10%] right-[5%] w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64">
        <EarthCanvas />
      </div>
    </section>
  )
}

export default Hero
