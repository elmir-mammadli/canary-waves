'use client';

import { useState } from 'react';
import type { ContactSectionContent } from '@/lib/page-content';
import CmsRichText from '@/components/CmsRichText';
import {
  type ContactFormErrors,
  initialContactFormValues,
  submitContactForm,
  validateContactForm,
} from '@/lib/contact-form';

interface ContactSectionProps {
  content: ContactSectionContent;
}

export default function ContactSection({ content }: ContactSectionProps) {
  const [values, setValues] = useState(initialContactFormValues);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const onFieldChange =
    (field: keyof typeof initialContactFormValues) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = event.target.value;
      setValues((current) => ({ ...current, [field]: value }));
      if (field !== 'message' && errors[field]) {
        setErrors((current) => ({ ...current, [field]: undefined }));
      }
      if (submitError) setSubmitError('');
    };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const validation = validateContactForm(values, agreed);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
      await submitContactForm(values, { source: 'website-contact' });
      setSubmitted(true);
      setValues(initialContactFormValues);
      setAgreed(false);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact">
      <div className="contact-grid">
        <div className="contact-left">
          <p className="sec-label">{content.eyebrow}</p>
          <h2>{content.title}</h2>
          <CmsRichText value={content.description} />
          {content.bullets.map((bullet) => (
            <div key={bullet} className="contact-bullet">
              <div className="dot" />
              <p>{bullet}</p>
            </div>
          ))}
        </div>

        <div>
          <div className="form-wrap">
            {submitted ? (
              <div id="form-thanks" style={{ display: 'block' }}>
                ✓ Request received. We&apos;ll be in touch within one business day.
              </div>
            ) : (
              <form id="demo-form" onSubmit={onSubmit} noValidate>
                <div className="form-row">
                  <div className="field">
                    <label htmlFor="name">Name</label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Your name"
                      value={values.name}
                      onChange={onFieldChange('name')}
                      required
                    />
                    {errors.name ? <span className="form-error">{errors.name}</span> : null}
                  </div>
                  <div className="field">
                    <label htmlFor="company">Company</label>
                    <input
                      id="company"
                      type="text"
                      placeholder="Operation name"
                      value={values.company}
                      onChange={onFieldChange('company')}
                      required
                    />
                    {errors.company ? <span className="form-error">{errors.company}</span> : null}
                  </div>
                </div>
                <div className="form-full field">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={values.email}
                    onChange={onFieldChange('email')}
                    required
                  />
                  {errors.email ? <span className="form-error">{errors.email}</span> : null}
                </div>
                <div className="form-full field" style={{ marginBottom: 14 }}>
                  <label htmlFor="message">Message (optional)</label>
                  <textarea
                    id="message"
                    rows={3}
                    placeholder="Tell us about your site — radios, channels, key safety challenges..."
                    value={values.message}
                    onChange={onFieldChange('message')}
                  />
                </div>
                <label className="check-row" htmlFor="agree">
                  <input
                    id="agree"
                    type="checkbox"
                    checked={agreed}
                    onChange={(event) => {
                      setAgreed(event.target.checked);
                      if (errors.consent) {
                        setErrors((current) => ({ ...current, consent: undefined }));
                      }
                    }}
                    required
                  />
                  I&apos;m open to hearing how Canary Waves could work for my operation.
                </label>
                {errors.consent ? <span className="form-error">{errors.consent}</span> : null}
                {submitError ? (
                  <p className="form-error" role="alert">
                    {submitError}
                  </p>
                ) : null}
                <button type="submit" className="form-submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Book my walkthrough →'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
