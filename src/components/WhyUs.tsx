const items = [
  {
    label: 'Why Us Image 1',
    title: 'Real-time alerts',
    description: 'AI instantly flags risks and anomalies as they happen.',
  },
  {
    label: 'Why Us Image 2',
    title: 'Seamless integration',
    description: 'Works with your radios and mobile workflows.',
  },
  {
    label: 'Why Us Image 3',
    title: 'Hands-free safety',
    description: 'Operators stay focused with voice-triggered actions.',
  },
];

export default function WhyUs() {
  return (
    <section
      id="why-us"
      style={{
        backgroundColor: '#f4ebda',
        paddingTop: '80px',
        paddingLeft: '20px',
        paddingRight: '20px',
      }}
    >
      <div style={{ maxWidth: '1200px' }} className="mx-auto">
        <h2
          style={{
            color: '#1f1716',
            fontWeight: 700,
            fontSize: 'clamp(28px, 4vw, 40px)',
            letterSpacing: '-0.04em',
            textAlign: 'center',
            marginBottom: '40px',
          }}
        >
          Built for high-risk and complexity worksites
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {items.map((item) => (
            <div key={item.title} className="flex flex-col gap-4 items-center">
              {/* Image Placeholder */}
              <div
                style={{
                  width: '100%',
                  aspectRatio: '1/1',
                  backgroundColor: '#d4b896',
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span style={{ color: '#9c5230', fontWeight: 500, fontSize: '14px' }}>
                  {item.label}
                </span>
              </div>
              <h4
                style={{
                  color: '#1f1716',
                  fontWeight: 600,
                  fontSize: '24px',
                  margin: 0,
                  textAlign: 'center',
                }}
              >
                {item.title}
              </h4>
              <p
                style={{
                  color: '#1f1716',
                  fontWeight: 400,
                  fontSize: '16px',
                  margin: 0,
                  textAlign: 'center',
                  lineHeight: '1.5em',
                }}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
