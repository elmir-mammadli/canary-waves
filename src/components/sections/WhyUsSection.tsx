'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import type { StatItemContent, WhyUsSectionContent } from '@/lib/page-content';
import CmsRichText from '@/components/CmsRichText';
import FadeUp from '@/components/ui/FadeUp';
import Heading from '@/components/ui/Heading';
import SectionLabel from '@/components/ui/SectionLabel';
import { useFadeUp } from '@/hooks/useFadeUp';

interface WhyUsSectionProps {
  content: WhyUsSectionContent;
}

function StatCounter({ stat }: { stat: StatItemContent }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        let current = 0;
        const step = Math.max(1, Math.ceil(stat.value / 48));
        const timer = window.setInterval(() => {
          current = Math.min(current + step, stat.value);
          setValue(current);
          if (current >= stat.value) window.clearInterval(timer);
        }, 30);
        observer.disconnect();
      },
      { threshold: 0.5 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [stat.value]);

  return (
    <span ref={ref} className="stats-band-value">
      {value}
      {stat.suffix}
    </span>
  );
}

export default function WhyUsSection({ content }: WhyUsSectionProps) {
  useFadeUp();

  return (
    <section id="why-us" className="section section-whyus">
      <div className="shell">
        <SectionLabel>{content.eyebrow}</SectionLabel>
        <Heading as="h2" text={content.title} className="section-title" />

        <div className="why-cards">
          {content.cards.map((card) => (
            <FadeUp key={card.title}>
              <article className="why-card">
                <div className="why-card-media">
                  <Image src={card.imageUrl} alt={card.imageAlt} width={990} height={624} className="why-card-image" />
                </div>
                <div className="why-card-body">
                  <h3>{card.title}</h3>
                  <CmsRichText value={card.description} className="why-card-richtext" />
                </div>
              </article>
            </FadeUp>
          ))}
        </div>

        <div className="stats-band" aria-label="Impact statistics">
          {content.stats.map((stat) => (
            <FadeUp key={stat.label}>
              <div className="stats-band-col">
                <StatCounter stat={stat} />
                <p className="stats-band-label">{stat.label}</p>
              </div>
            </FadeUp>
          ))}
        </div>
        {content.statsNote ? <p className="stats-band-note">{content.statsNote}</p> : null}

        <FadeUp>
          <div className="stats-narrative">
            <h3>{content.narrativeTitle}</h3>
            <CmsRichText value={content.narrativeBody} className="stats-narrative-richtext" />
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
