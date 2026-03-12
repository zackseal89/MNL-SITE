'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: "Advantegis is a champion of data driven decision making in organizations in Kenya. MN Legal has been our law firm of choice when dealing in matters data privacy. Simply unmatched legal knowledge in technology and data.",
    author: "James Oluoch",
    role: "Director",
    company: "Advantegis Limited"
  },
  {
    quote: "On behalf of Mediplus training I would like to sincerely appreciate MN LEGAL Advocates for the great work they did for us during the company registration process. I must say that they are swift, timely and always updating us on the progress, keep up the great work, I applaud the level of professionalism. I would therefore recommend to anyone in need of legal issues and advice. Thank you and will definitely work with in future.",
    author: "Philemon Yegon",
    role: "Director",
    company: "Mediplus Training Ltd"
  }
];

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

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

  const changeTestimonial = (newIndex: number) => {
    if (newIndex === currentIndex) return;

    gsap.to(quoteRef.current, {
      opacity: 0,
      y: -10,
      duration: 0.4,
      ease: 'power2.in',
      onComplete: () => {
        setCurrentIndex(newIndex);
        gsap.fromTo(quoteRef.current, 
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
        );
      }
    });
  };

  const next = () => changeTestimonial((currentIndex + 1) % testimonials.length);
  const prev = () => changeTestimonial((currentIndex - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="bg-[var(--bg-primary)] py-24 px-6 md:px-16 overflow-hidden" ref={containerRef}>
      <div className="max-w-[1000px] mx-auto">
        <div className="testimonial-reveal relative">
          <div ref={quoteRef} className="border-l-4 border-[var(--mn-burgundy)] pl-10 py-4 min-h-[300px] flex flex-col justify-center">
            <p className="font-display italic text-[24px] md:text-[32px] text-[var(--mn-navy)] leading-[1.4] mb-8">
              "{testimonials[currentIndex].quote}"
            </p>
            <div className="flex items-center gap-4">
              <div className="h-px w-8 bg-[var(--mn-burgundy)]"></div>
              <div>
                <span className="block text-[13px] uppercase font-bold tracking-[2px] text-[var(--mn-burgundy)]">
                  {testimonials[currentIndex].author}
                </span>
                <span className="block text-[11px] uppercase tracking-[1px] text-gray-400 mt-1">
                  {testimonials[currentIndex].role}, {testimonials[currentIndex].company}
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-12 pl-10">
            <button 
              onClick={prev}
              className="p-3 border border-gray-200 hover:border-[var(--mn-burgundy)] transition-colors group cursor-pointer"
              aria-label="Previous testimonial"
            >
              <ArrowLeft size={20} className="text-gray-400 group-hover:text-[var(--mn-burgundy)] transition-colors" />
            </button>
            <button 
              onClick={next}
              className="p-3 border border-gray-200 hover:border-[var(--mn-burgundy)] transition-colors group cursor-pointer"
              aria-label="Next testimonial"
            >
              <ArrowRight size={20} className="text-gray-400 group-hover:text-[var(--mn-burgundy)] transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
