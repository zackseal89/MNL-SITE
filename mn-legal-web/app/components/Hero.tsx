'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const circle1Ref = useRef<HTMLDivElement>(null);
  const circle2Ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Circle Animations
      gsap.to(circle1Ref.current, {
        rotation: 360,
        duration: 40,
        repeat: -1,
        ease: 'linear',
      });

      gsap.to(circle2Ref.current, {
        rotation: -360,
        duration: 50,
        repeat: -1,
        ease: 'linear',
      });

      // Content Stagger
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        '.hero-tag',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2 }
      )
        .fromTo(
          '.hero-divider',
          { scaleX: 0, transformOrigin: 'left' },
          { scaleX: 1, duration: 0.8 },
          '-=0.4'
        )
        .fromTo(
          '.hero-h1',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1 },
          '-=0.4'
        )
        .fromTo(
          '.hero-sub',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.6'
        )
        .fromTo(
          '.hero-btn',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 },
          '-=0.4'
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center px-6 md:px-16 overflow-hidden bg-[linear-gradient(135deg,#1a2744_0%,#2d3e5f_50%,#1a2744_100%)] text-white pt-20"
    >
      {/* Decorative Circles */}
      <div
        ref={circle1Ref}
        className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full border border-[rgba(139,28,63,0.3)] opacity-60 pointer-events-none"
      ></div>
      <div
        ref={circle2Ref}
        className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] rounded-full border border-[rgba(139,28,63,0.2)] opacity-40 pointer-events-none"
      ></div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,28,63,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,28,63,0.03)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%,black_40%,transparent_100%)] pointer-events-none"></div>

      <div className="relative z-10 max-w-[1000px] w-full" ref={contentRef}>
        <div className="hero-tag inline-block bg-[rgba(139,28,63,0.1)] border border-[rgba(139,28,63,0.4)] px-4 py-1.5 mb-6 text-[11px] font-semibold tracking-[0.2em] text-[var(--mn-cream)] uppercase">
          Advocates & Solicitors
        </div>
        
        <div className="hero-divider w-24 h-[3px] bg-[var(--mn-burgundy)] mb-8"></div>
        
        <h1 className="hero-h1 font-display italic text-[clamp(42px,6vw,72px)] leading-[1.1] mb-8 font-medium">
          Precision. Counsel. <br className="hidden md:block" />
          <span className="text-[var(--mn-cream)]">Resolve.</span>
        </h1>
        
        <p className="hero-sub font-body text-[18px] md:text-[20px] text-white max-w-[600px] leading-relaxed mb-12 drop-shadow-sm font-medium">
          MN Legal is a premier law firm in Nairobi, providing sophisticated legal solutions for complex commercial and dispute resolution matters across East Africa.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6">
          <Link
            href="#contact"
            className="hero-btn btn-primary bg-[var(--mn-burgundy)] text-white text-[13px] font-bold uppercase tracking-[1.5px] px-8 py-4 border border-[var(--mn-burgundy)] hover:bg-[var(--mn-burgundy-dark)] transition-colors duration-300 min-w-[200px] text-center"
          >
            Consult Our Team
          </Link>
          <Link
            href="#practice"
            className="hero-btn btn-secondary bg-transparent text-white text-[13px] font-bold uppercase tracking-[1.5px] px-8 py-4 border border-white hover:bg-[rgba(255,255,255,0.1)] transition-all duration-300 min-w-[200px] text-center"
          >
            Our Practice Areas
          </Link>
        </div>
      </div>
    </section>
  );
}
