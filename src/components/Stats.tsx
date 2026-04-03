const stats = [
  { value: '0%', label: 'Misuse of heavy machinery' },
  { value: '25%', label: 'Operational communication errors' },
  { value: '50%', label: 'Safety protocol violations' },
];

export default function Stats() {
  return (
    <section
      style={{
        backgroundColor: '#f4ebda',
        paddingTop: '80px',
        paddingBottom: '80px',
        paddingLeft: '20px',
        paddingRight: '20px',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          borderRadius: '40px',
          backgroundColor: '#f4ebda',
        }}
        className="mx-auto"
      >
        <div className="flex flex-col md:flex-row gap-10 items-start">
          {/* Left: Chart image + caption */}
          <div className="flex flex-col gap-4" style={{ flex: '1' }}>
            <div
              style={{
                width: '100%',
                maxWidth: '540px',
                aspectRatio: '540/466',
                backgroundColor: '#d4b896',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ color: '#9c5230', fontWeight: 500, fontSize: '14px' }}>
                Stats Image (Bar Chart)
              </span>
            </div>
            <p
              style={{
                color: '#1f1716',
                fontWeight: 400,
                fontSize: '14px',
                margin: 0,
                lineHeight: '1.5em',
                maxWidth: '540px',
              }}
            >
              Percentage of incidents prevented according to the type of risk detected in advance
              by Canary Waves system.
            </p>
          </div>

          {/* Right: Text + stats */}
          <div
            className="flex flex-col gap-6"
            style={{ flex: '1', maxWidth: '432px' }}
          >
            <h3
              style={{
                color: '#9c5230',
                fontWeight: 600,
                fontSize: 'clamp(20px, 2.5vw, 28px)',
                margin: 0,
                textAlign: 'left',
              }}
            >
              Incident prevention levels enabled by real-time audio analysis
            </h3>
            <p
              style={{
                color: '#1f1716',
                fontWeight: 400,
                fontSize: '16px',
                margin: 0,
                lineHeight: '1.5em',
              }}
            >
              Intelligence analysis of radio conversations helps detect early warning signs before
              they turn into actual accidents.
            </p>

            {/* Stat items */}
            <div className="flex flex-col gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <span
                    style={{
                      color: '#1f1716',
                      fontWeight: 700,
                      fontSize: '72px',
                      lineHeight: '1em',
                    }}
                  >
                    {stat.value}
                  </span>
                  <span
                    style={{
                      color: '#897465',
                      fontWeight: 400,
                      fontSize: '16px',
                    }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
