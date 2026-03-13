'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const stats = [
  { label: 'Years of Excellence', value: 7, suffix: '+' },
  { label: 'Cases Resolved', value: 500, suffix: '+' },
  { label: 'Legal Professionals', value: 15, suffix: '' },
  { label: 'Offices in Kenya', value: 1, suffix: '' },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Reveal text
      gsap.fromTo(
        '.about-reveal',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      // Counter animation
      const counterEls = gsap.utils.toArray('.stat-number');
      counterEls.forEach((el: any) => {
        const target = parseInt(el.getAttribute('data-target'));
        gsap.to(el, {
          innerText: target,
          duration: 2,
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 80%',
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="bg-[var(--mn-navy)] py-24 px-6 md:px-16 overflow-hidden" ref={sectionRef}>
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <span className="about-reveal text-[var(--mn-burgundy)] text-[11px] font-semibold uppercase tracking-[0.2em] mb-4 block">
              EST. - NAIROBI
            </span>
            <h2 className="about-reveal text-[clamp(32px,4vw,42px)] font-display text-white leading-tight mb-8 border-none p-0">
              A Legacy of Precision <br /> and Legal Authority
            </h2>
            <div className="about-reveal space-y-6 text-white font-body text-[17px] leading-relaxed max-w-[600px] font-medium">
              <p>
                Founded on the principles of integrity and technical excellence, MN Legal has established itself as a cornerstone of the East African legal landscape. We serve a diverse portfolio of domestic and international clients with surgical precision.
              </p>
              <p>
                Our approach combines deep-rooted local knowledge with international standards, ensuring that every counsel provided is both strategically sound and commercially viable.
              </p>
              <button className="mt-4 btn-primary bg-[var(--mn-burgundy)] text-white text-[13px] font-bold uppercase tracking-[1.5px] px-10 py-4 hover:bg-[var(--mn-burgundy-dark)] transition-colors duration-300 border border-[var(--mn-burgundy)]">
                Our Firm's Story
              </button>
            </div>
          </div>

          <div className="relative aspect-square lg:aspect-[4/5] overflow-hidden group border border-[rgba(255,255,255,0.08)] shadow-[0_20px_50px_rgba(0,0,0,0.3)] about-reveal">
             <Image 
                src="https://mnlegal.net/wp-content/uploads/2026/03/DSC3081-98-scaled.jpg"
                alt="The MN Legal Team"
                fill
                className="object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-1000 scale-100 group-hover:scale-105"
                priority
             />
             
             {/* Cinematic Fades & Shadows */}
             <div className="absolute inset-0 bg-gradient-to-r from-[var(--mn-navy)] via-transparent to-transparent opacity-80 lg:opacity-60"></div>
             <div className="absolute inset-0 bg-gradient-to-t from-[var(--mn-navy)] via-transparent to-transparent opacity-40"></div>
             
             {/* Subtle Color Alignment Overlay */}
             <div className="absolute inset-0 bg-[var(--mn-burgundy)] mix-blend-color opacity-10 group-hover:opacity-0 transition-opacity duration-700"></div>
             
             {/* Decorative Corner Element */}
             <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[var(--mn-burgundy)] to-transparent opacity-10"></div>
             
             <div className="absolute bottom-10 right-10 z-10 text-right transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100">
                <span className="font-display italic text-3xl text-white block mb-1">Tradition & Innovation</span>
                <span className="text-[10px] uppercase tracking-[4px] text-white/60 font-bold">Nairobi, Kenya</span>
             </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-[1px] bg-[rgba(139,28,63,0.3)] border border-[rgba(139,28,63,0.3)]" ref={statsRef}>
          {stats.map((stat, i) => (
            <div key={i} className="bg-[var(--mn-navy)] p-12 text-center group hover:bg-[rgba(255,255,255,0.02)] transition-colors">
              <div className="flex justify-center items-baseline mb-2">
                <span className="stat-number font-display text-[56px] text-[var(--mn-burgundy)] leading-none" data-target={stat.value}>
                  0
                </span>
                <span className="font-display text-[42px] text-[var(--mn-burgundy)] leading-none">
                  {stat.suffix}
                </span>
              </div>
              <span className="block text-[11px] uppercase font-semibold text-[rgba(255,255,255,0.5)] tracking-[3px]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
