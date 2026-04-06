import Image from 'next/image';
import type { TeamContent } from '@/lib/landing-content';
import CmsRichText from '@/components/CmsRichText';

interface TeamProps {
  content: TeamContent;
}

export default function Team({ content }: TeamProps) {
  return (
    <section id="team" className="section section-team" data-reveal>
      <div className="shell">
        <div className="team-intro">
          <p className="eyebrow">{content.eyebrow}</p>
          <h2>{content.title}</h2>
          <CmsRichText value={content.description} className="team-richtext" />
        </div>

        <div className="team-grid">
          {content.members.map((founder, index) => (
            <article key={`${founder.name}-${index}`} className="team-member">
              <Image
                src={founder.imageUrl}
                alt={founder.imageAlt}
                width={990}
                height={624}
                className="team-photo"
              />
              <h3>{founder.name}</h3>
              <p>{founder.role}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
