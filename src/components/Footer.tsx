const navCol1 = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#what-it-is' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Team', href: '#team' },
];

const navCol2 = [
  { label: 'Privacy Policy', href: 'https://kbngconsulting.com/privacy-policy' },
  { label: 'Terms of Service', href: 'https://kbngconsulting.com/terms-of-use' },
];

const navCol3 = [
  { label: 'jack@canarywaves.com', href: 'mailto:jack@canarywaves.com' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/canary-waves/' },
];

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target={href.startsWith('http') || href.startsWith('mailto') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      className="text-white no-underline hover:text-[#ffbe56] hover:underline"
      style={{ fontWeight: 400, fontSize: '16px' }}
    >
      {label}
    </a>
  );
}

function NavColumn({ heading, links }: { heading: string; links: typeof navCol1 }) {
  return (
    <div className="flex flex-col gap-3">
      <span
        style={{
          color: '#1f1716',
          fontWeight: 600,
          fontSize: '16px',
          textTransform: 'uppercase',
        }}
      >
        {heading}
      </span>
      {links.map((link) => (
        <FooterLink key={link.label} href={link.href} label={link.label} />
      ))}
    </div>
  );
}

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: '#897465',
        paddingTop: '100px',
        paddingBottom: '100px',
        paddingLeft: '20px',
        paddingRight: '20px',
      }}
    >
      <div
        style={{ maxWidth: '1200px' }}
        className="mx-auto flex flex-col md:flex-row gap-12 justify-between"
      >
        {/* Left: Logo + tagline */}
        <div className="flex flex-col gap-4">
          <a href="#home" className="flex items-center no-underline">
            <img
              src="/canary_waves_logo.svg"
              alt="Canary Waves"
              style={{ height: '34px', width: 'auto' }}
            />
          </a>
          <a
            href="https://kbngconsulting.com/canary-waves"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#1f1716',
              fontWeight: 600,
              fontSize: '16px',
              textTransform: 'uppercase',
              textDecoration: 'none',
            }}
          >
            Part of KB&amp;G Innovation Studio
          </a>
        </div>

        {/* Right: Nav columns */}
        <div className="flex flex-col md:flex-row gap-10 md:gap-24">
          <NavColumn heading="Canary Waves" links={navCol1} />
          <NavColumn heading="Legal" links={navCol2} />
          <NavColumn heading="Connect" links={navCol3} />
        </div>
      </div>
    </footer>
  );
}
