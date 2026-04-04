import {
  defaultLandingPageContent,
  type AboutContent,
  type FAQContent,
  type FAQItem,
  type FeatureItem,
  type FeaturesContent,
  type HeroContent,
  type LandingPageContent,
  type TeamContent,
  type TeamMember,
  type WhyUsContent,
  type WhyUsItem,
  type WorkflowContent,
  type WorkflowStep,
} from '@/lib/landing-content';

type JsonRecord = Record<string, unknown>;

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL?.replace(/\/$/, '') ?? '';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

const SECTION_ENDPOINTS = {
  hero: 'hero-section',
  about: 'about-section',
  features: 'signals-section',
  workflow: 'workflow-section',
  whyUs: 'why-us-section',
  team: 'team-section',
  faq: 'faq-section',
} as const;

function asRecord(value: unknown): JsonRecord | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  return value as JsonRecord;
}

function getString(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function toStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (typeof item === 'string') return item.trim();
      const row = asRecord(item);
      if (!row) return '';
      return (
        getString(row.text) ??
        getString(row.value) ??
        getString(row.label) ??
        getString(row.title) ??
        ''
      );
    })
    .filter(Boolean);
}

function toRecordArray(value: unknown): JsonRecord[] {
  if (!Array.isArray(value)) return [];
  return value.map(asRecord).filter((item): item is JsonRecord => Boolean(item));
}

function normalizeEntry(data: unknown): JsonRecord | null {
  const record = asRecord(data);
  if (!record) return null;

  const attrs = asRecord(record.attributes);
  if (attrs) return { ...attrs, id: record.id };

  return record;
}

interface ParsedMedia {
  url: string;
  alt: string;
}

function toAbsoluteMediaUrl(url: string): string {
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  if (!STRAPI_URL) return url;
  return `${STRAPI_URL}${url.startsWith('/') ? '' : '/'}${url}`;
}

function parseMedia(value: unknown): ParsedMedia | null {
  if (!value) return null;
  if (Array.isArray(value)) return parseMedia(value[0]);

  const record = asRecord(value);
  if (!record) return null;

  if ('data' in record) return parseMedia(record.data);

  const url = getString(record.url);
  if (!url) return null;

  return {
    url: toAbsoluteMediaUrl(url),
    alt:
      getString(record.alternativeText) ??
      getString(record.alt) ??
      getString(record.name) ??
      'Section image',
  };
}

async function fetchSection(endpoint: string): Promise<JsonRecord | null> {
  if (!STRAPI_URL) return null;

  try {
    const response = await fetch(`${STRAPI_URL}/api/${endpoint}?populate=*`, {
      headers: STRAPI_TOKEN ? { Authorization: `Bearer ${STRAPI_TOKEN}` } : undefined,
      next: { revalidate: 60 },
    });

    if (!response.ok) return null;

    const payload = (await response.json()) as JsonRecord;
    return normalizeEntry(payload.data);
  } catch {
    return null;
  }
}

function parseHero(raw: JsonRecord | null, fallback: HeroContent): HeroContent {
  if (!raw) return fallback;

  const media = parseMedia(raw.image ?? raw.backgroundImage ?? raw.heroImage);

  return {
    brand: getString(raw.brand) ?? fallback.brand,
    heading: getString(raw.heading) ?? getString(raw.title) ?? fallback.heading,
    subheading: getString(raw.subheading) ?? getString(raw.description) ?? fallback.subheading,
    primaryCtaLabel: getString(raw.primaryCtaLabel) ?? getString(raw.primaryCtaText) ?? fallback.primaryCtaLabel,
    secondaryCtaLabel:
      getString(raw.secondaryCtaLabel) ?? getString(raw.secondaryCtaText) ?? fallback.secondaryCtaLabel,
    notes: toStringArray(raw.notes ?? raw.bullets ?? raw.highlights).length
      ? toStringArray(raw.notes ?? raw.bullets ?? raw.highlights)
      : fallback.notes,
    imageUrl: media?.url ?? getString(raw.imageUrl) ?? fallback.imageUrl,
    imageAlt: media?.alt ?? getString(raw.imageAlt) ?? fallback.imageAlt,
  };
}

function parseAbout(raw: JsonRecord | null, fallback: AboutContent): AboutContent {
  if (!raw) return fallback;

  const parsedPillars = toStringArray(raw.pillars ?? raw.points ?? raw.items);
  return {
    eyebrow: getString(raw.eyebrow) ?? fallback.eyebrow,
    title: getString(raw.title) ?? fallback.title,
    description: getString(raw.description) ?? getString(raw.copy) ?? fallback.description,
    pillars: parsedPillars.length ? parsedPillars : fallback.pillars,
  };
}

function parseFeatureItems(rawItems: unknown, fallback: FeatureItem[]): FeatureItem[] {
  const parsed = toRecordArray(rawItems)
    .map((row) => {
      const media = parseMedia(row.image ?? row.media ?? row.photo);
      const title = getString(row.title);
      const summary = getString(row.summary) ?? getString(row.description);
      if (!title || !summary) return null;

      return {
        title,
        summary,
        imageUrl: media?.url ?? getString(row.imageUrl) ?? fallback[0]?.imageUrl ?? '/images/feature-1.avif',
        imageAlt: media?.alt ?? getString(row.imageAlt) ?? title,
      };
    })
    .filter((item): item is FeatureItem => Boolean(item));

  return parsed.length ? parsed : fallback;
}

function parseFeatures(raw: JsonRecord | null, fallback: FeaturesContent): FeaturesContent {
  if (!raw) return fallback;

  return {
    eyebrow: getString(raw.eyebrow) ?? fallback.eyebrow,
    title: getString(raw.title) ?? fallback.title,
    items: parseFeatureItems(raw.items ?? raw.features ?? raw.cards, fallback.items),
  };
}

function parseWorkflowSteps(rawItems: unknown, fallback: WorkflowStep[]): WorkflowStep[] {
  const parsed = toRecordArray(rawItems)
    .map((row, index) => {
      const title = getString(row.title);
      const description = getString(row.description) ?? getString(row.summary);
      if (!title || !description) return null;

      return {
        step: getString(row.step) ?? String(index + 1).padStart(2, '0'),
        title,
        description,
      };
    })
    .filter((item): item is WorkflowStep => Boolean(item));

  return parsed.length ? parsed : fallback;
}

function parseWorkflow(raw: JsonRecord | null, fallback: WorkflowContent): WorkflowContent {
  if (!raw) return fallback;

  return {
    eyebrow: getString(raw.eyebrow) ?? fallback.eyebrow,
    title: getString(raw.title) ?? fallback.title,
    ctaLabel: getString(raw.ctaLabel) ?? getString(raw.buttonLabel) ?? fallback.ctaLabel,
    steps: parseWorkflowSteps(raw.steps ?? raw.items, fallback.steps),
  };
}

function parseWhyUsItems(rawItems: unknown, fallback: WhyUsItem[]): WhyUsItem[] {
  const parsed = toRecordArray(rawItems)
    .map((row) => {
      const media = parseMedia(row.image ?? row.media ?? row.photo);
      const title = getString(row.title);
      const description = getString(row.description) ?? getString(row.summary);
      if (!title || !description) return null;

      return {
        title,
        description,
        imageUrl: media?.url ?? getString(row.imageUrl) ?? fallback[0]?.imageUrl ?? '/images/whyus-1.avif',
        imageAlt: media?.alt ?? getString(row.imageAlt) ?? title,
      };
    })
    .filter((item): item is WhyUsItem => Boolean(item));

  return parsed.length ? parsed : fallback;
}

function parseWhyUs(raw: JsonRecord | null, fallback: WhyUsContent): WhyUsContent {
  if (!raw) return fallback;

  return {
    eyebrow: getString(raw.eyebrow) ?? fallback.eyebrow,
    title: getString(raw.title) ?? fallback.title,
    items: parseWhyUsItems(raw.items ?? raw.points ?? raw.cards, fallback.items),
  };
}

function parseTeamMembers(rawItems: unknown, fallback: TeamMember[]): TeamMember[] {
  const parsed = toRecordArray(rawItems)
    .map((row) => {
      const media = parseMedia(row.image ?? row.photo ?? row.avatar);
      const name = getString(row.name);
      const role = getString(row.role) ?? getString(row.title);
      if (!name || !role) return null;

      return {
        name,
        role,
        imageUrl: media?.url ?? getString(row.imageUrl) ?? fallback[0]?.imageUrl ?? '/images/jack-kellner.avif',
        imageAlt: media?.alt ?? getString(row.imageAlt) ?? name,
      };
    })
    .filter((item): item is TeamMember => Boolean(item));

  return parsed.length ? parsed : fallback;
}

function parseTeam(raw: JsonRecord | null, fallback: TeamContent): TeamContent {
  if (!raw) return fallback;

  return {
    eyebrow: getString(raw.eyebrow) ?? fallback.eyebrow,
    title: getString(raw.title) ?? fallback.title,
    description: getString(raw.description) ?? getString(raw.copy) ?? fallback.description,
    members: parseTeamMembers(raw.members ?? raw.team ?? raw.people, fallback.members),
  };
}

function parseFaqItems(rawItems: unknown, fallback: FAQItem[]): FAQItem[] {
  const parsed = toRecordArray(rawItems)
    .map((row) => {
      const question = getString(row.question) ?? getString(row.title);
      const answer = getString(row.answer) ?? getString(row.response);
      if (!question || !answer) return null;
      return { question, answer };
    })
    .filter((item): item is FAQItem => Boolean(item));

  return parsed.length ? parsed : fallback;
}

function parseFaq(raw: JsonRecord | null, fallback: FAQContent): FAQContent {
  if (!raw) return fallback;

  return {
    eyebrow: getString(raw.eyebrow) ?? fallback.eyebrow,
    title: getString(raw.title) ?? fallback.title,
    items: parseFaqItems(raw.items ?? raw.faqs ?? raw.questions, fallback.items),
  };
}

export async function getLandingPageContent(): Promise<LandingPageContent> {
  if (!STRAPI_URL) return defaultLandingPageContent;

  const [heroRaw, aboutRaw, featuresRaw, workflowRaw, whyUsRaw, teamRaw, faqRaw] =
    await Promise.all([
      fetchSection(SECTION_ENDPOINTS.hero),
      fetchSection(SECTION_ENDPOINTS.about),
      fetchSection(SECTION_ENDPOINTS.features),
      fetchSection(SECTION_ENDPOINTS.workflow),
      fetchSection(SECTION_ENDPOINTS.whyUs),
      fetchSection(SECTION_ENDPOINTS.team),
      fetchSection(SECTION_ENDPOINTS.faq),
    ]);

  return {
    hero: parseHero(heroRaw, defaultLandingPageContent.hero),
    about: parseAbout(aboutRaw, defaultLandingPageContent.about),
    features: parseFeatures(featuresRaw, defaultLandingPageContent.features),
    workflow: parseWorkflow(workflowRaw, defaultLandingPageContent.workflow),
    whyUs: parseWhyUs(whyUsRaw, defaultLandingPageContent.whyUs),
    team: parseTeam(teamRaw, defaultLandingPageContent.team),
    faq: parseFaq(faqRaw, defaultLandingPageContent.faq),
  };
}
