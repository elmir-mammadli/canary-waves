export default function Team() {
  return (
    <section
      id="team"
      style={{
        backgroundColor: '#f4ebda',
        paddingTop: '80px',
        paddingBottom: '80px',
        paddingLeft: '20px',
        paddingRight: '20px',
      }}
    >
      <div style={{ maxWidth: '1200px' }} className="mx-auto flex flex-col gap-16">
        <h2
          style={{
            color: '#1f1716',
            fontWeight: 700,
            fontSize: 'clamp(28px, 4vw, 40px)',
            letterSpacing: '-0.04em',
            textAlign: 'center',
            margin: 0,
          }}
        >
          Team
        </h2>

        {/* Our Story */}
        <div className="flex flex-col md:flex-row gap-10">
          <div className="flex-1 flex flex-col gap-5">
            <h3
              style={{
                color: '#9c5230',
                fontWeight: 600,
                fontSize: 'clamp(20px, 2.5vw, 28px)',
                margin: 0,
                textAlign: 'left',
              }}
            >
              Our story
            </h3>
            <p style={{ color: '#1f1716', fontWeight: 400, fontSize: '16px', margin: 0, lineHeight: '1.6em', textAlign: 'justify' }}>
              We live in a world where technology evolves at lightning speed - yet preventable
              accidents still claim lives on worksites every day.
            </p>
            <p style={{ color: '#1f1716', fontWeight: 400, fontSize: '16px', margin: 0, lineHeight: '1.6em', textAlign: 'justify' }}>
              For Jack and Julia, this disconnect is no longer acceptable. We have the tools. We
              have the data. And now, with AI, we have the power to act before things go wrong.
            </p>
            <p style={{ color: '#1f1716', fontWeight: 700, fontSize: '16px', margin: 0, lineHeight: '1.6em', textAlign: 'justify' }}>
              Canary Waves exists because we believe the latest advances in AI should serve those
              on the frontlines.
            </p>
            <p style={{ color: '#1f1716', fontWeight: 400, fontSize: '16px', margin: 0, lineHeight: '1.6em', textAlign: 'justify' }}>
              There&apos;s no excuse to ignore preventable risk in the age of real-time insight. Leaders
              have a responsibility to act. Innovators like us have a duty to build.
            </p>
            <p style={{ color: '#1f1716', fontWeight: 400, fontSize: '16px', margin: 0, lineHeight: '1.6em', textAlign: 'justify' }}>
              We&apos;re here to make sure change actually happens.
            </p>
          </div>
          {/* Right col empty */}
          <div className="flex-1 hidden md:block" />
        </div>

        {/* Team Photos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Jack - image on top */}
          <div className="flex flex-col gap-4">
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
                Jack Kellner Photo
              </span>
            </div>
            <h4
              style={{
                color: '#1f1716',
                fontWeight: 700,
                fontSize: '32px',
                letterSpacing: '-0.03em',
                margin: 0,
                textAlign: 'left',
              }}
            >
              Jack Kellner
            </h4>
            <p
              style={{
                color: '#999',
                fontWeight: 400,
                fontSize: '22px',
                margin: 0,
                textAlign: 'left',
              }}
            >
              Co-founder &amp; mining engineer
            </p>
          </div>

          {/* Julia - text on top, image below */}
          <div className="flex flex-col gap-4">
            <h4
              style={{
                color: '#1f1716',
                fontWeight: 700,
                fontSize: '32px',
                letterSpacing: '-0.03em',
                margin: 0,
                textAlign: 'left',
              }}
            >
              Julia Georgi
            </h4>
            <p
              style={{
                color: '#999',
                fontWeight: 400,
                fontSize: '22px',
                margin: 0,
                textAlign: 'left',
              }}
            >
              Co-founder &amp; tech entrepreneur
            </p>
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
                Julia Georgi Photo
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
