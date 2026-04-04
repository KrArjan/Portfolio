# 🆘 FAQ & Error Reference
**Step 6 of 7** // Troubleshooting & optimization

This guide provides answers to common questions and a complete reference for technical error codes you may encounter while using the portfolio.

---

## ❓ Frequently Asked Questions (FAQ)

### 1. How do I send notifications to multiple Discord channels?
You can provide a comma-separated list of webhook URLs in your `DISCORD_WEBHOOK_URLS` environment variable.
**Example**: `https://discord.com/...1,https://discord.com/...2`

### 2. Can I receive DMs on multiple Discord accounts?
Yes. Similar to webhooks, you can provide multiple User IDs (comma-separated) in the `DISCORD_USER_IDS` variable. Note that your Bot must share a server with all target users.

### 3. How do I disable a specific notification method?
You can toggle methods in **`config/connect.config.js`** under the `channels` object. Setting a channel to `false` prevents the backend from attempting that notification.

---

## 🛠️ Error Code Reference

When a contact form submission fails, the backend returns a JSON object containing an `error` code. Below are the common codes and their solutions.

| Error Code | Status | Meaning | Solution |
|---|---|---|---|
| `SECURITY_TOKEN_MISSING` | 400 | Turnstile token was not sent. | Ensure the Turnstile widget is loading on your Connect page. |
| `TURNSTILE_VALIDATION_FAILED` | 403 | Cloudflare rejected the token. | Check that your `TURNSTILE_SECRET_KEY` is correct in Cloudflare. |
| `BACKEND_CONFIGURATION_INCOMPLETE` | 500 | Required secrets are missing. | Verify all environment variables are set in your Dash. |
| `CORE_PROCESS_FAILURE` | 500 | System error during processing. | Check your Worker logs for a detailed stack trace. |

> [!IMPORTANT]
> If you receive a **`PARTIAL`** delivery status, it means at least one notification channel failed while others succeeded. Check your logs to identify the failing channel (e.g., an invalid Discord Webhook URL).

---

## 🔍 Debugging Tips

1.  **Check Worker Logs**: In Cloudflare, go to **Workers & Pages → [Project] → Logs** for real-time error messages.
2.  **Verify Secrets**: Ensure there are no spaces or hidden characters in your environment variables.
3.  **Pseudo-IPv4**: If you prefer IPv4 addresses in your logs, ensure the "Pseudo IPv4" setting is enabled in your Cloudflare managed headers.

---

## 🔗 Sequential Navigation

← **Previous:** [Backend & Security](BACKEND.md) | **Next:** [Technical Architecture](ARCHITECTURE.md) →
