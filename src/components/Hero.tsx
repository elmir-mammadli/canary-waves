import Image from 'next/image'

export default function Hero() {
  return (
    <section
      id="home"
      style={{
        backgroundColor: '#c19473',
        borderBottomLeftRadius: '40px',
        borderBottomRightRadius: '40px',
        paddingTop: '80px',
        paddingBottom: '80px',
      }}
    >
      <div
        style={{ maxWidth: '1200px' }}
        className="mx-auto px-5 flex flex-col md:flex-row items-center gap-10"
      >
        {/* Left: Text */}
        <div className="flex flex-col items-center gap-6 flex-1">
          <h1
            style={{
              color: '#ffffff',
              fontWeight: 700,
              fontSize: 'clamp(32px, 5vw, 48px)',
              letterSpacing: '-0.04em',
              lineHeight: '1em',
              textAlign: 'center',
              margin: 0,
            }}
          >
            Transform radio chatter into real-time safety intelligence
          </h1>
          <a
            href="#cta"
            className='shadow-md'
            style={{
              backgroundColor: '#ffbe56',
              color: '#1f1716',
              borderRadius: '8px',
              padding: '9px 16px',
              fontWeight: 600,
              fontSize: '16px',
              textTransform: 'uppercase',
              letterSpacing: '-0.01em',
              textDecoration: 'none',
              display: 'inline-block',
            }}
          >
            Request a Demo
          </a>
        </div>

        {/* Right: Image Placeholder */}
        <div className="flex-1 flex justify-center">
          <Image
            src="/images/hero.avif"
            alt="Hero"
            width={546}
            height={364}
            style={{
              width: '100%',
              maxWidth: '546px',
              borderRadius: '40px',
              boxShadow: '0 8px 40px rgba(0,0,0,0.2)',
            }}
          />
        </div>
      </div>
    </section>
  );
}
