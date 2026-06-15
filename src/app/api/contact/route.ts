import { NextRequest, NextResponse } from 'next/server';

function normalizeStrapiUrl(rawUrl?: string) {
  const fallback = 'http://localhost:1337';

  if (!rawUrl) return fallback;

  return rawUrl
    .trim()
    .replace(/\/+$/, '')
    .replace(/\/admin$/, '')
    .replace(/\/api$/, '');
}

const STRAPI_URL = normalizeStrapiUrl(process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL);

interface FormFieldMeta {
  id?: number;
  label: string;
  type?: string;
  required?: boolean;
}

interface ContactPayload {
  fields?: FormFieldMeta[];
  values?: Record<string, string>;
  [key: string]: unknown;
}

interface StrapiSubmissionPayload {
  name: string;
  email: string;
  company: string;
  message: string;
  source: string;
  payload: Record<string, unknown>;
}

function normalizeKey(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function getStringValue(record: Record<string, string>, key: string) {
  const value = record[key];
  return typeof value === 'string' ? value.trim() : '';
}

function toStringRecord(value: unknown) {
  if (!isRecord(value)) {
    return {} as Record<string, string>;
  }

  return Object.fromEntries(
    Object.entries(value).filter(([, entryValue]) => typeof entryValue === 'string')
  ) as Record<string, string>;
}

function inferFieldValue(
  values: Record<string, string>,
  fields: FormFieldMeta[],
  options: {
    types?: string[];
    labelIncludes?: string[];
    keyIncludes?: string[];
  }
) {
  const lowerTypes = new Set((options.types || []).map((type) => type.toLowerCase()));
  const labelPatterns = (options.labelIncludes || []).map(normalizeKey);
  const keyPatterns = (options.keyIncludes || []).map(normalizeKey);

  for (const field of fields) {
    const normalizedLabel = normalizeKey(field.label || '');
    const fieldKey = (field.label || '').toLowerCase().replace(/\s+/g, '_');
    const normalizedKey = normalizeKey(fieldKey);
    const value = getStringValue(values, fieldKey);

    if (!value) continue;

    if (field.type && lowerTypes.has(field.type.toLowerCase())) {
      return value;
    }

    if (labelPatterns.some((pattern) => normalizedLabel.includes(pattern))) {
      return value;
    }

    if (keyPatterns.some((pattern) => normalizedKey.includes(pattern))) {
      return value;
    }
  }

  for (const [key, rawValue] of Object.entries(values)) {
    const value = typeof rawValue === 'string' ? rawValue.trim() : '';
    if (!value) continue;

    const normalizedKey = normalizeKey(key);
    if (keyPatterns.some((pattern) => normalizedKey.includes(pattern))) {
      return value;
    }
  }

  return '';
}

async function submitToStrapi(payload: StrapiSubmissionPayload) {
  const headers = {
    'Content-Type': 'application/json',
  };

  const submitResponse = await fetch(`${STRAPI_URL}/api/form-submissions/submit`, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  });

  if (submitResponse.ok) {
    return submitResponse;
  }

  if (submitResponse.status !== 404 && submitResponse.status !== 405) {
    return submitResponse;
  }

  return fetch(`${STRAPI_URL}/api/form-submissions`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      data: {
        name: payload.name,
        email: payload.email,
        company: payload.company,
        message: payload.message,
        source: payload.source,
        payload: payload.payload,
      },
    }),
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ContactPayload;
    const values = body.values ? toStringRecord(body.values) : toStringRecord(body);
    const fields = Array.isArray(body.fields) ? body.fields : [];
    const source =
      request.headers.get('x-form-source')?.trim() ||
      (typeof body.source === 'string' && body.source.trim() ? body.source.trim() : 'website-contact');

    const name = inferFieldValue(values, fields, {
      labelIncludes: ['name', 'fullname', 'yourname'],
      keyIncludes: ['name', 'fullname', 'yourname'],
    });
    const email = inferFieldValue(values, fields, {
      types: ['email'],
      labelIncludes: ['email', 'businessemail', 'workemail'],
      keyIncludes: ['email', 'businessemail', 'workemail'],
    });
    const company = inferFieldValue(values, fields, {
      labelIncludes: ['company', 'organization', 'business', 'firm'],
      keyIncludes: ['company', 'organization', 'business', 'firm'],
    });
    const message = inferFieldValue(values, fields, {
      types: ['textarea'],
      labelIncludes: ['message', 'details', 'help', 'comment', 'notes', 'inquiry'],
      keyIncludes: ['message', 'details', 'help', 'comment', 'notes', 'inquiry'],
    });

    if (!name || !email) {
      return NextResponse.json({ message: 'Name and email are required' }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ message: 'Invalid email address' }, { status: 400 });
    }

    const strapiResponse = await submitToStrapi({
      name,
      email,
      company,
      message,
      source,
      payload: {
        values,
        fields,
        submittedFrom: request.headers.get('origin') || request.headers.get('referer') || '',
      },
    });

    if (!strapiResponse.ok) {
      const errorText = await strapiResponse.text();
      console.error('Strapi submission failed:', {
        status: strapiResponse.status,
        statusText: strapiResponse.statusText,
        body: errorText,
        targetUrl: `${STRAPI_URL}/api/form-submissions/submit`,
      });

      return NextResponse.json(
        {
          message:
            strapiResponse.status === 403
              ? 'Form submission is blocked by Strapi permissions'
              : 'Failed to submit form. Please try again.',
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
