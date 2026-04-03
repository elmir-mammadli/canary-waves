# Canary Waves

Marketing landing page for **Canary Waves** — a mine-site safety technology company focused on equipment communication, hazard identification, and contractor oversight.

Built with [Next.js 14](https://nextjs.org/), [React 18](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), and [Tailwind CSS v4](https://tailwindcss.com/).

---

## Sections

| Section | Description |
|---|---|
| **Navbar** | Responsive navigation with mobile hamburger menu and "Request a Demo" CTA |
| **Hero** | Full-width hero with headline, subtext, and call-to-action |
| **About** | Brief introduction to what Canary Waves is |
| **Features** | Three feature rows (alternating image/text layout) covering key product capabilities |
| **How It Works** | Step-by-step breakdown of the platform workflow |
| **Why Us** | Differentiators and value proposition |
| **Stats** | Key metrics and impact numbers |
| **CTA Form** | Demo request form |
| **Team** | Team member profiles |
| **FAQ** | Frequently asked questions |
| **Footer** | Links and company info |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install

```bash
npm install
```

### Dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

---

## Project Structure

```
src/
├── app/
│   ├── globals.css       # Global styles and Tailwind imports
│   ├── layout.tsx        # Root layout with font setup
│   └── page.tsx          # Page composition (assembles all sections)
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Features.tsx
│   ├── HowItWorks.tsx
│   ├── WhyUs.tsx
│   ├── Stats.tsx
│   ├── CTAForm.tsx
│   ├── Team.tsx
│   ├── FAQ.tsx
│   └── Footer.tsx
└── lib/
    └── fonts.ts          # Custom font configuration
public/
├── canary_waves_logo.svg
└── images/
    ├── hero.avif
    ├── feature-1.avif
    ├── feature-2.avif
    └── feature-3.avif
```

---

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 + inline styles
- **Images:** Next.js `<Image>` component with AVIF format
- **Fonts:** Custom via `next/font`

---

## Color Palette

| Role | Hex |
|---|---|
| Background (warm cream) | `#f4ebda` |
| Primary text / dark | `#1f1716` |
| Brand brown | `#9c5230` |
| Navbar / muted brown | `#897465` |
| Accent yellow | `#ffbe56` |
