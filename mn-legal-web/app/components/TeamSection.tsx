'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { teamMembers, TeamMember } from '@/lib/team';

gsap.registerPlugin(ScrollTrigger);

function TeamMemberCard({ member, index }: { member: TeamMember; index: number }) {
  return (
    <div className="team-card group bg-white p-4 transition-all duration-500 hover:shadow-2xl relative border border-transparent hover:border-[var(--mn-cream-dark)]">
      <div className="relative aspect-[4/5] mb-8 overflow-hidden bg-[var(--mn-cream)]">
        <Image
          src={member.image}
          alt={member.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-all duration-1000 scale-100 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
          priority={index < 4}
        />
        {/* Cinematic Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(26,39,68,0.4),transparent)] opacity-60 group-hover:opacity-0 transition-opacity duration-500"></div>
      </div>
      
      <div className="relative pl-5 border-l-0 group-hover:border-l-[3px] border-[var(--mn-burgundy)] transition-all duration-300 ease-out">
        <h3 className="text-[22px] font-display text-[var(--mn-navy)] mb-1 font-semibold leading-tight group-hover:text-[var(--mn-burgundy)] transition-colors duration-300">
          {member.name}
        </h3>
        <span className="block text-[10px] uppercase text-[var(--mn-burgundy)] tracking-[2.5px] font-bold mb-3">
          {member.title}
        </span>
        <p className="text-[13px] text-gray-500 font-medium tracking-wide">
          {member.practice}
        </p>
      </div>

      {/* Decorative Corner Element */}
      <div className="absolute bottom-0 right-0 w-0 h-0 border-b-[20px] border-r-[20px] border-transparent group-hover:border-b-[var(--mn-burgundy)] group-hover:border-r-[var(--mn-burgundy)] transition-all duration-500 opacity-10"></div>
    </div>
  );
}

export default function TeamSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.team-card', {
        opacity: 0,
        y: 60,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="team" className="bg-[var(--mn-cream)] py-32 px-6 md:px-16" ref={containerRef}>
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-[700px]">
            <span className="text-[var(--mn-burgundy)] text-[11px] font-semibold uppercase tracking-[0.3em] mb-4 block">
              Our Professionals
            </span>
            <h2 className="text-[clamp(36px,5vw,52px)] font-display text-[var(--mn-navy)] leading-[1.1] mb-0">
              The Legal Minds Behind <br />
              <span className="italic font-medium">MN Advocates LLP</span>
            </h2>
          </div>
          <div className="hidden lg:block pb-2">
            <p className="text-[14px] text-gray-500 font-medium max-w-[300px] leading-relaxed italic border-l-2 border-[var(--mn-burgundy)] pl-6">
              "Precision, excellence, and unwavering dedication to our clients' success."
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {teamMembers.map((member, i) => (
            <TeamMemberCard key={member.name} member={member} index={i} />
          ))}

          {/* Careers Placeholder Card */}
          <div className="team-card group bg-[var(--mn-navy)] p-10 flex flex-col justify-center items-center text-center border border-[rgba(255,255,255,0.05)] transition-all duration-500 hover:bg-[var(--mn-navy-deep)] min-h-[400px]">
            <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
               <span className="text-[var(--mn-burgundy)] text-3xl font-display italic">§</span>
            </div>
            <h3 className="text-xl font-display text-white mb-4">Join Our Team</h3>
            <p className="text-sm text-white/50 mb-8 leading-relaxed">
              We are always looking for exceptional legal talent to join our growing firm.
            </p>
            <a 
              href="mailto:careers@mnlegal.net" 
              className="text-[10px] uppercase font-bold text-[var(--mn-burgundy)] tracking-[2px] border-b border-[var(--mn-burgundy)] pb-1 hover:text-white hover:border-white transition-all duration-300"
            >
              Send Application
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
