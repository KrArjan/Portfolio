# Deployment Guide

Once you've personalized your portfolio, it's time to host it on the web. This guide will walk you through the most popular hosting options.

## Cloudflare Pages (Recommended)

Cloudflare Pages is the recommended hosting platform because it's free, extremely fast, and supports the **contact form backend** via Cloudflare Workers without additional configuration.

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
   - `DISCORD_WEBHOOK_URL`: Your Discord webhook URL.
   - `TURNSTILE_SECRET_KEY`: Your Cloudflare Turnstile secret key.
   - `DISCORD_BOT_TOKEN` (Optional): Required if you want to send DMs.
   - `DISCORD_USER_ID` (Optional): Required if you want to receive DMs.
   - `EMAILJS_SERVICE_ID` (Optional): For EmailJS integration.
   - `EMAILJS_TEMPLATE_ID` (Optional): For EmailJS integration.
   - `EMAILJS_PUBLIC_KEY` (Optional): For EmailJS integration.
   - `EMAILJS_PRIVATE_KEY` (Optional): For EmailJS integration.

For more details on setting up the contact form, see **[Backend Configuration](BACKEND.md)**.

---

## Vercel

1. Push your repository to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import your project.
3. In the Build configuration:
   - **Framework Preset**: Other
   - **Build Command**: *(leave empty)*
   - **Output Directory**: `.`
4. Click **"Deploy"**.

> [!WARNING]
> The default contact form backend (`_worker.js`) is Cloudflare-specific. It will **not work on Vercel**. You will need to use a third-party form service or disable the form.

---

## Netlify

1. Push your repository to GitHub.
2. In the Netlify dashboard, click **"Add new site"** → **"Import from Git"**.
3. Select your repository.
4. In the Build configuration:
   - **Build command**: *(leave empty)*
   - **Publish directory**: `.`
5. Click **"Deploy"**.

> [!WARNING]
> Like Vercel, the contact form backend will not function on Netlify without major modifications.

---

## GitHub Pages

1. Navigate to your repository **Settings → Pages**.
2. Under **"Build and deployment"**, set the Source to **"Deploy from a branch"**.
3. Select the `main` branch and the `/ (root)` folder.
4. Click **"Save"**.

> [!IMPORTANT]
> GitHub Pages is a static-only provider. This means:
> 1. The contact form backend will not work.
> 2. SPA routing (clean URLs like `/projects`) requires hash-based routing (`/#projects`) or a custom 404 setup.
