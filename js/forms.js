/**
 * CareLynx form submission — native browser POST to Google Apps Script.
 * The old hidden `website` field was removed because browser autofill could
 * populate it and block real visitors before any submission occurred.
 * This code does not use fetch(), so it requires no CORS headers.
 */
(() => {
  'use strict';

  const configured = String(window.CARELYNX_CONFIG?.emailEndpoint || '').trim();
  const validUrl = /^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec$/.test(configured);

  document.querySelectorAll('form[data-form-backend="google-apps-script"]').forEach(form => {
    const status = form.querySelector('.form-result');
    const originField = form.querySelector('input[name="source_page"]');
    const submitButton = form.querySelector('button[type="submit"]');

    if (validUrl) {
      form.action = configured;
    }

    if (originField) {
      originField.value = /^https?:$/.test(location.protocol)
        ? location.href.split('#')[0].slice(0, 350)
        : 'Local preview';
    }

    form.addEventListener('submit', event => {
      if (!validUrl) {
        event.preventDefault();
        if (status) {
          status.className = 'form-result is-error';
          status.textContent = 'Email setup is not complete. Please set your Google Apps Script /exec URL in js/config.js, or email prthvrjjdv@gmail.com directly.';
        }
        console.warn('[CareLynx] Invalid or missing Google Apps Script /exec URL in js/config.js');
        return;
      }

      // Let browser validate required fields, then perform a regular POST.
      // Navigating to Google's success/error page is the normal response.
      if (status) {
        status.className = 'form-result is-loading';
        status.textContent = 'Sending inquiry...';
      }
      if (submitButton) {
        submitButton.setAttribute('aria-busy', 'true');
      }
    });
  });
})();
