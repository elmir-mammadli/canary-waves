'use client';

import type { ReactNode } from 'react';
import type { CmsText, StrapiRichTextNode } from '@/lib/page-content';

interface CmsRichTextProps {
  value: CmsText;
  className?: string;
}

type RichNode = StrapiRichTextNode;

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

function isNode(value: unknown): value is RichNode {
  return isRecord(value);
}

function renderInlineNodes(nodes: unknown, keyPrefix: string): ReactNode {
  if (!Array.isArray(nodes)) return null;

  return nodes.map((node, index) => {
    if (!isNode(node)) return null;

    if (node.type === 'text' || typeof node.text === 'string') {
      const content = typeof node.text === 'string' ? node.text : '';
      let rendered: ReactNode = content;

      if (node.code) rendered = <code>{rendered}</code>;
      if (node.bold) rendered = <strong>{rendered}</strong>;
      if (node.italic) rendered = <em>{rendered}</em>;
      if (node.underline) rendered = <u>{rendered}</u>;
      if (node.strikethrough) rendered = <s>{rendered}</s>;

      return <span key={`${keyPrefix}-text-${index}`}>{rendered}</span>;
    }

    if (node.type === 'link') {
      const href = typeof node.url === 'string' && node.url.trim() ? node.url : '#';
      const isExternal = href.startsWith('http://') || href.startsWith('https://');
      return (
        <a
          key={`${keyPrefix}-link-${index}`}
          href={href}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
        >
          {renderInlineNodes(node.children, `${keyPrefix}-link-${index}`)}
        </a>
      );
    }

    return (
      <span key={`${keyPrefix}-inline-${index}`}>
        {renderInlineNodes(node.children, `${keyPrefix}-inline-${index}`)}
      </span>
    );
  });
}

function renderListItems(nodes: unknown, keyPrefix: string): ReactNode {
  if (!Array.isArray(nodes)) return null;

  return nodes.map((node, index) => {
    if (!isNode(node)) return null;
    const content =
      Array.isArray(node.children) && node.children.length
        ? renderInlineNodes(node.children, `${keyPrefix}-li-${index}`)
        : renderInlineNodes([node], `${keyPrefix}-li-${index}`);

    return <li key={`${keyPrefix}-li-${index}`}>{content}</li>;
  });
}

function renderBlockNodes(value: unknown): ReactNode {
  if (!Array.isArray(value)) return null;

  return value.map((block, index) => {
    if (!isNode(block)) return null;
    const key = `block-${index}`;
    const type = typeof block.type === 'string' ? block.type : 'paragraph';

    if (type === 'list') {
      const ListTag = block.format === 'ordered' ? 'ol' : 'ul';
      return <ListTag key={key}>{renderListItems(block.children, key)}</ListTag>;
    }

    if (type === 'quote') {
      return <blockquote key={key}>{renderInlineNodes(block.children, key)}</blockquote>;
    }

    if (type === 'heading') {
      const level = typeof block.level === 'number' ? Math.min(Math.max(block.level, 1), 6) : 3;
      if (level === 1) return <h1 key={key}>{renderInlineNodes(block.children, key)}</h1>;
      if (level === 2) return <h2 key={key}>{renderInlineNodes(block.children, key)}</h2>;
      if (level === 3) return <h3 key={key}>{renderInlineNodes(block.children, key)}</h3>;
      if (level === 4) return <h4 key={key}>{renderInlineNodes(block.children, key)}</h4>;
      if (level === 5) return <h5 key={key}>{renderInlineNodes(block.children, key)}</h5>;
      return <h6 key={key}>{renderInlineNodes(block.children, key)}</h6>;
    }

    if (type === 'code') {
      return (
        <pre key={key}>
          <code>{renderInlineNodes(block.children, key)}</code>
        </pre>
      );
    }

    return <p key={key}>{renderInlineNodes(block.children, key)}</p>;
  });
}

function renderPlainText(value: string): ReactNode {
  const normalized = value.replace(/\r\n/g, '\n').trim();
  if (!normalized) return null;

  const paragraphs = normalized.split(/\n{2,}/).filter(Boolean);
  if (paragraphs.length <= 1) return <p>{normalized}</p>;

  return paragraphs.map((paragraph, index) => (
    <p key={`p-${index}`}>{paragraph}</p>
  ));
}

export default function CmsRichText({ value, className }: CmsRichTextProps) {
  const content = typeof value === 'string' ? renderPlainText(value) : renderBlockNodes(value);

  return <div className={['cms-richtext', className].filter(Boolean).join(' ')}>{content}</div>;
}
