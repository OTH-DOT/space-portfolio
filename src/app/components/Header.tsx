'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Home, User, Code, Briefcase, FolderOpen, Mail } from 'lucide-react';
import Image from 'next/image';

interface NavLink {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navLinks: NavLink[] = [
  { name: 'home', icon: Home },
  { name: 'about', icon: User },
  { name: 'skills', icon: Code },
  { name: 'projects', icon: FolderOpen },
  { name: 'works', icon: Briefcase },
  { name: 'contact', icon: Mail }
];

type SectionName = typeof navLinks[number]['name'];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionName>('home');
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Active section detection with throttling
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const sections = navLinks.map(link => document.getElementById(link.name));
          const scrollPosition = window.scrollY + 100;

          for (let i = sections.length - 1; i >= 0; i--) {
            const section = sections[i];
            if (section && section.offsetTop <= scrollPosition) {
              setActiveSection(navLinks[i].name);
              break;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLinkClick = (sectionName: SectionName) => {
    setActiveSection(sectionName);
    setIsMenuOpen(false);
    
    const element = document.getElementById(sectionName);
    if (element) {
      element.scrollIntoView({ block: 'start' });
    }
  };

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-black/90 backdrop-blur-md' 
          : 'bg-black/20 backdrop-blur-sm'
      }`}>
        <div className="container mx-auto sm:px-6 lg:px-8 py-4">
          <div className="flex max-md:px-4 justify-between items-center">
            {/* Logo */}
            <div className="flex items-center">
              <div className="w-14 h-14 rounded-lg flex items-center justify-center">
                <Image src="./OTH_LOGO.svg" alt="logo" width={55} height={55} />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                <span className="bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
                  Othamne Makkour
                </span>
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = activeSection === link.name;
                
                return (
                  <button
                    key={link.name}
                    onClick={() => handleLinkClick(link.name)}
                    className={`group flex items-center cursor-pointer space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 text-white shadow-lg shadow-purple-500/20 border border-purple-500/30'
                        : 'text-gray-300 hover:text-white hover:bg-white/5 hover:border-gray-600/30 border border-transparent'
                    }`}
                  >
                    <Icon className={`w-4 h-4 transition-all duration-300 ${
                      isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'
                    }`} />
                    <span className="capitalize font-medium text-sm">
                      {link.name}
                    </span>
                    {isActive && (
                      <div className="w-1 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 rounded-lg cursor-pointer bg-white/5 hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-pink-500/10 transition-all duration-200 border border-gray-700/50 hover:border-purple-500/30"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="bg-black/95 backdrop-blur-md border-t border-gray-800/50 shadow-2xl">
            <nav className="container mx-auto px-4 py-4 space-y-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = activeSection === link.name;
                
                return (
                  <button
                    key={link.name}
                    onClick={() => handleLinkClick(link.name)}
                    className={`w-full flex items-center cursor-pointer space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 text-white shadow-lg shadow-purple-500/10 border border-purple-500/30'
                        : 'text-gray-300 hover:text-white hover:bg-white/5 hover:border-gray-600/30 border border-transparent'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${
                      isActive ? 'text-white' : 'text-gray-400'
                    }`} />
                    <span className="capitalize font-medium">
                      {link.name}
                    </span>
                    {isActive && (
                      <div className="ml-auto w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse" />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Header;