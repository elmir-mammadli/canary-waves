'use client';

import { useState } from 'react';

const inputStyle: React.CSSProperties = {
  backgroundColor: 'rgba(187,187,187,0.15)',
  border: '1px solid rgba(136,136,136,0.1)',
  borderRadius: '10px',
  padding: '12px',
  color: '#ffffff',
  fontFamily: 'inherit',
  fontWeight: 400,
  fontSize: '14px',
  height: '40px',
  width: '100%',
  outline: 'none',
};

const labelStyle: React.CSSProperties = {
  fontWeight: 500,
  fontSize: '12px',
  color: '#f4ebda',
  display: 'block',
  marginBottom: '4px',
};

export default function CTAForm() {
  const [agreed, setAgreed] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const getFocusStyle = (field: string): React.CSSProperties =>
    focusedField === field
      ? { ...inputStyle, border: '1px solid #ffbe56' }
      : inputStyle;

  return (
    <section
      id="cta"
      style={{
        backgroundColor: '#4e7b7c',
        borderRadius: '40px',
        paddingTop: '160px',
        paddingBottom: '160px',
        paddingLeft: '20px',
        paddingRight: '20px',
        margin: '0 16px',
      }}
    >
      <div
        style={{ maxWidth: '1200px' }}
        className="mx-auto flex flex-col md:flex-row gap-12 items-center"
      >
        {/* Left */}
        <div className="flex-1 flex flex-col items-center gap-4 text-center">
          {/* Bird icon */}
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="30" cy="30" r="30" fill="#ffbe56" opacity="0.2"/>
            <path d="M15 38 C20 26, 28 22, 36 30 C40 34, 46 32, 46 27" stroke="#ffbe56" strokeWidth="3" strokeLinecap="round" fill="none"/>
            <circle cx="15" cy="38" r="4" fill="#ffbe56"/>
            <path d="M46 27 L50 24 L48 30 Z" fill="#ffbe56"/>
          </svg>

          <h2
            style={{
              color: '#ffffff',
              fontWeight: 700,
              fontSize: 'clamp(28px, 4vw, 40px)',
              letterSpacing: '-0.04em',
              margin: 0,
              textAlign: 'center',
            }}
          >
            Ready to transform safety?
          </h2>
          <p
            style={{
              color: '#ffffff',
              fontWeight: 400,
              fontSize: '16px',
              margin: 0,
              textAlign: 'center',
            }}
          >
            Book a demo and see Canary Waves in action.
          </p>
        </div>

        {/* Right: Form */}
        <div className="flex-1 w-full" style={{ maxWidth: '557px' }}>
          <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label style={labelStyle} htmlFor="cta-name">Name</label>
              <input
                id="cta-name"
                type="text"
                placeholder="Jane Smith"
                style={getFocusStyle('name')}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
              />
            </div>
            <div>
              <label style={labelStyle} htmlFor="cta-company">Company</label>
              <input
                id="cta-company"
                type="text"
                placeholder="Canary Waves"
                style={getFocusStyle('company')}
                onFocus={() => setFocusedField('company')}
                onBlur={() => setFocusedField(null)}
              />
            </div>
            <div>
              <label style={labelStyle} htmlFor="cta-email">Email</label>
              <input
                id="cta-email"
                type="email"
                placeholder="jane@canarywaves.com"
                style={getFocusStyle('email')}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
              />
            </div>
            <div>
              <label style={labelStyle} htmlFor="cta-message">Message</label>
              <textarea
                id="cta-message"
                placeholder="Hey! ..."
                style={{
                  ...getFocusStyle('message'),
                  height: 'auto',
                  minHeight: '100px',
                  resize: 'vertical',
                }}
                onFocus={() => setFocusedField('message')}
                onBlur={() => setFocusedField(null)}
              />
            </div>
            <div className="flex items-center gap-3">
              <input
                id="cta-terms"
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                style={{ width: '16px', height: '16px', accentColor: '#ffbe56', flexShrink: 0 }}
              />
              <label
                htmlFor="cta-terms"
                style={{ ...labelStyle, margin: 0, cursor: 'pointer' }}
              >
                Agree to Terms and Conditions
              </label>
            </div>
            <button
              type="submit"
              style={{
                backgroundColor: '#ffbe56',
                color: '#1f1716',
                height: '40px',
                borderRadius: '10px',
                fontFamily: 'inherit',
                fontWeight: 600,
                fontSize: '14px',
                textTransform: 'uppercase',
                letterSpacing: '-0.01em',
                border: 'none',
                cursor: 'pointer',
                width: '100%',
              }}
            >
              Request a demo
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
