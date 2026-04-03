const steps = [
  {
    step: 'Step 1',
    title: 'Capture',
    description: 'Record two-way radio audio',
    icon: (
      <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="30" y="20" width="40" height="55" rx="8" stroke="#9c5230" strokeWidth="4" fill="none"/>
        <rect x="40" y="30" width="20" height="15" rx="3" fill="#9c5230"/>
        <circle cx="50" cy="57" r="5" fill="#9c5230"/>
        <line x1="50" y1="75" x2="50" y2="85" stroke="#9c5230" strokeWidth="4" strokeLinecap="round"/>
        <line x1="35" y1="85" x2="65" y2="85" stroke="#9c5230" strokeWidth="4" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    step: 'Step 2',
    title: 'Transcribe',
    description: 'Convert audio to searchable transcripts using Automatic Speech Recognition (ASR)',
    icon: (
      <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="25" width="30" height="25" rx="6" fill="#9c5230"/>
        <rect x="60" y="50" width="30" height="25" rx="6" fill="#9c5230"/>
        <path d="M40 37 Q55 37 55 50 Q55 63 60 63" stroke="#9c5230" strokeWidth="3" fill="none" strokeLinecap="round"/>
        <polyline points="55,58 60,63 55,68" stroke="#9c5230" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    step: 'Step 3',
    title: 'Analyze',
    description: 'Identify safety risks, operational inefficiencies, and leading indicators',
    icon: (
      <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="44" cy="44" r="26" stroke="#9c5230" strokeWidth="4" fill="none"/>
        <line x1="62" y1="62" x2="82" y2="82" stroke="#9c5230" strokeWidth="5" strokeLinecap="round"/>
        <path d="M33 44 Q37 36 41 44 Q45 52 49 44 Q53 36 57 44" stroke="#9c5230" strokeWidth="3" fill="none" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    step: 'Step 4',
    title: 'Report',
    description: 'Generate structured safety reports with contextual insights',
    icon: (
      <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="15" width="70" height="55" rx="6" stroke="#9c5230" strokeWidth="4" fill="none"/>
        <line x1="15" y1="70" x2="85" y2="70" stroke="#9c5230" strokeWidth="2"/>
        <rect x="27" y="48" width="12" height="16" rx="2" fill="#9c5230"/>
        <rect x="44" y="36" width="12" height="28" rx="2" fill="#9c5230"/>
        <rect x="61" y="42" width="12" height="22" rx="2" fill="#9c5230"/>
        <line x1="40" y1="85" x2="60" y2="85" stroke="#9c5230" strokeWidth="4" strokeLinecap="round"/>
        <line x1="50" y1="70" x2="50" y2="85" stroke="#9c5230" strokeWidth="4" strokeLinecap="round"/>
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      style={{
        backgroundColor: '#897465',
        borderRadius: '40px',
        paddingTop: '80px',
        paddingBottom: '56px',
        paddingLeft: '20px',
        paddingRight: '20px',
        margin: '0 16px',
      }}
    >
      <div style={{ maxWidth: '1200px' }} className="mx-auto">
        <h2
          style={{
            color: '#ffffff',
            fontWeight: 700,
            fontSize: 'clamp(28px, 4vw, 40px)',
            letterSpacing: '-0.04em',
            textAlign: 'center',
            marginBottom: '48px',
          }}
        >
          How it works?
        </h2>

        <div className="flex flex-col md:flex-row gap-5 flex-wrap">
          {steps.map((step) => (
            <div
              key={step.step}
              style={{
                backgroundColor: '#ffc9a2',
                borderRadius: '20px',
                minHeight: '408px',
                padding: '40px 24px',
                flex: '1',
                minWidth: '200px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px',
              }}
            >
              <div style={{ width: '100px', height: '100px', flexShrink: 0 }}>{step.icon}</div>
              <span
                style={{
                  color: '#6b5543',
                  fontWeight: 400,
                  fontSize: '16px',
                  textAlign: 'center',
                }}
              >
                {step.step}
              </span>
              <h4
                style={{
                  color: '#1f1716',
                  fontWeight: 600,
                  fontSize: '24px',
                  textAlign: 'center',
                  margin: 0,
                }}
              >
                {step.title}
              </h4>
              <p
                style={{
                  color: '#1f1716',
                  fontWeight: 400,
                  fontSize: '16px',
                  textAlign: 'center',
                  margin: 0,
                  lineHeight: '1.5em',
                }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <a
            href="#cta"
            style={{
              backgroundColor: '#ffbe56',
              color: '#1f1716',
              borderRadius: '8px',
              padding: '12px 16px',
              fontWeight: 600,
              fontSize: '14px',
              textTransform: 'uppercase',
              letterSpacing: '-0.01em',
              textDecoration: 'none',
              display: 'inline-block',
            }}
          >
            Request a Demo
          </a>
        </div>
      </div>
    </section>
  );
}
