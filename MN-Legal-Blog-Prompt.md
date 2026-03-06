# MN LEGAL — BLOG & CONTENT SECTION DEVELOPMENT PROMPT
## Complete Technical Brief for the Legal Insights / Blog Page

---

> **How to use:** Paste this entire document into any AI code generator (Claude, GPT-4, Cursor, v0.dev) or hand directly to a frontend developer. Every decision — layout, components, animations, typography, color, and content rules — is pre-made. Build Section 12's component prompts one at a time for individual pieces, or paste the full document for a complete page build.

---

## 0. THE BRIEF IN ONE SENTENCE

Build the **Legal Insights / Blog section** of the MN Legal website — a premium editorial content hub that positions MN Advocates LLP as the leading thought-leadership voice in Kenyan and East African law, with a full blog listing page, individual article page, category filtering, search, related articles, and newsletter CTA — all built to the exact MN Legal brand identity.

---

## 1. BRAND TOKENS (Inherit from Main Site)

```css
:root {
  --mn-navy:          #1a2744;
  --mn-navy-deep:     #131d33;
  --mn-navy-mid:      #2d3e5f;
  --mn-burgundy:      #8b1c3f;
  --mn-burgundy-dark: #6d1532;
  --mn-burgundy-dim:  rgba(139,28,63,0.12);
  --mn-cream:         #f5f3ef;
  --mn-cream-dark:    #ede9e2;
  --mn-gray:          #3d4a5c;
  --mn-gray-light:    #c9c5bd;
  --text-primary:     #333333;
  --text-secondary:   #666666;
  --text-on-navy:     rgba(255,255,255,0.88);
  --text-on-navy-sub: rgba(255,255,255,0.65);
  --font-display:     'Playfair Display', Georgia, serif;
  --font-body:        'Inter', system-ui, sans-serif;
  --ease-expo:        cubic-bezier(0.16, 1, 0.3, 1);
  --ease-back:        cubic-bezier(0.34, 1.56, 0.64, 1);
  --container-max:    980px;
  --container-read:   740px;   /* Article body reading width */
}
```

---

## 2. BLOG SYSTEM ARCHITECTURE

The content section consists of **four distinct page types**:

```
/insights/              → Blog Listing Page (index)
/insights/[slug]/       → Single Article Page
/insights/category/[x]/ → Category Archive Page  
/insights/search/       → Search Results Page
```

All four share the same Nav, Footer, and brand tokens from the main site.

---

## 3. PAGE 1 — BLOG LISTING PAGE (`/insights/`)

### 3.1 Page Hero (Blog Index Header)

```
Background: navy gradient (same as main site hero)
Height: 420px (not full viewport — this is a section page, not landing)
Padding: 80px 64px

Layout (center or left-aligned):
  1. Section label: "Legal Insights" — burgundy tag with dot
  2. Burgundy divider: 48px × 3px, scaleX reveal on load
  3. H1: Playfair Display, italic, 52px, white
     Copy: "Thought Leadership<br>from MN Advocates LLP"
  4. Subtitle: Inter 17px, white 65%, max-width 520px
     Copy: "Analysis, commentary, and practical guidance
            on Kenyan law and the East African legal landscape."
  5. Search bar (inline with hero or below):
     White/glass input, burgundy search icon button

Decorative:
  - Burgundy circles (same as main hero, 200px + 150px)
  - Grid overlay (same 80px grid at 3% opacity)

Animation:
  - Page entry: burgundy overlay wipes upward
  - Content: staggered fadeUp (label → divider → H1 → subtitle → search)
```

### 3.2 Category Filter Bar

```
Position: sticky, top: 72px (below nav)
Background: white with 1px bottom border (mn-cream-dark)
Padding: 0 64px
z-index: 100

Contents: horizontal scrolling pill/tab list
  - "All Articles" (default active)
  - "Corporate Law"
  - "Litigation"
  - "Property Law"
  - "Employment Law"
  - "Banking & Finance"
  - "Intellectual Property"
  - "Regulatory Updates"
  - "Case Law"

Active state:
  background: mn-burgundy
  color: white
  border-radius: 0 (sharp corners mandatory)

Inactive state:
  background: transparent
  color: text-secondary
  border: 1px solid mn-gray-light
  hover: border-color mn-burgundy, color mn-burgundy

Tab click:
  → Filter article grid (fade out → fade in filtered cards)
  → Update URL param: ?category=corporate-law
  → Smooth 0.4s fade transition on grid items

Article count badge:
  Small number after each category label
  Font: Inter 10px, white 60% (on active) / gray (inactive)
```

### 3.3 Featured Article Block

```
Layout: Full-width, above the article grid
Background: white
Grid: 60/40 split (image left, content right)
Border-bottom: 1px solid mn-cream-dark

Image area (left):
  Aspect ratio: 16/10
  border-radius: 0
  Hover: scale(1.03) over 0.7s expo ease (inside overflow:hidden wrapper)
  Burgundy "Featured" badge: absolute top-left

Content area (right):
  Padding: 52px 60px
  Category tag: burgundy pill
  Date: Inter 12px, text-secondary
  H2: Playfair Display 36px, navy, hover → burgundy
  Excerpt: Inter 16px, text-secondary, 3-line clamp
  "Read Full Article →": burgundy link, arrow rotates -45° on hover
  Author row: avatar circle + name + role

Animation:
  Scroll reveal: image slides in from left, content from right
  Stagger: 0.15s between content children
```

### 3.4 Article Grid

```
Layout: CSS grid, 3 columns
Gap: 1px (burgundy grid lines effect — background: mn-burgundy-dim on container)
Background of container: rgba(139,28,63,0.08)

Each Article Card:
  Background: white
  Padding: 0 (image flush top, content padded below)
  Hover: translateY(-4px), box-shadow deepens

  Image:
    Aspect ratio: 16/9
    border-radius: 0
    Hover: scale(1.04) transition
    Overlay on hover: rgba(26,39,68,0.3) fades in
    Category badge: absolute top-left, burgundy

  Content block:
    Padding: 28px 28px 36px
    Date: Inter 11px, text-secondary, letter-spacing 1px
    Title: Playfair Display 19px, font-weight 600, navy
           hover → color: mn-burgundy
           2-line clamp
    Excerpt: Inter 14px, text-secondary, 3-line clamp, margin-top 12px
    Footer row:
      Left: Author name (Inter 12px, mn-gray)
      Right: Read time badge (Inter 10px, text-secondary)
    Read more link: burgundy, arrow, bottom of card

  Scroll reveal: staggered fadeUp (0.08s between cards)
  
Pagination (below grid):
  Style: numbered + prev/next arrows
  Active page: burgundy background, white text
  Other pages: white bg, navy text, 1px navy border
  Hover: burgundy border + text
  All: border-radius: 0 (sharp corners)
  OR use "Load More" button: btn-outline-navy style
```

### 3.5 Sidebar (optional, for wider layouts)

```
Width: 300px, right side
Sticky: top 100px

Contents (top to bottom):
  1. Search box
  2. Categories list with post counts
  3. Recent articles (3 mini cards: image thumb + title + date)
  4. Newsletter CTA box (navy bg, burgundy button)
  5. Popular tags cloud
```

---

## 4. PAGE 2 — SINGLE ARTICLE PAGE (`/insights/[slug]/`)

This is the most critical page. Every design decision here affects how authoritative and readable the firm appears.

### 4.1 Article Hero

```
Background: navy gradient
Padding: 80px 64px 0
Max-width: none (full bleed)

Layout (centered, max-width 900px):
  1. Breadcrumb: "Home / Insights / Corporate Law" — Inter 11px, white 45%
  2. Category tag: burgundy badge
  3. H1: Playfair Display, italic, clamp(32px, 5vw, 56px), white
     Line-height: 1.15
  4. Subtitle/deck: Inter 18px, white 65%, max-width 680px
  5. Author row:
     - Author avatar (48px circle, navy bg)
     - Author name: Inter 14px, font-weight 600, white
     - Role: Inter 12px, white 55%
     - Date: Inter 12px, white 45%
     - Read time: Inter 12px, white 45%
  6. Social share row: small icon buttons (X, LinkedIn, Copy Link)
     Style: 32px squares, burgundy border, white icon
     Hover: burgundy bg fill

Decorative:
  - Burgundy circles (smaller: 180px + 120px)
  - Grid overlay at 3% opacity

Featured image:
  Width: 100% (bleeds into hero bottom, overlaps with white content area)
  Max-width: 980px, centered, margin: 48px auto 0
  Aspect ratio: 16/9
  border-radius: 0
  Box-shadow: 0 32px 80px rgba(26,39,68,0.35)
  The image visually "floats" between navy hero and white body
```

### 4.2 Article Body Layout

```
Background: white
Max-width: 980px, centered, padding 80px 64px

Layout: 2 columns
  Left: Article content (740px reading width)
  Right: Sticky sidebar (240px)
  Gap: 80px

READING COLUMN (--container-read: 740px):
  Every prose element follows the MN Legal typography spec exactly.
```

### 4.3 Article Typography Rules (Body Content)

```css
/* Article prose — exact specifications */
.article-body {
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  line-height: 1.85;
  color: #333333;
  max-width: 740px;
}

/* H2 in article */
.article-body h2 {
  font-family: 'Playfair Display', serif;
  font-size: 28px;
  font-weight: 600;
  color: #1a2744;
  border-bottom: 2px solid #8b1c3f;
  padding-bottom: 12px;
  margin: 56px 0 24px;
  line-height: 1.3;
}

/* H3 in article */
.article-body h3 {
  font-family: 'Playfair Display', serif;
  font-size: 20px;
  font-weight: 600;
  color: #1a2744;
  margin: 40px 0 16px;
}

/* Paragraph */
.article-body p {
  margin: 0 0 22px;
}

/* Links */
.article-body a {
  color: #8b1c3f;
  border-bottom: 1px solid transparent;
  padding-bottom: 1px;
  transition: border-color 0.3s ease;
}
.article-body a:hover {
  border-color: #8b1c3f;
}

/* Callout box */
.callout {
  background: #f5f3ef;
  border-left: 4px solid #8b1c3f;
  padding: 20px 24px;
  margin: 36px 0;
}
.callout p { margin: 0; font-size: 15px; line-height: 1.75; }

/* Blockquote */
.article-body blockquote {
  border-left: 3px solid #8b1c3f;
  padding: 20px 0 20px 32px;
  margin: 40px 0;
  font-family: 'Playfair Display', serif;
  font-style: italic;
  font-size: 22px;
  color: #1a2744;
  line-height: 1.5;
}
.article-body blockquote cite {
  display: block;
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-size: 12px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #8b1c3f;
  margin-top: 14px;
}

/* Tables */
.article-body table {
  width: 100%;
  border-collapse: collapse;
  margin: 36px 0;
  font-size: 14px;
}
.article-body th {
  background: #1a2744;
  color: white;
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  padding: 14px 16px;
  border-bottom: 2px solid #8b1c3f;
  text-align: left;
}
.article-body td {
  padding: 12px 16px;
  border-bottom: 1px solid #c9c5bd;
  color: #333333;
  line-height: 1.6;
}
.article-body tr:nth-child(even) td {
  background: #f5f3ef;
}
.article-body tr:hover td {
  background: rgba(139,28,63,0.04);
}

/* Ordered/Unordered Lists */
.article-body ul, .article-body ol {
  padding-left: 0;
  margin: 0 0 24px;
  list-style: none;
}
.article-body ul li {
  position: relative;
  padding-left: 20px;
  margin-bottom: 10px;
  line-height: 1.75;
}
.article-body ul li::before {
  content: '';
  position: absolute; left: 0; top: 11px;
  width: 6px; height: 6px; border-radius: 50%;
  background: #8b1c3f;
}
.article-body ol {
  counter-reset: list-counter;
}
.article-body ol li {
  counter-increment: list-counter;
  position: relative;
  padding-left: 28px;
  margin-bottom: 10px;
  line-height: 1.75;
}
.article-body ol li::before {
  content: counter(list-counter) '.';
  position: absolute; left: 0;
  font-family: 'Playfair Display', serif;
  font-size: 14px; font-weight: 600;
  color: #8b1c3f;
}

/* Image captions */
.article-body figure {
  margin: 40px 0;
}
.article-body figcaption {
  font-size: 13px;
  font-style: italic;
  color: #666666;
  margin-top: 12px;
  line-height: 1.6;
}

/* Horizontal rule / divider */
.article-body hr {
  border: none;
  border-top: 1px solid #ede9e2;
  margin: 48px 0;
}
```

### 4.4 Article Sidebar (Sticky)

```
Position: sticky, top: 100px
Width: 240px

Contents (top to bottom):

1. TABLE OF CONTENTS
   Background: mn-cream (#f5f3ef)
   Border-left: 4px solid mn-burgundy
   Padding: 24px 24px
   Title: "Contents" — Inter 10px, uppercase, letter-spacing 2.5px, mn-burgundy
   Links: auto-generated from H2/H3 in article
   Active link: color mn-burgundy, font-weight 500
   Smooth scroll on click
   Border-radius: 0

2. AUTHOR CARD
   Background: white
   Border: 1px solid mn-cream-dark
   Padding: 28px 24px
   Avatar: 56px circle, navy bg
   Name: Playfair Display 16px, navy
   Role: Inter 11px, uppercase, letter-spacing 2px, mn-burgundy
   Bio: Inter 13px, text-secondary, 2-3 sentences

3. SHARE BUTTONS
   Title: "Share this Article" — Inter 10px, uppercase, mn-gray
   Buttons: row of 3 icons (X, LinkedIn, Copy)
   Style: 36px squares, navy border, navy icon
   Hover: navy bg fill, white icon

4. RELATED ARTICLES (2-3 mini cards)
   Image: 80px × 60px thumbnail left
   Title: 2-line clamp, 13px, navy
   Date: 11px, text-secondary
```

### 4.5 Article Footer Components

```
After the article body, before related articles:

1. TAGS ROW
   Label: "Topics:" — Inter 12px, text-secondary
   Tags: pill buttons
     Border: 1px solid mn-gray-light
     Background: white → mn-cream on hover
     Color: text-secondary → mn-navy on hover
     Border-radius: 0 (mandatory)
     Font: Inter 11px, uppercase, letter-spacing 1.5px

2. SOCIAL SHARE ROW (full-width, prominent)
   Background: mn-cream
   Padding: 32px 40px
   Text: "Found this article useful? Share it."
   Playfair italic, navy, 20px
   Buttons: X, LinkedIn, Copy Link — btn-outline-navy style
   Side by side with generous spacing

3. AUTHOR BIO BOX (full-width)
   Background: white
   Border: 1px solid mn-cream-dark
   Border-left: 4px solid mn-burgundy
   Padding: 40px
   Layout: avatar (72px) left + bio right
   Author name: Playfair Display 22px, navy
   Role: Inter 11px, uppercase, mn-burgundy
   Bio: Inter 15px, text-secondary, 2-3 paragraphs
   "View all articles by [Name] →" — burgundy link

4. CTA BOX
   Background: mn-navy gradient
   Padding: 56px 48px
   Heading: Playfair italic, white, 32px
   Copy: "Need legal advice on this topic? Our [practice area] team is ready to help."
   Button: btn-primary (burgundy)
   Decorative burgundy circles in corners
```

### 4.6 Related Articles Section

```
Background: mn-cream
Padding: 80px 64px

Heading: "More from MN Legal" — Playfair, navy, 32px
  + burgundy border-bottom on the heading word

Grid: 3 columns (same card style as blog listing)
Only show articles in same category + 1 random

Scroll reveal: staggered fadeUp
```

---

## 5. PAGE 3 — CATEGORY ARCHIVE PAGE

```
Identical to Blog Listing Page but:
  - Hero H1 changes to: "Corporate Law" (or active category)
  - Hero subtitle: "All articles in the [Category] practice area"
  - Category filter bar: active pill = current category
  - No Featured Article block (replaced by 3-column grid from top)
  - Breadcrumb: "Insights / Corporate Law"
```

---

## 6. PAGE 4 — SEARCH RESULTS PAGE

```
URL: /insights/search/?q=[query]

Hero: Same as blog listing but:
  H1: 'Results for "[search term]"'
  Subtitle: "X articles found"

Results:
  List layout (not grid) — each result is a horizontal card
  Image: 120px × 80px left
  Category tag + title + excerpt + date + read time
  Matching keywords: highlighted in mn-burgundy

No results state:
  Illustration/icon (SVG scales icon in navy)
  Heading: "No articles found"
  Suggestion: "Try searching for Corporate Law, Property, or Litigation"
  Popular articles CTA
```

---

## 7. NEWSLETTER / EMAIL CAPTURE COMPONENT

```
Use in: Blog listing page (between rows 1 and 2 of article grid)
        Single article page (after article body)
        Footer of insights section

Design:
  Background: mn-navy gradient
  Width: full-width (listing page) OR 100% of reading column (article page)
  Padding: 56px 48px
  Border-top + bottom: 1px solid rgba(139,28,63,0.3)
  Decorative circles: 2 × burgundy outline circles, partially off-canvas

Content layout (2-column):
  Left:
    Label: "MN Legal Updates" — burgundy tag
    Heading: Playfair italic, white, 28px
    Copy: "Join 2,400+ legal professionals receiving our monthly
           analysis on Kenyan and East African law."
    Trust note: "No spam. Unsubscribe at any time." — Inter 11px, white 40%
  Right:
    Email input: transparent bg, bottom-border only (1px burgundy)
    Placeholder: "your@email.com" — white 35%
    Submit button: btn-primary (burgundy, sharp corners)

Animation:
  Scroll reveal: left content slides from left, form slides from right
  Input: bottom-border brightens on focus
  Button: dark burgundy fill slides in from left on hover
```

---

## 8. READING PROGRESS & ARTICLE UX FEATURES

### 8.1 Reading Progress Bar

```css
/* 3px burgundy line at TOP of viewport (same as main site scroll bar)
   On article pages: shows reading progress through the article body
   On listing pages: shows page scroll progress */
#reading-progress {
  position: fixed; top: 0; left: 0;
  height: 3px; width: 0%;
  background: #8b1c3f;
  z-index: 9999;
  transition: width 0.08s linear;
}
```

```javascript
// Calculate progress through article body only (not page total)
const articleBody = document.querySelector('.article-body')
window.addEventListener('scroll', () => {
  const rect = articleBody.getBoundingClientRect()
  const total = rect.height - window.innerHeight
  const scrolled = -Math.min(rect.top, 0)
  const pct = Math.min(Math.max(scrolled / total * 100, 0), 100)
  document.getElementById('reading-progress').style.width = pct + '%'
})
```

### 8.2 Estimated Read Time

```javascript
// Auto-calculate from word count
function calcReadTime(articleEl) {
  const words = articleEl.innerText.split(/\s+/).length
  const minutes = Math.ceil(words / 220)
  return `${minutes} min read`
}
```

### 8.3 TOC Auto-Generation

```javascript
// Auto-generate TOC from H2/H3 in article body
function buildTOC() {
  const headings = document.querySelectorAll('.article-body h2, .article-body h3')
  const toc = document.querySelector('.toc-list')
  headings.forEach((h, i) => {
    h.id = h.id || `section-${i}`
    const li = document.createElement('li')
    li.innerHTML = `<a href="#${h.id}" class="toc-link ${h.tagName==='H3'?'toc-sub':''}">${h.textContent}</a>`
    toc.appendChild(li)
  })
}

// Highlight active TOC item on scroll
const tocLinks = document.querySelectorAll('.toc-link')
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      tocLinks.forEach(l => l.classList.remove('active'))
      const active = document.querySelector(`.toc-link[href="#${e.target.id}"]`)
      if (active) active.classList.add('active')
    }
  })
}, { rootMargin: '-20% 0px -75% 0px' })
document.querySelectorAll('.article-body h2, .article-body h3').forEach(h => sectionObserver.observe(h))
```

### 8.4 Copy Link to Clipboard

```javascript
document.querySelector('.btn-copy-link').addEventListener('click', () => {
  navigator.clipboard.writeText(window.location.href)
  const btn = document.querySelector('.btn-copy-link')
  const original = btn.innerHTML
  btn.innerHTML = '✓ Copied'
  btn.style.background = '#1a4a2e'
  setTimeout(() => { btn.innerHTML = original; btn.style.background = '' }, 2500)
})
```

### 8.5 Back to Top Button

```css
#back-to-top {
  position: fixed; bottom: 40px; right: 40px;
  width: 48px; height: 48px;
  background: mn-navy;
  border: 1px solid rgba(139,28,63,0.4);
  color: white; font-size: 18px;
  display: flex; align-items: center; justify-content: center;
  border-radius: 0;   /* Sharp corners mandatory */
  opacity: 0; transform: translateY(16px);
  transition: opacity 0.4s ease, transform 0.4s var(--ease-expo);
  cursor: pointer; z-index: 500;
}
#back-to-top.visible { opacity: 1; transform: translateY(0); }
#back-to-top:hover { background: mn-burgundy; border-color: mn-burgundy; }
```

---

## 9. ANIMATION SPECIFICATIONS FOR BLOG PAGES

| Element | Animation | Trigger | Duration | Easing |
|---------|-----------|---------|----------|--------|
| Page overlay | scaleY 1→0 from top | Page load | 0.9s | ease-expo |
| Hero content | staggered fadeUp | Immediate | 0.8–1.1s | ease-expo |
| Burgundy divider | scaleX 0→1 | Immediate | 0.9s | ease-expo |
| Category filter | fadeDown from above | Load | 0.6s delay 0.5s | ease-expo |
| Article cards | staggered fadeUp | Scroll trigger | 0.8s, 0.08s stagger | ease-expo |
| Featured article | left/right slide in | Scroll trigger | 1s | ease-expo |
| Category filter click | cards fadeOut → fadeIn | Click | 0.3s out + 0.5s in | ease |
| TOC active highlight | color transition | Scroll | 0.3s | ease |
| Reading progress bar | width | Scroll | 0.08s | linear |
| Back-to-top btn | fadeUp | >500px scroll | 0.4s | ease-expo |
| Newsletter form | left/right split reveal | Scroll trigger | 0.9s | ease-expo |
| Article image | scale 1→1.04 | Hover | 0.7s | ease-expo |
| Card lift | translateY 0→-4px | Hover | 0.4s | ease-expo |
| Arrow rotation | rotate 0→-45deg | Hover | 0.4s | ease-back |
| Page transition | scaleY 0→1 (exit) | Link click | 0.5s | ease-expo |

---

## 10. BLOG CONTENT CATEGORIES & TAG SYSTEM

### Categories (Practice Area Aligned)
```
Corporate & Commercial Law     → slug: corporate-law
Litigation & Dispute           → slug: litigation
Conveyancing & Property Law    → slug: property-law
Employment & Labour Law        → slug: employment-law
Banking & Finance Law          → slug: banking-finance
Intellectual Property          → slug: intellectual-property
Regulatory Updates             → slug: regulatory-updates
Case Law Analysis              → slug: case-law
```

### Tag Examples
```
High Court | Court of Appeal | Supreme Court | KRA | CMA | CBK
Contract Law | Due Diligence | Land Registry | Labour Court
Companies Act | Employment Act | Land Act | Banking Act
Nairobi | Mombasa | East Africa | Kenya | Uganda | Tanzania
2025 | 2026 | Amendment | New Law | Court Decision
```

---

## 11. BLOG PAGE SEO & PERFORMANCE RULES

### Meta Tags (Every Article)
```html
<title>[Article Title] | MN Legal — MN Advocates LLP</title>
<meta name="description" content="[150-160 char excerpt, include Kenya/Nairobi]">
<meta name="keywords" content="[practice area], Kenya law, Nairobi advocates, [specific topic]">

<!-- Open Graph (for LinkedIn/social sharing — critical for thought leadership) -->
<meta property="og:title" content="[Article Title]">
<meta property="og:description" content="[excerpt]">
<meta property="og:image" content="[featured image URL, 1200×630px]">
<meta property="og:url" content="https://mnlegal.net/insights/[slug]/">
<meta property="og:type" content="article">
<meta property="article:published_time" content="[ISO 8601 date]">
<meta property="article:author" content="[Author Name]">
<meta property="article:section" content="[Category]">

<!-- Schema Markup -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "[title]",
  "author": { "@type": "Person", "name": "[author]" },
  "publisher": {
    "@type": "LegalService",
    "name": "MN Advocates LLP",
    "url": "https://mnlegal.net"
  },
  "datePublished": "[date]",
  "image": "[image url]"
}
</script>
```

### Performance
- Listing page: Images lazy-load (all are below fold)
- Article page: Featured image `loading="eager"` (above fold), rest `lazy`
- Fonts: preloaded in `<head>` (Playfair Display + Inter)
- Article images: WebP format, `srcset` with 400w/800w/1200w versions
- Target Lighthouse score: 90+ on all four metrics

---

## 12. INDIVIDUAL COMPONENT PROMPTS

Use each of these as a standalone AI prompt for individual components:

---

### PROMPT A — Blog Listing Page (Full)
```
Build the MN Legal blog listing page (/insights/) as a single HTML file.

BRAND: Navy #1a2744 | Burgundy #8b1c3f | Cream #f5f3ef | Text #333333
FONTS: Playfair Display (headlines, italic for hero) + Inter (body)
RULES: border-radius 0 always | no blue links | no rounded buttons | H2 has burgundy border-bottom

INCLUDES:
1. Fixed navy glassmorphic nav (same as main site)
2. Hero: navy gradient, 420px, "Thought Leadership from MN Advocates LLP" italic H1
   - Burgundy decorative circles, grid overlay
   - Inline search bar
3. Sticky category filter bar (8 categories, burgundy active state, sharp corners)
4. Featured article block: 60/40 image+content split, full width
5. Article grid: 3 columns, 1px burgundy gap lines, 6 article cards
   - Each card: image, category tag, date, title, excerpt, author, read time
6. Newsletter strip (navy bg, email capture, between rows 2 and 3 of grid)
7. Pagination: numbered, burgundy active, sharp corners
8. Footer (navy, same as main site)

ANIMATIONS:
- Burgundy overlay page entry wipe
- Scroll progress bar (2px burgundy, fixed top)
- All sections: IntersectionObserver scroll reveal (fadeUp)
- Hero: staggered animation sequence
- Category filter: click → fade cards out/in with 0.3s transition
- Article cards: 0.08s stagger on reveal
- Card hover: translateY(-4px) + image scale(1.04) + arrow rotates -45°

OUTPUT: Single HTML file, embedded CSS + JS, no external deps except Google Fonts.
Populate with 6 realistic MN Legal article examples (Kenya law topics).
```

---

### PROMPT B — Single Article Page (Full)
```
Build a single MN Legal article page as a single HTML file.

BRAND: Navy #1a2744 | Burgundy #8b1c3f | Cream #f5f3ef | Text #333333
FONTS: Playfair Display + Inter (exact type specs from brand guide)

Article title: "Navigating Kenya's New Companies Act: What Directors Must Know in 2026"
Category: Corporate & Commercial Law
Author: M. Mwangi, Senior Partner
Date: 12 February 2026 | Read time: 8 min

INCLUDES:
1. Nav (navy, same as main site)
2. Article hero: navy gradient, featured image floating below
3. Breadcrumb navigation
4. 2-column layout: article body (740px) + sticky sidebar (240px)
5. Sidebar: auto-generated TOC + author card + share buttons + 2 related articles
6. Full article body with ALL component types:
   - Multiple H2 (burgundy border-bottom) and H3 sections
   - Callout box (cream bg, burgundy left border)
   - Blockquote (Playfair italic, burgundy left border)
   - Data table (navy header, cream alternating rows)
   - Ordered and unordered lists (burgundy bullet/number)
   - Figure with figcaption
7. Article footer: tags row + share row + author bio box + CTA box (navy)
8. Related articles (3 cards, cream bg)
9. Footer (navy, same as main site)

FEATURES:
- Reading progress bar (3px burgundy, fixed top, tracks article body only)
- TOC active state updates on scroll
- Back-to-top button (navy, sharp corners, appears after 500px)
- Copy link button
- Estimated read time (auto-calculated)
- Page entry: burgundy overlay wipe

OUTPUT: Single HTML file, all CSS + JS embedded.
Write 1200+ words of realistic article content about Kenya's Companies Act.
```

---

### PROMPT C — Category Filter Component Only
```
Build the MN Legal category filter bar component (HTML + CSS + JS).

BRAND: Navy #1a2744 | Burgundy #8b1c3f | Cream #f5f3ef
FONTS: Inter only (this is a UI component, no Playfair)

Specs:
- Position: sticky, top: 72px (below nav)
- Background: white, border-bottom: 1px solid #ede9e2
- Horizontal scroll on overflow
- 8 category pills: All / Corporate / Litigation / Property / Employment / Banking / IP / Regulatory

Active pill: bg #8b1c3f, white text, border-radius 0
Inactive pill: transparent bg, #666 text, 1px solid #c9c5bd border, border-radius 0
Hover: burgundy border + text

Below the filter: demo article grid (3 cols, 6 cards)
Click filter → fade out non-matching cards (opacity 0, scale 0.97) → fade in matching

Article cards have data-category="corporate" etc for filtering.

OUTPUT: Self-contained HTML component, CSS + JS embedded.
```

---

### PROMPT D — Newsletter Capture Strip
```
Build the MN Legal newsletter capture component.

BRAND: Navy #1a2744 | Burgundy #8b1c3f | Cream #f5f3ef
FONTS: Playfair Display + Inter

Design:
- Full-width strip
- Background: linear-gradient(135deg, #1a2744 0%, #2d3e5f 50%, #1a2744 100%)
- 2-column layout: heading/copy left | email form right
- Burgundy decorative circles (outline only), partially off-canvas
- Grid overlay at 3% opacity

Left:
  "MN Legal Updates" — burgundy tag
  "Stay Informed on Kenyan Law" — Playfair italic, white, 28px
  Copy text below
  "No spam. Unsubscribe anytime." — Inter 11px, white 40%

Right:
  Email input: transparent, bottom-border burgundy, white text
  Submit: btn-primary (burgundy, sharp corners, fill animation)
  Success state: "✓ You're subscribed" with green bg button

Animation:
  Scroll reveal: left slides from left, right from right
  Input focus: border brightens + faint burgundy glow
  Submit hover: dark burgundy fills from left

OUTPUT: Single HTML component file.
```

---

### PROMPT E — Related Articles Component
```
Build the MN Legal related articles section.

BRAND: Navy #1a2744 | Burgundy #8b1c3f | Cream #f5f3ef
FONTS: Playfair Display + Inter

Background: #f5f3ef (cream)
Padding: 80px 64px

Heading: "More from MN Legal"
  Playfair Display, 32px, navy
  "Legal" underlined with burgundy (border-bottom: 3px solid #8b1c3f)

Grid: 3 columns, 1px burgundy gap, article cards
Each card same style as blog listing cards.

Scroll reveal: staggered fadeUp, 0.1s between cards
Card hover: lift + image scale + title color → burgundy

OUTPUT: HTML component with 3 realistic article cards, CSS + JS embedded.
```

---

## 13. CONTENT GUIDELINES FOR AI-GENERATED BLOG COPY

### Article Structure Template
```
TITLE:          [Specific, outcome-focused — not "About Contract Law"]
SUBTITLE:       1-sentence context/stakes statement
CATEGORY TAG:   [Practice Area]
AUTHOR:         [Partner Name], [Role]
READ TIME:      [auto-calculated]
EXCERPT:        2-3 sentences — WHO this affects + WHY it matters now

BODY STRUCTURE:
  Introduction (2 para)   → Problem or change + why readers should care
  Background (1 H2)       → Legal context, history, relevant Act/statute
  Key Changes (1 H2)      → 3-5 specific changes, use ordered list or table
  What This Means (1 H2)  → Practical implications for [specific audience]
  Callout Box             → Most important single takeaway
  Case Example (1 H3)     → Hypothetical or anonymised real scenario
  Action Steps (1 H2)     → What to do NOW — ordered list
  How MN Legal Can Help   → 2 sentences, bridge to consultation CTA
  Disclaimer              → "This article is for informational purposes..."
```

### Copy Voice Rules
- **Lead with impact** — first sentence must name the change/issue and why it matters today
- **Kenya-specific** — always reference specific Kenyan statutes, courts, regulators (KRA, CMA, NLC, CBK, KFCU)
- **No jargon without explanation** — define every Latin term and legal abbreviation
- **Active voice** — "The court held..." not "It was held that..."
- **Specific over vague** — "Section 214(3) of the Companies Act" not "recent legislation"
- **Short paragraphs** — max 4 sentences. Never a wall of text
- **Tables for comparisons** — before/after law changes, jurisdiction comparisons, checklist items

### Article Length Targets
| Article Type | Word Count | Frequency |
|---|---|---|
| News/Update | 600–900 words | Weekly |
| Practice Guide | 1,200–1,800 words | Monthly |
| Case Analysis | 900–1,400 words | As needed |
| Regulatory Alert | 400–700 words | As needed |
| Deep Dive/White Paper | 2,500–4,000 words | Quarterly |

---

## 14. COMPLETE CHECKLIST — BEFORE ANY BLOG PAGE GOES LIVE

**Brand**
- [ ] All buttons: `border-radius: 0`
- [ ] Links: burgundy `#8b1c3f`, never blue
- [ ] H2: `border-bottom: 2px solid #8b1c3f`
- [ ] No pure black `#000000`
- [ ] H1 in hero: Playfair Display italic, white
- [ ] Category tags: burgundy background, white text, sharp corners

**Layout**
- [ ] Article reading column: max-width 740px
- [ ] Sidebar sticky: top 100px
- [ ] TOC auto-generates from H2/H3 in body
- [ ] Featured image floats between hero and body
- [ ] All article components present (callout, blockquote, table, lists)

**Animation**
- [ ] Page entry burgundy overlay wipe
- [ ] Reading progress bar (article page)
- [ ] Scroll progress bar (listing page)
- [ ] All cards: scroll reveal with stagger
- [ ] Category filter: smooth fade transition
- [ ] Back-to-top button appears after 500px

**UX Features**
- [ ] Read time auto-calculated
- [ ] TOC active state on scroll
- [ ] Copy link button works
- [ ] Back-to-top button functional
- [ ] Category filter functional (JS filtering)
- [ ] Mobile: sidebar collapses to bottom of article
- [ ] Mobile: category filter horizontally scrolls

**Performance**
- [ ] Hero image: `loading="eager"`
- [ ] Card images: `loading="lazy"` `decoding="async"`
- [ ] Fonts preloaded
- [ ] Images have explicit `width` and `height` attributes

**SEO**
- [ ] `<title>` and `<meta description>` on every page
- [ ] Open Graph tags on article pages
- [ ] Article Schema JSON-LD
- [ ] Breadcrumb Schema
- [ ] Canonical URL

---

*Document Version: 1.0 — MN Legal Blog & Content Section Prompt*
*Part of the MN Legal Website Development Series*
*Date: March 2026*
