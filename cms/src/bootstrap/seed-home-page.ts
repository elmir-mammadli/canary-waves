type StrapiInstance = {
  documents: (uid: string) => {
    findMany: (params?: Record<string, unknown>) => Promise<unknown[]>;
    create: (params: { data: Record<string, unknown>; status?: string }) => Promise<unknown>;
  };
};

const HOME_SECTIONS = [
  {
    __component: 'sections.hero',
    label: 'Voice-to-Data Safety Intelligence',
    heading:
      'Some operations find out about risks in the incident report. The best ones hear them coming.',
    subheading:
      'Your crews are already broadcasting the warnings. Canary Waves makes sure the right people hear them.',
    primaryCtaLabel: 'Book a demo →',
    secondaryCtaLabel: 'See what we detect',
    proofItems: [
      { text: 'No new radio hardware required' },
      { text: 'Works passively on your existing infrastructure' },
      { text: 'Early warnings reach leadership — not just the incident report' },
    ],
  },
  {
    __component: 'sections.platform',
    eyebrow: 'Platform',
    title: 'Every shift, your radios\nhold data no one is reading.',
    body: [
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            text: "Two-way radio hasn't fundamentally changed since the 1970s. But what we can now do with it has. The signal intelligence that prevents incidents is already in your daily radio traffic — it's just never been captured, structured, or surfaced to the people who need it.",
          },
        ],
      },
    ],
    pillars: [{ text: '50+' }, { text: 'Years of two-way radio' }, { text: 'stat-card-desc' }],
    calloutQuote:
      "The information needed to prevent the next incident is already being said on site. It's just not reaching the right people in time.",
    calloutAttribution: '— The founding insight behind Canary Waves',
  },
  {
    __component: 'sections.signals',
    eyebrow: 'Signals',
    title: 'The warnings your crews are already\nbroadcasting — to no one who can act.',
    items: [
      {
        tag: 'red',
        title: 'Equipment Communication\nand Collision Prevention',
        kicker: 'Stop the next metal-on-metal before the shift ends.',
        summary:
          'Unsafe pass patterns get mentioned on channel 3. The shift supervisor is on the other side of the site. Canary Waves flags dangerous equipment communication in real time — so near-misses stay near-misses, and the safety manager who built a culture of prevention keeps it that way.',
        reverseLayout: false,
      },
      {
        tag: 'amber',
        title: 'Hazard Identification\nand Mitigation Tracking',
        kicker: "Hazards mentioned in passing shouldn't disappear.",
        summary:
          "When operators flag a hazard on the radio and nothing gets logged, the risk doesn't go away — it waits. Canary Waves captures every mention, tracks mitigation follow-through, and builds an auditable record that holds up under any compliance review. The operations with the best safety records don't leave this to memory.",
        reverseLayout: true,
      },
      {
        tag: 'teal',
        title: 'Contractor Oversight\nand KPI Confidence',
        kicker: 'See performance with proof, not promises.',
        summary:
          "Contracted crews say the protocols are being followed. The leading operations in mining don't just take their word for it — they verify through real communication data. Measure contract delivery and frontline execution the way high-performing ops teams do: with evidence, not assumptions.",
        reverseLayout: false,
      },
    ],
  },
  {
    __component: 'sections.workflow',
    eyebrow: 'Workflow',
    title: 'From radio chatter to intelligence\nyour team can act on.',
    ctaLabel: 'Show me the demo flow →',
    steps: [
      {
        step: '01',
        title: 'Capture',
        description:
          'Connect to your existing radio infrastructure. No new hardware. No changes to how your crews communicate on the ground.',
      },
      {
        step: '02',
        title: 'Transcribe',
        description:
          "Convert audio to searchable text in near real time — built for your site's specific slang, equipment names, and terminology.",
      },
      {
        step: '03',
        title: 'Analyze',
        description:
          'Surface collision risk patterns, hazard mentions, missed protocols, and early equipment stress signals — before they become incidents.',
      },
      {
        step: '04',
        title: 'Report',
        description:
          'Put decision-ready summaries and alerts in front of the right people, at the right time — while something can still be done.',
      },
    ],
  },
  {
    __component: 'sections.why-us',
    eyebrow: 'Why teams adopt it',
    title:
      "Built for the operations where a missed\nsignal isn't a process failure — it's a fatality.",
    cards: [
      {
        title: 'Risks flagged while crews are still in motion',
        description:
          "Not in the end-of-shift debrief. Not in the post-incident review. While something can still be done about it — that's when the best safety managers want to know.",
      },
      {
        title: 'Zero change for your frontline teams',
        description:
          'Operators keep working exactly as they do today. No new devices, no new habits, no training rollout. Canary Waves runs in the background on infrastructure that already exists.',
      },
      {
        title: 'One clear picture across every shift and crew',
        description:
          "Safety managers and ops leaders get a single operational narrative — not three conflicting shift reports, not 400 lines of transcript. Just the signals that matter.",
      },
    ],
  },
  {
    __component: 'sections.impact',
    title: 'How much of this is already in your radio traffic?',
    description:
      "The signals that precede most incidents aren't hidden. They're already being said out loud — on your radios, every shift. The operations pulling ahead on safety aren't working harder. They're hearing more. The only question is whether your operation is one of them.",
    caption:
      'Percentage of incidents prevented according to risk type detected in advance by the Canary Waves system.',
    stats: [
      {
        value: 78,
        suffix: '%',
        label: 'Misuse of heavy machinery incidents detected in advance',
      },
      {
        value: 85,
        suffix: '%',
        label: 'Operational communication errors caught before escalation',
      },
      { value: 91, suffix: '%', label: 'Safety protocol violations surfaced through radio analysis' },
    ],
  },
  {
    __component: 'sections.team',
    eyebrow: 'Team',
    title: "Built by people who've stood\non the sites they're making safer.",
    description:
      "Canary Waves exists because Jack has worked the sites where preventable incidents still happen — and Julia has spent a career building technology that actually gets adopted. Together, they're closing the gap between what frontline crews say on the radio and what leaders can act on. We believe AI should serve the people on the frontline — and that preventable should mean prevented.",
    members: [
      {
        name: 'Jack Kellner',
        role: 'Co-founder and Mining Engineer',
        bio: "Built Canary Waves because he knew the warning signals were already there on every site — they just weren't being captured.",
      },
      {
        name: 'Julia Georgi',
        role: 'Co-founder and Tech Entrepreneur',
        bio: 'Builds the systems and strategy to make sure Canary Waves becomes the safety intelligence standard for industrial operations.',
      },
    ],
  },
  {
    __component: 'sections.contact',
    eyebrow: 'Contact',
    title: 'What is your radio traffic trying to tell you right now?',
    description:
      "Book a 30-minute walkthrough. We'll show you exactly what signals Canary Waves would surface from a typical shift — mapped to your site, your safety priorities, and your reporting structure.",
    bullets: [
      { text: "See the exact signals we'd surface from a typical shift on your type of site" },
      { text: 'No long sales process — if it fits, we can have a POC running within weeks' },
      { text: 'First POC partners co-shape the product roadmap and get priority access' },
    ],
  },
  {
    __component: 'sections.faq',
    eyebrow: 'FAQ',
    title: 'Questions we hear from\nsafety and ops leaders.',
    items: [
      {
        question: 'Do we need to change anything about how our crews use radios?',
        answer:
          "No — that's the whole point. Canary Waves connects to your existing radio data workflows and works entirely in the background. Your operators keep communicating exactly as they do today. Nothing changes on the ground. The intelligence surfaces to leadership, not the frontline.",
      },
      {
        question: 'Is this built specifically for mining and quarrying, or is it generic?',
        answer:
          'Mining and quarrying first — where fatality rates run significantly above the national average and two-way radio is still the backbone of site communication. The AI is trained on industry-specific language, slang, and terminology. We also support manufacturing and energy operations where communication quality directly affects safety outcomes.',
      },
      {
        question: 'How quickly can we be up and running?',
        answer:
          "Fast. No new hardware to install, no frontline training required, no changes to existing workflows. Most POC deployments are operational within days of connecting to site radio data. The platform is designed for low-friction rollout — we've seen too many safety tools fail because adoption was too hard.",
      },
      {
        question: 'What happens to our communication data — and what about worker privacy?',
        answer:
          "All audio is processed with strong encryption and can be automatically deleted post-analysis. No voice biometrics are stored. Speaker references in reports can be anonymized. Your data stays yours — we never use it for model training without explicit consent. We're happy to walk through exactly how other sites have introduced this to their crews in a way that builds trust, not concern.",
      },
    ],
  },
];

export async function seedHomePageIfMissing(strapi: StrapiInstance) {
  const existing = await strapi.documents('api::page.page').findMany({
    filters: { slug: { $eq: 'home' } },
    status: 'published',
  });

  if (Array.isArray(existing) && existing.length > 0) {
    return;
  }

  await strapi.documents('api::page.page').create({
    data: {
      title: 'Home',
      slug: 'home',
      sections: HOME_SECTIONS,
    },
    status: 'published',
  });

  console.info('[seed] Created published Page entry with slug "home".');
}
