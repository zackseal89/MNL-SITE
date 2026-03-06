'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      id="nav" 
      className={`fixed top-0 left-0 right-0 z-[1000] flex items-center justify-between transition-all duration-400 ease-[var(--ease-expo)] md:px-[60px] px-[24px] ${
        scrolled ? 'p-[15px_60px] bg-[rgba(26,39,68,0.95)] backdrop-blur-[20px] border-b border-[rgba(139,28,63,0.14)]' : 'p-[24px_60px] bg-[rgba(26,39,68,0.93)] backdrop-blur-[20px] border-b border-[rgba(139,28,63,0.14)]'
      }`}
    >
      <Link href="/" className="nav-brand font-display text-[1.15rem] font-medium italic text-white tracking-[.04em]">
        MN Legal 
        <small className="block font-body text-[9px] font-normal tracking-[3px] uppercase text-white/35 not-italic mt-[1px]">MN Advocates LLP</small>
      </Link>

      <ul className="nav-links hidden md:flex gap-[36px]">
        {['Home', 'Practice Areas', 'About', 'Our Team', 'Insights', 'Contact'].map((item) => (
          <li key={item}>
            <Link 
              href={item === 'Home' ? '/' : (item === 'Insights' ? '/insights' : `/#${item.toLowerCase().replace(' ', '-')}`)}
              className={`text-[11px] font-medium tracking-[1.2px] uppercase transition-colors duration-300 relative pb-[4px] after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[1px] after:bg-[var(--mn-burgundy)] after:transition-all after:duration-400 after:ease-[var(--ease-expo)] ${
                item === 'Insights' ? 'text-white after:w-full' : 'text-white/60 hover:text-white after:w-0 hover:after:w-full'
              }`}
            >
              {item}
            </Link>
          </li>
        ))}
      </ul>

      <button 
        className="nav-btn hidden md:block bg-[var(--mn-burgundy)] border-2 border-[var(--mn-burgundy)] text-white p-[10px_26px] text-[11px] font-semibold tracking-[1.5px] uppercase relative overflow-hidden group"
        onClick={() => window.location.href = '/#contact'}
      >
        <span className="relative z-10">Consult Now</span>
        <div className="absolute inset-0 bg-[var(--mn-burgundy-dark)] translate-x-[-101%] transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-0"></div>
      </button>

      <button 
        className={`nav-ham md:hidden flex flex-col gap-[5px] p-[4px] relative z-[1001] ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Menu"
      >
        <span className={`block w-[22px] h-[1.5px] bg-white transition-all duration-400 ease-[var(--ease-expo)] ${isOpen ? 'translate-y-[6.5px] rotate-45' : ''}`}></span>
        <span className={`block w-[22px] h-[1.5px] bg-white transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
        <span className={`block w-[22px] h-[1.5px] bg-white transition-all duration-400 ease-[var(--ease-expo)] ${isOpen ? 'translate-y-[-6.5px] -rotate-45' : ''}`}></span>
      </button>

      {/* Mobile Menu Placeholder */}
      <div className={`fixed inset-0 bg-[var(--mn-navy-deep)] transition-transform duration-500 ease-[var(--ease-expo)] md:hidden flex flex-col items-center justify-center gap-8 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
         {['Home', 'Practice Areas', 'About', 'Our Team', 'Insights', 'Contact'].map((item) => (
           <Link 
             key={item} 
             href={item === 'Home' ? '/' : (item === 'Insights' ? '/insights' : `/#${item.toLowerCase().replace(' ', '-')}`)}
             className="text-white text-xl uppercase tracking-widest font-display italic"
             onClick={() => setIsOpen(false)}
           >
             {item}
           </Link>
         ))}
      </div>
    </nav>
  );
}
