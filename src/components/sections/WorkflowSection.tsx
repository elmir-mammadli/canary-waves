import type { WorkflowSectionContent } from '@/lib/page-content';
import CmsRichText from '@/components/CmsRichText';
import FadeUp from '@/components/ui/FadeUp';
import Heading from '@/components/ui/Heading';
import SectionLabel from '@/components/ui/SectionLabel';

interface WorkflowSectionProps {
  content: WorkflowSectionContent;
}

export default function WorkflowSection({ content }: WorkflowSectionProps) {
  return (
    <section id="workflow" className="section section-workflow">
      <div className="shell">
        <SectionLabel light>{content.eyebrow}</SectionLabel>
        <Heading as="h2" text={content.title} className="section-title light" />
        <div className="workflow-steps">
          {content.steps.map((step) => (
            <FadeUp key={step.step}>
              <article className="workflow-step">
                <span className="workflow-step-num">{step.step}</span>
                <h3>{step.title}</h3>
                <CmsRichText value={step.description} className="workflow-richtext" />
              </article>
            </FadeUp>
          ))}
        </div>
        <p className="workflow-cta">
          <a href="#contact" className="btn btn-gold" data-demo-trigger>
            {content.ctaLabel}
          </a>
        </p>
      </div>
    </section>
  );
}
