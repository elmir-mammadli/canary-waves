import type { PlatformSectionContent } from '@/lib/page-content';
import CmsRichText from '@/components/CmsRichText';

interface PlatformSectionProps {
  content: PlatformSectionContent;
}

export default function PlatformSection({ content }: PlatformSectionProps) {
  return (
    <section id="platform" className="section section-platform" data-reveal>
      <div className="shell two-col">
        <div>
          <p className="eyebrow">{content.eyebrow}</p>
          <h2>{content.title}</h2>
        </div>
        <div className="section-copy">
          <CmsRichText value={content.body} className="section-richtext" />
          <ul role="list" className="text-list">
            {content.pillars.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          {content.calloutQuote ? (
            <blockquote className="platform-callout-inline">
              <p>{content.calloutQuote}</p>
              {content.calloutAttribution ? (
                <cite>{content.calloutAttribution}</cite>
              ) : null}
            </blockquote>
          ) : null}
        </div>
      </div>
    </section>
  );
}
