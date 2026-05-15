'use client';

import { useState } from 'react';
import type { CmsText, FAQItemContent, FAQSectionContent } from '@/lib/page-content';
import CmsRichText from '@/components/CmsRichText';
import Heading from '@/components/ui/Heading';
import SectionLabel from '@/components/ui/SectionLabel';

interface FAQSectionProps {
  content: FAQSectionContent;
}

function FAQItem({ question, answer }: { question: string; answer: CmsText }) {
  const [open, setOpen] = useState(false);

  return (
    <article className={`faq-item ${open ? 'is-open' : ''}`}>
      <button type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open}>
        <span>{question}</span>
        <span className="faq-icon" aria-hidden>
          +
        </span>
      </button>
      <div className="faq-answer">
        <CmsRichText value={answer} className="faq-richtext" />
      </div>
    </article>
  );
}

export default function FAQSection({ content }: FAQSectionProps) {
  return (
    <section id="faq" className="section section-faq">
      <div className="shell section-faq-inner">
        <SectionLabel centered>{content.eyebrow}</SectionLabel>
        <Heading as="h2" text={content.title} className="section-title is-centered" />
        <div className="faq-list">
          {content.items.map((faq) => (
            <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}
