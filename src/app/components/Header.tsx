'use client';

import { Menu } from 'lucide-react';
import Link from 'next/link';

const navLinks = ['home', 'about', 'skills', 'projects', 'works', 'contact'];


const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold uppercase">My Portfolio</h1>
        <nav className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link}`}
              className="capitalize text-gray-700 hover:text-black transition"
            >
              {link}
            </a>
          ))}
        </nav>
        <button className="md:hidden">
          <Menu />
        </button>
      </div>
    </header>
  )
}

export default Header
