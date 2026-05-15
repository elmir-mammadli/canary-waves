'use client';

import { useState } from 'react';
import type { ContactSectionContent } from '@/lib/page-content';
import CmsRichText from '@/components/CmsRichText';
import Heading from '@/components/ui/Heading';
import SectionLabel from '@/components/ui/SectionLabel';
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
    <section id="contact" className="section section-cta section-contact">
      <div className="shell contact-grid">
        <div className="contact-copy">
          <SectionLabel>{content.eyebrow}</SectionLabel>
          <Heading as="h2" text={content.title} />
          <CmsRichText value={content.description} className="contact-richtext" />
          <ul role="list" className="contact-bullets">
            {content.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </div>

        <div className="contact-form-wrap">
          {submitted ? (
            <div className="form-success" role="status" aria-live="polite">
              <p>Request received. We&apos;ll be in touch within one business day.</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="cta-form">
              <div className="form-row">
                <label htmlFor="name">
                  Name
                  <input
                    id="name"
                    type="text"
                    value={values.name}
                    placeholder="Your name"
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
                    placeholder="Operation name"
                    onChange={onFieldChange('company')}
                  />
                  {errors.company && <span className="form-error">{errors.company}</span>}
                </label>
              </div>
              <label htmlFor="email">
                Email
                <input
                  id="email"
                  type="email"
                  value={values.email}
                  placeholder="your@email.com"
                  onChange={onFieldChange('email')}
                />
                {errors.email && <span className="form-error">{errors.email}</span>}
              </label>
              <label htmlFor="message">
                Message (optional)
                <textarea
                  id="message"
                  rows={3}
                  value={values.message}
                  placeholder="Tell us about your site — radios, channels, key safety challenges..."
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
                    if (errors.consent) setErrors((current) => ({ ...current, consent: undefined }));
                    if (submitError) setSubmitError('');
                  }}
                />
                <span>I&apos;m open to hearing how Canary Waves could work for my operation.</span>
              </label>
              {errors.consent && <span className="form-error">{errors.consent}</span>}
              {submitError && (
                <p className="form-error" role="alert">
                  {submitError}
                </p>
              )}
              <button type="submit" className="btn btn-gold btn-block" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Book my walkthrough →'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
