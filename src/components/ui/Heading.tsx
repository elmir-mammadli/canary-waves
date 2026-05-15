import type { ReactNode } from 'react';

interface HeadingProps {
  as?: 'h1' | 'h2' | 'h3';
  text: string;
  className?: string;
}

function parseEmphasis(text: string): ReactNode[] {
  const parts = text.split(/(\*[^*]+\*)/g).filter(Boolean);
  return parts.map((part, index) => {
    if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={index}>{part.slice(1, -1)}</em>;
    }
    return part.split('\n').map((line, lineIndex, lines) => (
      <span key={`${index}-${lineIndex}`}>
        {line}
        {lineIndex < lines.length - 1 ? <br /> : null}
      </span>
    ));
  });
}

export default function Heading({ as = 'h2', text, className }: HeadingProps) {
  const Tag = as;
  return <Tag className={className}>{parseEmphasis(text)}</Tag>;
}
