# Strapi CMS Setup For Canary Waves

This project reads editable section content from Strapi for:

- Hero
- Platform (About)
- Signals (Features)
- Workflow
- Why Us
- Impact
- Team
- FAQ

`Navbar`, `Footer`, and `CTA form` are intentionally **not** CMS-driven.

---

## 0) Monorepo Layout

This repository now contains:

- `./` -> Next.js frontend
- `./cms` -> Strapi backend

Start CMS locally:

```bash
npm run dev:cms
```

---

## 1) Environment Variables

Create `.env.local` from `.env.example`:

```bash
cp .env.example .env.local
```

Set:

- `NEXT_PUBLIC_STRAPI_URL` (example: `http://localhost:1337`)
- `STRAPI_API_TOKEN` (optional but recommended for production)
- `STRAPI_CONTENT_STATUS` (`published` or `draft`)
- `STRAPI_REVALIDATE` (seconds, use `0` for no-store)
- `STRAPI_FAIL_ON_ERROR` (`true` to fail loudly when CMS fetch fails)

Defaults if not set:

- Development: `draft` + `no-store` + `fallback allowed`
- Production: `published` + `60s revalidate` + `fallback allowed`

Recommended for local content editing:

```env
STRAPI_CONTENT_STATUS=draft
STRAPI_REVALIDATE=0
STRAPI_FAIL_ON_ERROR=false
```

Recommended for production:

```env
STRAPI_CONTENT_STATUS=published
STRAPI_REVALIDATE=60
STRAPI_FAIL_ON_ERROR=false
```

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

6. `shared.stat-item`
- `value` (Number)
- `suffix` (Text, default `%`)
- `label` (Text)

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

7. `impact-section`
- `title` (Text)
- `description` (Text)
- `caption` (Text, optional)
- `stats` (Repeatable component: `shared.stat-item`)

8. `faq-section`
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

The frontend falls back to local default content if Strapi is unavailable.
Set `STRAPI_FAIL_ON_ERROR=true` only when you explicitly want hard failures for debugging.

If the frontend keeps showing `landing-content.ts` values, the usual cause is that Strapi is not
actually running at `http://localhost:1337`. In that case the frontend cannot fetch CMS data and
falls back by design.

Common local fix when Strapi fails to boot after a Node version change:

```bash
npm run repair:cms
npm run dev:cms
```

If you set `STRAPI_REVALIDATE`, use a plain number of seconds such as `60`.
`60s` is now also accepted by the frontend parser.

---

## 6) Strapi Cloud (Monorepo)

When deploying `cms` to Strapi Cloud from this same repo:

1. Choose this GitHub repository.
2. Click **Show more**.
3. Set **Base directory / Project directory** to:

```text
cms
```

Without that, Strapi Cloud checks repo root and shows:
`Strapi was not found in the project dependencies`.
