import Image from 'next/image';
import type { HeroSectionContent } from '@/lib/page-content';

interface HeroSectionProps {
  content: HeroSectionContent;
}

export default function HeroSection({ content }: HeroSectionProps) {
  return (
    <section id="home" className="hero">
      <Image
        src={content.imageUrl}
        alt={content.imageAlt}
        fill
        priority
        sizes="100vw"
        className="hero-media"
      />
      <div className="hero-overlay" />

      <div className="hero-inner">
        <p className="hero-brand">{content.label}</p>
        <h1>{content.heading}</h1>
        <p className="hero-copy">{content.subheading}</p>
        <div className="hero-actions">
          <a href="#contact" className="btn btn-gold" data-demo-trigger>
            {content.primaryCtaLabel}
          </a>
          <a href="#signals" className="btn btn-ghost">
            {content.secondaryCtaLabel}
          </a>
        </div>
        <ul className="hero-notes" role="list">
          {content.proofItems.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
