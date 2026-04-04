import Image from 'next/image';

const points = [
  {
    image: '/images/whyus-1.avif',
    title: 'Real-time risk awareness',
    description: 'Alerts surface while crews are still in motion, not after a report backlog.',
  },
  {
    image: '/images/whyus-2.avif',
    title: 'Low-friction adoption',
    description: 'Canary Waves works with existing radio habits and site processes.',
  },
  {
    image: '/images/whyus-3.avif',
    title: 'Clear leadership visibility',
    description: 'Supervisors get one operational narrative across shifts and contractor teams.',
  },
];

export default function WhyUs() {
  return (
    <section className="section section-whyus" data-reveal>
      <div className="shell">
        <p className="eyebrow">Why teams adopt it</p>
        <h2 className="section-title">Built for high-risk operations where communication is mission critical.</h2>

        <div className="proof-grid">
          {points.map((point) => (
            <article key={point.title} className="proof-item">
              <Image src={point.image} alt={point.title} width={990} height={624} className="proof-image" />
              <h3>{point.title}</h3>
              <p>{point.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
