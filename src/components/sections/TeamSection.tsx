import Image from 'next/image';
import type { TeamSectionContent } from '@/lib/page-content';
import CmsRichText from '@/components/CmsRichText';
import FadeUp from '@/components/ui/FadeUp';
import Heading from '@/components/ui/Heading';
import SectionLabel from '@/components/ui/SectionLabel';

interface TeamSectionProps {
  content: TeamSectionContent;
}

export default function TeamSection({ content }: TeamSectionProps) {
  return (
    <section id="team" className="section section-team">
      <div className="shell">
        <div className="team-intro">
          <SectionLabel>{content.eyebrow}</SectionLabel>
          <Heading as="h2" text={content.title} />
          <CmsRichText value={content.description} className="team-intro-richtext" />
        </div>
        <div className="team-grid">
          {content.members.map((member) => (
            <FadeUp key={member.name}>
              <article className="team-card">
                <div className="team-card-media">
                  <Image src={member.imageUrl} alt={member.imageAlt} width={280} height={280} className="team-card-image" />
                </div>
                <div className="team-card-body">
                  <h3>{member.name}</h3>
                  <p className="team-card-role">{member.role}</p>
                  <CmsRichText value={member.bio} className="team-card-richtext" />
                </div>
              </article>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
