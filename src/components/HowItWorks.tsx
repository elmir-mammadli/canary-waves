import type { WorkflowContent } from '@/lib/landing-content';
import CmsRichText from '@/components/CmsRichText';

interface HowItWorksProps {
  content: WorkflowContent;
}

export default function HowItWorks({ content }: HowItWorksProps) {
  return (
    <section id="workflow" className="section section-workflow" data-reveal>
      <div className="shell">
        <p className="eyebrow light">{content.eyebrow}</p>
        <h2 className="section-title light">{content.title}</h2>

        <ol className="timeline" aria-label="Canary Waves workflow">
          {content.steps.map((step) => (
            <li key={step.step}>
              <span className="timeline-step">{step.step}</span>
              <h3>{step.title}</h3>
              <CmsRichText value={step.description} className="timeline-richtext" />
            </li>
          ))}
        </ol>

        <a href="#contact" className="btn btn-gold workflow-cta">
          {content.ctaLabel}
        </a>
      </div>
    </section>
  );
}
