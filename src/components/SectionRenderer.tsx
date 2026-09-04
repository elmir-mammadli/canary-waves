import type { PageSection } from '@/lib/page-content';
import ContactSection from '@/components/sections/ContactSection';
import FAQSection from '@/components/sections/FAQSection';
import HeroSection from '@/components/sections/HeroSection';
import PlatformSection from '@/components/sections/PlatformSection';
import SignalsSection from '@/components/sections/SignalsSection';
import TeamSection from '@/components/sections/TeamSection';
import WhyUsWithImpactSection from '@/components/sections/WhyUsWithImpactSection';
import WorkflowSection from '@/components/sections/WorkflowSection';
import LegalDocumentsSection from '@/components/sections/LegalDocumentsSection';

interface SectionRendererProps {
  sections: PageSection[];
}

function renderSection(section: PageSection, index: number, sections: PageSection[]) {
  const key = `${section.type}-${index}`;
  const previous = sections[index - 1];

  if (section.type === 'impact' && previous?.type === 'why-us') {
    return null;
  }

  switch (section.type) {
    case 'hero':
      return <HeroSection key={key} content={section} />;
    case 'platform':
      return <PlatformSection key={key} content={section} />;
    case 'signals':
      return <SignalsSection key={key} content={section} />;
    case 'workflow':
      return <WorkflowSection key={key} content={section} />;
    case 'why-us': {
      const next = sections[index + 1];
      if (next?.type === 'impact') {
        return <WhyUsWithImpactSection key={key} whyUs={section} impact={next} />;
      }
      return null;
    }
    case 'team':
      return <TeamSection key={key} content={section} />;
    case 'contact':
      return <ContactSection key={key} content={section} />;
    case 'faq':
      return <FAQSection key={key} content={section} />;
    case 'legal-documents':
      return <LegalDocumentsSection key={key} content={section} />;
    default:
      return null;
  }
}

export default function SectionRenderer({ sections }: SectionRendererProps) {
  return <>{sections.map((section, index) => renderSection(section, index, sections))}</>;
}
