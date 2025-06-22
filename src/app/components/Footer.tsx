// import React from 'react'

// const Footer = () => {
//   return (
//     <footer className="text-center py-6 bg-black text-white relative z-10">
//       <p>© {new Date().getFullYear()} Built by Othmane Makkour. All rights reserved.</p>
//     </footer>
//   )
// }

// export default Footer



import { ChevronRightIcon } from 'lucide-react';
import React, { useRef } from 'react'

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
    label: 'Work',
    href: '#work'
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
  {
    label: 'Twitter X',
    href: 'https://x.com/Musashi__Mk'
  },
  {
    label: 'LeetCode',
    href: 'https://leetcode.com/u/0djClLvBVY/'
  }
];

const Footer = () => {

  const year = new Date().getFullYear()

  return (
    <footer className="section bg-black relative z-10">
      <div className="container mx-auto">

        <div className="lg:grid lg:grid-cols-2">
          <div className="mb-10">
            <h2 className="headline-1 mb-8 lg:max-w-[12ch]">
              Let&apos;s work together today!
            </h2>
            <a 
              href={"mailto:othmanemakkour8@gmail.com"}
            >
              Start project
              <ChevronRightIcon />
            </a>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:pl-20">

            <div>
              <p className="mb-2">Sitemap</p>

              <ul>
                {sitemap.map(({label, href}, key) => (
                  <li key={key}>
                    <a 
                      href={href}
                      className="block text-sm text-zinc-400 py-1 transition-colors hover:text-zinc-200"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="mb-2">Socials</p>

              <ul>
                {socials.map(({label, href}, key) => (
                  <li key={key}>
                    <a 
                      href={href}
                      target="_blank"
                      className="block text-sm text-zinc-400 py-1 transition-colors hover:text-zinc-200"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        <div className="flex items-center justify-between pt-10 mb-8">
          <a 
            href="" 
            className=""
          >
            <img 
              src="/OTH_LOGO.svg"
              width={40}
              height={40} 
              alt="logo" 
            />
          </a>

          <p className="text-zinc-500 text-sm">
            &copy; {year} <span className="text-zinc-200">Othmane Makkour</span>
          </p>
        </div>

      </div>
    </footer>
  )
}

export default Footer