# Setup Guide

Step-by-step instructions to get this portfolio running locally and deployed to production.

---

## Prerequisites

- **Git** — for cloning the repo
- **A code editor** — VS Code recommended
- **A web server** — `npx serve`, Python's `http.server`, or VS Code Live Server

No Node.js, npm, or build step is required for the portfolio itself. The backend contact form uses Cloudflare Workers (optional).

---

## Local Development

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/Portfolio.git
cd Portfolio
```

### 2. Edit Your Config

Open `config/portfolio.config.js` and update all fields marked with `CHANGE_ME`:

```js
meta: {
  name: 'Your Name',           // CHANGE_ME
  title: 'Your Name',          // CHANGE_ME
  tagline: 'Your tagline.',    // CHANGE_ME
  role: 'Your Role',           // CHANGE_ME
  email: 'you@example.com',    // CHANGE_ME
  github: 'https://github.com/you',  // CHANGE_ME
  // ...
}
```

### 3. Replace Your Images

| File | Description |
|---|---|
| `config/images/pfp.png` | Your profile picture (square, min 400×400px recommended) |
| `config/images/social/github_bg.png` | Background image for GitHub social card |
| `config/images/social/discord_bg.png` | Background image for Discord social card |
| `config/images/social/linkedin_bg.png` | Background image for LinkedIn social card |
| `config/images/social/instagram_bg.png` | Background image for Instagram social card |

### 4. Start Local Server

```bash
# Option 1: npx (Node.js required)
npx serve .

# Option 2: Python
python3 -m http.server 3000

# Option 3: VS Code Live Server
# Install "Live Server" extension → right-click index.html → Open with Live Server
```

Open `http://localhost:3000` in your browser.

---

## Deployment

### Cloudflare Pages (Recommended)

Cloudflare Pages is free and supports the contact form backend via Workers.

#### Steps:

1. Push your repo to GitHub/GitLab
2. Go to [Cloudflare Dashboard → Pages](https://dash.cloudflare.com/?to=/:account/pages)
3. Click **"Create a project"** → **"Connect to Git"**
4. Select your repository
5. Set the build configuration:
   - **Build command**: *(leave empty)*
   - **Build output directory**: `/`
6. Deploy!

#### Contact Form Backend:

The contact form requires environment secrets. After deploying:

1. Go to your Pages project → **Settings → Environment Variables**
2. Add these as **Secrets** (not plain text):

| Variable | Required | Description |
|---|---|---|
| `DISCORD_WEBHOOK_URL` | ✅ | Discord channel webhook URL |
| `TURNSTILE_SECRET_KEY` | ✅ | Cloudflare Turnstile secret key |
| `DISCORD_BOT_TOKEN` | Optional | For sending DMs to you |
| `DISCORD_USER_ID` | Optional | Your Discord user ID (for DMs) |
| `EMAILJS_SERVICE_ID` | Optional | EmailJS service ID |
| `EMAILJS_TEMPLATE_ID` | Optional | EmailJS template ID |
| `EMAILJS_PUBLIC_KEY` | Optional | EmailJS public key |
| `EMAILJS_PRIVATE_KEY` | Optional | EmailJS private key |

3. Also update the **Turnstile Site Key** in `wrangler.toml`:
```toml
[vars]
TURNSTILE_SITE_KEY = "your-site-key-here"
```

#### Getting a Turnstile Key:

1. Go to [Cloudflare Dashboard → Turnstile](https://dash.cloudflare.com/?to=/:account/turnstile)
2. Create a new widget
3. Set the domain to your portfolio URL
4. Copy the **Site Key** → `wrangler.toml`
5. Copy the **Secret Key** → Cloudflare Pages environment secrets

---

### Vercel

1. Push your repo to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your repository
4. Set the build configuration:
   - **Framework Preset**: Other
   - **Build Command**: *(leave empty)*
   - **Output Directory**: `.`
5. Deploy!

> ⚠️ The contact form backend (`_worker.js`) is Cloudflare-specific. It won't work on Vercel. You'll need to create your own API route or disable the form.

---

### Netlify

1. Push your repo to GitHub
2. Go to [app.netlify.com](https://app.netlify.com)
3. Click **"Add new site"** → **"Import from Git"**
4. Select your repository
5. Set the build configuration:
   - **Build command**: *(leave empty)*
   - **Publish directory**: `.`
6. Deploy!

> ⚠️ Same limitation as Vercel — the contact form backend won't work without modification.

---

### GitHub Pages

1. Go to your repo → **Settings → Pages**
2. Source: **Deploy from a branch**
3. Select `main` branch, root `/`
4. Save

> ⚠️ GitHub Pages is static-only. The contact form and SPA routing (clean URLs) won't work. Hash-based routing (`#page`) will still work.

---

## Troubleshooting

| Issue | Solution |
|---|---|
| Blank page | Make sure you're using an HTTP server, not `file://` protocol |
| 404 on page refresh | Your host needs SPA fallback configured (Cloudflare Pages does this automatically via `wrangler.toml`) |
| Contact form errors | Check that environment secrets are set correctly in your hosting dashboard |
| Images not loading | Verify images are in `config/images/` and file names match exactly |
| Styles broken | Clear browser cache (`Ctrl + Shift + R`) |
