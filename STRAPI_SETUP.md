# Strapi CMS Setup For Canary Waves

This project reads editable section content from Strapi for:

- Hero
- Platform (About)
- Signals (Features)
- Workflow
- Why Us
- Team
- FAQ

`Navbar`, `Footer`, and `CTA form` are intentionally **not** CMS-driven.

---

## 1) Environment Variables

Create `.env.local` from `.env.example`:

```bash
cp .env.example .env.local
```

Set:

- `NEXT_PUBLIC_STRAPI_URL` (example: `http://localhost:1337`)
- `STRAPI_API_TOKEN` (optional but recommended for production)

---

## 2) Create Strapi Components

Create these reusable components in Strapi:

1. `shared.text-item`
- `text` (Text)

2. `shared.feature-item`
- `title` (Text)
- `summary` (Text)
- `image` (Media, single)
- `imageAlt` (Text, optional)

3. `shared.workflow-step`
- `step` (Text, example: `01`)
- `title` (Text)
- `description` (Text)

4. `shared.team-member`
- `name` (Text)
- `role` (Text)
- `image` (Media, single)
- `imageAlt` (Text, optional)

5. `shared.faq-item`
- `question` (Text)
- `answer` (Text)

---

## 3) Create Single Types (exact API IDs)

Create these Single Types with exact API IDs:

1. `hero-section`
- `brand` (Text)
- `heading` (Text)
- `subheading` (Text)
- `primaryCtaLabel` (Text)
- `secondaryCtaLabel` (Text)
- `notes` (Repeatable component: `shared.text-item`)
- `image` (Media, single)

2. `about-section`
- `eyebrow` (Text)
- `title` (Text)
- `description` (Text)
- `pillars` (Repeatable component: `shared.text-item`)

3. `signals-section`
- `eyebrow` (Text)
- `title` (Text)
- `items` (Repeatable component: `shared.feature-item`)

4. `workflow-section`
- `eyebrow` (Text)
- `title` (Text)
- `ctaLabel` (Text)
- `steps` (Repeatable component: `shared.workflow-step`)

5. `why-us-section`
- `eyebrow` (Text)
- `title` (Text)
- `items` (Repeatable component: `shared.feature-item`)

6. `team-section`
- `eyebrow` (Text)
- `title` (Text)
- `description` (Text)
- `members` (Repeatable component: `shared.team-member`)

7. `faq-section`
- `eyebrow` (Text)
- `title` (Text)
- `items` (Repeatable component: `shared.faq-item`)

---

## 4) API Permissions

Choose one:

1. Public read:
- Settings -> Users & Permissions -> Roles -> Public
- Enable `find` on each single type above

2. Token-based read (recommended):
- Settings -> API Tokens -> Create token with read access
- Put token value in `STRAPI_API_TOKEN`

---

## 5) Restart Next.js

After changing env vars:

```bash
npm run dev
```

The frontend automatically falls back to local default content if Strapi is unavailable.
