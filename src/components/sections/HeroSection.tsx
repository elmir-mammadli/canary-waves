import Image from 'next/image';
import type { HeroSectionContent } from '@/lib/page-content';
import { heroHeading } from '@/lib/format-heading';

interface HeroSectionProps {
  content: HeroSectionContent;
}

export default function HeroSection({ content }: HeroSectionProps) {
  return (
    <section id="home">
      <div className="hero-bg">
        <Image
          src={content.imageUrl}
          alt={content.imageAlt}
          fill
          priority
          sizes="100vw"
          className="hero-media"
        />
      </div>
      <div className="hero-inner">
        <p className="hero-label">{content.label}</p>
        <h1>{heroHeading(content.heading)}</h1>
        <p className="hero-sub">{content.subheading}</p>
        <div className="hero-btns">
          <a href="#contact" className="btn-ore" data-demo-trigger>
            {content.primaryCtaLabel}
          </a>
          <a href="#signals" className="btn-outline">
            {content.secondaryCtaLabel}
          </a>
        </div>
        <ul className="hero-proof">
          {content.proofItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
