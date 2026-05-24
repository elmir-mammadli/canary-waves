# Strapi Home Content

Use this as the paste checklist for the Strapi `Page` entry:

- `title`: `Home`
- `slug`: `home`
- `sections`: add the components below in this exact order.

Image fields are media uploads in Strapi. Use the matching site assets from `public/images/` where noted.

---

## 1. `sections.hero`

- `label`: `Voice-to-Data Safety Intelligence`
- `heading`: `Some operations find out about risks in the incident report. The best ones hear them coming.`
- `subheading`: `Your crews are already broadcasting the warnings. Canary Waves makes sure the right people hear them.`
- `primaryCtaLabel`: `Book a demo ->`
- `secondaryCtaLabel`: `See what we detect`
- `image`: upload/use `download.png`

`proofItems` (`shared.text-item`):

- `text`: `No new radio hardware required`
- `text`: `Works passively on your existing infrastructure`
- `text`: `Early warnings reach leadership - not just the incident report`

---

## 2. `sections.platform`

- `eyebrow`: `Platform`
- `title`: `Every shift, your radios
hold data no one is reading.`
- `body`: `Two-way radio hasn't fundamentally changed since the 1970s. But what we can now do with it has. The signal intelligence that prevents incidents is already in your daily radio traffic - it's just never been captured, structured, or surfaced to the people who need it.`
- `calloutQuote`: `The information needed to prevent the next incident is already being said on site. It's just not reaching the right people in time.`
- `calloutAttribution`: `- The founding insight behind Canary Waves`

`pillars` (`shared.text-item`):

- `text`: `50+`
- `text`: `Years of two-way radio`
- `text`: `The technology your crews rely on every shift. Zero safety intelligence extracted. Until now.`

Image used by this visual card in code: `download_50plus.png`.

---

## 3. `sections.signals`

- `eyebrow`: `Signals`
- `title`: `The warnings your crews are already
broadcasting - to no one who can act.`

`items[0]` (`sections.signal-item`):

- `tag`: `red`
- `title`: `Equipment Communication
and Collision Prevention`
- `kicker`: `Stop the next metal-on-metal before the shift ends.`
- `summary`: `Unsafe pass patterns get mentioned on channel 3. The shift supervisor is on the other side of the site. Canary Waves flags dangerous equipment communication in real time - so near-misses stay near-misses, and the safety manager who built a culture of prevention keeps it that way.`
- `image`: upload/use `feature-1.avif`
- `imageAlt`: `Heavy equipment in operation`
- `reverseLayout`: `false`

`items[1]` (`sections.signal-item`):

- `tag`: `amber`
- `title`: `Hazard Identification
and Mitigation Tracking`
- `kicker`: `Hazards mentioned in passing shouldn't disappear.`
- `summary`: `When operators flag a hazard on the radio and nothing gets logged, the risk doesn't go away - it waits. Canary Waves captures every mention, tracks mitigation follow-through, and builds an auditable record that holds up under any compliance review. The operations with the best safety records don't leave this to memory.`
- `image`: upload/use `feature-2.avif`
- `imageAlt`: `Worker conducting site inspection`
- `reverseLayout`: `true`

`items[2]` (`sections.signal-item`):

- `tag`: `teal`
- `title`: `Contractor Oversight
and KPI Confidence`
- `kicker`: `See performance with proof, not promises.`
- `summary`: `Contracted crews say the protocols are being followed. The leading operations in mining don't just take their word for it - they verify through real communication data. Measure contract delivery and frontline execution the way high-performing ops teams do: with evidence, not assumptions.`
- `image`: upload/use `feature-3.avif`
- `imageAlt`: `Industrial site operations from above`
- `reverseLayout`: `false`

---

## 4. `sections.workflow`

- `eyebrow`: `Workflow`
- `title`: `From radio chatter to intelligence
your team can act on.`
- `ctaLabel`: `Show me the demo flow ->`

`steps` (`shared.workflow-step`):

- `step`: `01`
- `title`: `Capture`
- `description`: `Connect to your existing radio infrastructure. No new hardware. No changes to how your crews communicate on the ground.`

- `step`: `02`
- `title`: `Transcribe`
- `description`: `Convert audio to searchable text in near real time - built for your site's specific slang, equipment names, and terminology.`

- `step`: `03`
- `title`: `Analyze`
- `description`: `Surface collision risk patterns, hazard mentions, missed protocols, and early equipment stress signals - before they become incidents.`

- `step`: `04`
- `title`: `Report`
- `description`: `Put decision-ready summaries and alerts in front of the right people, at the right time - while something can still be done.`

---

## 5. `sections.why-us`

- `eyebrow`: `Why teams adopt it`
- `title`: `Built for the operations where a missed
signal isn't a process failure - it's a fatality.`

`cards[0]` (`sections.why-card`):

- `title`: `Risks flagged while crews are still in motion`
- `description`: `Not in the end-of-shift debrief. Not in the post-incident review. While something can still be done about it - that's when the best safety managers want to know.`
- `image`: upload/use `whyus-1.avif`
- `imageAlt`: `Workers operating safely`

`cards[1]` (`sections.why-card`):

- `title`: `Zero change for your frontline teams`
- `description`: `Operators keep working exactly as they do today. No new devices, no new habits, no training rollout. Canary Waves runs in the background on infrastructure that already exists.`
- `image`: upload/use `whyus-2.avif`
- `imageAlt`: `Worker using communication device`

`cards[2]` (`sections.why-card`):

- `title`: `One clear picture across every shift and crew`
- `description`: `Safety managers and ops leaders get a single operational narrative - not three conflicting shift reports, not 400 lines of transcript. Just the signals that matter.`
- `image`: upload/use `whyus-3.avif`
- `imageAlt`: `Operations overview at industrial site`

---

## 6. `sections.impact`

- `title`: `How much of this is already in your radio traffic?`
- `description`: `The signals that precede most incidents aren't hidden. They're already being said out loud - on your radios, every shift. The operations pulling ahead on safety aren't working harder. They're hearing more. The only question is whether your operation is one of them.`
- `caption`: `Percentage of incidents prevented according to risk type detected in advance by the Canary Waves system.`

`stats` (`shared.stat-item`):

- `value`: `78`
- `suffix`: `%`
- `label`: `Misuse of heavy machinery incidents detected in advance`

- `value`: `85`
- `suffix`: `%`
- `label`: `Operational communication errors caught before escalation`

- `value`: `91`
- `suffix`: `%`
- `label`: `Safety protocol violations surfaced through radio analysis`

---

## 7. `sections.team`

- `eyebrow`: `Team`
- `title`: `Built by people who've stood
on the sites they're making safer.`
- `description`: `Canary Waves exists because Jack has worked the sites where preventable incidents still happen - and Julia has spent a career building technology that actually gets adopted. Together, they're closing the gap between what frontline crews say on the radio and what leaders can act on. We believe AI should serve the people on the frontline - and that preventable should mean prevented.`

`members[0]` (`shared.team-member`):

- `name`: `Jack Kellner`
- `role`: `Co-founder and Mining Engineer`
- `bio`: `Built Canary Waves because he knew the warning signals were already there on every site - they just weren't being captured.`
- `image`: upload/use `jack-kellner.avif`
- `imageAlt`: `Jack Kellner`

`members[1]` (`shared.team-member`):

- `name`: `Julia Georgi`
- `role`: `Co-founder and Tech Entrepreneur`
- `bio`: `Builds the systems and strategy to make sure Canary Waves becomes the safety intelligence standard for industrial operations.`
- `image`: upload/use `julia-georgi.avif`
- `imageAlt`: `Julia Georgi`

---

## 8. `sections.contact`

- `eyebrow`: `Contact`
- `title`: `What is your radio traffic trying to tell you right now?`
- `description`: `Book a 30-minute walkthrough. We'll show you exactly what signals Canary Waves would surface from a typical shift - mapped to your site, your safety priorities, and your reporting structure.`

`bullets` (`shared.text-item`):

- `text`: `See the exact signals we'd surface from a typical shift on your type of site`
- `text`: `No long sales process - if it fits, we can have a POC running within weeks`
- `text`: `First POC partners co-shape the product roadmap and get priority access`

---

## 9. `sections.faq`

- `eyebrow`: `FAQ`
- `title`: `Questions we hear from
safety and ops leaders.`

`items[0]` (`shared.faq-item`):

- `question`: `Do we need to change anything about how our crews use radios?`
- `answer`: `No - that's the whole point. Canary Waves connects to your existing radio data workflows and works entirely in the background. Your operators keep communicating exactly as they do today. Nothing changes on the ground. The intelligence surfaces to leadership, not the frontline.`

`items[1]` (`shared.faq-item`):

- `question`: `Is this built specifically for mining and quarrying, or is it generic?`
- `answer`: `Mining and quarrying first - where fatality rates run significantly above the national average and two-way radio is still the backbone of site communication. The AI is trained on industry-specific language, slang, and terminology. We also support manufacturing and energy operations where communication quality directly affects safety outcomes.`

`items[2]` (`shared.faq-item`):

- `question`: `How quickly can we be up and running?`
- `answer`: `Fast. No new hardware to install, no frontline training required, no changes to existing workflows. Most POC deployments are operational within days of connecting to site radio data. The platform is designed for low-friction rollout - we've seen too many safety tools fail because adoption was too hard.`

`items[3]` (`shared.faq-item`):

- `question`: `What happens to our communication data - and what about worker privacy?`
- `answer`: `All audio is processed with strong encryption and can be automatically deleted post-analysis. No voice biometrics are stored. Speaker references in reports can be anonymized. Your data stays yours - we never use it for model training without explicit consent. We're happy to walk through exactly how other sites have introduced this to their crews in a way that builds trust, not concern.`

