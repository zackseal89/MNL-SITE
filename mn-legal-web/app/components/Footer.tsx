'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[var(--mn-navy-deep)] p-[64px_60px_36px] border-t border-[rgba(139,28,63,.22)] md:px-[60px] px-[24px]">
      <div className="foot-top grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-[52px] mb-[52px]">
        <div>
          <div className="foot-brand-name font-display text-[1.3rem] font-medium italic text-white tracking-[.04em] mb-[6px]">MN Legal</div>
          <div className="foot-brand-sub text-[9px] font-normal tracking-[3px] uppercase text-white/30 mb-[18px]">MN Advocates LLP</div>
          <p className="foot-tagline text-[13px] leading-[1.7] text-white/40 max-w-[260px] mb-[24px]">Precision. Counsel. Resolve. — Serving Kenya and East Africa from Nairobi.</p>
          <div className="foot-social flex gap-[10px]">
            {['𝕏', 'in', '✉'].map((icon, i) => (
              <a 
                key={i} 
                href={icon === '𝕏' ? "https://twitter.com/mnlegaladvocate" : (icon === 'in' ? "https://linkedin.com/company/mn-legal" : "mailto:info@mnlegal.net")} 
                className="soc-btn w-[34px] h-[34px] border border-[rgba(139,28,63,.3)] flex items-center justify-center text-white/45 text-[12px] transition-all duration-300 hover:bg-[var(--mn-burgundy)] hover:border-[var(--mn-burgundy)] hover:text-white"
                target={icon !== '✉' ? "_blank" : undefined}
                rel={icon !== '✉' ? "noopener" : undefined}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
        
        <div>
          <div className="foot-col-ttl text-[10px] font-semibold tracking-[2.5px] uppercase text-white/30 mb-[20px]">Practice Areas</div>
          <ul className="foot-links flex flex-col gap-[11px]">
            {['Corporate & Commercial', 'Litigation', 'Conveyancing', 'Employment Law', 'Banking & Finance', 'Intellectual Property'].map((link: string) => (              <li key={link}>
                <Link href="/#practices" className="text-[13px] text-white/50 transition-colors duration-300 hover:text-white/85">
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="foot-col-ttl text-[10px] font-semibold tracking-[2.5px] uppercase text-white/30 mb-[20px]">Insights</div>
          <ul className="foot-links flex flex-col gap-[11px]">
            {['All Articles', 'Corporate Law', 'Litigation', 'Property Law', 'Employment'].map((link: string) => (
              <li key={link}>
                <Link href="/insights" className="text-[13px] text-white/50 transition-colors duration-300 hover:text-white/85">
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="foot-col-ttl text-[10px] font-semibold tracking-[2.5px] uppercase text-white/30 mb-[20px]">Contact</div>
          <ul className="foot-links flex flex-col gap-[11px]">
            <li><a href="tel:+254700325089" className="text-[13px] text-white/50 transition-colors duration-300 hover:text-white/85">+254 700 325 089</a></li>
            <li><a href="mailto:info@mnlegal.net" className="text-[13px] text-white/50 transition-colors duration-300 hover:text-white/85">info@mnlegal.net</a></li>
            <li><a href="https://mnlegal.net" className="text-[13px] text-white/50 transition-colors duration-300 hover:text-white/85" target="_blank" rel="noopener">mnlegal.net</a></li>
            <li><span className="text-[13px] text-white/35">Nairobi, Kenya</span></li>
          </ul>
        </div>
      </div>

      <div className="foot-bottom border-t border-white/5 pt-[28px] flex flex-wrap items-center justify-between gap-[12px]">
        <p className="foot-copy text-[11px] text-white/30">© 2026 MN Advocates LLP. All rights reserved.</p>
        <p className="foot-disc text-[11px] italic text-white/20 max-w-[560px] md:text-right text-left">The content on this website is for general information only and does not constitute legal advice. Consult a qualified advocate for advice specific to your circumstances.</p>
      </div>
    </footer>
  );
}
