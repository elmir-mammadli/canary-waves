# Strapi CMS Setup For Canary Waves

The home page is a **Page** collection entry (`slug: home`) with a **dynamic zone** of section components.

`Navbar`, `Footer`, and `RequestDemoModal` stay in code.

---

## Monorepo layout

- `./` — Next.js frontend
- `./cms` — Strapi backend

```bash
npm run dev:cms   # Strapi on :1337
npm run dev       # Next.js
```

---

## Environment variables

Copy `.env.example` to `.env.local`:

- `NEXT_PUBLIC_STRAPI_URL` — e.g. `http://localhost:1337`
- `STRAPI_API_TOKEN` — optional locally, recommended in production
- `STRAPI_CONTENT_STATUS` — `draft` or `published`
- `STRAPI_REVALIDATE` — seconds (`0` = no-store)

---

## Content model

### Collection: `Page`

| Field | Type |
|-------|------|
| `title` | Text |
| `slug` | UID (use `home` for the landing page) |
| `sections` | Dynamic zone |

### Section components (`sections.*`)

| Component | Purpose |
|-----------|---------|
| `sections.hero` | Hero image, label, heading, CTAs, proof bullets |
| `sections.platform` | Platform copy, pillars, callout quote |
| `sections.signals` | Signal rows (tag, kicker, image, flip) |
| `sections.workflow` | Four workflow steps + CTA label |
| `sections.why-us` | Why teams adopt it proof cards |
| `sections.impact` | Ring stats + “Incident prevention levels…” copy |
| `sections.team` | Team intro + members (with `bio` in CMS, optional in UI) |
| `sections.contact` | Contact copy + bullets (form is in code) |
| `sections.faq` | FAQ items |

### Shared components

- `shared.text-item`, `shared.workflow-step`, `shared.stat-item`, `shared.faq-item`
- `shared.team-member` (includes `bio`)
- `sections.signal-item`, `sections.why-card`

---

## Permissions

In Strapi Admin → Settings → Users & Permissions → Roles → **Public**:

- **Page**: enable `find` and `findOne`
- **Form Submission**: enable `create` (for contact form)

---

## API

```http
GET /api/pages?filters[slug][$eq]=home&populate[sections][populate]=*
```

Frontend: `getPageBySlug('home')` in `src/lib/strapi-page.ts`.

Defaults when Strapi is unavailable: `src/lib/page-content.ts` → `defaultHomePage`.

---

## First-time seed

On CMS bootstrap, a published `home` page is created automatically if none exists (`cms/src/bootstrap/seed-home-page.ts`).

To edit sections: Strapi Admin → **Content Manager** → **Page** → **Home** → reorder/add sections in the dynamic zone.

---

## Troubleshooting

- **Still seeing old defaults**: check `STRAPI_CONTENT_STATUS` matches your entry status (draft vs published).
- **Images missing**: upload media in Strapi for hero/signals/why cards/team; local defaults use `/public/images/*`.
- **Empty sections**: ensure each dynamic-zone block has required fields filled before publish.
