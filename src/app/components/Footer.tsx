import Image from 'next/image';
import React from 'react';

const sitemap = [
  {
    label: 'Home',
    href: '#home'
  },
  {
    label: 'About',
    href: '#about'
  },
  {
    label: 'Skills',
    href: '#skills'
  },
  {
    label: 'Projects',
    href: '#projects'
  },
  {
    label: 'Work',
    href: '#works'
  },
  {
    label: 'Contact me',
    href: '#contact'
  }
];

const socials = [
  {
    label: 'GitHub',
    href: 'https://github.com/OTH-DOT'
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/othmane-makkour-79a81a245/'
  },
  // {
  //   label: 'Twitter X',
  //   href: 'https://x.com/Musashi__Mk'
  // },
  // {
  //   label: 'LeetCode',
  //   href: 'https://leetcode.com/u/0djClLvBVY/'
  // }
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-transparent via-purple-900/20 to-slate-900 text-white overflow-hidden">
      {/* Background blur overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      
      {/* Decorative shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large circles */}
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -right-32 w-96 h-96 bg-gradient-to-br from-blue-500/15 to-cyan-500/15 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 left-1/3 w-64 h-64 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full blur-3xl"></div>
        
        {/* Stars */}
        <div className="absolute top-16 left-1/4 w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-1/4 w-1 h-1 bg-white/40 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 left-1/6 w-1.5 h-1.5 bg-white/50 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-48 right-1/3 w-1 h-1 bg-white/30 rounded-full animate-pulse" style={{animationDelay: '3s'}}></div>
        <div className="absolute bottom-48 right-1/6 w-2 h-2 bg-white/40 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-8 pt-16">
        <div className="lg:grid lg:grid-cols-2 gap-12">
          {/* Left section */}
          <div className="mb-10 lg:mb-0">
            <h2 className="text-4xl lg:text-5xl font-bold mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Let&apos;s work together today!
            </h2>
            <a 
              href="mailto:othmanemakkour8@gmail.com"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
            >
              Start project
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* Right section */}
          <div className="grid grid-cols-2 gap-8 lg:pl-20">
            <div>
              <p className="text-lg font-semibold mb-4 text-gray-200">Sitemap</p>
              <ul className="space-y-2">
                {sitemap.map(({label, href}, key) => (
                  <li key={key}>
                    <a 
                      href={href}
                      className="block text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 transform"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-lg font-semibold mb-4 text-gray-200">Socials</p>
              <ul className="space-y-2">
                {socials.map(({label, href}, key) => (
                  <li key={key}>
                    <a 
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 transform"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-6 mt-6 border-t border-gray-700/50">
          <a 
            href="#home" 
            className="mb-4 flex items-center justify-center sm:mb-0 hover:scale-110 w-28 h-28 transition-transform duration-300"
          >
              <Image 
                src="/OTH_LOGO.svg"
                width={80} height={80}
                alt="logo" 
              />
          </a>

          <p className="text-gray-400 text-sm text-center">
            &copy; {year} <span className="text-white font-semibold">Othmane Makkour</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;