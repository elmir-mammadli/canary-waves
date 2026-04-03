'use client';

import { useState } from 'react';

const faqs = [
  {
    question: 'How does Canary Waves work on-site?',
    answer:
      'CanaryWaves gathers and reads radio recording files taken from site. It connects directly to site servers to access data. The best part? This structure requires no new radio hardware, training, or behavioral change for frontline operators.',
  },
  {
    question: 'What industries do you support?',
    answer:
      'We specialize in mining, manufacturing, and energy—wherever safety is critical.',
  },
  {
    question: 'Is training required for staff?',
    answer:
      "Canary's voice interface is intuitive and requires minimal training to get started.",
  },
  {
    question: 'What if we aren\'t currently recording two-way chatter?',
    answer:
      'No problem! We have developed relationships with hardware suppliers and dealers to integrate this on site. The installation and set up is an extremely low barrier to entry and can be worked into a CanaryWaves agreement.',
  },
  {
    question: "We already have plenty of systems. Won't this just be another?",
    answer:
      'Canary-Waves is designed as a passive data organization and observation tool. Its web-based and email based, giving decision makers easy, low-impact info. If necessary, Canary Waves can be integrated into other operations management systems already on site. Overall, CanaryWaves is meant to enhance all the systems you already have in place, not just add another one to manage.',
  },
  {
    question: 'What about privacy?',
    answer:
      'Canary Waves has taken a relentless approach to anonymity and privacy. The software is designed with multiple \'read-only\' systems that pull data, analyze and integrate it into our models, and delete those records. We do not store any employee or identifying information. Encryption of data and the CanaryWaves platform is also built in throughout, ensuring your data is secure during processing.',
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        backgroundColor: '#ffc9a2',
        borderRadius: '10px',
        marginBottom: '5px',
        overflow: 'hidden',
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          backgroundColor: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          textAlign: 'left',
        }}
      >
        <span
          style={{
            color: '#897465',
            fontWeight: 700,
            fontSize: '18px',
            lineHeight: '14px',
            flexShrink: 0,
            width: '14px',
            textAlign: 'center',
          }}
        >
          {open ? '−' : '+'}
        </span>
        <span
          style={{
            color: '#1f1716',
            fontWeight: 400,
            fontSize: '16px',
            fontFamily: 'inherit',
            flex: 1,
          }}
        >
          {question}
        </span>
      </button>
      {open && (
        <div style={{ padding: '0 20px 16px 50px' }}>
          <p
            style={{
              color: '#897465',
              fontWeight: 400,
              fontSize: '16px',
              margin: 0,
              lineHeight: '1.6em',
              textAlign: 'left',
            }}
          >
            {answer}
          </p>
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  return (
    <section
      style={{
        backgroundColor: '#f4ebda',
        paddingTop: '80px',
        paddingBottom: '64px',
        paddingLeft: '20px',
        paddingRight: '20px',
      }}
    >
      <div style={{ maxWidth: '1200px' }} className="mx-auto">
        <h2
          style={{
            color: '#897465',
            fontWeight: 700,
            fontSize: 'clamp(28px, 4vw, 40px)',
            letterSpacing: '-0.04em',
            textAlign: 'center',
            marginBottom: '40px',
          }}
        >
          Frequently Asked Questions
        </h2>

        <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
          {faqs.map((faq) => (
            <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}
