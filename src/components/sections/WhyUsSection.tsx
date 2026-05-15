import Image from 'next/image';
import type { WhyUsSectionContent } from '@/lib/page-content';
import CmsRichText from '@/components/CmsRichText';

interface WhyUsSectionProps {
  content: WhyUsSectionContent;
}

export default function WhyUsSection({ content }: WhyUsSectionProps) {
  return (
    <section id="why-us" className="section section-whyus" data-reveal>
      <div className="shell">
        <p className="eyebrow">{content.eyebrow}</p>
        <h2 className="section-title">{content.title}</h2>

        <div className="proof-grid">
          {content.cards.map((point, index) => (
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
