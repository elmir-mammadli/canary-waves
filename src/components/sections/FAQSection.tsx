'use client';

import { useState } from 'react';
import type { CmsText, FAQItemContent, FAQSectionContent } from '@/lib/page-content';
import CmsRichText from '@/components/CmsRichText';
import { linesFromNewlines } from '@/lib/format-heading';

interface FAQSectionProps {
  content: FAQSectionContent;
}

function FAQItem({ question, answer }: { question: string; answer: CmsText }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`faq-item${open ? ' open' : ''}`}>
      <div
        className="faq-q"
        role="button"
        tabIndex={0}
        onClick={() => setOpen((value) => !value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            setOpen((value) => !value);
          }
        }}
      >
        {question}
        <span className="faq-icon">+</span>
      </div>
      <div className="faq-a">
        <div className="faq-a-inner">
          <CmsRichText value={answer} />
        </div>
      </div>
    </div>
  );
}

export default function FAQSection({ content }: FAQSectionProps) {
  return (
    <section id="faq">
      <p className="sec-label" style={{ textAlign: 'center' }}>
        {content.eyebrow}
      </p>
      <h2>{linesFromNewlines(content.title)}</h2>
      <div className="faq-list">
        {content.items.map((faq: FAQItemContent) => (
          <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </section>
  );
}
