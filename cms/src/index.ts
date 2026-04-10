import type { Core } from '@strapi/strapi';

type StrapiModel = {
  uid?: string;
  collectionName?: string;
  attributes?: Record<string, { type?: string }>;
};

function createParagraph(text: string) {
  return {
    type: 'paragraph',
    children: [
      {
        type: 'text',
        text,
      },
    ],
  };
}

function toBlocksValue(raw: unknown) {
  if (Array.isArray(raw)) {
    return null;
  }

  if (typeof raw !== 'string') {
    return null;
  }

  const trimmed = raw.trim();

  if (!trimmed) {
    return [createParagraph('')];
  }

  try {
    const parsed = JSON.parse(trimmed);

    if (Array.isArray(parsed)) {
      return null;
    }
  } catch {
    // Legacy plain-text values should be converted into Strapi blocks.
  }

  return trimmed
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map(createParagraph);
}

async function normalizeLegacyBlocksFields({ strapi }: { strapi: Core.Strapi }) {
  const connection = strapi.db?.connection;

  if (!connection) return;

  const clientName = String(connection.client.config.client ?? '');
  const serializeValue = (value: unknown) =>
    clientName.includes('sqlite') ? JSON.stringify(value) : value;

  const models: StrapiModel[] = [
    ...Object.values(strapi.contentTypes ?? {}),
    ...Object.values(strapi.components ?? {}),
  ];

  for (const model of models) {
    if (!model.collectionName || !model.attributes) continue;

    const blockFields = Object.entries(model.attributes)
      .filter(([, attribute]) => attribute?.type === 'blocks')
      .map(([fieldName]) => fieldName);

    if (!blockFields.length) continue;

    const rows = await connection(model.collectionName).select('id', ...blockFields);
    let updatedCount = 0;

    for (const row of rows) {
      const updates: Record<string, unknown> = {};

      for (const fieldName of blockFields) {
        const normalized = toBlocksValue(row[fieldName]);

        if (normalized) {
          updates[fieldName] = serializeValue(normalized);
        }
      }

      if (Object.keys(updates).length) {
        await connection(model.collectionName).where({ id: row.id }).update(updates);
        updatedCount += 1;
      }
    }

    if (updatedCount) {
      strapi.log.info(
        `Normalized ${updatedCount} legacy rich-text entr${updatedCount === 1 ? 'y' : 'ies'} in ${model.collectionName}`
      );
    }
  }
}

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await normalizeLegacyBlocksFields({ strapi });
  },
};
