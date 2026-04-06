import Image from 'next/image';
import type { FeaturesContent } from '@/lib/landing-content';
import CmsRichText from '@/components/CmsRichText';

interface FeaturesProps {
  content: FeaturesContent;
}

export default function Features({ content }: FeaturesProps) {
  return (
    <section id="signals" className="section section-signals" data-reveal>
      <div className="shell">
        <p className="eyebrow">{content.eyebrow}</p>
        <h2 className="section-title">{content.title}</h2>

        <div className="feature-stack">
          {content.items.map((feature, index) => (
            <article
              key={feature.title}
              className={`feature-row ${index % 2 === 0 ? '' : 'is-reversed'}`.trim()}
            >
              <div className="feature-media-wrap">
                <Image
                  src={feature.imageUrl}
                  alt={feature.imageAlt}
                  width={990}
                  height={624}
                  className="feature-media"
                />
              </div>
              <div className="feature-text">
                <h3>{feature.title}</h3>
                {feature.subtitle ? <p className="feature-subtitle">{feature.subtitle}</p> : null}
                <CmsRichText value={feature.summary} className="feature-richtext" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
