'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const team = [
  {
    name: 'Mbula Nzuki',
    title: 'Managing Partner, Principal Attorney',
    practice: 'Corporate & Commercial Strategy',
    image: 'https://mnlegal.net/wp-content/uploads/2024/01/Mbula-Nzuki-team.jpg',
  },
  {
    name: 'Sebie Salim',
    title: 'Chief Operations, Strategy & Growth',
    practice: 'Operational Excellence',
    image: 'https://mnlegal.net/wp-content/uploads/2024/01/Sebie-Salim.jpg',
  },
  {
    name: 'Mutundu Chege',
    title: 'Litigation Department, Co-Head',
    practice: 'Dispute Resolution',
    image: 'https://mnlegal.net/wp-content/uploads/2024/01/Mutundu-Chege.jpg',
  },
  {
    name: 'Konstantina Zariou',
    title: 'Of - Counsel',
    practice: 'Legal Advisory',
    image: 'https://mnlegal.net/wp-content/uploads/2026/01/IMG_8790.jpeg',
  },
  {
    name: 'Nour Sheriff',
    title: 'Legal Research Assistant',
    practice: 'Legal Research & Analysis',
    image: 'https://mnlegal.net/wp-content/uploads/2024/01/Nour-Sheriff.jpg',
  },
  {
    name: 'Husna (A.) Mohammed',
    title: 'Senior Associate',
    practice: 'Corporate Law',
    image: 'https://mnlegal.net/wp-content/uploads/2026/03/1771405050567.jpg',
  },
  {
    name: 'Zachary Ongeri',
    title: 'AI & Digital transformation Associate',
    practice: 'Legal Technology',
    image: 'https://mnlegal.net/wp-content/uploads/2026/01/1000053692.jpg',
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
            Meet the Team
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member: any, i: number) => (
            <div key={i} className="team-card group bg-white p-4 transition-all duration-500 hover:shadow-xl relative">
              <div className="relative aspect-[4/5] mb-6 overflow-hidden bg-gray-100">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110"
                  priority={i < 4}
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
