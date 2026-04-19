'use client';

import { useEffect, useRef, useState } from 'react';
import {
  type ContactFormErrors,
  initialContactFormValues,
  submitContactForm,
  validateContactForm,
} from '@/lib/contact-form';

export default function RequestDemoModal() {
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [values, setValues] = useState(initialContactFormValues);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const firstInputRef = useRef<HTMLInputElement>(null);
  const closeTimeoutRef = useRef<number | null>(null);

  const openModal = () => {
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsMounted(true);
    window.requestAnimationFrame(() => {
      setIsVisible(true);
    });
  };

  const closeModal = () => {
    setIsVisible(false);
    closeTimeoutRef.current = window.setTimeout(() => {
      setIsMounted(false);
      closeTimeoutRef.current = null;
    }, 220);
  };

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const trigger = target?.closest('[data-demo-trigger]');
      if (!trigger) return;
      event.preventDefault();
      openModal();
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  useEffect(() => {
    if (isMounted) document.body.classList.add('no-scroll');
    else document.body.classList.remove('no-scroll');

    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isMounted]);

  useEffect(() => {
    if (!isVisible) return;
    firstInputRef.current?.focus();

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeModal();
    };

    document.addEventListener('keydown', onEscape);
    return () => {
      document.removeEventListener('keydown', onEscape);
    };
  }, [isVisible]);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) window.clearTimeout(closeTimeoutRef.current);
      document.body.classList.remove('no-scroll');
    };
  }, []);

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
      await submitContactForm(values, { source: 'request-demo-modal' });
      setSubmitted(true);
      setValues(initialContactFormValues);
      setAgreed(false);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isMounted) return null;

  return (
    <div
      className={`demo-modal ${isVisible ? 'is-visible' : ''}`}
      onMouseDown={(event) => event.target === event.currentTarget && closeModal()}
    >
      <div
        className={`demo-modal-panel ${isVisible ? 'is-visible' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="demo-modal-title"
      >
        <button type="button" className="demo-modal-close" onClick={closeModal} aria-label="Close dialog">
          ×
        </button>

        {submitted ? (
          <div className="form-success" role="status" aria-live="polite">
            <h3 id="demo-modal-title">You&apos;re on the list.</h3>
            <p>Thanks for reaching out. Our team will contact you within one business day.</p>
          </div>
        ) : (
          <>
            <p className="eyebrow">Request A Demo</p>
            <h2 id="demo-modal-title" className="demo-modal-title">
              Let&apos;s set up your walkthrough.
            </h2>
            <p className="demo-modal-copy">
              Share your details and we&apos;ll map Canary Waves to your site and workflow.
            </p>

            <form onSubmit={onSubmit} noValidate className="cta-form demo-modal-form">
              <label htmlFor="modal-name">
                Name
                <input
                  id="modal-name"
                  ref={firstInputRef}
                  type="text"
                  value={values.name}
                  placeholder="Jane Smith"
                  onChange={onFieldChange('name')}
                />
                {errors.name && <span className="form-error">{errors.name}</span>}
              </label>

              <label htmlFor="modal-company">
                Company
                <input
                  id="modal-company"
                  type="text"
                  value={values.company}
                  placeholder="Canary Waves"
                  onChange={onFieldChange('company')}
                />
                {errors.company && <span className="form-error">{errors.company}</span>}
              </label>

              <label htmlFor="modal-email">
                Email
                <input
                  id="modal-email"
                  type="email"
                  value={values.email}
                  placeholder="jane@company.com"
                  onChange={onFieldChange('email')}
                />
                {errors.email && <span className="form-error">{errors.email}</span>}
              </label>

              <label htmlFor="modal-message">
                Message (optional)
                <textarea
                  id="modal-message"
                  rows={3}
                  value={values.message}
                  placeholder="Tell us about your site, team size, or current tools."
                  onChange={onFieldChange('message')}
                />
              </label>

              <label className="check-row" htmlFor="modal-agree">
                <input
                  id="modal-agree"
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
              {submitError && <p className="form-error" role="alert">{submitError}</p>}

              <button type="submit" className="btn btn-gold" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit request'}
              </button>
              <a href="#contact" className="demo-modal-secondary" onClick={closeModal}>
                Open contact section instead
              </a>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
