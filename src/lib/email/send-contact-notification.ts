import nodemailer from 'nodemailer';
import { Resend } from 'resend';
import {
  buildContactNotificationHtml,
  buildContactNotificationSubject,
  buildContactNotificationText,
  type ContactNotificationData,
} from '@/lib/email/contact-notification-email';

const resend = new Resend(process.env.RESEND_API_KEY);

const DEFAULT_FROM = 'Canary Waves <onboarding@resend.dev>';
const DEFAULT_TO = 'jack@canary-waves.com';

function getFromAddress() {
  const fromEmail =
    process.env.RESEND_FROM_EMAIL?.trim() ||
    process.env.EMAIL_FROM?.trim();

  if (!fromEmail) return DEFAULT_FROM;

  if (fromEmail.includes('<')) return fromEmail;

  return `Canary Waves <${fromEmail}>`;
}

function getRecipient() {
  return process.env.CONTACT_NOTIFICATION_EMAIL?.trim() || DEFAULT_TO;
}

function getAllowedTestRecipient(errorMessage: string) {
  const match = errorMessage.match(/your own email address \(([^)]+)\)/i);
  return match?.[1]?.trim() || '';
}

function isGmailConfigured() {
  return Boolean(process.env.GMAIL_USER?.trim() && process.env.GMAIL_APP_PASSWORD?.trim());
}

async function sendViaGmail(data: ContactNotificationData) {
  const user = process.env.GMAIL_USER?.trim();
  const pass = process.env.GMAIL_APP_PASSWORD?.trim();
  const to = getRecipient();

  if (!user || !pass) {
    return false;
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: `Canary Waves <${user}>`,
    to,
    replyTo: data.email,
    subject: buildContactNotificationSubject(data),
    html: buildContactNotificationHtml(data),
    text: buildContactNotificationText(data),
  });

  return true;
}

async function sendViaResend(data: ContactNotificationData) {
  const apiKey = process.env.RESEND_API_KEY?.trim();

  if (!apiKey) {
    return false;
  }

  const payload = {
    from: getFromAddress(),
    replyTo: data.email,
    subject: buildContactNotificationSubject(data),
    html: buildContactNotificationHtml(data),
    text: buildContactNotificationText(data),
  };

  const preferredRecipient = getRecipient();
  let result = await resend.emails.send({
    ...payload,
    to: [preferredRecipient],
  });

  if (result.error) {
    const allowedRecipient = getAllowedTestRecipient(result.error.message);

    if (allowedRecipient && allowedRecipient !== preferredRecipient) {
      console.warn(
        `Resend test mode: ${preferredRecipient} is blocked. Sending to ${allowedRecipient} instead. ` +
          'Add GMAIL_APP_PASSWORD to deliver to your Gmail directly.'
      );

      result = await resend.emails.send({
        ...payload,
        to: [allowedRecipient],
      });
    }
  }

  if (result.error) {
    console.error('Contact notification email failed:', result.error);
    return false;
  }

  return true;
}

export async function sendContactNotificationEmail(data: ContactNotificationData) {
  if (isGmailConfigured()) {
    try {
      return await sendViaGmail(data);
    } catch (error) {
      console.error('Gmail notification email failed:', error);
    }
  }

  return sendViaResend(data);
}

export function isContactEmailConfigured() {
  return isGmailConfigured() || Boolean(process.env.RESEND_API_KEY?.trim());
}
