import Image from 'next/image';
import type { SignalsSectionContent } from '@/lib/page-content';
import CmsRichText from '@/components/CmsRichText';
import { linesFromNewlines } from '@/lib/format-heading';

interface SignalsSectionProps {
  content: SignalsSectionContent;
}

export default function SignalsSection({ content }: SignalsSectionProps) {
  return (
    <section id="signals">
      <p className="sec-label">{content.eyebrow}</p>
      <h2>{linesFromNewlines(content.title)}</h2>

      {content.items.map((item, index) => {
        const flip = item.reverseLayout || index % 2 === 1;
        return (
          <div key={item.title} className={`signal-item fade-up${flip ? ' flip' : ''}`}>
            <div className="signal-img">
              <Image src={item.imageUrl} alt={item.imageAlt} width={1200} height={900} />
            </div>
            <div className="signal-text">
              <h3>{linesFromNewlines(item.title)}</h3>
              {item.kicker ? <span className="signal-kicker">{item.kicker}</span> : null}
              <CmsRichText value={item.summary} />
            </div>
          </div>
        );
      })}
    </section>
  );
}
