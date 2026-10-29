# CareLynx — No Node.js email backend (autofill-block fix)

This release fixes the **"Unable to submit. Please try again."** message seen on the previous Google Apps Script build. The old `website` honeypot input could be filled by browser autofill, and JavaScript stopped the form before sending anything. The honeypot was removed from **both** forms and from `js/forms.js`/`backend/Code.gs`.

## Folder structure

- `index.html` — homepage and contact form
- `partnership.html` — partnership form
- `css/style.css` — existing site styles
- `js/config.js` — configure your **own** deployed Apps Script URL
- `js/forms.js` — direct browser POST without CORS/fetch or hidden-field rejection
- `js/script.js`, `js/partnership.js` — existing site behavior
- `assets/images/` — official logo and favicon
- `backend/Code.gs` — Google Apps Script code, including one-time email test

## Required Google Apps Script setup

1. Visit https://script.google.com/ signed in as the owner of `prthvrjjdv@gmail.com`.
2. Create/open the CareLynx script project. Paste `backend/Code.gs` in the editor and **Save**.
3. Select `testEmailSetup` from the function menu, press **Run**, and grant requested MailApp permission. This sends a single diagnostic email to the official inbox. Check Inbox and Spam. If it fails, open **Executions** and check the error.
4. Choose **Deploy > New deployment > Web app** (or **Manage deployments > Edit > New version** if previously deployed). Choose **Execute as: Me** and **Who has access: Anyone** so public visitors can submit without signing in. Deploy the new version.
5. Copy the URL ending with `/exec` and paste it in `js/config.js` as `emailEndpoint: 'https://script.google.com/macros/s/.../exec'`.
6. Open the complete site folder in VS Code Live Server. Submit a simple Contact Inquiry. **It will navigate to a Google-hosted result page**. A confirmation page means MailApp accepted the message, not guaranteed final inbox delivery. Check actual inbox and Spam. Test Partnership the same way.
7. Upload the entire website folder to hosting, preserving file paths.

If you already configured `js/config.js` in an older copy, **copy your existing /exec URL** to this new file (we do not have your private deployment URL). If you change the Apps Script code, **publish a new deployment version**.

## Troubleshooting

- **"Email setup is not complete"** — missing/incorrect `js/config.js` /exec URL. The form does not send in this case.
- **The test email fails in Apps Script** — authorization, quotas, or account restrictions; inspect Apps Script `Executions` errors.
- **Test succeeds, but browser form does not** — check Web App access (`Anyone`), `Execute as: Me`, updated deployment version, complete /exec URL, and browser page result.
- **Google result page shows validation error** — recheck required field names and enter a valid email/message.
- **Google result page shows success, but inbox is empty** — check Spam, Google account used, execution logs, email quotas, and allow some time for delivery.

**Limitations:** This relies on Google Apps Script/MailApp, their availability and daily quotas. It is not a managed healthcare data collection backend. Collect only general contact/partnership inquiries and never submit patient records through these forms. Public web-app endpoints need a serious anti-spam solution before high-traffic launch; the old honeypot was deliberately removed to resolve incorrect form blocking.

Official docs: https://developers.google.com/apps-script/guides/web and https://developers.google.com/apps-script/reference/mail/mail-app
