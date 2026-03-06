# MN LEGAL — MASTER WEBPAGE DEVELOPMENT PROMPT
## Complete Technical Brief for Frontend Developer / AI Code Generator

---

> **How to use this prompt:** Paste this entire document into any AI code generator (Claude, GPT-4, Cursor, v0.dev) or hand it to your frontend developer. It contains every decision already made — colors, animations, components, architecture, and copy guidelines. Nothing is left ambiguous.

---

## 0. THE BRIEF IN ONE SENTENCE

Build a **cinematic, premium law firm website** for **MN Legal (MN Advocates LLP)** based in Nairobi, Kenya — using the firm's official navy/burgundy brand identity, high-end scroll-triggered animations, and authoritative editorial typography that positions MN Legal as the most sophisticated law firm in East Africa.

---

## 1. FIRM IDENTITY SNAPSHOT

| Field | Value |
|-------|-------|
| **Firm Name** | MN Legal — MN Advocates LLP |
| **Tagline** | *(to be confirmed — suggest: "Precision. Counsel. Resolve.")* |
| **Location** | Nairobi, Kenya |
| **Phone** | +254 700 325 089 |
| **Email** | info@mnlegal.net |
| **Website** | mnlegal.net |
| **Twitter/X** | @mnlegaladvocate |
| **LinkedIn** | /company/mn-legal |
| **Logo (white/negative)** | `https://mnlegal.net/wp-content/uploads/2021/08/MNL-ADVOCATES-LLP-MN-LEGAL-negative.svg` |

---

## 2. DESIGN TOKENS — SINGLE SOURCE OF TRUTH

Paste this `:root` block at the top of every CSS file. **Never hardcode values** — always reference tokens.

```css
:root {
  /* ── BRAND COLORS ── */
  --mn-navy:          #1a2744;
  --mn-navy-deep:     #131d33;
  --mn-navy-mid:      #2d3e5f;
  --mn-burgundy:      #8b1c3f;
  --mn-burgundy-dark: #6d1532;
  --mn-cream:         #f5f3ef;
  --mn-gray:          #3d4a5c;
  --mn-gray-light:    #c9c5bd;

  /* ── TEXT COLORS ── */
  --text-primary:     #333333;
  --text-secondary:   #666666;
  --text-on-navy:     rgba(255,255,255,0.85);
  --text-on-navy-sub: rgba(255,255,255,0.70);
  --text-link:        #8b1c3f;

  /* ── BACKGROUNDS ── */
  --bg-white:         #ffffff;
  --bg-cream:         #f5f3ef;
  --bg-hero:          linear-gradient(135deg, #1a2744 0%, #2d3e5f 50%, #1a2744 100%);

  /* ── GLASS / OVERLAYS ── */
  --glass-bg:         rgba(26, 39, 68, 0.06);
  --glass-border:     rgba(139, 28, 63, 0.2);

  /* ── TYPOGRAPHY ── */
  --font-display:     'Playfair Display', Georgia, serif;
  --font-body:        'Inter', system-ui, sans-serif;

  /* ── TYPE SCALE ── */
  --type-hero:        clamp(32px, 6vw, 44px);
  --type-h1:          clamp(32px, 5vw, 42px);
  --type-h2:          clamp(24px, 3.5vw, 28px);
  --type-h3:          clamp(18px, 2.5vw, 20px);
  --type-body:        16px;
  --type-small:       14px;
  --type-label:       11px;
  --type-button:      13px;

  /* ── SPACING (8px base grid) ── */
  --space-xs:   8px;
  --space-sm:   16px;
  --space-md:   24px;
  --space-lg:   32px;
  --space-xl:   40px;
  --space-2xl:  50px;
  --space-3xl:  60px;

  /* ── CONTAINERS ── */
  --container-max:    980px;
  --container-read:   800px;
  --container-footer: 600px;

  /* ── ANIMATION EASINGS ── */
  --ease-expo:  cubic-bezier(0.16, 1, 0.3, 1);
  --ease-back:  cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);

  /* ── BORDERS ── */
  --radius-none: 0px;           /* ALL buttons and boxes — sharp corners mandatory */
  --border-accent: 2px solid var(--mn-burgundy);
  --border-light: 1px solid var(--mn-gray-light);
}
```

---

## 3. TYPOGRAPHY SYSTEM

### Font Loading (put in `<head>`)
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

### Type Rules

| Element | Font | Size | Weight | Style | Line-height | Letter-spacing | Color |
|---------|------|------|--------|-------|-------------|----------------|-------|
| Hero H1 | Playfair Display | `--type-hero` | 500 | **Italic** | 1.2 | 0 | White |
| Article H1 | Playfair Display | `--type-h1` | 600 | Normal | 1.25 | 0 | `--mn-navy` |
| H2 | Playfair Display | `--type-h2` | 600 | Normal | 1.3 | 0 | `--mn-navy` + burgundy border-bottom |
| H3 | Playfair Display | `--type-h3` | 600 | Normal | 1.4 | 0 | `--mn-navy` |
| Body | Inter | `--type-body` | 400 | Normal | 1.7 | 0 | `#333333` |
| Caption | Inter | `--type-small` | 400 | Italic | 1.6 | 0 | `#666666` |
| Button | Inter | `--type-button` | 600 | Uppercase | 1 | 1.5px | White or Burgundy |
| Tag/Label | Inter | `--type-label` | 500 | Uppercase | 1.5 | 3px | `--text-on-navy-sub` or Navy |
| Nav Links | Inter | 13px | 500 | Uppercase | 1 | 1px | White or Navy |

### Critical Typography Rules
- H2 **always** has `border-bottom: 2px solid var(--mn-burgundy); padding-bottom: 12px;`
- Hero H1 is **always italic Playfair Display**
- Body text is **never center-aligned**
- Links: `color: var(--mn-burgundy)`, no underline by default, `border-bottom: 1px solid transparent` on hover
- Paragraph margin: `18px` top and bottom
- **Never pure black** (`#000000`) anywhere on the page

---

## 4. COMPONENT SPECIFICATIONS

### 4.1 Navigation Bar
```
Position: fixed, top: 0, full width
Background: rgba(26, 39, 68, 0.92) with backdrop-filter: blur(20px)
Border-bottom: 1px solid rgba(139, 28, 63, 0.15)
Padding: 24px 60px (shrinks to 16px 60px on scroll)
Logo: white SVG (negative version), left-aligned
Links: uppercase Inter 13px, white 70% opacity, burgundy on hover
CTA Button: primary button (burgundy, sharp corners), right side
Mobile: hamburger menu, full-screen navy overlay
Transition: padding shrinks smoothly on scroll (0.4s expo ease)
```

### 4.2 Hero Section
```
Background: linear-gradient(135deg, #1a2744 0%, #2d3e5f 50%, #1a2744 100%)
Min-height: 100vh
Padding: 60px 24px
Content: centered or left-aligned

LAYOUT (top → bottom):
  1. Logo (negative SVG) — animate: fadeUp 0.6s delay 0s
  2. Tag/Label — "ADVOCATES & SOLICITORS" in burgundy badge
  3. Burgundy divider line — 60px × 3px, animate: scaleX from 0 → 1
  4. Hero H1 (italic Playfair) — animate: fadeUp 1s delay 0.3s
  5. Subtitle (Inter 18px, white 70%) — animate: fadeUp 0.8s delay 0.6s
  6. CTA button row — animate: fadeUp 0.8s delay 0.9s
  7. Scroll indicator — animate: fadeUp delay 1.2s

DECORATIVE ELEMENTS:
  Circle 1: 300px, top-right, 20% off-canvas
    border: 2px solid rgba(139, 28, 63, 0.30)
    animation: slow rotation 40s linear infinite + gentle float
  Circle 2: 250px, bottom-left, 30% off-canvas
    border: 2px solid rgba(139, 28, 63, 0.20)
    animation: counter-rotation 50s linear infinite

GRID OVERLAY (subtle):
  background-image: linear-gradient(rgba(139,28,63,0.03) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(139,28,63,0.03) 1px, transparent 1px)
  background-size: 80px 80px
  mask: radial-gradient(ellipse 80% 80% at 50%, black 40%, transparent 100%)

PAGE ENTRY ANIMATION:
  Full-screen burgundy overlay (position: fixed, z-index: 9999)
  On page load: scaleY(1 → 0) from top, duration 0.8s, ease-expo
```

### 4.3 Practice Areas Section
```
Background: white
Layout: CSS grid, 3 columns desktop / 2 tablet / 1 mobile
Gap: 1px (creates grid lines effect)
Grid background: rgba(139, 28, 63, 0.08) — visible as thin burgundy lines

Each Card:
  Background: white
  Padding: 52px 44px
  Border: none (gap creates the border effect)
  Hover: background → #fafaf9, transform: translateY(-4px)
  Transition: 0.4s expo ease

  Card Contents:
    - Number: "01" in Playfair, 14px, burgundy, letter-spacing 0.2em
    - Title: H3 Playfair, navy
    - Description: Inter 15px, #333
    - "Learn More →" link in burgundy (arrow rotates -45° on hover)

  Scroll Reveal: staggered fadeUp, 0.1s delay between cards
  Glow Effect: radial-gradient burgundy glow tracks mouse position inside card

Suggested Practice Areas:
  01 Corporate & Commercial Law
  02 Litigation & Dispute Resolution
  03 Conveyancing & Property Law
  04 Employment & Labour Law
  05 Intellectual Property
  06 Banking & Finance Law
```

### 4.4 About / Firm Values Section
```
Background: var(--mn-navy) gradient
Layout: 2-column (text left, visual right) OR full-width editorial

Left Column:
  - Section label: "EST. — NAIROBI" uppercase tag
  - H2: Playfair, white, no border-bottom (on dark bg)
  - Body text: Inter 16px, white 85%
  - Burgundy CTA button

Right Column / Visual:
  - Large decorative numeral or SVG-drawn scales icon
  - OR stacked stat items (animated counters on scroll)

Stats Row (if used):
  Background: navy, gap: 1px (burgundy grid lines)
  Each stat: white background, centered
    Number: Playfair 56px, burgundy, counts up from 0 on scroll
    Label: Inter 11px uppercase, navy, letter-spacing 3px
  Example stats: "25+ Years" / "500+ Cases" / "98% Success Rate" / "3 Offices"
```

### 4.5 Team / Partners Section
```
Background: var(--mn-cream)
Layout: 3-4 column grid

Each Attorney Card:
  Background: white
  Image: 1:1 ratio, grayscale by default, full color on hover
  Name: H3 Playfair, navy
  Title: Inter 11px uppercase, burgundy, letter-spacing 3px
  Practice Area: Inter 13px, #666
  Hover: lift + image color reveal + burgundy left border appears
```

### 4.6 Testimonials / Quotes
```
Background: white
Layout: Single large quote centered or carousel

Quote Block:
  Font: Playfair Display, 28px italic, navy
  Border-left: 4px solid var(--mn-burgundy)
  Padding-left: 40px
  Attribution: Inter 13px uppercase, burgundy, letter-spacing 2px

Scroll Reveal: fadeUp + slight scale from 0.98 → 1
```

### 4.7 News / Blog Section
```
Background: white or cream
Layout: featured article (large, 2/3 width) + 2 small cards (1/3)

Article Card:
  Image: 16:9, border-radius: 0, loading lazy
  Tag: burgundy badge, uppercase Inter 11px
  Date: Inter 12px, #666
  Title: Playfair 20px, navy — underline on hover (burgundy)
  Excerpt: Inter 14px, #666, 2-line clamp
  "Read More →": burgundy, arrow rotates on hover

Hover: image scales to 1.03, shadow deepens
```

### 4.8 Contact / CTA Section
```
Background: var(--mn-navy) gradient
Padding: 80px 60px
Layout: centered or 2-column (text + form)

Heading: Playfair italic, white, large
Subheading: Inter, white 70%
CTA buttons: row of primary (burgundy) + secondary (outline white)

Contact Details Row:
  Phone / Email / Address
  Each item: icon (SVG) + text, white 85%, spaced evenly
  Hover: burgundy color

Form (if included):
  Inputs: transparent background, bottom-border only (1px burgundy)
  Label: Inter 11px uppercase, white 60%, letter-spacing 2px
  Submit: full-width primary button
  Focus state: bottom-border brightens, subtle glow
```

### 4.9 Footer
```
Background: var(--mn-navy)
Max-width: 600px centered (or full-width 3-column)
Border-top: 1px solid rgba(139, 28, 63, 0.3)
Padding: 60px 40px 40px

Contains:
  - Logo: negative SVG, white
  - Tagline: Inter 13px, white 60%
  - Navigation links: uppercase Inter 11px, white 70%, burgundy on hover
  - Contact: +254 700 325 089 | info@mnlegal.net
  - Social: Twitter @mnlegaladvocate | LinkedIn /company/mn-legal
  - Copyright: © 2025 MN Advocates LLP | Inter 11px, white 40%
  - Disclaimer: Inter 12px italic, white 50%, 600px max-width
```

### 4.10 Buttons (Sharp Corners — Mandatory)
```css
/* Primary */
.btn-primary {
  background: #8b1c3f;
  border: 2px solid #8b1c3f;
  color: #ffffff;
  padding: 14px 32px;
  font-family: 'Inter';
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  border-radius: 0;               /* MANDATORY: no rounded corners */
  position: relative;
  overflow: hidden;
  transition: color 0.4s ease;
}
/* Hover: background fills from left with dark burgundy */
.btn-primary::before {
  content: '';
  position: absolute; inset: 0;
  background: #6d1532;
  transform: translateX(-101%);
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.btn-primary:hover { color: #ffffff; }
.btn-primary:hover::before { transform: translateX(0); }
.btn-primary span { position: relative; z-index: 1; }

/* Secondary (on dark backgrounds) */
.btn-secondary {
  background: transparent;
  border: 2px solid rgba(255,255,255,0.5);
  color: #ffffff;
  /* same font as primary */
  border-radius: 0;
}
.btn-secondary:hover {
  background: rgba(255,255,255,0.1);
  border-color: #ffffff;
}
```

---

## 5. ANIMATION SYSTEM

### 5.1 Page Entry Transition
```javascript
// On page load: burgundy overlay wipes upward and exits
// CSS:
#page-overlay {
  position: fixed; inset: 0;
  background: #8b1c3f;
  z-index: 99999;
  transform: scaleY(1);
  transform-origin: top;
  transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
// JS:
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('page-overlay').style.transform = 'scaleY(0)', 80)
})
```

### 5.2 Scroll-Triggered Reveal System (IntersectionObserver)
```css
/* All elements start hidden */
.reveal {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
}
.reveal.visible { opacity: 1; transform: none; }

/* Staggered children */
.reveal-stagger > * {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
.reveal-stagger.visible > *:nth-child(1) { opacity:1; transform:none; transition-delay: 0s; }
.reveal-stagger.visible > *:nth-child(2) { opacity:1; transform:none; transition-delay: 0.1s; }
.reveal-stagger.visible > *:nth-child(3) { opacity:1; transform:none; transition-delay: 0.2s; }
.reveal-stagger.visible > *:nth-child(4) { opacity:1; transform:none; transition-delay: 0.3s; }
.reveal-stagger.visible > *:nth-child(5) { opacity:1; transform:none; transition-delay: 0.4s; }
.reveal-stagger.visible > *:nth-child(6) { opacity:1; transform:none; transition-delay: 0.5s; }
```

```javascript
// Single observer handles all reveals
const observer = new IntersectionObserver(
  entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
  { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
)
document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => observer.observe(el))
```

### 5.3 Kinetic Typography (Headline Text Reveal)
```css
.clip-reveal { overflow: hidden; }
.clip-reveal-inner {
  display: block;
  transform: translateY(110%);
  transition: transform 1s cubic-bezier(0.16, 1, 0.3, 1);
}
.clip-reveal.visible .clip-reveal-inner { transform: translateY(0); }
.clip-reveal:nth-child(2) .clip-reveal-inner { transition-delay: 0.1s; }
.clip-reveal:nth-child(3) .clip-reveal-inner { transition-delay: 0.2s; }
```

### 5.4 Animated Number Counters
```javascript
function animateCounter(el) {
  const target = parseInt(el.dataset.target)
  const start = performance.now()
  const duration = 2200
  const update = (now) => {
    const progress = Math.min((now - start) / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 4) // ease-out-quart
    el.textContent = Math.round(eased * target).toLocaleString()
    if (progress < 1) requestAnimationFrame(update)
  }
  requestAnimationFrame(update)
}
// Trigger when stat section enters viewport
new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('[data-target]').forEach(animateCounter)
      // observe only once:
      entries[0].target.querySelectorAll('[data-target]').forEach(el => observer.unobserve(el))
    }
  })
}, { threshold: 0.5 }).observe(document.querySelector('.stats-section'))
```

### 5.5 Navigation Shrink on Scroll
```javascript
const nav = document.querySelector('nav')
window.addEventListener('scroll', () => {
  nav.style.padding = window.scrollY > 80 ? '14px 60px' : '24px 60px'
  nav.style.background = window.scrollY > 80
    ? 'rgba(26, 39, 68, 0.97)'
    : 'rgba(26, 39, 68, 0.85)'
})
```

### 5.6 Scroll Progress Bar
```javascript
// 2px burgundy line at very top of viewport
window.addEventListener('scroll', () => {
  const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
  document.getElementById('scroll-progress').style.width = pct + '%'
})
// CSS: position fixed, top 0, height 2px, background #8b1c3f, z-index 9997
```

### 5.7 Card Hover Glow (Mouse Tracking)
```javascript
document.querySelectorAll('.practice-card').forEach(card => {
  const glow = card.querySelector('.card-glow')
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect()
    glow.style.left = (e.clientX - r.left) + 'px'
    glow.style.top  = (e.clientY - r.top)  + 'px'
  })
})
// CSS: .card-glow { position:absolute; width:240px; height:240px; border-radius:50%;
//   background:radial-gradient(circle, rgba(139,28,63,0.1) 0%, transparent 70%);
//   transform:translate(-50%,-50%); pointer-events:none; opacity:0; transition:opacity 0.4s }
// .practice-card:hover .card-glow { opacity:1 }
```

### 5.8 SVG Decorative Line Draw
```css
.draw-path {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  transition: stroke-dashoffset 2s cubic-bezier(0.16, 1, 0.3, 1);
}
.draw-path.drawn { stroke-dashoffset: 0; }
```

### 5.9 Custom Cursor (Optional — Premium Feel)
```javascript
// Dual-layer cursor: small burgundy dot + lagging ring
// Dot: instant follow | Ring: lerp-lagged (0.1 lerp factor)
// On hoverable elements: dot expands to 40px circle
// Works best on desktop — hide on touch devices
```

### 5.10 Smooth Scroll (Lenis)
```javascript
// npm install @studio-freight/lenis
import Lenis from '@studio-freight/lenis'
const lenis = new Lenis({
  duration: 1.3,
  easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true,
  smoothTouch: false  // disable on mobile
})
function raf(time) { lenis.raf(time); requestAnimationFrame(raf) }
requestAnimationFrame(raf)
```

### 5.11 Reduced Motion (Accessibility — Required)
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
  .reveal, .clip-reveal-inner { opacity: 1 !important; transform: none !important; }
}
```

---

## 6. PAGE STRUCTURE & SECTIONS ORDER

```
┌──────────────────────────────────────┐
│  #page-overlay (burgundy entry wipe) │
│  #scroll-progress (2px top bar)      │
│  <nav> (fixed, glassmorphic navy)    │
├──────────────────────────────────────┤
│  HERO                                │
│  · Navy gradient bg                  │
│  · Decorative burgundy circles       │
│  · Animated headline sequence        │
├──────────────────────────────────────┤
│  PRACTICE AREAS                      │
│  · White bg, card grid               │
│  · Scroll-triggered stagger          │
├──────────────────────────────────────┤
│  ABOUT / FIRM STORY                  │
│  · Navy bg, editorial 2-col          │
│  · Animated stat counters            │
├──────────────────────────────────────┤
│  TEAM                                │
│  · Cream bg, attorney cards          │
├──────────────────────────────────────┤
│  TESTIMONIALS                        │
│  · White bg, quote block             │
├──────────────────────────────────────┤
│  NEWS / INSIGHTS                     │
│  · Cream bg, editorial cards         │
├──────────────────────────────────────┤
│  CTA / CONTACT                       │
│  · Navy bg, form or contact info     │
├──────────────────────────────────────┤
│  <footer>                            │
│  · Navy bg, negative logo            │
└──────────────────────────────────────┘
```

---

## 7. RECOMMENDED TECH STACK

| Layer | Technology | Why |
|-------|------------|-----|
| **Framework** | Next.js 14 (App Router) | SEO, performance, file-based routing |
| **Styling** | TailwindCSS + CSS tokens | Utility classes + brand consistency |
| **Animations** | GSAP + ScrollTrigger | Industry standard for scroll choreography |
| **Smooth Scroll** | Lenis.js | Makes the whole site feel premium instantly |
| **3D (optional)** | React Three Fiber | If adding 3D scales of justice or abstract hero |
| **CMS** | Sanity.io or WordPress (existing) | Blog/team/case content |
| **Fonts** | Google Fonts (Playfair + Inter) | Already confirmed brand fonts |
| **Deployment** | Vercel | Best performance for Next.js |
| **Forms** | Formspree or Netlify Forms | Contact form without backend |
| **Analytics** | Google Analytics 4 + Hotjar | Track user behavior |

---

## 8. SEO & PERFORMANCE RULES

### Performance
- Hero image: `loading="eager"`, `decoding="sync"`, explicit `width` + `height`
- Below-fold images: `loading="lazy"`, `decoding="async"`
- Always include `srcset` and `sizes` for responsive images
- Preload hero fonts in `<head>`: `<link rel="preload" as="font">`
- Target Core Web Vitals: LCP < 2.5s, CLS < 0.1, FID < 100ms
- Defer all non-critical JS

### Animation Performance
- **Only animate**: `transform`, `opacity` (GPU composited — never causes reflow)
- **Never animate**: `width`, `height`, `top`, `left`, `margin`, `padding`
- Add `will-change: transform` to elements before animation, remove after
- Cap particle/canvas animations: max 150 particles, pause when tab not visible
- Test on throttled CPU (4x slowdown in Chrome DevTools) before launch

### SEO
- Every page: unique `<title>`, `<meta description>`, canonical URL
- Schema markup: `LegalService`, `LocalBusiness`, `Attorney`
- Open Graph tags for social sharing
- Sitemap.xml + robots.txt
- Nairobi, Kenya local keywords in meta descriptions

---

## 9. VISUAL RULES — ABSOLUTE PROHIBITIONS

These must never appear on any MN Legal page:

| ❌ NEVER | ✅ INSTEAD |
|----------|------------|
| Pure black `#000000` | Use `#333333` for text |
| Blue links | Burgundy `#8b1c3f` only |
| Rounded buttons (border-radius > 0) | Sharp corners mandatory |
| Burgundy as large background | Navy only for dark backgrounds |
| Center-aligned body paragraphs | Left-aligned always |
| Generic gradient `purple → blue` | Navy `#1a2744` gradient only |
| Gradients outside hero sections | Solid colors for all other sections |
| Arial, Roboto, system-ui for headlines | Playfair Display only |
| Inter for display headings | Only for body/UI text |

---

## 10. CONTENT GUIDELINES FOR AI-GENERATED COPY

When generating copy for any section of the MN Legal website:

**Voice & Tone**
- Authoritative but approachable — never cold or bureaucratic
- Precise language — legal precision carries into the writing
- Kenyan context — reference East African legal landscape, Nairobi, Kenya
- No jargon without explanation — clients are sophisticated but not always lawyers

**Headline Style**
- Short, declarative: *"Justice, Precisely Delivered"*
- May use italic Playfair for emotional weight
- Avoid clichés like "Your Trusted Legal Partner"

**Practice Area Descriptions**
- Lead with client outcome, not process
- 2–3 sentences maximum for cards
- Include one specific example or context (e.g., "from Nairobi Commercial Court to international arbitration")

**CTAs**
- Specific over generic: *"Speak to a Partner"* not *"Contact Us"*
- Create urgency without pressure: *"Schedule a Confidential Consultation"*

---

## 11. COMPLETE QUICK-REFERENCE CHECKLIST

Before any page goes live, verify every item:

**Brand**
- [ ] Logo is white/negative version on all dark backgrounds
- [ ] No logo filter needed if using negative SVG directly
- [ ] Burgundy used as accent only (~10% visual space)

**Typography**
- [ ] Hero H1 is Playfair Display, italic, white
- [ ] All H2s have `border-bottom: 2px solid #8b1c3f`
- [ ] Body text is Inter 16px `#333333`
- [ ] No pure black anywhere
- [ ] Links are burgundy, not blue

**Components**
- [ ] All buttons: `border-radius: 0` (sharp corners)
- [ ] Callout boxes: cream bg + left burgundy border
- [ ] CTA boxes: navy bg + white text
- [ ] Table headers: navy + white text + burgundy border-bottom
- [ ] Footer: navy bg + negative logo + white text

**Animation**
- [ ] Page entry overlay (burgundy wipe) present
- [ ] Scroll progress bar (2px burgundy, fixed top)
- [ ] All content sections have `.reveal` class
- [ ] Hero has staggered animation sequence
- [ ] Stat counters animate on scroll
- [ ] Reduced motion CSS media query present
- [ ] No animations on `width/height/margin/padding`

**Performance**
- [ ] Hero images `loading="eager"`
- [ ] Below-fold images `loading="lazy"` `decoding="async"`
- [ ] Fonts preloaded in `<head>`
- [ ] `will-change` removed after animations complete

**SEO**
- [ ] `<title>` and `<meta description>` on every page
- [ ] Open Graph tags present
- [ ] Schema markup: LegalService + LocalBusiness
- [ ] Nairobi / Kenya keywords in descriptions

---

## 12. SAMPLE PROMPT FOR CODE GENERATION

> Use the following when prompting an AI to build a specific page or component:

```
Build a [COMPONENT/PAGE] for MN Legal (MN Advocates LLP), a premium law firm in Nairobi, Kenya.

STRICT BRAND RULES:
- Colors: Navy #1a2744, Burgundy #8b1c3f, Cream #f5f3ef, Text #333333
- Fonts: Playfair Display (headlines, italic for hero) + Inter (body, buttons)
- Buttons: ALWAYS border-radius: 0 (sharp corners), never rounded
- Links: ALWAYS burgundy, never blue
- No pure black (#000000) anywhere
- H2 always has border-bottom: 2px solid #8b1c3f

ANIMATION REQUIREMENTS:
- Page entry: burgundy overlay wipes upward on load
- All sections: IntersectionObserver scroll reveal (fadeUp, opacity 0→1)
- Hero: staggered animation sequence (0.2s delay between elements)
- Decorative burgundy circles in hero (outline only, 30% and 20% opacity)
- Buttons: fill animation (dark burgundy slides in from left on hover)

BUILD: [describe the specific component here]

OUTPUT: Single HTML file with embedded CSS and JS. No external dependencies except Google Fonts.
```

---

*Document Version: 2.0 — MN Legal Webpage Master Prompt*
*Combines: MN Legal Brand Identity Guide v1.0 + Frontend Design Blueprint*
*Date: 2026*
