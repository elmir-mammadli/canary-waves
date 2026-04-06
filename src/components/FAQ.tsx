'use client';

import { useState } from 'react';
import type { CmsText, FAQContent } from '@/lib/landing-content';
import CmsRichText from '@/components/CmsRichText';

interface FAQProps {
  content: FAQContent;
}

function FAQItem({ question, answer }: { question: string; answer: CmsText }) {
  const [open, setOpen] = useState(false);

  return (
    <article className={`faq-item ${open ? 'is-open' : ''}`}>
      <button type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open}>
        <span>{question}</span>
        <span aria-hidden>{open ? '−' : '+'}</span>
      </button>
      <div className="faq-answer">
        <CmsRichText value={answer} className="faq-richtext" />
      </div>
    </article>
  );
}

export default function FAQ({ content }: FAQProps) {
  return (
    <section className="section section-faq" data-reveal>
      <div className="shell">
        <p className="eyebrow">{content.eyebrow}</p>
        <h2 className="section-title">{content.title}</h2>
        <div className="faq-list">
          {content.items.map((faq) => (
            <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}
