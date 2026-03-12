'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.testimonial-reveal', {
        opacity: 0,
        scale: 0.98,
        y: 20,
        duration: 1.2,
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
    <section className="bg-[var(--bg-primary)] py-24 px-6 md:px-16" ref={containerRef}>
      <div className="max-w-[1000px] mx-auto">
        <div className="testimonial-reveal border-l-4 border-[var(--mn-burgundy)] pl-10 py-4">
          <p className="font-display italic text-[24px] md:text-[32px] text-[var(--mn-navy)] leading-[1.4] mb-8">
            "MN Legal provided not just legal representation, but strategic partnership. Their attention to detail in our cross-border acquisition was unparalleled in the East African market."
          </p>
          <div className="flex items-center gap-4">
            <div className="h-px w-8 bg-[var(--mn-burgundy)]"></div>
            <div>
              <span className="block text-[13px] uppercase font-bold tracking-[2px] text-[var(--mn-burgundy)]">
                Chief Executive Officer
              </span>
              <span className="block text-[11px] uppercase tracking-[1px] text-gray-400 mt-1">
                Regional Commercial Bank
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
