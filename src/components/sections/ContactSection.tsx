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
    <section id="contact" className="section section-cta" data-reveal>
      <div className="shell cta-layout">
        <div className="cta-copy">
          <p className="eyebrow light">{content.eyebrow}</p>
          <h2>{content.title}</h2>
          <CmsRichText value={content.description} className="cta-richtext" />
          {content.bullets.length > 0 ? (
            <ul role="list" className="cta-bullets">
              {content.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          ) : null}
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
                  onChange={(event) => {
                    setAgreed(event.target.checked);
                    if (errors.consent) {
                      setErrors((current) => ({ ...current, consent: undefined }));
                    }
                    if (submitError) setSubmitError('');
                  }}
                />
                <span>I agree to receive communication about Canary Waves.</span>
              </label>
              {errors.consent && <span className="form-error">{errors.consent}</span>}
              {submitError && (
                <p className="form-error" role="alert">
                  {submitError}
                </p>
              )}

              <button type="submit" className="btn btn-gold" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Request demo'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
