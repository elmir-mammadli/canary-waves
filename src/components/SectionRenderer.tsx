import type { PageSection } from '@/lib/page-content';
import ContactSection from '@/components/sections/ContactSection';
import FAQSection from '@/components/sections/FAQSection';
import HeroSection from '@/components/sections/HeroSection';
import PlatformSection from '@/components/sections/PlatformSection';
import SignalsSection from '@/components/sections/SignalsSection';
import TeamSection from '@/components/sections/TeamSection';
import WhyUsSection from '@/components/sections/WhyUsSection';
import WorkflowSection from '@/components/sections/WorkflowSection';
import PageMotion from '@/components/PageMotion';

interface SectionRendererProps {
  sections: PageSection[];
}

function renderSection(section: PageSection, index: number) {
  const key = `${section.type}-${index}`;

  switch (section.type) {
    case 'hero':
      return <HeroSection key={key} content={section} />;
    case 'platform':
      return <PlatformSection key={key} content={section} />;
    case 'signals':
      return <SignalsSection key={key} content={section} />;
    case 'workflow':
      return <WorkflowSection key={key} content={section} />;
    case 'why-us':
      return <WhyUsSection key={key} content={section} />;
    case 'team':
      return <TeamSection key={key} content={section} />;
    case 'contact':
      return <ContactSection key={key} content={section} />;
    case 'faq':
      return <FAQSection key={key} content={section} />;
    default:
      return null;
  }
}

export default function SectionRenderer({ sections }: SectionRendererProps) {
  return (
    <>
      <PageMotion />
      {sections.map((section, index) => renderSection(section, index))}
    </>
  );
}
