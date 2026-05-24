import type { PlatformSectionContent } from '@/lib/page-content';
import CmsRichText from '@/components/CmsRichText';
import { linesFromNewlines } from '@/lib/format-heading';

interface PlatformSectionProps {
  content: PlatformSectionContent;
}

const DEFAULT_STAT = {
  num: '50+',
  label: 'Years of two-way radio',
};

export default function PlatformSection({ content }: PlatformSectionProps) {
  const statNum = content.pillars[0] ?? DEFAULT_STAT.num;
  const statLabel = content.pillars[1] ?? DEFAULT_STAT.label;

  return (
    <section id="platform">
      <div className="platform-top">
        <div>
          <p className="sec-label">{content.eyebrow}</p>
          <h2>{linesFromNewlines(content.title)}</h2>
          <div className="platform-intro">
            <CmsRichText value={content.body} />
          </div>
        </div>
          <div
            className="platform-stat-card fade-up"
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(31,23,22,0.55) 0%, rgba(31,23,22,0.78) 100%), url('/images/hero.avif')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <span className="stat-card-num">{statNum}</span>
            <span className="stat-card-label">{statLabel}</span>
            <span className="stat-card-desc">
              The technology your crews rely on every shift.
              <br />
              <strong>Zero safety intelligence extracted.</strong> Until now.
            </span>
          </div>
      </div>

        <div className="platform-quote fade-up">
          <span className="platform-quote-mark">&ldquo;</span>
          <div className="platform-quote-body">
            <p>{content.calloutQuote}</p>
            {content.calloutAttribution ? (
              <span className="platform-quote-attr">{content.calloutAttribution}</span>
            ) : null}
          </div>
        </div>
    </section>
  );
}
