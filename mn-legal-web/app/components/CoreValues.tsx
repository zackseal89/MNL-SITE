'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const values = [
  {
    title: 'Collaboration',
    description: 'Our success is based on our willingness to collaborate with others – both within and without our organization. We begin with getting to know our clients and understanding what really matters to them and once we do we invite different perspectives and design lasting legal solutions.'
  },
  {
    title: 'Core Culture & Balance',
    description: 'Our firm is based on the core culture of mindfulness. We encourage an environment of mindful individuals who are self-aware and compassionate. Everyone in our firm is required to be respectful and supportive, firm and polite in the performance of client work, pursuit of team interests and general firm interests.'
  },
  {
    title: 'Integrity',
    description: 'At MN Legal we are impeccable with our word. We do the right thing, in a reliable manner and keep our word. We are not in a rush to get ahead by all means; we are keener on achieving impactful success and winning fair and square.'
  },
  {
    title: 'Innovation & Creativity',
    description: 'While most firms are keen on maximizing billable hours, at MN Legal we are keen on fostering innovation and creativity in our practice. We are eager to spearhead monumental growth in the world of LegalTech and device legal solutions for our clients.'
  },
  {
    title: 'Hardwork',
    description: 'Our team of dedicated individuals understands that being intelligent and talented is not enough, we roll up our sleeves and work both smart and hard. We invest time in understanding our clients´ needs and objectives. We have seen that the harder we work the luckier we have become, we now wake up each morning and strive to get luckier.'
  }
];

export default function CoreValues() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.value-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-[var(--mn-cream)] py-24 px-6 md:px-16" ref={sectionRef}>
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-16">
          <span className="text-[var(--mn-burgundy)] text-[11px] font-semibold uppercase tracking-[0.2em] mb-4 block">
            Principles & Ethics
          </span>
          <h2 className="inline-block text-[clamp(32px,4vw,42px)] font-display text-[var(--mn-navy)] leading-tight border-bottom border-b-2 border-[var(--mn-burgundy)] pb-3 mb-8">
            Our Core Values
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {values.map((value, index) => (
            <div 
              key={index} 
              className="value-card border border-[rgba(26,39,68,0.1)] p-10 bg-white transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] flex flex-col h-full"
            >
              <div className="mb-6 flex items-center gap-4">
                <span className="text-[var(--mn-burgundy)] font-display italic text-2xl">0{index + 1}</span>
                <div className="h-[1px] w-12 bg-[var(--mn-burgundy)] opacity-30"></div>
              </div>
              <h3 className="text-2xl font-display text-[var(--mn-navy)] mb-6">
                {value.title}
              </h3>
              <p className="text-[#333333] font-body text-[15px] leading-relaxed flex-grow text-left">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
