export interface ContactFormValues {
  name: string;
  company: string;
  email: string;
  message: string;
}

export interface ContactFormErrors {
  name?: string;
  company?: string;
  email?: string;
  consent?: string;
}

export interface ContactFormSubmissionOptions {
  source: string;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const initialContactFormValues: ContactFormValues = {
  name: '',
  company: '',
  email: '',
  message: '',
};

export function validateContactForm(values: ContactFormValues, agreed: boolean): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (!values.name.trim()) errors.name = 'Name is required.';
  if (!values.company.trim()) errors.company = 'Company is required.';
  if (!values.email.trim()) errors.email = 'Email is required.';
  if (values.email.trim() && !emailRegex.test(values.email)) errors.email = 'Enter a valid email.';
  if (!agreed) errors.consent = 'Please agree to receive communication before submitting.';

  return errors;
}

export async function submitContactForm(
  values: ContactFormValues,
  options: ContactFormSubmissionOptions
): Promise<void> {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      values,
      source: options.source,
    }),
  });

  if (response.ok) return;

  let message = 'Failed to submit form. Please try again.';

  try {
    const payload = (await response.json()) as { message?: string };
    if (payload.message) {
      message = payload.message;
    }
  } catch {
    // Keep the default fallback message when the error body isn't JSON.
  }

  throw new Error(message);
}
