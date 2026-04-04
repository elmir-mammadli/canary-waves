'use client';

import { useState } from 'react';

interface FormValues {
  name: string;
  company: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  company?: string;
  email?: string;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim()) errors.name = 'Name is required.';
  if (!values.company.trim()) errors.company = 'Company is required.';
  if (!values.email.trim()) errors.email = 'Email is required.';
  if (values.email.trim() && !emailRegex.test(values.email)) errors.email = 'Enter a valid email.';
  return errors;
}

const initialValues: FormValues = {
  name: '',
  company: '',
  email: '',
  message: '',
};

export default function CTAForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const onFieldChange =
    (field: keyof FormValues) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = event.target.value;
      setValues((current) => ({ ...current, [field]: value }));
      if (errors[field as keyof FormErrors]) {
        setErrors((current) => ({ ...current, [field]: undefined }));
      }
    };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const validation = validate(values);
    setErrors(validation);
    if (Object.keys(validation).length === 0 && agreed) {
      setSubmitted(true);
    }
  };

  return (
    <section id="contact" className="section section-cta" data-reveal>
      <div className="shell cta-layout">
        <div className="cta-copy">
          <p className="eyebrow light">Contact</p>
          <h2>Ready to see what your radio traffic is trying to tell you?</h2>
          <p>
            Book a walkthrough and we will map Canary Waves to your current environment, safety
            goals, and reporting workflow.
          </p>
        </div>

        <div className="cta-form-wrap">
          {submitted ? (
            <div className="form-success" role="status" aria-live="polite">
              <h3>You&apos;re on the list.</h3>
              <p>Thanks for reaching out. Our team will contact you within one business day.</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="cta-form">
              <label htmlFor="name">
                Name
                <input
                  id="name"
                  type="text"
                  value={values.name}
                  placeholder="Jane Smith"
                  onChange={onFieldChange('name')}
                />
                {errors.name && <span className="form-error">{errors.name}</span>}
              </label>

              <label htmlFor="company">
                Company
                <input
                  id="company"
                  type="text"
                  value={values.company}
                  placeholder="Canary Waves"
                  onChange={onFieldChange('company')}
                />
                {errors.company && <span className="form-error">{errors.company}</span>}
              </label>

              <label htmlFor="email">
                Email
                <input
                  id="email"
                  type="email"
                  value={values.email}
                  placeholder="jane@company.com"
                  onChange={onFieldChange('email')}
                />
                {errors.email && <span className="form-error">{errors.email}</span>}
              </label>

              <label htmlFor="message">
                Message (optional)
                <textarea
                  id="message"
                  rows={4}
                  value={values.message}
                  placeholder="Tell us about your site, team size, or current tools."
                  onChange={onFieldChange('message')}
                />
              </label>

              <label className="check-row" htmlFor="agree">
                <input
                  id="agree"
                  type="checkbox"
                  checked={agreed}
                  onChange={(event) => setAgreed(event.target.checked)}
                />
                <span>I agree to receive communication about Canary Waves.</span>
              </label>

              <button type="submit" className="btn btn-gold">
                Request demo
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
