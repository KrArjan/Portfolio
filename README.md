# Developer Portfolio Template

A high-performance, dark-themed developer portfolio — built with pure HTML, CSS, and JavaScript. Zero frameworks, zero build steps, and an immersive cinematic boot sequence.

**Fork it. Customize one file. Deploy in seconds.**

![License](https://img.shields.io/badge/license-MIT-blue)
![Deploy](https://img.shields.io/badge/deploy-Cloudflare%20Pages-orange)

---

## ✨ Features

- **Cinematic Boot Sequence** — Immersive terminal-style startup.
- **8 Dynamic Page Sections** — Home, Profile, Projects, Stack, Journey, Lab, Social, and Connect.
- **Pure Vanilla SPA** — Fast, smooth transitions with zero framework overhead.
- **Feature Flags** — Toggle any component (Stats, Featured, Boot Screen) with a single `true`/`false` setting.
- **Secure Backend Integration** — Contact form with Cloudflare Turnstile, Discord webhooks, and EmailJS.
- **Interactive Particle Background** — High-performance tsParticles canvas.
- **Fully Responsive** — Mobile-first with sleek bottom sheet navigation.

---

## 📚 Documentation

Explore the full documentation suite to personalize and deploy your portfolio:

### 1. [Getting Started](docs/GETTING_STARTED.md)
*Clone the repo, set up your local environment, and see your portfolio in action.*

### 2. [Deployment Guide](docs/DEPLOYMENT.md)
*Host your portfolio on Cloudflare Pages (Recommended), Vercel, or Netlify.*

### 3. [Configuration Reference](docs/CONFIGURATION.md)
*Master the `portfolio.config.js` file to update your bio, projects, and tech stack.*

### 4. [Theming & Design](docs/THEMING.md)
*How to customize colors, fonts, and the visual design system.*

### 5. [Backend & Security](docs/BACKEND.md)
*Set up Turnstile anti-spam, Discord notifications, and EmailJS.*

### 6. [Technical Architecture](docs/ARCHITECTURE.md)
*Dive into the SPA engine, routing logic, and CSS structure.*

### 7. [Troubleshooting](docs/TROUBLESHOOTING.md)
*Solutions to common setup issues and frequently asked questions.*

---

## 🚀 Quick Start (60 Seconds)

1. **Fork & Clone**: `git clone https://github.com/YOUR_USERNAME/Portfolio.git`
2. **Personalize**: Edit `config/portfolio.config.js` with your details.
3. **Run Locally**: `npx serve .` and visit `http://localhost:3000`.

---

## 📁 Project Structure

```text
Portfolio/
├── config/             ← 🟢 YOUR CONTENT (Bio, Projects, Images)
├── docs/               ← 📚 DOCUMENTATION (Guides and Manuals)
├── src/                ← 🔵 THE ENGINE (Page Templates, CSS, JS)
├── index.html          ← Entry Point
├── _worker.js          ← Contact Form Backend
└── wrangler.toml       ← Cloudflare Configuration
```

---

## 📜 License

MIT — see [LICENSE](LICENSE) for details.

Built by **KrArjan** — [github.com/KrArjan](https://github.com/KrArjan)
