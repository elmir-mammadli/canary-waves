import Image from 'next/image';

const features = [
  {
    title: 'Equipment Communication and Collision Prevention',
    summary:
      'Surface unsafe pass communication patterns before they turn into metal-on-metal incidents.',
    image: '/images/feature-1.avif',
    alt: 'Heavy equipment in operation',
  },
  {
    title: 'Hazard Identification and Mitigation Tracking',
    summary:
      'Capture hazard mentions and follow-up actions so mitigation is visible, auditable, and timely.',
    image: '/images/feature-2.avif',
    alt: 'Worker conducting site inspection',
  },
  {
    title: 'Contractor Oversight and KPI Confidence',
    summary:
      'Measure contract delivery and frontline execution through real communication, not assumptions.',
    image: '/images/feature-3.avif',
    alt: 'Industrial site operations from above',
  },
];

export default function Features() {
  return (
    <section id="signals" className="section section-signals" data-reveal>
      <div className="shell">
        <p className="eyebrow">Signals</p>
        <h2 className="section-title">What Canary Waves detects every shift.</h2>

        <div className="feature-stack">
          {features.map((feature, index) => (
            <article
              key={feature.title}
              className={`feature-row ${index % 2 === 0 ? '' : 'is-reversed'}`.trim()}
            >
              <div className="feature-media-wrap">
                <Image
                  src={feature.image}
                  alt={feature.alt}
                  width={990}
                  height={624}
                  className="feature-media"
                />
              </div>
              <div className="feature-text">
                <h3>{feature.title}</h3>
                <p>{feature.summary}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
