export default function About() {
  return (
    <section
      id="what-it-is"
      style={{
        backgroundColor: '#f4ebda',
        paddingTop: '80px',
        paddingBottom: '56px',
      }}
    >
      <div
        style={{ maxWidth: '1200px' }}
        className="mx-auto px-5 flex flex-col md:flex-row gap-10"
      >
        {/* Left */}
        <div className="flex-1">
          <h2
            style={{
              color: '#9c5230',
              fontWeight: 700,
              fontSize: 'clamp(28px, 4vw, 40px)',
              letterSpacing: '-0.04em',
              margin: 0,
            }}
          >
            What is Canary Waves?
          </h2>
        </div>

        {/* Right */}
        <div className="flex-1 flex flex-col gap-4">
          <h3
            style={{
              color: '#1f1716',
              fontWeight: 600,
              fontSize: 'clamp(20px, 2.5vw, 28px)',
              margin: 0,
              textAlign: 'left',
            }}
          >
            Voice-to-data safety intelligence for mining and heavy operations.
          </h3>
          <p
            style={{
              color: '#1f1716',
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '1.5em',
              margin: 0,
              textAlign: 'left',
            }}
          >
            Canary Waves turns unstructured two-way radio chatter into structured safety and
            operations insight. Designed for high-risk, high-complexity worksites where real-time
            communication is essential — but rarely analyzed — Canary Waves uses speech recognition
            and machine learning to flag safety risks, operational inefficiencies, and leading
            indicators buried in daily radio traffic.
          </p>
        </div>
      </div>
    </section>
  );
}
