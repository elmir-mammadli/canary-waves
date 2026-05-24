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

function FooterCol({ title, links }: { title: string; links: Array<{ label: string; href: string }> }) {
  return (
    <div className="footer-col">
      <h4>{title}</h4>
      <ul>
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
    <footer>
      <div className="footer-top">
        <div className="footer-brand">
          <img src="/canary_waves_logo.svg" alt="Canary Waves" />
          <p>For the people who believe preventable should mean prevented.</p>
        </div>
        <FooterCol title="Site" links={siteLinks} />
        <FooterCol title="Legal" links={legalLinks} />
        <FooterCol title="Connect" links={contactLinks} />
      </div>
      <div className="footer-bottom">
        <p>© 2025 Canary Waves · Part of KB&G Innovation Studio</p>
        <p>A product built for the frontline.</p>
      </div>
    </footer>
  );
}
