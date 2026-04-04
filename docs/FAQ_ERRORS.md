# FAQ & Error Reference

This guide provides answers to common questions and a complete reference for technical error codes you may encounter while using the portfolio.

---

## ❓ Frequently Asked Questions (FAQ)

### 1. How do I send notifications to multiple Discord channels?
You can provide a comma-separated list of webhook URLs in your `DISCORD_WEBHOOK_URLS` environment variable.
**Example**: `https://discord.com/api/webhooks/...1,https://discord.com/api/webhooks/...2`

### 2. Can I receive DMs on multiple Discord accounts?
Yes. Similar to webhooks, you can provide multiple User IDs (comma-separated) in the `DISCORD_USER_IDS` variable. Note that the Bot must share a server with all target users.

### 3. How do I disable a specific notification method?
You can toggle methods on or off in `config/connect.config.js` under the `channels` object. Setting a channel to `false` will prevent the backend from even attempting to send that notification.

### 4. What is "Partial Delivery"?
If you have multiple notification targets (e.g., 2 webhooks and 1 email) and some fail while others succeed, the API will return a `PARTIAL` delivery status. This ensures you know at least one message reached you.

---

## 🛠️ Error Code Reference

When a contact form submission fails, the backend returns a JSON object containing an `error` code. Below are the common codes and their solutions.

| Error Code | Status | Meaning | Solution |
|---|---|---|---|
| `SECURITY_TOKEN_MISSING` | 400 | The Turnstile CAPTCHA token was not sent. | Ensure the Turnstile widget is loading correctly on your Connect page. |
| `TURNSTILE_VALIDATION_FAILED` | 403 | Cloudflare rejected the CAPTCHA token. | Check that your `TURNSTILE_SECRET_KEY` in Cloudflare is correct. |
| `BACKEND_CONFIGURATION_INCOMPLETE` | 500 | One or more required environment variables are missing. | Verify that all secrets (Turnstile, Discord, etc.) are set in the Cloudflare Dashboard. |
| `CORE_PROCESS_FAILURE` | 500 | A system error occurred while processing the request. | Check the Cloudflare Worker logs for a detailed stack trace. |
| `WORKER_RUNTIME_EXCEPTION` | 500 | An unexpected crash occurred in the worker. | Ensure your `_worker.js` file hasn't been modified with syntax errors. |

---

## 🔍 Debugging Tips

1.  **Check Worker Logs**: In the Cloudflare Dashboard, go to **Workers & Pages → [Your Project] → Logs** to see real-time error messages.
2.  **Verify Secrets**: Ensure there are no spaces or hidden characters in your environment variables.
3.  **Pseudo-IPv4**: If you prefer IPv4 addresses in your logs, ensure the "Pseudo IPv4" setting is enabled in your Cloudflare managed headers.
