'use client';

import { useEffect, useRef, useState } from 'react';
import CmsRichText from '@/components/CmsRichText';
import type { ImpactContent } from '@/lib/landing-content';

interface StatsProps {
  content: ImpactContent;
}

interface RingConfig {
  radius: number;
  startAngle: number;
  endAngle: number;
  delay: number;
}

const RING_CONFIG: RingConfig[] = [
  { radius: 210, startAngle: 350, endAngle: 450, delay: 0 },
  { radius: 148, startAngle: 248, endAngle: 450, delay: 120 },
  { radius: 92, startAngle: 158, endAngle: 450, delay: 240 },
];

const GRAPH_CENTER_X = 280;
const GRAPH_CENTER_Y = 286;

const POSITION_CLASSES = ['impact-stat-top', 'impact-stat-left', 'impact-stat-bottom'] as const;

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function polarToCartesian(centerX: number, centerY: number, radius: number, angle: number) {
  const radians = ((angle - 90) * Math.PI) / 180;
  return {
    x: centerX + radius * Math.cos(radians),
    y: centerY + radius * Math.sin(radians),
  };
}

function describeArc(centerX: number, centerY: number, radius: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(centerX, centerY, radius, endAngle);
  const end = polarToCartesian(centerX, centerY, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
}

function getStatAnchor(index: number) {
  const ring = RING_CONFIG[index];
  const endpoint = polarToCartesian(GRAPH_CENTER_X, GRAPH_CENTER_Y, ring.radius, ring.startAngle);

  return {
    left: `${(endpoint.x / 560) * 100}%`,
    top: `${(endpoint.y / 520) * 100}%`,
  };
}

function CountUpValue({
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

    const duration = 1400;
    const startTime = performance.now();
    let frameId = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      setCount(Math.round(easeOutCubic(progress) * value));
      if (progress < 1) frameId = window.requestAnimationFrame(tick);
    };

    frameId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frameId);
  }, [active, value]);

  return (
    <>
      {count}
      {suffix}
    </>
  );
}

export default function Stats({ content }: StatsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);
  const primaryStats = content.stats.slice(0, 3);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.35,
      }
    );

    const current = sectionRef.current;
    if (current) observer.observe(current);

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="section section-impact" data-reveal>
      <div className="shell impact-layout">
        <div className="impact-visual-column">
          <div className="impact-visual">
            <div className="impact-core" aria-hidden="true" />
            <svg className="impact-rings" viewBox="0 0 560 520" aria-hidden="true">
              {RING_CONFIG.map((ring, index) => (
                <path
                  key={`impact-ring-${index}`}
                  d={describeArc(GRAPH_CENTER_X, GRAPH_CENTER_Y, ring.radius, ring.startAngle, ring.endAngle)}
                  className="impact-ring"
                  pathLength={100}
                  style={{
                    strokeDasharray: 100,
                    strokeDashoffset: active ? 0 : 100,
                    transitionDelay: `${ring.delay}ms`,
                  }}
                />
              ))}
            </svg>

            {primaryStats.map((stat, index) => (
              <div
                key={`${stat.label}-${index}`}
                className={['impact-stat', POSITION_CLASSES[index] ?? ''].filter(Boolean).join(' ')}
                style={getStatAnchor(index)}
              >
                <div
                  className={
                    [
                      index === 0 ? 'relative -left-30' : '',
                      index === 1 ? 'relative top-22' : '',
                      index === 2 ?  'relative left-10': ''
                    ]
                      .filter(Boolean)
                      .join(' ')
                  }
                >
                <p className="impact-value">
                  <CountUpValue value={stat.value} suffix={stat.suffix} active={active} />
                </p>
                <p className="impact-label">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          <CmsRichText value={content.caption} className="impact-caption" />
        </div>

        <div className="impact-copy">
          <h2 className="impact-title">{content.title}</h2>
          <CmsRichText value={content.description} className="impact-description" />
        </div>
      </div>
    </section>
  );
}
