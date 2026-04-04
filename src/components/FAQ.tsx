'use client';

import { useState } from 'react';

const faqs = [
  {
    question: 'How does Canary Waves work on-site?',
    answer:
      'Canary Waves connects to your existing radio data workflows and turns communication into structured operational signals without changing frontline behavior.',
  },
  {
    question: 'What industries do you support?',
    answer:
      'We focus on mining, manufacturing, and energy operations where communication quality directly affects safety and performance.',
  },
  {
    question: 'Do teams need extensive training?',
    answer:
      'No. The platform is designed for low-friction rollout and minimal workflow disruption for supervisors and site teams.',
  },
  {
    question: 'How does data privacy work?',
    answer:
      'Canary Waves is designed for secure processing with strong controls, role-based visibility, and strict handling of sensitive operational data.',
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <article className={`faq-item ${open ? 'is-open' : ''}`}>
      <button type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open}>
        <span>{question}</span>
        <span aria-hidden>{open ? '−' : '+'}</span>
      </button>
      <div className="faq-answer">
        <p>{answer}</p>
      </div>
    </article>
  );
}

export default function FAQ() {
  return (
    <section className="section section-faq" data-reveal>
      <div className="shell">
        <p className="eyebrow">FAQ</p>
        <h2 className="section-title">Common questions from operations leaders.</h2>
        <div className="faq-list">
          {faqs.map((faq) => (
            <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}
