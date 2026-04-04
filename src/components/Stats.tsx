'use client';

import { useEffect, useRef, useState } from 'react';

const stats = [
  { target: 0, label: 'Misuse of heavy machinery' },
  { target: 25, label: 'Operational communication errors' },
  { target: 50, label: 'Safety protocol violations' },
];

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function CountUp({ target, triggered }: { target: number; triggered: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!triggered) return;
    if (target === 0) {
      setCount(0);
      return;
    }
    const duration = 1200;
    const start = performance.now();
    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.round(easeOutCubic(progress) * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [triggered, target]);

  return <>{count}%</>;
}

export default function Stats() {
  const [triggered, setTriggered] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTriggered(true); },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-reveal
      style={{
        backgroundColor: '#f4ebda',
        paddingTop: '80px',
        paddingBottom: '80px',
        paddingLeft: '20px',
        paddingRight: '20px',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          borderRadius: '40px',
          backgroundColor: '#f4ebda',
        }}
        className="mx-auto"
      >
        <div className="flex flex-col md:flex-row gap-10 items-start">
          {/* Left: Chart image + caption */}
          <div className="flex flex-col gap-4" style={{ flex: '1' }}>
            <div
              style={{
                width: '100%',
                maxWidth: '540px',
                aspectRatio: '540/466',
                backgroundColor: '#d4b896',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ color: '#9c5230', fontWeight: 500, fontSize: '14px' }}>
                Stats Image (Bar Chart)
              </span>
            </div>
            <p
              style={{
                color: '#1f1716',
                fontWeight: 400,
                fontSize: '14px',
                margin: 0,
                lineHeight: '1.5em',
                maxWidth: '540px',
              }}
            >
              Percentage of incidents prevented according to the type of risk detected in advance
              by Canary Waves system.
            </p>
          </div>

          {/* Right: Text + stats */}
          <div
            className="flex flex-col gap-6"
            style={{ flex: '1', maxWidth: '432px' }}
          >
            <h3
              style={{
                color: '#9c5230',
                fontWeight: 600,
                fontSize: 'clamp(20px, 2.5vw, 28px)',
                margin: 0,
                textAlign: 'left',
              }}
            >
              Incident prevention levels enabled by real-time audio analysis
            </h3>
            <p
              style={{
                color: '#1f1716',
                fontWeight: 400,
                fontSize: '16px',
                margin: 0,
                lineHeight: '1.5em',
              }}
            >
              Intelligence analysis of radio conversations helps detect early warning signs before
              they turn into actual accidents.
            </p>

            <div className="flex flex-col gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <span
                    style={{
                      color: '#1f1716',
                      fontWeight: 700,
                      fontSize: '72px',
                      lineHeight: '1em',
                    }}
                  >
                    <CountUp target={stat.target} triggered={triggered} />
                  </span>
                  <span
                    style={{
                      color: '#897465',
                      fontWeight: 400,
                      fontSize: '16px',
                    }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
