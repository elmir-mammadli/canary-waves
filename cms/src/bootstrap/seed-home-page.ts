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
    title: 'Every shift, your radios hold data no one is reading.',
    body: [
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            text: 'Two-way radio has not fundamentally changed since the 1970s. But what we can now do with it has. ',
          },
          {
            type: 'text',
            text: 'The signal intelligence that prevents incidents is already in your daily radio traffic',
            bold: true,
          },
          {
            type: 'text',
            text: ' — it is just never been captured, structured, or surfaced to the people who need it.',
          },
        ],
      },
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            text: 'Canary Waves listens to what your crews are already saying, finds the patterns that precede incidents, and gets that intelligence to the right people while there is still time to act.',
          },
        ],
      },
    ],
    pillars: [
      {
        text: 'Turns raw radio audio into searchable transcripts — tuned for your site slang, equipment names, and terminology.',
      },
      {
        text: 'Flags collision risk patterns, skipped protocols, and early equipment stress signals before they escalate into incidents.',
      },
      {
        text: 'Delivers shift-level summaries so leaders see what matters — without reviewing hours of audio.',
      },
    ],
    calloutQuote:
      'The information needed to prevent the next incident is already being said on site. It is just not reaching the right people in time.',
    calloutAttribution: '— The founding insight behind Canary Waves',
  },
  {
    __component: 'sections.signals',
    eyebrow: 'Signals',
    title: 'The warnings your crews are already broadcasting — to no one who can act.',
    items: [
      {
        tag: 'red',
        title: 'Equipment Communication and Collision Prevention',
        kicker: 'Stop the next metal-on-metal before the shift ends.',
        summary:
          'Unsafe pass patterns get mentioned on channel 3. Canary Waves flags dangerous equipment communication in real time.',
        reverseLayout: false,
      },
      {
        tag: 'amber',
        title: 'Hazard Identification and Mitigation Tracking',
        kicker: 'Hazards mentioned in passing should not disappear.',
        summary:
          'Canary Waves captures every mention, tracks mitigation follow-through, and builds an auditable record.',
        reverseLayout: true,
      },
      {
        tag: 'teal',
        title: 'Contractor Oversight and KPI Confidence',
        kicker: 'See performance with proof, not promises.',
        summary:
          'Measure contract delivery and frontline execution with evidence, not assumptions.',
        reverseLayout: false,
      },
    ],
  },
  {
    __component: 'sections.workflow',
    eyebrow: 'Workflow',
    title: 'From radio chatter to intelligence your team can act on.',
    ctaLabel: 'Show me the demo flow →',
    steps: [
      { step: '01', title: 'Capture', description: 'Connect to your existing radio infrastructure.' },
      { step: '02', title: 'Transcribe', description: 'Convert audio to searchable text in near real time.' },
      { step: '03', title: 'Analyze', description: 'Surface collision risk patterns and hazard mentions.' },
      { step: '04', title: 'Report', description: 'Put decision-ready summaries in front of the right people.' },
    ],
  },
  {
    __component: 'sections.why-us',
    eyebrow: 'Why teams adopt it',
    title: "Built for the operations where a missed signal isn't a process failure — it's a fatality.",
    cards: [
      {
        title: 'Risks flagged while crews are still in motion',
        description:
          'While something can still be done about it — that is when the best safety managers want to know.',
      },
      {
        title: 'Zero change for your frontline teams',
        description:
          'Operators keep working exactly as they do today. Canary Waves runs in the background.',
      },
      {
        title: 'One clear picture across every shift and crew',
        description:
          'Safety managers and ops leaders get a single operational narrative — just the signals that matter.',
      },
    ],
  },
  {
    __component: 'sections.impact',
    title: 'Incident prevention levels enabled by real-time audio analysis',
    description:
      'Intelligence analysis of radio conversations helps detect early warning signs before they turn into actual accidents.',
    caption:
      'Percentage of incidents prevented according to the type of risk detected in advance by Canary Waves system.',
    stats: [
      { value: 78, suffix: '%', label: 'Misuse of heavy machinery' },
      { value: 85, suffix: '%', label: 'Operational communication errors' },
      { value: 91, suffix: '%', label: 'Safety protocol violations' },
    ],
  },
  {
    __component: 'sections.team',
    eyebrow: 'Team',
    title: "Built by people who've stood on the sites they're making safer.",
    description: [
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            text: 'Canary Waves exists because Jack has worked the sites where preventable incidents still happen — and Julia has spent a career building technology that actually gets adopted.',
          },
        ],
      },
    ],
    members: [
      {
        name: 'Jack Kellner',
        role: 'Co-founder and Mining Engineer',
        bio: 'Built Canary Waves because he knew the warning signals were already there on every site — they just were not being captured.',
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
    title: 'Ready to see what your radio traffic is trying to tell you?',
    description:
      'Book a walkthrough and we will map Canary Waves to your current environment, safety goals, and reporting workflow.',
    bullets: [],
  },
  {
    __component: 'sections.faq',
    eyebrow: 'FAQ',
    title: 'Questions we hear from safety and ops leaders.',
    items: [
      {
        question: 'Do we need to change anything about how our crews use radios?',
        answer:
          'No — that is the whole point. Canary Waves works entirely in the background.',
      },
      {
        question: 'Is this built specifically for mining and quarrying, or is it generic?',
        answer:
          'Mining and quarrying first — where two-way radio is still the backbone of site communication.',
      },
      {
        question: 'How quickly can we be up and running?',
        answer: 'Most POC deployments are operational within days of connecting to site radio data.',
      },
      {
        question: 'What happens to our communication data — and what about worker privacy?',
        answer:
          'All audio is processed with strong encryption and can be automatically deleted post-analysis.',
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
