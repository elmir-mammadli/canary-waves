import Image from 'next/image';
import type { TeamSectionContent } from '@/lib/page-content';
import CmsRichText from '@/components/CmsRichText';
import { linesFromNewlines } from '@/lib/format-heading';

interface TeamSectionProps {
  content: TeamSectionContent;
}

export default function TeamSection({ content }: TeamSectionProps) {
  return (
    <section id="team">
      <p className="sec-label">{content.eyebrow}</p>
      <div className="team-intro">
        <h2>{linesFromNewlines(content.title)}</h2>
        <CmsRichText value={content.description} />
      </div>

      <div className="team-grid">
        {content.members.map((member, index) => (
          <div key={`${member.name}-${index}`} className="team-card fade-up">
            <div className="team-card-img">
              <Image src={member.imageUrl} alt={member.imageAlt} width={400} height={400} />
            </div>
            <div className="team-card-body">
              <h3>{member.name}</h3>
              <p className="role">{member.role}</p>
              <CmsRichText value={member.bio} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
