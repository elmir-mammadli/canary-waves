import type { WorkflowSectionContent } from '@/lib/page-content';
import CmsRichText from '@/components/CmsRichText';
import { linesFromNewlines } from '@/lib/format-heading';
import WorkflowStepIcon from '@/components/sections/WorkflowStepIcon';

interface WorkflowSectionProps {
  content: WorkflowSectionContent;
}

export default function WorkflowSection({ content }: WorkflowSectionProps) {
  return (
    <section id="workflow">
      <p className="sec-label">{content.eyebrow}</p>
      <h2>{linesFromNewlines(content.title)}</h2>

      <div className="steps">
        {content.steps.map((step) => (
          <div key={step.step} className="step fade-up">
            <div className="step-glow" />
            <WorkflowStepIcon step={step.step} />
            <span className="step-num">{step.step}</span>
            <h3>{step.title}</h3>
            <CmsRichText value={step.description} />
          </div>
        ))}
      </div>

      <div className="steps-cta">
        <a href="#contact" className="btn-ore" data-demo-trigger>
          {content.ctaLabel}
        </a>
      </div>
    </section>
  );
}
