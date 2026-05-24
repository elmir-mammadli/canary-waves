# Strapi copy from HTML (`canary-waves-new-copy (11).html`)

Эталон: `canary-waves-new-copy (11).html` (строки 1–1040).  
Тексты ниже — **дословно из HTML** (включая `'` / `—` / `→`).

---

## Порядок секций (HTML → Dynamic Zone)

| # | HTML `id` / блок | Strapi `__component` | React |
|---|------------------|----------------------|--------|
| — | `<nav>` | *(не в CMS)* | `Navbar.tsx` |
| 1 | `#home` | `sections.hero` | `HeroSection.tsx` |
| 2 | `#platform` | `sections.platform` | `PlatformSection.tsx` |
| 3 | `#signals` | `sections.signals` | `SignalsSection.tsx` |
| 4 | `#workflow` | `sections.workflow` | `WorkflowSection.tsx` |
| 5 | `#why-us` (+ stats внутри) | `sections.why-us` + `sections.impact` | `WhyUsSection.tsx` + `ImpactSection.tsx` |
| 6 | `#team` | `sections.team` | `TeamSection.tsx` |
| 7 | `#contact` | `sections.contact` | `ContactSection.tsx` |
| 8 | `#faq` | `sections.faq` | `FAQSection.tsx` |
| — | `<footer>` | *(не в CMS)* | `Footer.tsx` |

**Важно:** в HTML блок stats (`stats-band`, `stats-note`, `stats-narrative`) **внутри** `#why-us`, без отдельного `id`. В Strapi — отдельный компонент `impact`. В React: рендер `impact` сразу после `why-us` **без** отдельного `<section>` (или merge в `SectionRenderer`), визуально одна секция `#why-us`.

---

## Design tokens (HTML `:root`)

| Token | Значение | Примечание |
|-------|----------|------------|
| `--mineral` | `#1F1716` | Nav, hero, form |
| `--stone` | `#F4E8DA` | Основной светлый фон |
| `--earthen` | `#C19473` | Вторичный текст на тёмном |
| `--green` | `#4E7B7C` | Акцент |
| `--watcher` | `#FFBE56` | CTA / highlight |
| `--pulse` | `#FFC9A2` | Hover CTA |
| `--copper` | `#9C5230` | Labels |
| `--marl` | `#897465` | Body copy |
| `--ff` | `Poppins` | Уже в проекте |

Стили из HTML → в основном **`globals.css`** (классы как в макете), не Tailwind utility-разметка.

---

## Nav (`Navbar.tsx`) — не Strapi

| Элемент | Текст из HTML |
|---------|----------------|
| CTA | `Book a Demo` |
| Links | `Home`, `Platform`, `Signals`, `Workflow`, `Team` |
| Logo alt | `Canary Waves` |

---

## Hero — `sections.hero`

| Поле Strapi | Текст из HTML |
|-------------|---------------|
| `label` | `Voice-to-Data Safety Intelligence` |
| `heading` | `Some operations find out about risks in the incident report.` + *курсив:* `The best ones hear them coming.` |
| `subheading` | `Your crews are already broadcasting the warnings. Canary Waves makes sure the right people hear them.` |
| `primaryCtaLabel` | `Book a demo →` |
| `secondaryCtaLabel` | `See what we detect` |
| `proofItems[0].text` | `No new radio hardware required` |
| `proofItems[1].text` | `Works passively on your existing infrastructure` |
| `proofItems[2].text` | `Early warnings reach leadership — not just the incident report` |
| `image` | Фон hero (в HTML — embedded base64; в проекте: `/images/download.png`) |

**Разметка:** `h1` с `<em>` на второй фразе; `hero-bg` + gradient overlay.

---

## Platform — `sections.platform`

| Поле Strapi | Текст из HTML |
|-------------|---------------|
| `eyebrow` | `Platform` |
| `title` | `Every shift, your radios` + перенос + `hold data no one is reading.` |
| `body` | `Two-way radio hasn't fundamentally changed since the 1970s. But what we can now do with it has. The signal intelligence that prevents incidents is already in your daily radio traffic — it's just never been captured, structured, or surfaced to the people who need it.` |
| `calloutQuote` | `The information needed to prevent the next incident is already being said on site. It's just not reaching the right people in time.` |
| `calloutAttribution` | `— The founding insight behind Canary Waves` |

### Stat card (нет полей в схеме)

В HTML отдельная карточка `.platform-stat-card` — **полей в `platform.json` нет**.
Картинка карточки в коде: `/images/download_50plus.png`.

| UI-элемент | Текст из HTML | Предлагаемый workaround (без смены схемы) |
|------------|---------------|---------------------------------------------|
| `.stat-card-num` | `50+` | Константа в `PlatformSection` **или** `pillars[0].text` |
| `.stat-card-label` | `Years of two-way radio` | `pillars[1].text` |
| `.stat-card-desc` | `The technology your crews rely on every shift.` + **bold:** `Zero safety intelligence extracted.` + ` Until now.` | `pillars[2].text` (HTML в одном блоке) |

`pillars` в макете **не используются** как список — в seed убрать 3 буллета, переписать `pillars` под stat card.

---

## Signals — `sections.signals` + `sections.signal-item`

| Поле | Текст |
|------|-------|
| `eyebrow` | `Signals` |
| `title` | `The warnings your crews are already` + BR + `broadcasting — to no one who can act.` |

### Item 1 (`reverseLayout: false`)

| Поле | Текст |
|------|-------|
| `title` | `Equipment Communication` + BR + `and Collision Prevention` |
| `kicker` | `Stop the next metal-on-metal before the shift ends.` |
| `summary` | `Unsafe pass patterns get mentioned on channel 3. The shift supervisor is on the other side of the site. Canary Waves flags dangerous equipment communication in real time — so near-misses stay near-misses, and the safety manager who built a culture of prevention keeps it that way.` |
| `imageAlt` | `Heavy equipment in operation` |

### Item 2 (`reverseLayout: true`, class `flip`)

| Поле | Текст |
|------|-------|
| `title` | `Hazard Identification` + BR + `and Mitigation Tracking` |
| `kicker` | `Hazards mentioned in passing shouldn't disappear.` |
| `summary` | `When operators flag a hazard on the radio and nothing gets logged, the risk doesn't go away — it waits. Canary Waves captures every mention, tracks mitigation follow-through, and builds an auditable record that holds up under any compliance review. The operations with the best safety records don't leave this to memory.` |
| `imageAlt` | `Worker conducting site inspection` |

### Item 3 (`reverseLayout: false`)

| Поле | Текст |
|------|-------|
| `title` | `Contractor Oversight` + BR + `and KPI Confidence` |
| `kicker` | `See performance with proof, not promises.` |
| `summary` | `Contracted crews say the protocols are being followed. The leading operations in mining don't just take their word for it — they verify through real communication data. Measure contract delivery and frontline execution the way high-performing ops teams do: with evidence, not assumptions.` |
| `imageAlt` | `Industrial site operations from above` |

`tag` (red/amber/teal) в HTML **не отображается** — скрыть в UI.

---

## Workflow — `sections.workflow`

| Поле | Текст |
|------|-------|
| `eyebrow` | `Workflow` |
| `title` | `From radio chatter to intelligence` + BR + `your team can act on.` |
| `ctaLabel` | `Show me the demo flow →` |

| `steps[].step` | `steps[].title` | `steps[].description` |
|----------------|-----------------|------------------------|
| `01` | `Capture` | `Connect to your existing radio infrastructure. No new hardware. No changes to how your crews communicate on the ground.` |
| `02` | `Transcribe` | `Convert audio to searchable text in near real time — built for your site's specific slang, equipment names, and terminology.` |
| `03` | `Analyze` | `Surface collision risk patterns, hazard mentions, missed protocols, and early equipment stress signals — before they become incidents.` |
| `04` | `Report` | `Put decision-ready summaries and alerts in front of the right people, at the right time — while something can still be done.` |

**Иконки:** inline SVG из HTML — **хардкод** в `WorkflowSection.tsx` (полей в Strapi нет).

---

## Why Us — `sections.why-us` + `sections.why-card`

| Поле | Текст |
|------|-------|
| `eyebrow` | `Why teams adopt it` |
| `title` | `Built for the operations where a missed` + BR + `signal isn't a process failure — ` + *em:* `it's a fatality.` |

| Card `title` | Card `description` |
|--------------|-------------------|
| `Risks flagged while crews are still in motion` | `Not in the end-of-shift debrief. Not in the post-incident review. While something can still be done about it — that's when the best safety managers want to know.` |
| `Zero change for your frontline teams` | `Operators keep working exactly as they do today. No new devices, no new habits, no training rollout. Canary Waves runs in the background on infrastructure that already exists.` |
| `One clear picture across every shift and crew` | `Safety managers and ops leaders get a single operational narrative — not three conflicting shift reports, not 400 lines of transcript. Just the signals that matter.` |

---

## Impact (stats) — `sections.impact` + `shared.stat-item`

Рендер **внутри** `#why-us` после cards.

| Поле | Текст |
|------|-------|
| `caption` → `.stats-note` | `Percentage of incidents prevented according to risk type detected in advance by the Canary Waves system.` |
| `title` → `.stats-narrative h3` | `How much of this is already in your radio traffic?` |
| `description` → `.stats-narrative p` | `The signals that precede most incidents aren't hidden. They're already being said out loud — on your radios, every shift. The operations pulling ahead on safety aren't working harder. They're hearing more. The only question is whether your operation is one of them.` |

| `stats[0].value` | `stats[0].suffix` | `stats[0].label` | Pill *(нет в Strapi)* |
|------------------|-------------------|------------------|------------------------|
| `78` | `%` | `Misuse of heavy machinery incidents detected in advance` | `Equipment risk` |
| `85` | `%` | `Operational communication errors caught before escalation` | `Ops intelligence` |
| `91` | `%` | `Safety protocol violations surfaced through radio analysis` | `Compliance` |

Pills — **по индексу** в компоненте (константы из HTML).

**UI:** `.stats-band` + count-up (как в HTML), **не** SVG-кольца.

---

## Team — `sections.team` + `shared.team-member`

| Поле | Текст |
|------|-------|
| `eyebrow` | `Team` |
| `title` | `Built by people who've stood` + BR + `on the sites they're making safer.` |
| `description` | `Canary Waves exists because Jack has worked the sites where preventable incidents still happen — and Julia has spent a career building technology that actually gets adopted. Together, they're closing the gap between what frontline crews say on the radio and what leaders can act on. We believe AI should serve the people on the frontline — and that preventable should mean prevented.` |

| `members[0].name` | `Jack Kellner` |
| `members[0].role` | `Co-founder and Mining Engineer` |
| `members[0].bio` | `Built Canary Waves because he knew the warning signals were already there on every site — they just weren't being captured.` |

| `members[1].name` | `Julia Georgi` |
| `members[1].role` | `Co-founder and Tech Entrepreneur` |
| `members[1].bio` | `Builds the systems and strategy to make sure Canary Waves becomes the safety intelligence standard for industrial operations.` |

---

## Contact — `sections.contact`

| Поле | Текст |
|------|-------|
| `eyebrow` | `Contact` |
| `title` | `What is your radio traffic trying to tell you right now?` |
| `description` | `Book a 30-minute walkthrough. We'll show you exactly what signals Canary Waves would surface from a typical shift — mapped to your site, your safety priorities, and your reporting structure.` |
| `bullets[0]` | `See the exact signals we'd surface from a typical shift on your type of site` |
| `bullets[1]` | `No long sales process — if it fits, we can have a POC running within weeks` |
| `bullets[2]` | `First POC partners co-shape the product roadmap and get priority access` |

**Форма (не Strapi):** labels `Name`, `Company`, `Email`, `Message (optional)`; placeholders `Your name`, `Operation name`, `your@email.com`, `Tell us about your site — radios, channels, key safety challenges...`; checkbox `I'm open to hearing how Canary Waves could work for my operation.`; submit `Book my walkthrough →`; thanks `✓ Request received. We'll be in touch within one business day.`

---

## FAQ — `sections.faq`

| Поле | Текст |
|------|-------|
| `eyebrow` | `FAQ` |
| `title` | `Questions we hear from` + BR + `safety and ops leaders.` |

| `question` | `answer` |
|------------|----------|
| `Do we need to change anything about how our crews use radios?` | `No — that's the whole point. Canary Waves connects to your existing radio data workflows and works entirely in the background. Your operators keep communicating exactly as they do today. Nothing changes on the ground. The intelligence surfaces to leadership, not the frontline.` |
| `Is this built specifically for mining and quarrying, or is it generic?` | `Mining and quarrying first — where fatality rates run significantly above the national average and two-way radio is still the backbone of site communication. The AI is trained on industry-specific language, slang, and terminology. We also support manufacturing and energy operations where communication quality directly affects safety outcomes.` |
| `How quickly can we be up and running?` | `Fast. No new hardware to install, no frontline training required, no changes to existing workflows. Most POC deployments are operational within days of connecting to site radio data. The platform is designed for low-friction rollout — we've seen too many safety tools fail because adoption was too hard.` |
| `What happens to our communication data — and what about worker privacy?` | `All audio is processed with strong encryption and can be automatically deleted post-analysis. No voice biometrics are stored. Speaker references in reports can be anonymized. Your data stays yours — we never use it for model training without explicit consent. We're happy to walk through exactly how other sites have introduced this to their crews in a way that builds trust, not concern.` |

---

## Footer (`Footer.tsx`) — не Strapi

| Элемент | Текст |
|---------|-------|
| Tagline | `For the people who believe preventable should mean prevented.` |
| Footer bottom L | `© 2025 Canary Waves · Part of KB&G Innovation Studio` |
| Footer bottom R | `A product built for the frontline.` |

---

## Файлы для правок (план)

1. `src/app/globals.css` — токены + классы из `<style>` HTML  
2. `src/components/layout/Navbar.tsx`, `Footer.tsx`  
3. `src/components/sections/*.tsx` — разметка 1:1  
4. `src/components/SectionRenderer.tsx` — merge `why-us` + `impact`  
5. `src/lib/page-content.ts` + `cms/src/bootstrap/seed-home-page.ts` — тексты из таблицы  
6. `RequestDemoModal` — оставить для nav CTA; `#contact` — inline form как в HTML  
