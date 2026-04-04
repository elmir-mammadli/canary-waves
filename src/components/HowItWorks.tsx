const steps = [
  {
    step: '01',
    title: 'Capture',
    description: 'Collect two-way radio audio from your existing environment.',
  },
  {
    step: '02',
    title: 'Transcribe',
    description: 'Convert speech into structured, searchable data in near real time.',
  },
  {
    step: '03',
    title: 'Analyze',
    description: 'Detect risk patterns, breakdowns, and missed protocol signals.',
  },
  {
    step: '04',
    title: 'Report',
    description: 'Deliver concise summaries and alerts to operations leadership.',
  },
];

export default function HowItWorks() {
  return (
    <section id="workflow" className="section section-workflow" data-reveal>
      <div className="shell">
        <p className="eyebrow light">Workflow</p>
        <h2 className="section-title light">From raw radio traffic to decision-ready action.</h2>

        <ol className="timeline" aria-label="Canary Waves workflow">
          {steps.map((step) => (
            <li key={step.step}>
              <span className="timeline-step">{step.step}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>

        <a href="#contact" className="btn btn-gold workflow-cta">
          See the demo flow
        </a>
      </div>
    </section>
  );
}
