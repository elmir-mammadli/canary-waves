'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import type { ImpactSectionContent, WhyUsSectionContent } from '@/lib/page-content';
import CmsRichText from '@/components/CmsRichText';
import { headingWithEmDash, linesFromNewlines } from '@/lib/format-heading';

const STAT_PILLS = ['Equipment risk', 'Ops intelligence', 'Compliance'] as const;

interface WhyUsWithImpactSectionProps {
  whyUs: WhyUsSectionContent;
  impact: ImpactSectionContent;
}

function StatNumber({
  value,
  suffix,
  active,
}: {
  value: number;
  suffix: string;
  active: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;

    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(value);
      return;
    }

    let current = 0;
    const step = Math.ceil(value / 48);
    const timer = window.setInterval(() => {
      current = Math.min(current + step, value);
      setCount(current);
      if (current >= value) window.clearInterval(timer);
    }, 30);

    return () => window.clearInterval(timer);
  }, [active, value]);

  return (
    <>
      {count}
      {suffix}
    </>
  );
}

export default function WhyUsWithImpactSection({ whyUs, impact }: WhyUsWithImpactSectionProps) {
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsActive, setStatsActive] = useState(false);
  const stats = impact.stats.slice(0, 3);

  useEffect(() => {
    const node = statsRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="why-us">
      <p className="sec-label">{whyUs.eyebrow}</p>
      <h2>{headingWithEmDash(whyUs.title)}</h2>

      <div className="why-cards">
        {whyUs.cards.map((card, index) => (
          <div key={`${card.title}-${index}`} className="why-card fade-up">
            <div className="why-card-img">
              <Image src={card.imageUrl} alt={card.imageAlt} width={800} height={500} />
            </div>
            <div className="why-card-body">
              <h3>{card.title}</h3>
              <CmsRichText value={card.description} />
            </div>
          </div>
        ))}
      </div>

      <div className="stats-band" ref={statsRef}>
        {stats.map((stat, index) => (
          <div key={stat.label} className="stat-col fade-up">
            <span className="stat-num">
              <StatNumber value={stat.value} suffix={stat.suffix} active={statsActive} />
            </span>
            <p className="stat-lbl">{stat.label}</p>
            <span className="stat-pill">{STAT_PILLS[index] ?? STAT_PILLS[0]}</span>
          </div>
        ))}
      </div>

      <p className="stats-note">
        {typeof impact.caption === 'string'
          ? impact.caption
          : 'Percentage of incidents prevented according to risk type detected in advance by the Canary Waves system.'}
      </p>

      <div className="stats-narrative fade-up">
        <h3>{impact.title}</h3>
        <CmsRichText value={impact.description} />
      </div>
    </section>
  );
}
