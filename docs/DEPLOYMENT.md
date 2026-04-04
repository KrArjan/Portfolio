# 🌐 Deployment Guide
**Step 2 of 7** // Taking your portfolio live

This portfolio is cross-platform compatible and can be hosted on any major provider. Follow the guide for your preferred platform.

---

## 🌩️ Cloudflare Pages (Recommended)

**Cloudflare Pages** is the recommended platform. It natively supports the `_worker.js` backend and offers the fastest global delivery.

### 🔌 Setup
1. Push your repository to GitHub/GitLab.
2. Visit [Cloudflare Dashboard → Pages](https://dash.cloudflare.com/?to=/:account/pages).
3. Click **"Create a project"** and connect your repository.
4. Set **Build command** to *(empty)* and **Output directory** to `/`.

### 🔐 Secrets (Environment Variables)
In **Settings → Environment Variables**, add these as **Secrets**:
- `DISCORD_WEBHOOK_URLS`
- `TURNSTILE_SECRET_KEY`
- `DISCORD_BOT_TOKEN` / `DISCORD_USER_IDS`

---

## 🚀 Vercel (Fast & Professional)

Vercel provides excellent UI and fast performance. It uses the `vercel.json` and `/api` folder for functionality.

### 🔌 Setup
1. Import your repository at [vercel.com/new](https://vercel.com/new).
2. Framework Preset: **Other** | Build Command: *(empty)* | Output Directory: `.` (root).

### 🔐 Secrets
In your project **Settings → Environment Variables**, add:
- `TURNSTILE_SECRET_KEY`
- `DISCORD_WEBHOOK_URLS`
- `DISCORD_BOT_TOKEN` / `DISCORD_USER_IDS`

---

## 🛰️ Netlify (Static Leader)

Netlify uses the `netlify.toml` and `netlify/functions` for handling redirects and backend logic.

### 🔌 Setup
1. Click **"Add new site"** in the Netlify dashboard and connect your Git.
2. The project will automatically pick up `netlify.toml`.

### 🔐 Secrets
In **Site Configuration → Environment variables**, add your secrets (same keys as above).

---

## 📦 GitHub Pages (Basic Static)

**Note:** GitHub Pages is **static-only**. The contact form functionality (Discord/Emails via Backend) will **not work** without using third-party services like EmailJS directly from the frontend.

### 🔌 Setup
1. Go to repository **Settings → Pages**.
2. Set Source to **"Deploy from a branch"** (main) and folder to `/ (root)`.

> [!CAUTION]
> Direct links (e.g., `/projects`) result in 404s on GitHub Pages. Users must use hash-based navigation (e.g., `/#projects`) or provide a custom `404.html` that redirects back to `index.html`.

---

## 🔗 Sequential Navigation

← **Previous:** [Getting Started](GETTING_STARTED.md) | **Next:** [Configuration Reference](CONFIGURATION.md) →
