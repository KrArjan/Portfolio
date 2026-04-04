# Backend & Contact Form Configuration

This project features a secure contact form powered by a Cloudflare Pages Worker (`_worker.js`). This guide explains how to set up and secure its transmission.

## Overview

The contact form is designed for **security and anti-spam** from the ground up:
1.  **Frontend Validation**: Basic field checks.
2.  **Turnstile Verification**: Prevents automated bot submissions.
3.  **Backend Logic**: A Cloudflare Worker verifies the Turnstile token and sends the message.
4.  **Integration**: Messages can be sent to Discord (Webhook or DM) and EmailJS.

---

## 1. Cloudflare Turnstile Setup

Turnstile is Cloudflare's smart CAPTCHA replacement.

### Site Key (Public)
1. Go to [Cloudflare Dashboard → Turnstile](https://dash.cloudflare.com/?to=/:account/turnstile).
2. Create a new widget and set your site's domain.
3. Copy the **Site Key** and paste it into `config/portfolio.config.js`:
   ```js
   security: {
     turnstileSiteKey: 'YOUR_SITE_KEY',
   }
   ```

### Secret Key (Secret)
1. Copy the **Secret Key**.
2. Go to your Cloudflare Pages project **Settings → Environment Variables**.
3. Add `TURNSTILE_SECRET_KEY` as a **Secret** variable and paste your key.

---

## 2. Discord Integration

You can receive notifications directly in a Discord channel or via DM.

### Webhook Setup
1. Open Discord, navigate to the desired channel, and select **Edit Channel → Integrations → Webhooks**.
2. Click **"New Webhook"** and copy the **Webhook URL**.
3. In Cloudflare Pages, add `DISCORD_WEBHOOK_URL` as a **Secret** environment variable.

### DM Setup (Optional)
To receive messages via DM, you must set an additional **Secret**:
1. Add `DISCORD_BOT_TOKEN`: Your Discord bot's token.
2. Add `DISCORD_USER_ID`: Your personal Discord user ID.

---

## 3. EmailJS Integration (Optional)

EmailJS allows you to receive emails directly from your contact form.

### Setup
1. Create an account at [EmailJS](https://www.emailjs.com/).
2. Create a mail service and a template.
3. Add the following **Secret** variables in Cloudflare Pages:
   - `EMAILJS_SERVICE_ID`
   - `EMAILJS_TEMPLATE_ID`
   - `EMAILJS_PUBLIC_KEY`
   - `EMAILJS_PRIVATE_KEY`

---

## Next Steps
- **[Deployment](DEPLOYMENT.md)** — Finalize your hosting setup.
- **[Configuration](CONFIGURATION.md)** — Master individual field tailoring.
- **[Architecture](ARCHITECTURE.md)** — Learn how the worker handles requests.
