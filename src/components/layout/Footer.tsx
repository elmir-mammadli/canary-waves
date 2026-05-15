const siteLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Platform', href: '#platform' },
  { label: 'Signals', href: '#signals' },
  { label: 'Workflow', href: '#workflow' },
  { label: 'Team', href: '#team' },
];

const legalLinks = [
  { label: 'Privacy Policy', href: 'https://kbngconsulting.com/privacy-policy' },
  { label: 'Terms of Service', href: 'https://kbngconsulting.com/terms-of-use' },
];

const contactLinks = [
  { label: 'jack@canarywaves.com', href: 'mailto:jack@canarywaves.com' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/canary-waves/' },
];

function LinkGroup({ title, links }: { title: string; links: Array<{ label: string; href: string }> }) {
  return (
    <div>
      <h3>{title}</h3>
      <ul role="list">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              target={link.href.startsWith('http') || link.href.startsWith('mailto') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <a href="#home" aria-label="Canary Waves home">
            <img src="/canary_waves_logo.svg" alt="Canary Waves" />
          </a>
          <p>For the people who believe preventable should mean prevented.</p>
        </div>
        <LinkGroup title="Site" links={siteLinks} />
        <LinkGroup title="Legal" links={legalLinks} />
        <LinkGroup title="Connect" links={contactLinks} />
      </div>
      <div className="shell footer-bottom">
        <p>© 2025 Canary Waves · Part of KB&G Innovation Studio</p>
        <p>A product built for the frontline.</p>
      </div>
    </footer>
  );
}
