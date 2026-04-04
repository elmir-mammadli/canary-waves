import Image from 'next/image';
import type { WhyUsContent } from '@/lib/landing-content';

interface WhyUsProps {
  content: WhyUsContent;
}

export default function WhyUs({ content }: WhyUsProps) {
  return (
    <section className="section section-whyus" data-reveal>
      <div className="shell">
        <p className="eyebrow">{content.eyebrow}</p>
        <h2 className="section-title">{content.title}</h2>

        <div className="proof-grid">
          {content.items.map((point) => (
            <article key={point.title} className="proof-item">
              <Image
                src={point.imageUrl}
                alt={point.imageAlt}
                width={990}
                height={624}
                className="proof-image"
              />
              <h3>{point.title}</h3>
              <p>{point.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
