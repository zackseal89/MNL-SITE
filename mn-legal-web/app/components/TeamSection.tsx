'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const team = [
  {
    name: 'M. N. Advocate',
    title: 'Managing Partner',
    practice: 'Corporate & Commercial Strategy',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=687&auto=format&fit=crop',
  },
  {
    name: 'Sarah Mwangi',
    title: 'Senior Partner',
    practice: 'Litigation & Dispute Resolution',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=688&auto=format&fit=crop',
  },
  {
    name: 'John Doe',
    title: 'Associate Partner',
    practice: 'Real Estate & Conveyancing',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1470&auto=format&fit=crop',
  },
  {
    name: 'Jane Smith',
    title: 'Senior Associate',
    practice: 'Banking & Finance Law',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=761&auto=format&fit=crop',
  },
];

export default function TeamSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.team-card', {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="team" className="bg-[var(--mn-cream)] py-24 px-6 md:px-16" ref={containerRef}>
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-16 text-center">
          <span className="text-[var(--mn-burgundy)] text-[11px] font-semibold uppercase tracking-[0.2em] mb-4 block">
            Our Professionals
          </span>
          <h2 className="text-[clamp(32px,4vw,42px)] font-display text-[var(--mn-navy)] leading-tight inline-block border-b-2 border-[var(--mn-burgundy)] pb-4">
            Meet the Partners
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, i) => (
            <div key={i} className="team-card group bg-white p-4 transition-all duration-500 hover:shadow-xl relative">
              <div className="relative aspect-[4/5] mb-6 overflow-hidden bg-gray-100">
                <img
                  src={member.image}
                  alt={member.name}
                  className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-[rgba(26,39,68,0.2)] group-hover:bg-transparent transition-all duration-500"></div>
              </div>
              
              <div className="relative pl-4 border-l-0 group-hover:border-l-4 border-[var(--mn-burgundy)] transition-all duration-300">
                <h3 className="text-[20px] font-display text-[var(--mn-navy)] mb-1 font-semibold">
                  {member.name}
                </h3>
                <span className="block text-[11px] uppercase text-[var(--mn-burgundy)] tracking-[2px] font-bold mb-2">
                  {member.title}
                </span>
                <p className="text-[13px] text-gray-500 font-medium">
                  {member.practice}
                </p>
              </div>

              {/* Hover lift effect */}
              <div className="absolute -bottom-1 -right-1 w-0 h-0 bg-[var(--mn-burgundy)] group-hover:w-8 group-hover:h-8 transition-all duration-500 opacity-20"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
