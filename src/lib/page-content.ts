import type { CmsText, StrapiRichTextNode } from '@/lib/landing-content';

export type { CmsText, StrapiRichTextNode };

export type SignalTag = 'red' | 'amber' | 'teal';

export interface HeroSectionContent {
  type: 'hero';
  label: string;
  heading: string;
  subheading: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  proofItems: string[];
  imageUrl: string;
  imageAlt: string;
}

export interface PlatformSectionContent {
  type: 'platform';
  eyebrow: string;
  title: string;
  body: CmsText;
  pillars: string[];
  calloutQuote: string;
  calloutAttribution: string;
}

export interface SignalItemContent {
  tag: SignalTag;
  title: string;
  kicker: string;
  summary: CmsText;
  imageUrl: string;
  imageAlt: string;
  reverseLayout: boolean;
}

export interface SignalsSectionContent {
  type: 'signals';
  eyebrow: string;
  title: string;
  items: SignalItemContent[];
}

export interface WorkflowStepContent {
  step: string;
  title: string;
  description: CmsText;
}

export interface WorkflowSectionContent {
  type: 'workflow';
  eyebrow: string;
  title: string;
  ctaLabel: string;
  steps: WorkflowStepContent[];
}

export interface WhyCardContent {
  title: string;
  description: CmsText;
  imageUrl: string;
  imageAlt: string;
}

export interface StatItemContent {
  value: number;
  suffix: string;
  label: string;
}

export interface WhyUsSectionContent {
  type: 'why-us';
  eyebrow: string;
  title: string;
  cards: WhyCardContent[];
  stats: StatItemContent[];
  statsNote: string;
  narrativeTitle: string;
  narrativeBody: CmsText;
}

export interface TeamMemberContent {
  name: string;
  role: string;
  bio: CmsText;
  imageUrl: string;
  imageAlt: string;
}

export interface TeamSectionContent {
  type: 'team';
  eyebrow: string;
  title: string;
  description: CmsText;
  members: TeamMemberContent[];
}

export interface ContactSectionContent {
  type: 'contact';
  eyebrow: string;
  title: string;
  description: CmsText;
  bullets: string[];
}

export interface FAQItemContent {
  question: string;
  answer: CmsText;
}

export interface FAQSectionContent {
  type: 'faq';
  eyebrow: string;
  title: string;
  items: FAQItemContent[];
}

export type PageSection =
  | HeroSectionContent
  | PlatformSectionContent
  | SignalsSectionContent
  | WorkflowSectionContent
  | WhyUsSectionContent
  | TeamSectionContent
  | ContactSectionContent
  | FAQSectionContent;

export interface PageContent {
  title: string;
  slug: string;
  sections: PageSection[];
}

export const defaultHomePage: PageContent = {
  title: 'Home',
  slug: 'home',
  sections: [
    {
      type: 'hero',
      label: 'Voice-to-Data Safety Intelligence',
      heading:
        'Some operations find out about risks in the incident report. The best ones hear them coming.',
      subheading:
        'Your crews are already broadcasting the warnings. Canary Waves makes sure the right people hear them.',
      primaryCtaLabel: 'Book a demo →',
      secondaryCtaLabel: 'See what we detect',
      proofItems: [
        'No new radio hardware required',
        'Works passively on your existing infrastructure',
        'Early warnings reach leadership — not just the incident report',
      ],
      imageUrl: '/images/hero.avif',
      imageAlt: 'Mining site operations',
    },
    {
      type: 'platform',
      eyebrow: 'Platform',
      title: 'Every shift, your radios hold data no one is reading.',
      body:
        'Two-way radio has not fundamentally changed since the 1970s. But what we can now do with it has. The signal intelligence that prevents incidents is already in your daily radio traffic — it is just never been captured, structured, or surfaced to the people who need it.\n\nCanary Waves listens to what your crews are already saying, finds the patterns that precede incidents, and gets that intelligence to the right people while there is still time to act.',
      pillars: [
        'Turns raw radio audio into searchable transcripts — tuned for your site slang, equipment names, and terminology.',
        'Flags collision risk patterns, skipped protocols, and early equipment stress signals before they escalate into incidents.',
        'Delivers shift-level summaries so leaders see what matters — without reviewing hours of audio.',
      ],
      calloutQuote:
        'The information needed to prevent the next incident is already being said on site. It is just not reaching the right people in time.',
      calloutAttribution: '— The founding insight behind Canary Waves',
    },
    {
      type: 'signals',
      eyebrow: 'Signals',
      title: 'The warnings your crews are already broadcasting — to no one who can act.',
      items: [
        {
          tag: 'red',
          title: 'Equipment Communication and Collision Prevention',
          kicker: 'Stop the next metal-on-metal before the shift ends.',
          summary:
            'Unsafe pass patterns get mentioned on channel 3. The shift supervisor is on the other side of the site. Canary Waves flags dangerous equipment communication in real time.',
          imageUrl: '/images/feature-1.avif',
          imageAlt: 'Heavy equipment in operation',
          reverseLayout: false,
        },
        {
          tag: 'amber',
          title: 'Hazard Identification and Mitigation Tracking',
          kicker: 'Hazards mentioned in passing should not disappear.',
          summary:
            'When operators flag a hazard on the radio and nothing gets logged, the risk does not go away — it waits.',
          imageUrl: '/images/feature-2.avif',
          imageAlt: 'Worker conducting site inspection',
          reverseLayout: true,
        },
        {
          tag: 'teal',
          title: 'Contractor Oversight and KPI Confidence',
          kicker: 'See performance with proof, not promises.',
          summary:
            'Measure contract delivery and frontline execution the way high-performing ops teams do: with evidence, not assumptions.',
          imageUrl: '/images/feature-3.avif',
          imageAlt: 'Industrial site operations from above',
          reverseLayout: false,
        },
      ],
    },
    {
      type: 'workflow',
      eyebrow: 'Workflow',
      title: 'From radio chatter to intelligence your team can act on.',
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
      type: 'why-us',
      eyebrow: 'Why teams adopt it',
      title: "Built for the operations where a missed signal isn't a process failure — it's a fatality.",
      cards: [
        {
          title: 'Risks flagged while crews are still in motion',
          description:
            'Not in the end-of-shift debrief. Not in the post-incident review. While something can still be done about it.',
          imageUrl: '/images/whyus-1.avif',
          imageAlt: 'Workers operating safely',
        },
        {
          title: 'Zero change for your frontline teams',
          description:
            'Operators keep working exactly as they do today. No new devices, no new habits, no training rollout.',
          imageUrl: '/images/whyus-2.avif',
          imageAlt: 'Worker using communication device',
        },
        {
          title: 'One clear picture across every shift and crew',
          description:
            'Safety managers and ops leaders get a single operational narrative — just the signals that matter.',
          imageUrl: '/images/whyus-3.avif',
          imageAlt: 'Operations overview at industrial site',
        },
      ],
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
        {
          value: 91,
          suffix: '%',
          label: 'Safety protocol violations surfaced through radio analysis',
        },
      ],
      statsNote:
        'Percentage of incidents prevented according to risk type detected in advance by the Canary Waves system.',
      narrativeTitle: 'How much of this is already in your radio traffic?',
      narrativeBody:
        'The signals that precede most incidents are not hidden. They are already being said out loud — on your radios, every shift.',
    },
    {
      type: 'team',
      eyebrow: 'Team',
      title: "Built by people who've stood on the sites they're making safer.",
      description:
        "Canary Waves exists because Jack has worked the sites where preventable incidents still happen — and Julia has spent a career building technology that actually gets adopted. Together, they're closing the gap between what frontline crews say on the radio and what leaders can act on.",
      members: [
        {
          name: 'Jack Kellner',
          role: 'Co-founder and Mining Engineer',
          bio: 'Built Canary Waves because he knew the warning signals were already there on every site — they just were not being captured.',
          imageUrl: '/images/jack-kellner.avif',
          imageAlt: 'Jack Kellner',
        },
        {
          name: 'Julia Georgi',
          role: 'Co-founder and Tech Entrepreneur',
          bio: 'Builds the systems and strategy to make sure Canary Waves becomes the safety intelligence standard for industrial operations.',
          imageUrl: '/images/julia-georgi.avif',
          imageAlt: 'Julia Georgi',
        },
      ],
    },
    {
      type: 'contact',
      eyebrow: 'Contact',
      title: 'What is your radio traffic trying to tell you right now?',
      description:
        "Book a 30-minute walkthrough. We'll show you exactly what signals Canary Waves would surface from a typical shift — mapped to your site, your safety priorities, and your reporting structure.",
      bullets: [
        "See the exact signals we'd surface from a typical shift on your type of site",
        'No long sales process — if it fits, we can have a POC running within weeks',
        'First POC partners co-shape the product roadmap and get priority access',
      ],
    },
    {
      type: 'faq',
      eyebrow: 'FAQ',
      title: 'Questions we hear from safety and ops leaders.',
      items: [
        {
          question: 'Do we need to change anything about how our crews use radios?',
          answer:
            'No — that is the whole point. Canary Waves connects to your existing radio data workflows and works entirely in the background.',
        },
        {
          question: 'Is this built specifically for mining and quarrying, or is it generic?',
          answer:
            'Mining and quarrying first — where fatality rates run significantly above the national average and two-way radio is still the backbone of site communication.',
        },
        {
          question: 'How quickly can we be up and running?',
          answer:
            'Fast. No new hardware to install, no frontline training required. Most POC deployments are operational within days of connecting to site radio data.',
        },
        {
          question: 'What happens to our communication data — and what about worker privacy?',
          answer:
            'All audio is processed with strong encryption and can be automatically deleted post-analysis. No voice biometrics are stored.',
        },
      ],
    },
  ],
};
