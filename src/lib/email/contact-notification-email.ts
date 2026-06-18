export interface ContactNotificationData {
  name: string;
  email: string;
  company: string;
  message: string;
  source: string;
  submittedFrom?: string;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatSource(source: string) {
  if (source === 'request-demo-modal') return 'Request a Demo modal';
  if (source === 'website-contact') return 'Contact section';
  return source.replace(/-/g, ' ');
}

function formatSubmittedAt() {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone: 'UTC',
  }).format(new Date());
}

export function buildContactNotificationSubject(data: ContactNotificationData) {
  const companySuffix = data.company ? ` · ${data.company}` : '';
  return `New demo request from ${data.name}${companySuffix}`;
}

export function buildContactNotificationText(data: ContactNotificationData) {
  const lines = [
    'New Canary Waves demo request',
    '',
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Company: ${data.company || '—'}`,
    `Source: ${formatSource(data.source)}`,
    `Submitted: ${formatSubmittedAt()} UTC`,
  ];

  if (data.submittedFrom) {
    lines.push(`Page: ${data.submittedFrom}`);
  }

  lines.push('', 'Message:', data.message || '—', '', `Reply directly to ${data.email}`);

  return lines.join('\n');
}

export function buildContactNotificationHtml(data: ContactNotificationData) {
  const safeName = escapeHtml(data.name);
  const safeEmail = escapeHtml(data.email);
  const safeCompany = escapeHtml(data.company || 'Not provided');
  const safeMessage = escapeHtml(data.message || 'No message provided.').replace(/\n/g, '<br />');
  const safeSource = escapeHtml(formatSource(data.source));
  const safeSubmittedFrom = data.submittedFrom ? escapeHtml(data.submittedFrom) : '';
  const submittedAt = escapeHtml(formatSubmittedAt());

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="color-scheme" content="light" />
    <meta name="supported-color-schemes" content="light" />
    <title>New demo request</title>
  </head>
  <body style="margin:0;padding:0;background-color:#F4E8DA;font-family:'Poppins',Arial,sans-serif;color:#1F1716;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
      ${safeName} requested a Canary Waves walkthrough${data.company ? ` from ${escapeHtml(data.company)}` : ''}.
    </div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#F4E8DA;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:620px;background-color:#ffffff;border-radius:20px;overflow:hidden;border:1px solid rgba(31,23,22,0.08);box-shadow:0 18px 48px rgba(44,31,20,0.12);">
            <tr>
              <td style="background:linear-gradient(135deg,#2C1F14 0%,#1F1716 100%);padding:28px 32px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td>
                      <div style="font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:#FFBE56;font-weight:600;margin-bottom:10px;">
                        Canary Waves
                      </div>
                      <div style="font-size:28px;line-height:1.2;font-weight:600;color:#F4E8DA;margin:0;">
                        New demo request
                      </div>
                      <div style="font-size:15px;line-height:1.6;color:rgba(244,232,218,0.78);margin-top:8px;">
                        Someone wants to book a walkthrough.
                      </div>
                    </td>
                    <td align="right" valign="top">
                      <div style="display:inline-block;padding:8px 12px;border-radius:999px;background:rgba(255,190,86,0.16);color:#FFBE56;font-size:12px;font-weight:600;white-space:nowrap;">
                        ${safeSource}
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse:separate;border-spacing:0 12px;">
                  <tr>
                    <td style="padding:16px 18px;background-color:#F4E8DA;border-radius:14px;">
                      <div style="font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#897465;font-weight:600;margin-bottom:6px;">Name</div>
                      <div style="font-size:17px;font-weight:600;color:#1F1716;">${safeName}</div>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:16px 18px;background-color:#F4E8DA;border-radius:14px;">
                      <div style="font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#897465;font-weight:600;margin-bottom:6px;">Email</div>
                      <div style="font-size:17px;font-weight:600;">
                        <a href="mailto:${safeEmail}" style="color:#4E7B7C;text-decoration:none;">${safeEmail}</a>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:16px 18px;background-color:#F4E8DA;border-radius:14px;">
                      <div style="font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#897465;font-weight:600;margin-bottom:6px;">Company</div>
                      <div style="font-size:17px;font-weight:600;color:#1F1716;">${safeCompany}</div>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:18px 20px;background-color:#FFF7EE;border:1px solid rgba(156,82,48,0.12);border-radius:14px;">
                      <div style="font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#9C5230;font-weight:600;margin-bottom:8px;">Message</div>
                      <div style="font-size:15px;line-height:1.7;color:#1F1716;">${safeMessage}</div>
                    </td>
                  </tr>
                </table>

                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top:28px;">
                  <tr>
                    <td align="center">
                      <a href="mailto:${safeEmail}?subject=${encodeURIComponent(`Re: Canary Waves demo — ${data.name}`)}"
                         style="display:inline-block;padding:14px 28px;background:linear-gradient(135deg,#FFBE56 0%,#FFC9A2 100%);color:#1F1716;text-decoration:none;border-radius:999px;font-size:15px;font-weight:600;">
                        Reply to ${safeName}
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px 28px;border-top:1px solid rgba(31,23,22,0.08);background-color:#FBF5EC;">
                <div style="font-size:13px;line-height:1.6;color:#897465;text-align:center;">
                  Submitted ${submittedAt} UTC
                  ${safeSubmittedFrom ? `<br />From ${safeSubmittedFrom}` : ''}
                  <br />Canary Waves · Voice-to-Data Safety Intelligence
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
