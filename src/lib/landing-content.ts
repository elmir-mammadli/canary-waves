export interface StrapiRichTextTextNode {
  type: 'text';
  text?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
}

export interface StrapiRichTextNode {
  type?: string;
  level?: number;
  format?: 'ordered' | 'unordered';
  url?: string;
  children?: Array<StrapiRichTextNode | StrapiRichTextTextNode>;
  text?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
}

export type CmsText = string | StrapiRichTextNode[];

export interface HeroContent {
  brand: string;
  heading: string;
  subheading: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  notes: string[];
  imageUrl: string;
  imageAlt: string;
}

export interface AboutContent {
  eyebrow: string;
  title: string;
  description: CmsText;
  pillars: string[];
}

export interface FeatureItem {
  title: string;
  subtitle?: string;
  summary: CmsText;
  imageUrl: string;
  imageAlt: string;
}

export interface FeaturesContent {
  eyebrow: string;
  title: string;
  items: FeatureItem[];
}

export interface WorkflowStep {
  step: string;
  title: string;
  description: CmsText;
}

export interface WorkflowContent {
  eyebrow: string;
  title: string;
  ctaLabel: string;
  steps: WorkflowStep[];
}

export interface WhyUsItem {
  title: string;
  description: CmsText;
  imageUrl: string;
  imageAlt: string;
}

export interface WhyUsContent {
  eyebrow: string;
  title: string;
  items: WhyUsItem[];
}

export interface ImpactStat {
  value: number;
  suffix: string;
  label: string;
}

export interface ImpactContent {
  title: string;
  description: CmsText;
  caption: CmsText;
  stats: ImpactStat[];
}

export interface TeamMember {
  name: string;
  role: string;
  imageUrl: string;
  imageAlt: string;
}

export interface TeamContent {
  eyebrow: string;
  title: string;
  description: CmsText;
  members: TeamMember[];
}

export interface FAQItem {
  question: string;
  answer: CmsText;
}

export interface FAQContent {
  eyebrow: string;
  title: string;
  items: FAQItem[];
}

export interface LandingPageContent {
  hero: HeroContent;
  about: AboutContent;
  features: FeaturesContent;
  workflow: WorkflowContent;
  whyUs: WhyUsContent;
  impact: ImpactContent;
  team: TeamContent;
  faq: FAQContent;
}

export const defaultLandingPageContent: LandingPageContent = {
  hero: {
    brand: 'Canary Waves',
    heading: 'Transforming radio chatter into actionable safety intelligence',
    subheading:
      'Built for high-risk industrial operations where every message can prevent the next incident.',
    primaryCtaLabel: 'Request a demo',
    secondaryCtaLabel: 'Explore platform',
    notes: [
      'No new radio hardware required',
      'Passive capture and analysis of existing comms',
      'Structured alerts for ops and safety leaders',
    ],
    imageUrl: '/images/download.png',
    imageAlt: 'Mining site operations',
  },
  about: {
    eyebrow: 'Platform',
    title: 'Voice-to-data intelligence for complex, fast-moving worksites.',
    description:
      'Canary Waves turns live radio communication into operational clarity. Instead of reviewing incidents after the fact, teams get the early signals that help them act sooner.',
    pillars: [
      'Transcribes two-way radio streams into searchable operational context.',
      'Flags leading indicators for collision risk, protocol misses, and production friction.',
      'Delivers decision-ready summaries for supervisors, managers, and executives.',
    ],
  },
  features: {
    eyebrow: 'Signals',
    title: 'What Canary Waves detects every shift.',
    items: [
      {
        title: 'Equipment Communication and Collision Prevention',
        subtitle: 'No More Metal-on-Metal.',
        summary:
          'Surface unsafe pass communication patterns before they turn into metal-on-metal incidents.',
        imageUrl: '/images/feature-1.avif',
        imageAlt: 'Heavy equipment in operation',
      },
      {
        title: 'Hazard Identification and Mitigation Tracking',
        subtitle: 'Spot Risks Before They Escalate.',
        summary:
          'Capture hazard mentions and follow-up actions so mitigation is visible, auditable, and timely.',
        imageUrl: '/images/feature-2.avif',
        imageAlt: 'Worker conducting site inspection',
      },
      {
        title: 'Contractor Oversight and KPI Confidence',
        subtitle: 'See Performance With Proof.',
        summary:
          'Measure contract delivery and frontline execution through real communication, not assumptions.',
        imageUrl: '/images/feature-3.avif',
        imageAlt: 'Industrial site operations from above',
      },
    ],
  },
  workflow: {
    eyebrow: 'Workflow',
    title: 'From raw radio traffic to decision-ready action.',
    ctaLabel: 'See the demo flow',
    steps: [
      {
        step: '01',
        title: 'Capture',
        description: 'Collect two-way radio audio from your existing environment.',
      },
      {
        step: '02',
        title: 'Transcribe',
        description: 'Convert speech into structured, searchable data in near real time.',
      },
      {
        step: '03',
        title: 'Analyze',
        description: 'Detect risk patterns, breakdowns, and missed protocol signals.',
      },
      {
        step: '04',
        title: 'Report',
        description: 'Deliver concise summaries and alerts to operations leadership.',
      },
    ],
  },
  whyUs: {
    eyebrow: 'Why teams adopt it',
    title: 'Built for high-risk operations where communication is mission critical.',
    items: [
      {
        title: 'Real-time risk awareness',
        description: 'Alerts surface while crews are still in motion, not after a report backlog.',
        imageUrl: '/images/whyus-1.avif',
        imageAlt: 'Workers operating safely',
      },
      {
        title: 'Low-friction adoption',
        description: 'Canary Waves works with existing radio habits and site processes.',
        imageUrl: '/images/whyus-2.avif',
        imageAlt: 'Worker using communication device',
      },
      {
        title: 'Clear leadership visibility',
        description: 'Supervisors get one operational narrative across shifts and contractor teams.',
        imageUrl: '/images/whyus-3.avif',
        imageAlt: 'Operations overview at industrial site',
      },
    ],
  },
  impact: {
    title: 'Incident prevention levels enabled by real-time audio analysis',
    description:
      'Intelligence analysis of radio conversations helps detect early warning signs before they turn into actual accidents.',
    caption:
      'Percentage of incidents prevented according to the type of risk detected in advance by Canary Waves system.',
    stats: [
      {
        value: 25,
        suffix: '%',
        label: 'Misuse of heavy machinery',
      },
      {
        value: 50,
        suffix: '%',
        label: 'Operational communication errors',
      },
      {
        value: 75,
        suffix: '%',
        label: 'Safety protocol violations',
      },
    ],
  },
  team: {
    eyebrow: 'Team',
    title: 'Built by operators and builders focused on preventable risk.',
    description:
      'Canary Waves exists to closessssss the gap between what frontline teams say in the moment and what decision makers can actually act on. We believe AI should reduce harm, increase accountability, and make every shift safer.',
    members: [
      {
        name: 'Jack Kellner',
        role: 'Co-founder and Mining Engineer',
        imageUrl: '/images/jack-kellner.avif',
        imageAlt: 'Jack Kellner',
      },
      {
        name: 'Julia Georgi',
        role: 'Co-founder and Tech Entrepreneur',
        imageUrl: '/images/julia-georgi.avif',
        imageAlt: 'Julia Georgi',
      },
    ],
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Common questions from operations leaders.',
    items: [
      {
        question: 'How does Canary Waves work on-site?',
        answer:
          'Canary Waves connects to your existing radio data workflows and turns communication into structured operational signals without changing frontline behavior.',
      },
      {
        question: 'What industries do you support?',
        answer:
          'We focus on mining, manufacturing, and energy operations where communication quality directly affects safety and performance.',
      },
      {
        question: 'Do teams need extensive training?',
        answer:
          'No. The platform is designed for low-friction rollout and minimal workflow disruption for supervisors and site teams.',
      },
      {
        question: 'How does data privacy work?',
        answer:
          'Canary Waves is designed for secure processing with strong controls, role-based visibility, and strict handling of sensitive operational data.',
      },
    ],
  },
};
