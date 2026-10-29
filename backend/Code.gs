/**
 * CareLynx — Google Apps Script email backend (Node.js NOT required).
 *
 * Deploy as a Web app:
 * - Execute as: Me (signed in as recipient Gmail account)
 * - Who has access: Anyone (public inquiries)
 * - Use the deployed /exec URL in js/config.js
 *
 * MailApp can send email but cannot read your Gmail inbox.
 * Only accepts limited predefined fields and always sends to OWNER_EMAIL.
 * Important: Avoid medical/patient information in general inquiries.
 */
const OWNER_EMAIL = 'prthvrjjdv@gmail.com';
const MAX_TEXT = 3000;

/**
 * Run this ONE TIME from the Apps Script editor to grant email permissions.
 * Check the official inbox for the diagnostic email before testing forms.
 * NOTE: This intentionally sends a test email to the fixed owner address.
 */
function testEmailSetup() {
  MailApp.sendEmail({
    to: OWNER_EMAIL,
    subject: '[CareLynx] Google Apps Script email test',
    body: 'CareLynx Google Apps Script MailApp is authorized and able to send this test message.',
    name: 'CareLynx Website'
  });
  Logger.log('Test email sent to the configured CareLynx inbox.');
}

function doGet() {
  return page_(false, 'Ready for submissions',
    'This CareLynx endpoint accepts website form POST requests only.');
}

function doPost(e) {
  try {
    const data = (e && e.parameter) || {};
    const value = (key, limit) => String(data[key] || '').trim().slice(0, limit || MAX_TEXT);

    // No hidden browser fields: autofill occasionally filled the old trap,
    // preventing legitimate submissions. Validate required fields instead.

    const formType = value('form_type', 50);
    const isPartner = formType === 'Partnership Inquiry';
    if (!isPartner && formType !== 'Contact Inquiry') {
      return page_(false, 'Invalid form', 'Please use the CareLynx contact page.');
    }

    const name = value('name', 100);
    const email = value('email', 254);
    const message = value('message', MAX_TEXT);
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!name || !message || !emailPattern.test(email)) {
      return page_(false, 'Details missing', 'Please complete the required fields.');
    }

    const lines = [
      'CareLynx Pvt. Ltd. — website inquiry',
      'Inquiry type: ' + formType,
      'Date (India): ' + Utilities.formatDate(new Date(), 'Asia/Kolkata', 'dd MMM yyyy, HH:mm:ss'),
      '',
      'Name: ' + name,
      'Email: ' + email,
    ];

    if (isPartner) {
      const organisation = value('organisation', 140);
      const phone = value('phone', 30);
      const partnerType = value('type', 80);
      const city = value('city', 100);
      const allowedTypes = ['Hospital', 'Pharmacy', 'Laboratory', 'Other healthcare organisation'];
      if (!organisation || !phone || !city || !allowedTypes.includes(partnerType)) {
        return page_(false, 'Details missing', 'Please complete the partnership form.');
      }
      lines.push('Organisation: ' + organisation);
      lines.push('Phone: ' + phone);
      lines.push('Partner type: ' + partnerType);
      lines.push('City: ' + city);
    }

    // Store only in the recipient's email; no public spreadsheet/database.
    lines.push('', 'Message:', message);
    lines.push('', 'Source page: ' + value('source_page', 350));
    lines.push('', 'Security note: Do not send patient medical records through this form.');

    MailApp.sendEmail({
      to: OWNER_EMAIL,
      subject: isPartner ? '[CareLynx] New Partnership Inquiry' : '[CareLynx] New Contact Inquiry',
      body: lines.join('\n'),
      replyTo: email,
      name: 'CareLynx Website'
    });

    return page_(true, 'Thank you for contacting CareLynx!',
      'Your inquiry was submitted successfully. Our team can follow up by email.');
  } catch (err) {
    console.error('CareLynx form submission failed: ' + String(err));
    // Don't display internal logs, recipient email or stack trace publicly.
    return page_(false, 'Unable to send your inquiry',
      'Email delivery is temporarily unavailable. Please try again later.');
  }
}

function page_(success, heading, message) {
  // All output text is hard-coded by this script, never user HTML.
  const icon = success ? '&#10003;' : '!';
  const accent = success ? '#14876b' : '#bf5434';
  const html = `<!doctype html><html lang="en"><head><meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>CareLynx Inquiry</title>
    <style>body{margin:0;min-height:100vh;display:grid;place-items:center;
    background:#f4f8fc;color:#183061;font-family:Arial,sans-serif;padding:20px;box-sizing:border-box}
    .card{max-width:520px;width:100%;background:white;border-radius:20px;
    box-shadow:0 18px 55px #15254d1c;padding:45px 30px;text-align:center}
    .mark{margin:auto auto 24px;width:60px;height:60px;border-radius:100%;
    background:${accent};color:white;display:grid;place-items:center;font-size:32px}
    h1{font-size:26px;line-height:1.25}p{line-height:1.6;color:#53677a}
    small{color:#74839a}</style></head><body><main class="card">
    <div class="mark">${icon}</div><h1>${heading}</h1><p>${message}</p>
    <small>CareLynx Pvt. Ltd. — One Window. One Step.</small>
    </main></body></html>`;
  return HtmlService.createHtmlOutput(html).setTitle('CareLynx Inquiry');
}
