import Image from 'next/image';
import type { WhyUsContent } from '@/lib/landing-content';
import CmsRichText from '@/components/CmsRichText';

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
          {content.items.map((point, index) => (
            <article key={`${point.title}-${index}`} className="proof-item">
              <Image
                src={point.imageUrl}
                alt={point.imageAlt}
                width={990}
                height={624}
                className="proof-image"
              />
              <h3>{point.title}</h3>
              <CmsRichText value={point.description} className="proof-richtext" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
