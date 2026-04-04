# Canary Waves

Marketing landing page for **Canary Waves** — a mine-site safety technology company focused on equipment communication, hazard identification, and contractor oversight.

Built with [Next.js 14](https://nextjs.org/), [React 18](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), and [Tailwind CSS v4](https://tailwindcss.com/).

---

## Sections

| Section | Description |
|---|---|
| **Navbar** | Responsive navigation with mobile hamburger menu and "Request Demo" CTA |
| **Hero** | CMS editable (Strapi) |
| **About / Platform** | CMS editable (Strapi) |
| **Features / Signals** | CMS editable (Strapi) |
| **How It Works / Workflow** | CMS editable (Strapi) |
| **Why Us** | CMS editable (Strapi) |
| **Team** | CMS editable (Strapi) |
| **FAQ** | CMS editable (Strapi) |
| **CTA Form** | Static (not CMS editable) |
| **Footer** | Static (not CMS editable) |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install

```bash
npm install
```

Install CMS dependencies (already scaffolded in `cms/`):

```bash
npm install --prefix cms
```

If you need to recreate the Strapi app from scratch:

```bash
npx create-strapi-app@latest cms --ts --use-npm --install --skip-cloud --no-run --non-interactive
```

### Dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Run Strapi CMS locally:

```bash
npm run dev:cms
```

Run both web and CMS together:

```bash
npm run dev:all
```

### Strapi CMS

To make section content editable for non-technical users, this project reads section content from Strapi.

Setup guide: [STRAPI_SETUP.md](./STRAPI_SETUP.md)

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
│   ├── CTAForm.tsx
│   ├── Team.tsx
│   ├── FAQ.tsx
│   ├── RequestDemoModal.tsx
│   └── Footer.tsx
└── lib/
    ├── fonts.ts          # Custom font configuration
    ├── landing-content.ts # CMS section types + local defaults
    └── strapi.ts         # Strapi fetch + response mapping
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
