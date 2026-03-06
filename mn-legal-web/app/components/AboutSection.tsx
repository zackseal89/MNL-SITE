'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { label: 'Years of Excellence', value: 25, suffix: '+' },
  { label: 'Cases Resolved', value: 500, suffix: '+' },
  { label: 'Legal Professionals', value: 15, suffix: '' },
  { label: 'Offices in Kenya', value: 2, suffix: '' },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
              EST. — NAIROBI
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

          <div className="relative aspect-square md:aspect-video lg:aspect-square bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] flex items-center justify-center">
             {/* Decorative SVG or Visual element as per prompt */}
             <div className="absolute inset-0 opacity-10">
                <svg viewBox="0 0 100 100" className="w-full h-full text-[var(--mn-burgundy)]">
                   <path d="M50 10 L50 90 M10 50 L90 50" stroke="currentColor" strokeWidth="0.5" />
                   <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" />
                </svg>
             </div>
             <div className="relative z-10 text-center p-8">
                <span className="font-display italic text-[80px] text-[rgba(139,28,63,0.4)] block leading-none mb-2">MNL</span>
                <span className="text-[11px] uppercase tracking-[0.4em] text-white/40">Advocates LLP</span>
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
