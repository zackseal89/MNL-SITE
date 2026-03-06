'use client';

import { useState } from 'react';

export default function NewsletterStrip() {
  const [email, setEmail] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setIsSuccess(true);
    }
  };

  return (
    <div className="nl-strip rv bg-[linear-gradient(135deg,#1a2744_0%,#2d3e5f_50%,#1a2744_100%)] p-[64px_60px] relative overflow-hidden my-[60px] md:px-[60px] px-[24px]">
      <div className="nl-circle nlc1 absolute w-[260px] h-[260px] right-[-60px] top-[-60px] border-2 border-[rgba(139,28,63,.22)] rounded-full pointer-events-none"></div>
      <div className="nl-circle nlc2 absolute w-[180px] h-[180px] left-[-40px] bottom-[-40px] border-[1.5px] border-[rgba(139,28,63,.15)] rounded-full pointer-events-none"></div>
      
      {/* Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(139,28,63,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(139,28,63,.04) 1px,transparent 1px)', backgroundSize: '60px 60px' }}></div>

      <div className="nl-inner relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-[60px] items-center">
        <div className="rvl d1">
          <div className="nl-tag inline-flex items-center gap-[10px] text-[10px] font-medium tracking-[3px] uppercase text-white/55 mb-[16px]">MN Legal Updates</div>
          <h3 className="nl-title font-display text-[clamp(22px,3vw,32px)] font-medium italic text-white leading-[1.25] mb-[14px]">Stay Informed on Kenyan Law</h3>
          <p className="nl-sub text-[14px] leading-[1.7] text-white/60 mb-[4px]">Join 2,400+ legal professionals receiving our monthly analysis on Kenyan and East African law — delivered to your inbox.</p>
          <p className="nl-trust text-[11px] text-white/35 mt-[12px]">No spam. Unsubscribe at any time.</p>
        </div>
        <div className="rvr d2">
          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="nl-form flex flex-col gap-[16px]">
              <input 
                className="nl-input bg-transparent border-none border-b border-[rgba(139,28,63,.5)] p-[13px_0] font-body text-[15px] text-white outline-none transition-colors focus:border-[var(--mn-burgundy)] placeholder:text-white/30" 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com" 
                aria-label="Your email address"
                required
              />
              <button type="submit" className="btn-p self-start inline-flex items-center gap-[8px] bg-[var(--mn-burgundy)] border-2 border-[var(--mn-burgundy)] text-white p-[13px_32px] text-[11px] font-semibold tracking-[1.5px] uppercase relative overflow-hidden group">
                <span className="relative z-10">Subscribe to Updates</span>
                <div className="absolute inset-0 bg-[var(--mn-burgundy-dark)] translate-x-[-101%] transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-0"></div>
              </button>
            </form>
          ) : (
            <p className="nl-success block text-[14px] text-white/80 p-[14px_0]">✓ You're subscribed. Welcome to the MN Legal community.</p>
          )}
        </div>
      </div>
    </div>
  );
}
