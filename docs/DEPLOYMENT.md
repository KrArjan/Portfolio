# 🌐 Deployment Guide
**Step 2 of 7** // Taking your portfolio live

Once you've personalized your portfolio, it's time to host it on the web. This guide walks you through the most popular hosting options.

---

## 🌩️ Cloudflare Pages (Recommended)

**Cloudflare Pages** is the recommended hosting platform because it's free, extremely fast, and natively supports the **contact form backend** (`_worker.js`) without additional configuration.

### Initial Setup
1. Push your repository to GitHub or GitLab.
2. Visit the [Cloudflare Dashboard → Pages](https://dash.cloudflare.com/?to=/:account/pages).
3. Click **"Create a project"** and then **"Connect to Git"**.
4. Select your portfolio repository.
5. In the Build configuration:
   - **Build command**: *(leave empty)*
   - **Build output directory**: `/` (root)
6. Click **"Save and Deploy"**.

### Contact Form Backend
The contact form requires environment secrets to function. After your first deployment:
1. Go to your Pages project → **Settings → Environment Variables**.
2. Add the following as **Secrets** (not plain text):
   - `DISCORD_WEBHOOK_URLS`: Your Discord webhook URL(s).
   - `TURNSTILE_SECRET_KEY`: Your Cloudflare Turnstile secret key.
   - `DISCORD_BOT_TOKEN`: (Optional) For DM notifications.
   - `DISCORD_USER_IDS`: (Optional) User IDs for DMs.
   - `EMAILJS_SERVICE_ID`: (Optional) Your EmailJS service ID.
   - `EMAILJS_TEMPLATE_ID`: (Optional) Your EmailJS template ID.
   - `EMAILJS_PUBLIC_KEY`: (Optional) Your EmailJS public key.
   - `EMAILJS_PRIVATE_KEY`: (Optional) Your EmailJS private key.

> [!IMPORTANT]
> Always use **Secrets** for these variables to prevent your Discord tokens and webhook URLs from being exposed in logs or build history.

---

## 🚀 Alternative Hosting

### Vercel
1. Push your repository to GitHub and import it at [vercel.com/new](https://vercel.com/new).
2. Set **Framework Preset** to "Other" and **Output Directory** to `.` (root).

> [!WARNING]
> The default contact form backend is Cloudflare-specific. It will **not work on Vercel** without major refactoring.

### GitHub Pages
1. Navigate to your repository **Settings → Pages**.
2. Set the Source to **"Deploy from a branch"** and select the `/ (root)` folder of `main`.

> [!CAUTION]
> GitHub Pages is static-only. This means the contact form will not function and deep-linking (e.g., `/projects`) may require a custom 404 setup.

---

## 🔗 Sequential Navigation

← **Previous:** [Getting Started](GETTING_STARTED.md) | **Next:** [Configuration Reference](CONFIGURATION.md) →
