const pillars = [
  'Transcribes two-way radio streams into searchable operational context.',
  'Flags leading indicators for collision risk, protocol misses, and production friction.',
  'Delivers decision-ready summaries for supervisors, managers, and executives.',
];

export default function About() {
  return (
    <section id="platform" className="section section-platform" data-reveal>
      <div className="shell two-col">
        <div>
          <p className="eyebrow">Platform</p>
          <h2>Voice-to-data intelligence for complex, fast-moving worksites.</h2>
        </div>
        <div className="section-copy">
          <p>
            Canary Waves turns live radio communication into operational clarity. Instead of
            reviewing incidents after the fact, teams get the early signals that help them act
            sooner.
          </p>
          <ul role="list" className="text-list">
            {pillars.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
