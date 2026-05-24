import type { ReactNode } from 'react';

export function linesFromNewlines(text: string): ReactNode {
  const parts = text.split('\n');
  return parts.map((line, index) => (
    <span key={`${line}-${index}`}>
      {index > 0 ? <br /> : null}
      {line}
    </span>
  ));
}

export function heroHeading(text: string): ReactNode {
  const marker = 'The best ones';
  const index = text.indexOf(marker);
  if (index === -1) return text;
  return (
    <>
      {text.slice(0, index).trimEnd()}
      <em>{text.slice(index)}</em>
    </>
  );
}

export function headingWithEmDash(title: string): ReactNode {
  const parts = title.split(' — ');
  if (parts.length < 2) return linesFromNewlines(title);
  const lead = parts.slice(0, -1).join(' — ');
  const emphasis = parts[parts.length - 1];
  return (
    <>
      {linesFromNewlines(lead)}
      {' — '}
      <em>{emphasis}</em>
    </>
  );
}
