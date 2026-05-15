import Image from 'next/image';
import type { SignalItemContent, SignalsSectionContent } from '@/lib/page-content';
import CmsRichText from '@/components/CmsRichText';
import FadeUp from '@/components/ui/FadeUp';
import Heading from '@/components/ui/Heading';
import SectionLabel from '@/components/ui/SectionLabel';

interface SignalsSectionProps {
  content: SignalsSectionContent;
}

const TAG_LABELS: Record<SignalItemContent['tag'], string> = {
  red: 'Equipment & Collision Risk',
  amber: 'Hazard Identification',
  teal: 'Contractor Oversight',
};

function SignalRow({ item }: { item: SignalItemContent }) {
  return (
    <article className={`signal-item ${item.reverseLayout ? 'is-flip' : ''}`.trim()}>
      <div className="signal-media">
        <Image src={item.imageUrl} alt={item.imageAlt} width={990} height={624} className="signal-image" />
      </div>
      <div className="signal-text">
        <span className={`signal-tag tag-${item.tag}`}>{TAG_LABELS[item.tag]}</span>
        <h3>{item.title}</h3>
        {item.kicker ? <span className="signal-kicker">{item.kicker}</span> : null}
        <CmsRichText value={item.summary} className="signal-richtext" />
      </div>
    </article>
  );
}

export default function SignalsSection({ content }: SignalsSectionProps) {
  return (
    <section id="signals" className="section section-signals">
      <div className="shell">
        <SectionLabel>{content.eyebrow}</SectionLabel>
        <Heading as="h2" text={content.title} className="section-title" />
        <div className="signal-stack">
          {content.items.map((item) => (
            <FadeUp key={item.title}>
              <SignalRow item={item} />
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
