'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface BlogHeroProps {
  title: string;
  subtitle: string;
}

export default function BlogHero({ title, subtitle }: BlogHeroProps) {
  const [search, setSearch] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/insights/search?q=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <section id="hero" className="min-h-[72vh] bg-[linear-gradient(135deg,#1a2744_0%,#2d3e5f_50%,#1a2744_100%)] flex flex-col justify-center padding-[140px_60px_100px] md:px-[60px] px-[24px] relative overflow-hidden pt-[140px] pb-[100px]">
      {/* ── DECORATIVE ── */}
      <div className="absolute inset-0 opacity-1 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(139,28,63,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(139,28,63,.04) 1px,transparent 1px)', backgroundSize: '80px 80px', maskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%,black 25%,transparent 100%)' }}></div>
      <div className="absolute w-[280px] h-[280px] top-[-60px] right-[-40px] border-2 border-[rgba(139,28,63,.28)] rounded-full pointer-events-none animate-[spin_40s_linear_infinite]"></div>
      <div className="absolute w-[200px] h-[200px] bottom-[-40px] left-[-30px] border-[1.5px] border-[rgba(139,28,63,.18)] rounded-full pointer-events-none animate-[spin_50s_linear_infinite_reverse]"></div>

      <div className="relative z-10 max-w-[820px] mx-auto lg:mx-0 w-full">
        {/* Breadcrumb */}
        <div className="text-[11px] color-[rgba(255,255,255,.4)] tracking-[.5px] mb-[20px] animate-[fup_.7s_var(--ease-expo)_.1s_both]">
           <Link href="/" className="text-white/40 hover:text-white/80 transition-colors">Home</Link>
           <span className="mx-2">/</span>
           <span className="text-white/40">Legal Insights</span>
        </div>

        {/* Tag */}
        <div className="inline-flex items-center gap-[10px] text-[11px] font-medium tracking-[3px] uppercase text-[rgba(255,255,255,.6)] mb-[28px] animate-[fup_.8s_var(--ease-expo)_.15s_both]">
          <span className="w-[6px] h-[6px] rounded-full bg-[var(--mn-burgundy)] animate-[pd_2s_ease-in-out_infinite]"></span>
          Legal Insights & Commentary
        </div>

        {/* Divider */}
        <div className="w-[56px] h-[3px] bg-[var(--mn-burgundy)] mb-[32px] origin-left animate-[sxi_.9s_var(--ease-expo)_.35s_both]"></div>

        <h1 className="font-display text-[clamp(32px,5.5vw,58px)] font-medium italic leading-[1.1] text-white mb-[28px]">
          <span className="block overflow-hidden">
            <span className="block animate-[su_1.1s_var(--ease-expo)_.4s_both]" dangerouslySetInnerHTML={{ __html: title.split('<br>')[0] }}></span>
          </span>
          {title.includes('<br>') && (
            <span className="block overflow-hidden">
              <span className="block animate-[su_1.1s_var(--ease-expo)_.52s_both]" dangerouslySetInnerHTML={{ __html: title.split('<br>')[1] }}></span>
            </span>
          )}
        </h1>

        <p className="text-[17px] font-light leading-[1.75] text-[rgba(255,255,255,.65)] max-w-[500px] mb-[40px] animate-[fup_.9s_var(--ease-expo)_.85s_both]">
          {subtitle}
        </p>

        <form onSubmit={handleSearch} className="flex max-w-[480px] animate-[fup_.9s_var(--ease-expo)_1.05s_both]">
          <input 
            type="search" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search articles - Companies Act, Property, Litigation…" 
            className="flex-1 bg-[rgba(255,255,255,.08)] border border-[rgba(255,255,255,.18)] border-r-0 p-[13px_20px] font-body text-[14px] text-white outline-none transition-all focus:bg-[rgba(255,255,255,.13)] focus:border-[rgba(139,28,63,.6)] placeholder:text-white/35"
          />
          <button type="submit" className="bg-[var(--mn-burgundy)] border border-[var(--mn-burgundy)] p-[13px_20px] text-white text-[15px] hover:bg-[var(--mn-burgundy-dark)] transition-colors">
            ⌕
          </button>
        </form>
      </div>

      <style jsx>{`
        @keyframes pd { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(.7)} }
        @keyframes sxi { from{transform:scaleX(0)} to{transform:scaleX(1)} }
        @keyframes su { from{transform:translateY(110%)} to{transform:translateY(0)} }
        @keyframes fup { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:none} }
      `}</style>
    </section>
  );
}
