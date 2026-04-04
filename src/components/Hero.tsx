import Image from 'next/image';

export default function Hero() {
  return (
    <section id="home" className="hero">
      <Image
        src="/images/hero.avif"
        alt="Mining site operations"
        fill
        priority
        sizes="100vw"
        className="hero-media"
      />
      <div className="hero-overlay" />

      <div className="hero-inner">
        <p className="hero-brand">Canary Waves</p>
        <h1>
          Transforming radio chatter
          <br />
          into actionable safety intelligence
        </h1>
        <p className="hero-copy">
          Built for high-risk industrial operations where every message can prevent the next
          incident.
        </p>
        <div className="hero-actions">
          <a href="#contact" className="btn btn-gold" data-demo-trigger>
            Request a demo
          </a>
          <a href="#signals" className="btn btn-ghost">
            Explore platform
          </a>
        </div>
        <ul className="hero-notes" role="list">
          <li>No new radio hardware required</li>
          <li>Passive capture and analysis of existing comms</li>
          <li>Structured alerts for ops and safety leaders</li>
        </ul>
      </div>
    </section>
  );
}
