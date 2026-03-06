'use client';

export default function ContactSection() {
  return (
    <section id="contact" className="bg-[var(--mn-navy)] py-24 px-6 md:px-16 relative overflow-hidden">
      {/* Subtle Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,28,63,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(139,28,63,0.02)_1px,transparent_1px)] bg-[size:60px_60px]"></div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <span className="text-[var(--mn-burgundy)] text-[11px] font-semibold uppercase tracking-[0.2em] mb-4 block">
              Direct Access
            </span>
            <h2 className="text-[clamp(32px,5vw,52px)] font-display italic text-white leading-tight border-none pb-0 mb-8">
              Initiate a Confidential <br /> Consultation
            </h2>
            <p className="text-[18px] text-white font-body leading-relaxed max-w-[500px] mb-12 font-medium">
              Our partners are available for urgent legal matters and strategic advisory. Reach out to discuss your specific requirements.
            </p>
            
            <div className="space-y-8">
              <div className="group">
                <span className="block text-[11px] uppercase text-white/60 tracking-[2px] mb-1 font-bold">General Inquiry</span>
                <a href="mailto:info@mnlegal.net" className="text-[24px] font-display text-white group-hover:text-[var(--mn-burgundy)] transition-colors border-none p-0">
                  info@mnlegal.net
                </a>
              </div>
              <div className="group">
                <span className="block text-[11px] uppercase text-white/60 tracking-[2px] mb-1 font-bold">Nairobi Office</span>
                <a href="tel:+254700325089" className="text-[24px] font-display text-white group-hover:text-[var(--mn-burgundy)] transition-colors border-none p-0">
                  +254 700 325 089
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/20 p-10 md:p-12">
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[11px] uppercase tracking-[2px] text-white/80 font-bold">Full Name</label>
                  <input type="text" className="w-full bg-transparent border-b border-white/40 py-3 text-white focus:outline-none focus:border-[var(--mn-burgundy)] transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] uppercase tracking-[2px] text-white/80 font-bold">Email Address</label>
                  <input type="email" className="w-full bg-transparent border-b border-white/40 py-3 text-white focus:outline-none focus:border-[var(--mn-burgundy)] transition-colors" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-[2px] text-white/80 font-bold">Legal Matter Type</label>
                <select className="w-full bg-transparent border-b border-white/40 py-3 text-white focus:outline-none focus:border-[var(--mn-burgundy)] transition-colors appearance-none">
                  <option className="bg-[var(--mn-navy)]">Corporate & Commercial</option>
                  <option className="bg-[var(--mn-navy)]">Litigation</option>
                  <option className="bg-[var(--mn-navy)]">Conveyancing</option>
                  <option className="bg-[var(--mn-navy)]">Intellectual Property</option>
                  <option className="bg-[var(--mn-navy)]">Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-[2px] text-white/80 font-bold">Brief Summary</label>
                <textarea rows={4} className="w-full bg-transparent border-b border-white/40 py-3 text-white focus:outline-none focus:border-[var(--mn-burgundy)] transition-colors resize-none"></textarea>
              </div>
              <button className="w-full bg-[var(--mn-burgundy)] text-white text-[13px] font-bold uppercase tracking-[3px] py-5 hover:bg-[var(--mn-burgundy-dark)] transition-colors duration-500 border border-[var(--mn-burgundy)]">
                Submit Inquiry
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
