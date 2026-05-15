'use client';

import { useEffect, useState } from 'react';

const links = [
  { label: 'Home', href: '#home' },
  { label: 'Platform', href: '#platform' },
  { label: 'Signals', href: '#signals' },
  { label: 'Workflow', href: '#workflow' },
  { label: 'Team', href: '#team' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const hasInitialHash = Boolean(window.location.hash);

    if (window.scrollY <= 8 && !hasInitialHash) {
      setActive('home');
    }

    links.forEach((link) => {
      const id = link.href.slice(1);
      const section = document.getElementById(id);
      if (!section) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          if (window.scrollY <= 8 && !hasInitialHash && id !== 'home') return;
          setActive(id);
        },
        { threshold: 0.45 }
      );

      observer.observe(section);
      observers.push(observer);
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onResize = () => {
      if (window.innerWidth >= 810) setMenuOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onEscape);
    return () => document.removeEventListener('keydown', onEscape);
  }, [menuOpen]);

  useEffect(() => {
    document.body.classList.toggle('no-scroll', menuOpen);
    return () => document.body.classList.remove('no-scroll');
  }, [menuOpen]);

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
      <nav className="nav-shell" aria-label="Main navigation">
        <a href="#home" className="nav-logo" aria-label="Canary Waves home">
          <img src="/canary_waves_logo.svg" alt="Canary Waves" />
        </a>

        <ul className="nav-links" role="list">
          {links.map((link) => {
            const sectionId = link.href.slice(1);
            return (
              <li key={link.href}>
                <a className={active === sectionId ? 'is-active' : ''} href={link.href}>
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        <a href="#contact" className="nav-cta" data-demo-trigger>
          Request Demo
        </a>

        <button
          type="button"
          className={`menu-toggle ${menuOpen ? 'is-open' : ''}`}
          onClick={() => setMenuOpen((value) => !value)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div
        className={`mobile-backdrop ${menuOpen ? 'is-open' : ''}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden
      />

      <div id="mobile-nav" className={`mobile-panel ${menuOpen ? 'is-open' : ''}`}>
        <ul role="list">
          {links.map((link) => (
            <li key={link.href}>
              <a
                className={active === link.href.slice(1) ? 'is-active' : ''}
                href={link.href}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a href="#contact" className="mobile-cta" data-demo-trigger onClick={() => setMenuOpen(false)}>
              Request Demo
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
