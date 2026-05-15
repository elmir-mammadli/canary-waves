import Image from 'next/image';
import type { SignalsSectionContent } from '@/lib/page-content';
import CmsRichText from '@/components/CmsRichText';

interface SignalsSectionProps {
  content: SignalsSectionContent;
}

export default function SignalsSection({ content }: SignalsSectionProps) {
  return (
    <section id="signals" className="section section-signals" data-reveal>
      <div className="shell">
        <p className="eyebrow">{content.eyebrow}</p>
        <h2 className="section-title">{content.title}</h2>

        <div className="feature-stack">
          {content.items.map((feature, index) => (
            <article
              key={feature.title}
              className={`feature-row ${feature.reverseLayout || index % 2 === 1 ? 'is-reversed' : ''}`.trim()}
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
                {feature.kicker ? <p className="feature-subtitle">{feature.kicker}</p> : null}
                <CmsRichText value={feature.summary} className="feature-richtext" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
