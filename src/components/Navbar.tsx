'use client';

import { useState } from 'react';
import Link from 'next/link';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#what-it-is' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Team', href: '#team' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
    className='bg-[#897465]'
    >
      <div
        style={{ maxWidth: '1440px', height: '60px' }}
        className="mx-auto px-5 flex items-center justify-between"
      >
        {/* Logo */}
        <a href="#home" className="flex items-center no-underline">
          <img
            src="/canary_waves_logo.svg"
            alt="Canary Waves"
            style={{ height: 'auto', width: '264px' }}
          />
        </a>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-6 list-none m-0 p-0">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className='text-white font-light text-base'
                onMouseEnter={(e) => {
                  (e.target as HTMLAnchorElement).style.color = '#ffbe56';
                  (e.target as HTMLAnchorElement).style.textDecoration = 'underline';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLAnchorElement).style.color = '#ffffff';
                  (e.target as HTMLAnchorElement).style.textDecoration = 'none';
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <a
          href="#cta"
          className="hidden md:block shadow-lg"
          style={{
            backgroundColor: '#ffbe56',
            color: '#1f1716',
            borderRadius: '8px',
            padding: '8px 16px',
            fontWeight: 600,
            fontSize: '16px',
            textTransform: 'uppercase',
            letterSpacing: '-0.01em',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          Request a Demo
        </a>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <span style={{ display: 'block', width: '24px', height: '2px', backgroundColor: '#fff' }} />
          <span style={{ display: 'block', width: '24px', height: '2px', backgroundColor: '#fff' }} />
          <span style={{ display: 'block', width: '24px', height: '2px', backgroundColor: '#fff' }} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{ backgroundColor: '#897465', borderTop: '1px solid rgba(255,255,255,0.2)' }}>
          <ul className="flex flex-col p-4 gap-4 list-none m-0">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  style={{ color: '#ffffff', fontWeight: 400, fontSize: '16px', textDecoration: 'none' }}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#cta"
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'inline-block',
                  backgroundColor: '#ffbe56',
                  color: '#1f1716',
                  borderRadius: '8px',
                  padding: '12px 16px',
                  fontWeight: 600,
                  fontSize: '14px',
                  textTransform: 'uppercase',
                  letterSpacing: '-0.01em',
                  textDecoration: 'none',
                }}
              >
                Request a Demo
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
