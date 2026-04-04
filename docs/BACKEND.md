# 🔐 Backend & Security
**Step 5 of 7** // Powering your contact form

This project features a secure contact form powered by a Cloudflare Pages Worker (`_worker.js`). This guide explains how to set up and secure its transmission protocol.

---

## 🛡️ Security Overview

The contact form is designed for **maximum anti-spam security**:
1.  **Turnstile Verification**: Replaces traditional CAPTCHAs with a seamless, invisible security check to block automated bot submissions.
2.  **Secret Management**: All sensitive tokens and webhook URLs are stored as **Environment Secrets** on Cloudflare, never exposed in your frontend code.
3.  **Multi-Channel Routing**: Supports broadcasting messages to multiple Discord Webhooks, Discord DMs, and EmailJS simultaneously.

---

## 1. Cloudflare Turnstile Setup

### Site Key (Public)
1. Go to [Cloudflare Dashboard → Turnstile](https://dash.cloudflare.com/?to=/:account/turnstile).
2. Create a new widget and copy the **Site Key**.
3. Paste it into `config/portfolio.config.js`:
   ```js
   security: {
     turnstileSiteKey: '0x4AAAAAA...',
   }
   ```

### Secret Key (Private)
1. Copy the **Secret Key** from the same dashboard.
2. Go to your Cloudflare Pages project **Settings → Environment Variables**.
3. Add `TURNSTILE_SECRET_KEY` as a **Secret** variable and paste your key.

---

## 2. Discord Integration

### Webhook Setup (Broadcast Mode)
1. In Discord, go to **Channel Settings → Integrations → Webhooks** and create a new webhook.
2. Copy the URL and add it to Cloudflare as `DISCORD_WEBHOOK_URLS`.

> [!TIP]
> You can specify **multiple webhooks** as a comma-separated list (e.g., `URL1,URL2`) to broadcast notifications to multiple servers or channels at once.

### DM Setup (Direct Notify)
1. Add `DISCORD_BOT_TOKEN`: Your Discord bot's token.
2. Add `DISCORD_USER_IDS`: Your personal Discord user ID(s) as a comma-separated list.

---

## 3. EmailJS Integration (Optional)

EmailJS allows you to receive formatted emails directly from your contact form without a dedicated backend server.

### Setup
1. Create an account at [EmailJS](https://www.emailjs.com/).
2. Create a mail service (e.g., connect your Gmail) and a template.
3. Note your IDs and add them to Cloudflare as **Secrets**:
   - `EMAILJS_SERVICE_ID`
   - `EMAILJS_TEMPLATE_ID`
   - `EMAILJS_PUBLIC_KEY`
   - `EMAILJS_PRIVATE_KEY`

> [!TIP]
> You can find your **Public Key** in the Account settings and your **Secret Key** in the API Keys section of the EmailJS dashboard.

---

## 3. Communication Control (`connect.config.js`)

Manage your notification channels and personalize the message appearance without redeploying.

```js
channels: {
  discord_webhook: true, // Send to all specified webhooks
  discord_dm:      true, // Send directly to your Discord inbox
  emailjs:         false, // Toggle EmailJS integration
}
```

> [!IMPORTANT]
> The **`connect.config.js`** file only controls the *logic* of the worker. You must still provide the actual `DISCORD_BOT_TOKEN` and `WEBHOOK_URLS` in your Cloudflare environment settings for them to work.

---

## 🔗 Sequential Navigation

← **Previous:** [Theming & Design](THEMING.md) | **Next:** [FAQ & Error Reference](FAQ_ERRORS.md) →
