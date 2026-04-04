import type { AboutContent } from '@/lib/landing-content';

interface AboutProps {
  content: AboutContent;
}

export default function About({ content }: AboutProps) {
  return (
    <section id="platform" className="section section-platform" data-reveal>
      <div className="shell two-col">
        <div>
          <p className="eyebrow">{content.eyebrow}</p>
          <h2>{content.title}</h2>
        </div>
        <div className="section-copy">
          <p>{content.description}</p>
          <ul role="list" className="text-list">
            {content.pillars.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
