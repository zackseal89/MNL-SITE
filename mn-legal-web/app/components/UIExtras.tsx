'use client';

import { useEffect, useState, useRef } from 'react';

export default function UIExtras() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showOverlay, setShowOverlay] = useState(true);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorRingPos, setCursorRingPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  
  const cursorRef = useRef<{ x: number, y: number }>({ x: 0, y: 0 });
  const cursorRingRef = useRef<{ x: number, y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    // ── OVERLAY ──
    const overlayTimer = setTimeout(() => setShowOverlay(false), 80);

    // ── SCROLL PROGRESS ──
    const handleScroll = () => {
      const pct = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      setScrollProgress(Math.min(pct, 100));
    };

    // ── CURSOR ──
    const handleMouseMove = (e: MouseEvent) => {
      cursorRef.current = { x: e.clientX, y: e.clientY };
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('button') || 
        target.closest('a') ||
        target.classList.contains('cursor-pointer') ||
        target.closest('.art-card') ||
        target.closest('.feat-grid')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    // ── REVEAL SYSTEM ──
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry: any) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('vis');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    const setupReveals = () => {
      document.querySelectorAll('.rv, .rvl, .rvr').forEach((el: any) => {
        revealObserver.observe(el);
      });
    };

    // Use requestAnimationFrame to run after React finishes its initial hydration/paint cycle
    let rafId: number;
    let mutationObserver: MutationObserver | null = null;
    
    rafId = requestAnimationFrame(() => {
      setupReveals();
      mutationObserver = new MutationObserver(setupReveals);
      mutationObserver.observe(document.body, { childList: true, subtree: true });
    });

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    // Cursor Ring Smoothing
    let requestRef: number;
    const animateCursor = () => {
      cursorRingRef.current.x += (cursorRef.current.x - cursorRingRef.current.x) * 0.1;
      cursorRingRef.current.y += (cursorRef.current.y - cursorRingRef.current.y) * 0.1;
      setCursorRingPos({ x: cursorRingRef.current.x, y: cursorRingRef.current.y });
      requestRef = requestAnimationFrame(animateCursor);
    };
    requestRef = requestAnimationFrame(animateCursor);

    return () => {
      clearTimeout(overlayTimer);
      cancelAnimationFrame(rafId);
      mutationObserver?.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      revealObserver.disconnect();
      cancelAnimationFrame(requestRef);
    };
  }, []);

  return (
    <>
      {/* ── PROGRESS BAR (2px per HTML) ── */}
      <div
        id="prog"
        className="fixed top-0 left-0 h-[2px] bg-[var(--mn-burgundy)] z-[9997] transition-[width] duration-75 ease-linear pointer-events-none"
        style={{ width: `${scrollProgress}%` }}
      ></div>

      {/* ── OVERLAY WIPE ── */}
      <div
        id="overlay"
        className={`fixed inset-0 bg-[var(--mn-burgundy)] z-[999999] transition-transform duration-900 ease-[var(--ease-expo)] origin-top pointer-events-none ${
          showOverlay ? 'scale-y-100' : 'scale-y-0'
        }`}
      ></div>

      {/* ── CURSOR ── */}
      <div 
        id="cur"
        className={`fixed top-0 left-0 w-[10px] h-[10px] bg-[var(--mn-burgundy)] rounded-full pointer-events-none z-[99999] -translate-x-1/2 -translate-y-1/2 transition-[width,height,background-color] duration-300 ease-[var(--ease-expo)] mix-blend-multiply hidden md:block ${
          isHovering ? '!w-[42px] !h-[42px] !bg-[rgba(139,28,63,0.2)] !mix-blend-normal' : ''
        }`}
        style={{ left: cursorPos.x, top: cursorPos.y }}
      ></div>
      <div 
        id="cur-ring"
        className={`fixed top-0 left-0 w-[34px] h-[34px] border-[1.5px] border-[rgba(139,28,63,0.45)] rounded-full pointer-events-none z-[99998] -translate-x-1/2 -translate-y-1/2 hidden md:block transition-opacity duration-300 ${
          isHovering ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ left: cursorRingPos.x, top: cursorRingPos.y }}
      ></div>

      <style jsx global>{`
        @media (hover: hover) {
          body, a, button, [role="button"] {
            cursor: none !important;
          }
        }
      `}</style>
    </>
  );
}
