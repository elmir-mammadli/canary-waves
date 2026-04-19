declare const strapi: any;

const SECTION_DEFINITIONS = {
  hero: {
    uid: 'api::hero-section.hero-section',
    populate: {
      notes: true,
      image: true,
    },
  },
  about: {
    uid: 'api::about-section.about-section',
    populate: {
      pillars: true,
    },
  },
  features: {
    uid: 'api::signals-section.signals-section',
    populate: {
      items: {
        populate: {
          image: true,
        },
      },
    },
  },
  workflow: {
    uid: 'api::workflow-section.workflow-section',
    populate: {
      steps: true,
    },
  },
  whyUs: {
    uid: 'api::why-us-section.why-us-section',
    populate: {
      items: {
        populate: {
          image: true,
        },
      },
    },
  },
  impact: {
    uid: 'api::impact-section.impact-section',
    populate: {
      stats: true,
    },
  },
  team: {
    uid: 'api::team-section.team-section',
    populate: {
      members: {
        populate: {
          image: true,
        },
      },
    },
  },
  faq: {
    uid: 'api::faq-section.faq-section',
    populate: {
      items: true,
    },
  },
} as const;

type SectionName = keyof typeof SECTION_DEFINITIONS;
type ContentStatus = 'draft' | 'published';

function getStatus(value: unknown): ContentStatus {
  return value === 'draft' ? 'draft' : 'published';
}

function getQueryOptions(status: ContentStatus, populate: unknown) {
  if (status === 'draft') {
    return { populate };
  }

  return {
    where: {
      publishedAt: {
        $notNull: true,
      },
    },
    populate,
  };
}

async function fetchSection(name: SectionName, status: ContentStatus) {
  const definition = SECTION_DEFINITIONS[name];

  return strapi.db.query(definition.uid).findOne(getQueryOptions(status, definition.populate));
}

export default {
  async find(ctx: { body?: unknown; query: Record<string, unknown>; throw: (status: number, message: string) => never }) {
    const status = getStatus(ctx.query.status);

    try {
      const [hero, about, features, workflow, whyUs, impact, team, faq] = await Promise.all([
        fetchSection('hero', status),
        fetchSection('about', status),
        fetchSection('features', status),
        fetchSection('workflow', status),
        fetchSection('whyUs', status),
        fetchSection('impact', status),
        fetchSection('team', status),
        fetchSection('faq', status),
      ]);

      ctx.body = {
        data: {
          hero,
          about,
          features,
          workflow,
          whyUs,
          impact,
          team,
          faq,
        },
      };
    } catch (error) {
      strapi.log.error('Failed to aggregate landing page content.', error);
      ctx.throw(500, 'Failed to load landing page content.');
    }
  },
};
