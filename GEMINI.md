# MN Legal — Webpage Development Context

This directory contains the foundational design system and technical brief for the **MN Legal (MN Advocates LLP)** website development project.

## Project Overview
The goal of this project is to build a cinematic, premium law firm website for MN Legal, based in Nairobi, Kenya. The design focuses on an authoritative, sophisticated editorial aesthetic using a navy and burgundy brand identity with high-end scroll-triggered animations.

**Key Technologies (Target Stack):**
- **Framework:** Next.js 14 (App Router)
- **Styling:** TailwindCSS + Custom CSS Tokens (Vanilla CSS preferred for core tokens)
- **Animations:** GSAP + ScrollTrigger, Lenis.js for smooth scrolling
- **Typography:** Playfair Display (Headlines) & Inter (Body)

## Key Files
- `MN-Legal-Webpage-Master-Prompt.md`: The "Single Source of Truth." This file contains all design tokens, component specifications, typography rules, animation logic, and brand prohibitions. **Consult this file before making any UI or architectural decisions.**
- `GEMINI.md`: This file (instructional context).

## Development & Design Conventions

### 1. Visual Prohibitions (Strict)
- **NO Rounded Corners:** All buttons and boxes must have `border-radius: 0`. Sharp corners are mandatory.
- **NO Pure Black:** Use `#333333` for primary text. Never use `#000000`.
- **NO Blue Links:** All links must be Burgundy (`#8b1c3f`).
- **NO Center-Aligned Body Text:** Body paragraphs must always be left-aligned.
- **NO Generic Gradients:** Only use the specific Navy gradients defined in the tokens.

### 2. Design Tokens (CSS Variables)
Always use the following CSS variables defined in `MN-Legal-Webpage-Master-Prompt.md`:
- `--mn-navy`: `#1a2744`
- `--mn-burgundy`: `#8b1c3f`
- `--mn-cream`: `#f5f3ef`
- `--font-display`: `'Playfair Display', Georgia, serif`
- `--font-body`: `'Inter', system-ui, sans-serif`

### 3. Typography Rules
- **Hero H1:** Always *italic* Playfair Display.
- **H2 Headlines:** Must have a 2px burgundy bottom border: `border-bottom: 2px solid var(--mn-burgundy); padding-bottom: 12px;`.

### 4. Animation Standards
- **Page Entry:** A burgundy overlay should wipe upward on load.
- **Scroll Reveal:** Use `IntersectionObserver` or GSAP ScrollTrigger for staggered `fadeUp` animations on all sections.
- **Performance:** Only animate `transform` and `opacity`.

## Building and Running
*Note: Currently, this project is in the design/briefing phase. No code has been scaffolded yet.*

**Proposed Commands (Once scaffolded with Next.js):**
- `npm run dev`: Start development server.
- `npm run build`: Build for production.
- `npm run start`: Start production server.

## Usage
When interacting with Gemini CLI for this project:
1. Refer to `MN-Legal-Webpage-Master-Prompt.md` for specific component implementation details.
2. Use the "Sample Prompt for Code Generation" section in the master prompt when asking to build specific sections.
3. Ensure all generated code adheres to the "Visual Rules" and "Typography System" documented in the master prompt.
