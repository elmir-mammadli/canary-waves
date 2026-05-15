import type { PlatformSectionContent } from '@/lib/page-content';
import CmsRichText from '@/components/CmsRichText';
import FadeUp from '@/components/ui/FadeUp';
import Heading from '@/components/ui/Heading';
import SectionLabel from '@/components/ui/SectionLabel';

interface PlatformSectionProps {
  content: PlatformSectionContent;
}

export default function PlatformSection({ content }: PlatformSectionProps) {
  return (
    <section id="platform" className="section section-platform">
      <div className="shell">
        <SectionLabel>{content.eyebrow}</SectionLabel>
        <Heading as="h2" text={content.title} className="section-platform-title" />
        <div className="platform-grid">
          <div className="platform-body">
            <CmsRichText value={content.body} className="section-richtext" />
            <ul role="list" className="platform-list">
              {content.pillars.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <FadeUp>
            <blockquote className="platform-callout">
              <p>{content.calloutQuote}</p>
              {content.calloutAttribution ? (
                <cite className="platform-callout-attr">{content.calloutAttribution}</cite>
              ) : null}
            </blockquote>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
