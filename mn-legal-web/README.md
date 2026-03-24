# ⚖️ MN LEGAL (MN Advocates LLP) 🇰🇪
### Premium Headless Legal Insights & Corporate Portal

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fzackseal89%2FMNL-SITE&env=WORDPRESS_API_URL&project-name=mn-legal-web&repository-name=mnl-site)

---

## 🏛️ Vision
A cinematic, high-authority digital experience for **MN Advocates LLP**, a premier law firm based in Nairobi, Kenya. This platform merges sophisticated editorial design with a cutting-edge headless architecture, delivering legal insights with the precision and prestige the firm represents.

## 🛠️ Tech Stack
| Layer | Technology |
| :--- | :--- |
| **Frontend** | [Next.js 15+](https://nextjs.org/) (App Router) |
| **Styling** | [TailwindCSS 4.0](https://tailwindcss.com/) + Custom CSS Tokens |
| **Animations** | [GSAP](https://greensock.com/gsap/) + ScrollTrigger |
| **Smooth Scroll** | [Lenis.js](https://github.com/darkroomengineering/lenis) |
| **CMS** | [Headless WordPress](https://wordpress.org/) (via WPGraphQL) |
| **Typography** | Playfair Display (Serif) & Inter (Sans) |

---

## 🎨 Design Philosophy
The site adheres to strict **MN Legal Brand Mandates**:
- **Navy & Burgundy Palette:** High-contrast, authoritative corporate colors.
- **Editorial Typography:** Large, italicized serif headlines for a "law review" aesthetic.
- **Sharp Precision:** `border-radius: 0` on all elements. No rounded corners.
- **Cinematic Motion:** Staggered scroll reveals and smooth page transitions.

---

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/zackseal89/MNL-SITE.git
cd MNL-SITE/mn-legal-web
```

### 2. Environment Setup
Create a `.env.local` file in the `mn-legal-web` directory:
```env
WORDPRESS_API_URL=https://wp.mnlegal.net/graphql
```

### 3. Install & Run
```bash
npm install
npm run dev
```
Visit `http://localhost:3000` to view the portal.

---

## 🔌 Headless Integration Guide

### WordPress Setup
To sync content, ensure the following plugins are active on your WordPress instance:
1. **WPGraphQL**: Exposes your data via `/graphql`.
2. **Advanced Custom Fields (ACF)**: For "Read Time", "Author Role", and "Practice Area" metadata.
3. **Yoast SEO**: Metadata is automatically mapped to Next.js head tags.

### Content Mapping
All WordPress nodes are transformed via `lib/mapper.ts` to ensure type-safety and clean props for React components.

---

## 📂 Project Structure
```text
mn-legal-web/
├── app/                  # Next.js App Router (Pages & API)
│   ├── components/       # Premium UI Components (GSAP integrated)
│   ├── insights/         # Dynamic Blog & Article Engine
│   └── globals.css       # Core Design Tokens (Navy/Burgundy)
├── lib/                  # Data Fetching & Content Mappers
├── public/               # Brand Assets & Static Media
└── next.config.ts        # Image Host Whitlisting (Unsplash, Gravatar, WP)
```

---

## ⚖️ Legal
&copy; 2026 MN Advocates LLP. Developed with a focus on high-performance legal tech.
