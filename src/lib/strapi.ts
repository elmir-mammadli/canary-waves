import {
  type CmsText,
  type ImpactContent,
  type ImpactStat,
  defaultLandingPageContent,
  type AboutContent,
  type FAQContent,
  type FAQItem,
  type FeatureItem,
  type FeaturesContent,
  type HeroContent,
  type LandingPageContent,
  type StrapiRichTextNode,
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
const isProduction = process.env.NODE_ENV === 'production';
const rawFailOnError = (process.env.STRAPI_FAIL_ON_ERROR ?? '').toLowerCase();
const STRAPI_FAIL_ON_ERROR = ['1', 'true', 'yes', 'on'].includes(rawFailOnError);
const defaultStatus = isProduction ? 'published' : 'draft';
const rawStatus = (process.env.STRAPI_CONTENT_STATUS ?? defaultStatus).toLowerCase();
const STRAPI_CONTENT_STATUS = rawStatus === 'draft' || rawStatus === 'published' ? rawStatus : defaultStatus;
const defaultRevalidate = isProduction ? 60 : 0;
const rawRevalidate = process.env.STRAPI_REVALIDATE ?? String(defaultRevalidate);
const normalizedRevalidate = rawRevalidate.trim().match(/^(\d+)\s*s?$/i)?.[1] ?? rawRevalidate;
const parsedRevalidate = Number(normalizedRevalidate);
const STRAPI_REVALIDATE_SECONDS = Number.isFinite(parsedRevalidate) ? parsedRevalidate : defaultRevalidate;

const SECTION_ENDPOINTS = {
  hero: 'hero-section',
  about: 'about-section',
  features: 'signals-section',
  workflow: 'workflow-section',
  whyUs: 'why-us-section',
  impact: 'impact-section',
  team: 'team-section',
  faq: 'faq-section',
} as const;

function getPopulateParams(endpoint: string): URLSearchParams {
  const params = new URLSearchParams();

  if (STRAPI_CONTENT_STATUS === 'draft' || STRAPI_CONTENT_STATUS === 'published') {
    params.append('status', STRAPI_CONTENT_STATUS);
  }

  // Strapi v5 single types with repeatable components are covered by populate=*.
  // Extra nested populate params caused validation errors for media fields here.
  params.append('populate', '*');

  return params;
}

function asRecord(value: unknown): JsonRecord | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  return value as JsonRecord;
}

function getString(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function getNumber(value: unknown): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value !== 'string') return null;
  const normalized = value.trim().replace(/%$/, '');
  if (!normalized) return null;
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

function isRichTextNode(value: unknown): value is StrapiRichTextNode {
  const row = asRecord(value);
  if (!row) return false;
  return (
    typeof row.type === 'string' ||
    typeof row.text === 'string' ||
    Array.isArray(row.children)
  );
}

function isRichTextArray(value: unknown): value is StrapiRichTextNode[] {
  return Array.isArray(value) && value.some((item) => isRichTextNode(item));
}

function extractRichText(value: unknown): string | null {
  if (!value) return null;

  const direct = getString(value);
  if (direct) return direct;

  if (Array.isArray(value)) {
    const lines = value
      .map((item) => extractRichText(item))
      .filter((item): item is string => Boolean(item));
    if (!lines.length) return null;
    const combined = lines.join('\n').replace(/\n{3,}/g, '\n\n').trim();
    return combined.length ? combined : null;
  }

  const record = asRecord(value);
  if (!record) return null;

  // Strapi blocks rich-text leaf nodes often use { type: 'text', text: '...' }.
  const nodeText = getString(record.text) ?? getString(record.value) ?? getString(record.label);
  if (nodeText) return nodeText;

  if (Array.isArray(record.children)) {
    const childrenText = record.children
      .map((child) => extractRichText(child))
      .filter((item): item is string => Boolean(item))
      .join('');
    if (childrenText.trim()) return childrenText.trim();
  }

  // Support alternate rich-text containers.
  return (
    extractRichText(record.content) ??
    extractRichText(record.blocks) ??
    extractRichText(record.body) ??
    null
  );
}

function getText(value: unknown): string | null {
  return getString(value) ?? extractRichText(value);
}

function getCmsText(value: unknown): CmsText | null {
  const plain = getString(value);
  if (plain) return plain;

  if (isRichTextArray(value)) {
    return value;
  }

  const row = asRecord(value);
  if (!row) return null;

  return (
    getCmsText(row.content) ??
    getCmsText(row.blocks) ??
    getCmsText(row.body) ??
    getCmsText(row.description) ??
    null
  );
}

function toStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (typeof item === 'string') return item.trim();
      const row = asRecord(item);
      if (!row) return '';
      return (
        getText(row.text) ??
        getText(row.value) ??
        getText(row.label) ??
        getText(row.title) ??
        ''
      );
    })
    .filter(Boolean);
}

function toRecordArray(value: unknown): JsonRecord[] {
  if (!Array.isArray(value)) return [];
  return value.map((item) => normalizeEntry(item)).filter((item): item is JsonRecord => Boolean(item));
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
  const direct = getString(value);
  if (direct) {
    return {
      url: toAbsoluteMediaUrl(direct),
      alt: 'Section image',
    };
  }

  if (Array.isArray(value)) return parseMedia(value[0]);

  const record = asRecord(value);
  if (!record) return null;

  if ('data' in record) return parseMedia(record.data);
  if ('attributes' in record) return parseMedia(record.attributes);

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

interface SectionFetchResult {
  endpoint: string;
  data: JsonRecord | null;
  error: string | null;
}

function describeError(error: unknown): string {
  if (error instanceof Error && error.message) return error.message;
  return String(error);
}

async function fetchSection(endpoint: string): Promise<SectionFetchResult> {
  if (!STRAPI_URL) {
    return {
      endpoint,
      data: null,
      error: 'NEXT_PUBLIC_STRAPI_URL is not set.',
    };
  }

  try {
    const query = getPopulateParams(endpoint).toString();
    const response = await fetch(`${STRAPI_URL}/api/${endpoint}?${query}`, {
      headers: STRAPI_TOKEN ? { Authorization: `Bearer ${STRAPI_TOKEN}` } : undefined,
      ...(STRAPI_REVALIDATE_SECONDS > 0
        ? { next: { revalidate: STRAPI_REVALIDATE_SECONDS } }
        : { cache: 'no-store' as const }),
    });

    if (!response.ok) {
      const body = await response.text();
      return {
        endpoint,
        data: null,
        error: `HTTP ${response.status} ${response.statusText}${body ? ` - ${body.slice(0, 220)}` : ''}`,
      };
    }

    const payload = (await response.json()) as JsonRecord;
    const data = normalizeEntry(payload.data);

    if (!data) {
      return {
        endpoint,
        data: null,
        error: `No data returned. Check that "${endpoint}" has a ${STRAPI_CONTENT_STATUS} entry.`,
      };
    }

    return { endpoint, data, error: null };
  } catch (error) {
    return {
      endpoint,
      data: null,
      error: describeError(error),
    };
  }
}

function parseHero(raw: JsonRecord | null, fallback: HeroContent): HeroContent {
  if (!raw) return fallback;

  const media = parseMedia(raw.image ?? raw.backgroundImage ?? raw.heroImage);

  return {
    brand: getText(raw.brand) ?? fallback.brand,
    heading: getText(raw.heading) ?? getText(raw.title) ?? fallback.heading,
    subheading: getText(raw.subheading) ?? getText(raw.description) ?? fallback.subheading,
    primaryCtaLabel: getText(raw.primaryCtaLabel) ?? getText(raw.primaryCtaText) ?? fallback.primaryCtaLabel,
    secondaryCtaLabel:
      getText(raw.secondaryCtaLabel) ?? getText(raw.secondaryCtaText) ?? fallback.secondaryCtaLabel,
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
    eyebrow: getText(raw.eyebrow) ?? fallback.eyebrow,
    title: getText(raw.title) ?? fallback.title,
    description: getCmsText(raw.description) ?? getCmsText(raw.copy) ?? fallback.description,
    pillars: parsedPillars.length ? parsedPillars : fallback.pillars,
  };
}

function parseFeatureItems(rawItems: unknown, fallback: FeatureItem[]): FeatureItem[] {
  const parsed = toRecordArray(rawItems)
    .map((row, index) => {
      const media = parseMedia(row.image ?? row.media ?? row.photo);
      const title = getText(row.title);
      const subtitle = getText(row.subtitle) ?? getText(row.subheading) ?? getText(row.tagline);
      const summary = getCmsText(row.summary) ?? getCmsText(row.description);
      if (!title || !summary) return null;

      const item: FeatureItem = {
        title,
        subtitle: subtitle ?? fallback[index]?.subtitle,
        summary,
        imageUrl:
          media?.url ??
          getString(row.imageUrl) ??
          fallback[index]?.imageUrl ??
          fallback[0]?.imageUrl ??
          '/images/feature-1.avif',
        imageAlt: media?.alt ?? getString(row.imageAlt) ?? title,
      };

      return item;
    })
    .filter((item): item is FeatureItem => Boolean(item));

  return parsed.length ? parsed : fallback;
}

function parseFeatures(raw: JsonRecord | null, fallback: FeaturesContent): FeaturesContent {
  if (!raw) return fallback;

  return {
    eyebrow: getText(raw.eyebrow) ?? fallback.eyebrow,
    title: getText(raw.title) ?? fallback.title,
    items: parseFeatureItems(raw.items ?? raw.features ?? raw.cards, fallback.items),
  };
}

function parseWorkflowSteps(rawItems: unknown, fallback: WorkflowStep[]): WorkflowStep[] {
  const parsed = toRecordArray(rawItems)
    .map((row, index) => {
      const title = getText(row.title);
      const description = getCmsText(row.description) ?? getCmsText(row.summary);
      if (!title || !description) return null;

      return {
        step: getText(row.step) ?? String(index + 1).padStart(2, '0'),
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
    eyebrow: getText(raw.eyebrow) ?? fallback.eyebrow,
    title: getText(raw.title) ?? fallback.title,
    ctaLabel: getText(raw.ctaLabel) ?? getText(raw.buttonLabel) ?? fallback.ctaLabel,
    steps: parseWorkflowSteps(raw.steps ?? raw.items, fallback.steps),
  };
}

function parseWhyUsItems(rawItems: unknown, fallback: WhyUsItem[]): WhyUsItem[] {
  const parsed = toRecordArray(rawItems)
    .map((row, index) => {
      const media = parseMedia(row.image ?? row.media ?? row.photo);
      const title = getText(row.title);
      const description = getCmsText(row.description) ?? getCmsText(row.summary);
      if (!title || !description) return null;

      return {
        title,
        description,
        imageUrl:
          media?.url ??
          getString(row.imageUrl) ??
          fallback[index]?.imageUrl ??
          fallback[0]?.imageUrl ??
          '/images/whyus-1.avif',
        imageAlt: media?.alt ?? getString(row.imageAlt) ?? title,
      };
    })
    .filter((item): item is WhyUsItem => Boolean(item));

  return parsed.length ? parsed : fallback;
}

function parseWhyUs(raw: JsonRecord | null, fallback: WhyUsContent): WhyUsContent {
  if (!raw) return fallback;

  return {
    eyebrow: getText(raw.eyebrow) ?? fallback.eyebrow,
    title: getText(raw.title) ?? fallback.title,
    items: parseWhyUsItems(raw.items ?? raw.points ?? raw.cards, fallback.items),
  };
}

function parseImpactStats(rawItems: unknown, fallback: ImpactStat[]): ImpactStat[] {
  const parsed = toRecordArray(rawItems)
    .map((row, index) => {
      const value =
        getNumber(row.value) ??
        getNumber(row.percentage) ??
        getNumber(row.number) ??
        fallback[index]?.value ??
        0;
      const label = getText(row.label) ?? getText(row.title) ?? fallback[index]?.label;

      if (!label) return null;

      const item: ImpactStat = {
        value,
        suffix: getText(row.suffix) ?? fallback[index]?.suffix ?? '%',
        label,
      };

      return item;
    })
    .filter((item): item is ImpactStat => Boolean(item));

  return parsed.length ? parsed : fallback;
}

function parseImpact(raw: JsonRecord | null, fallback: ImpactContent): ImpactContent {
  if (!raw) return fallback;

  return {
    title: getText(raw.title) ?? fallback.title,
    description: getCmsText(raw.description) ?? getCmsText(raw.copy) ?? fallback.description,
    caption: getCmsText(raw.caption) ?? getCmsText(raw.note) ?? fallback.caption,
    stats: parseImpactStats(raw.stats ?? raw.items ?? raw.metrics, fallback.stats),
  };
}

function parseTeamMembers(rawItems: unknown, fallback: TeamMember[]): TeamMember[] {
  const parsed = toRecordArray(rawItems)
    .map((row, index) => {
      const media = parseMedia(row.image ?? row.photo ?? row.avatar);
      const name = getText(row.name);
      const role = getText(row.role) ?? getText(row.title);
      if (!name || !role) return null;

      return {
        name,
        role,
        imageUrl:
          media?.url ??
          getString(row.imageUrl) ??
          fallback[index]?.imageUrl ??
          fallback[0]?.imageUrl ??
          '/images/jack-kellner.avif',
        imageAlt: media?.alt ?? getString(row.imageAlt) ?? name,
      };
    })
    .filter((item): item is TeamMember => Boolean(item));

  return parsed.length ? parsed : fallback;
}

function parseTeam(raw: JsonRecord | null, fallback: TeamContent): TeamContent {
  if (!raw) return fallback;

  return {
    eyebrow: getText(raw.eyebrow) ?? fallback.eyebrow,
    title: getText(raw.title) ?? fallback.title,
    description: getCmsText(raw.description) ?? getCmsText(raw.copy) ?? fallback.description,
    members: parseTeamMembers(raw.members ?? raw.team ?? raw.people, fallback.members),
  };
}

function parseFaqItems(rawItems: unknown, fallback: FAQItem[]): FAQItem[] {
  const parsed = toRecordArray(rawItems)
    .map((row) => {
      const question = getText(row.question) ?? getText(row.title);
      const answer = getCmsText(row.answer) ?? getCmsText(row.response);
      if (!question || !answer) return null;
      return { question, answer };
    })
    .filter((item): item is FAQItem => Boolean(item));

  return parsed.length ? parsed : fallback;
}

function parseFaq(raw: JsonRecord | null, fallback: FAQContent): FAQContent {
  if (!raw) return fallback;

  return {
    eyebrow: getText(raw.eyebrow) ?? fallback.eyebrow,
    title: getText(raw.title) ?? fallback.title,
    items: parseFaqItems(raw.items ?? raw.faqs ?? raw.questions, fallback.items),
  };
}

export async function getLandingPageContent(): Promise<LandingPageContent> {
  if (!STRAPI_URL) return defaultLandingPageContent;

  const [heroResult, aboutResult, featuresResult, workflowResult, whyUsResult, impactResult, teamResult, faqResult] =
    await Promise.all([
      fetchSection(SECTION_ENDPOINTS.hero),
      fetchSection(SECTION_ENDPOINTS.about),
      fetchSection(SECTION_ENDPOINTS.features),
      fetchSection(SECTION_ENDPOINTS.workflow),
      fetchSection(SECTION_ENDPOINTS.whyUs),
      fetchSection(SECTION_ENDPOINTS.impact),
      fetchSection(SECTION_ENDPOINTS.team),
      fetchSection(SECTION_ENDPOINTS.faq),
    ]);

  const results = [
    heroResult,
    aboutResult,
    featuresResult,
    workflowResult,
    whyUsResult,
    impactResult,
    teamResult,
    faqResult,
  ];
  const errors = results.filter((result) => result.error);

  if (errors.length > 0) {
    const details = errors.map((result) => `- ${result.endpoint}: ${result.error}`).join('\n');
    if (STRAPI_FAIL_ON_ERROR) {
      throw new Error(`Strapi content fetch failed.\n${details}`);
    }

    console.warn(`Strapi fetch warning (fallback in use):\n${details}`);
  }

  return {
    hero: parseHero(heroResult.data, defaultLandingPageContent.hero),
    about: parseAbout(aboutResult.data, defaultLandingPageContent.about),
    features: parseFeatures(featuresResult.data, defaultLandingPageContent.features),
    workflow: parseWorkflow(workflowResult.data, defaultLandingPageContent.workflow),
    whyUs: parseWhyUs(whyUsResult.data, defaultLandingPageContent.whyUs),
    impact: parseImpact(impactResult.data, defaultLandingPageContent.impact),
    team: parseTeam(teamResult.data, defaultLandingPageContent.team),
    faq: parseFaq(faqResult.data, defaultLandingPageContent.faq),
  };
}
