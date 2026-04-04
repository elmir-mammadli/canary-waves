import Image from 'next/image';

const founders = [
  {
    name: 'Jack Kellner',
    role: 'Co-founder and Mining Engineer',
    image: '/images/jack-kellner.avif',
  },
  {
    name: 'Julia Georgi',
    role: 'Co-founder and Tech Entrepreneur',
    image: '/images/julia-georgi.avif',
  },
];

export default function Team() {
  return (
    <section id="team" className="section section-team" data-reveal>
      <div className="shell">
        <div className="team-intro">
          <p className="eyebrow">Team</p>
          <h2>Built by operators and builders focused on preventable risk.</h2>
          <p>
            Canary Waves exists to close the gap between what frontline teams say in the moment and
            what decision makers can actually act on. We believe AI should reduce harm, increase
            accountability, and make every shift safer.
          </p>
        </div>

        <div className="team-grid">
          {founders.map((founder) => (
            <article key={founder.name} className="team-member">
              <Image src={founder.image} alt={founder.name} width={990} height={624} className="team-photo" />
              <h3>{founder.name}</h3>
              <p>{founder.role}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
