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
3. In Cloudflare Pages, add `DISCORD_WEBHOOK_URLS` as a **Secret** environment variable.

### Multi-Webhook Support (Broadcasting)
You can specify multiple webhooks as a **comma-separated list** (e.g., `URL1,URL2`). The worker will broadcast the message to all URLs in the list.

### DM Setup (Optional)
To receive messages via DM, you must set an additional **Secret**:
1. Add `DISCORD_BOT_TOKEN`: Your Discord bot's token.
2. Add `DISCORD_USER_IDS`: Your personal Discord user ID(s) as a **comma-separated list** (e.g., `ID1,ID2`).

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

## 4. Communication Configuration
 
 The **`config/connect.config.js`** file allows you to enable or disable specific communication channels and customize the notification messages sent by the backend.
 
 ### Channel Toggles
 You can enable or disable each notification method by setting its `enabled` flag to `true` or `false` in the `channels` object:
 
 ```js
 channels: {
   discord_webhook: true,    // Send to your Discord Webhook URL(s)
   discord_dm: true,         // Send DM via Bot Token to User ID(s)
   emailjs: true,            // Send via EmailJS REST API
 },
 ```
 
 ### Message Customization
 In the `notifications` object, you can customize the identity and appearance of the Discord notification:
 
 - **Username & Avatar**: Change the `username` and `avatar_url` shown in the Discord message header.
 - **Embed Content**: Update the `titleTemplate`, `descriptionText`, `color`, and `footerText` for the Discord rich embed.
 
 ### Dynamic Placeholders
 Placeholders can be used in your `titleTemplate` to inject dynamic data from the contact form:
 
 | Placeholder | Description |
 |---|---|
 | `{{subject}}` | The subject line from the contact form. |
 | `{{name}}` | The sender's name. |
 | `{{email}}` | The sender's email address. |
 
 ---
 
 ## Next Steps
- **[Deployment](DEPLOYMENT.md)** — Finalize your hosting setup.
- **[Configuration](CONFIGURATION.md)** — Master individual field tailoring.
- **[Architecture](ARCHITECTURE.md)** — Learn how the worker handles requests.
