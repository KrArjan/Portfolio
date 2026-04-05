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

## 📚 Documentation Path

Follow the sequential guide below to personalize and deploy your professional portfolio:

### 🛠️ Phase 1: Setup & Launch
1.  **[Getting Started](docs/GETTING_STARTED.md)** — *Step 1 of 7*
    *Install dependencies, set up your local environment, and see your portfolio in action.*
2.  **[Deployment Guide](docs/DEPLOYMENT.md)** — *Step 2 of 7*
    *Host your portfolio on Cloudflare Pages (Recommended), Vercel, or Netlify.*

### 🎨 Phase 2: Customization
3.  **[Configuration Reference](docs/CONFIGURATION.md)** — *Step 3 of 7*
    *Master the `portfolio.config.js` file to update your bio, projects, and tech stack.*
4.  **[Theming & Design](docs/THEMING.md)** — *Step 4 of 7*
    *How to customize colors, fonts, and the visual design system from `theme.config.js`.*

### 🔐 Phase 3: Infrastructure
5.  **[Backend & Security](docs/BACKEND.md)** — *Step 5 of 7*
    *Set up Turnstile anti-spam, Discord notifications, and EmailJS.*
6.  **[FAQ & Error Reference](docs/FAQ_ERRORS.md)** — *Step 6 of 7*
    *Solutions to common setup issues and frequently asked questions.*
7.  **[Technical Architecture](docs/ARCHITECTURE.md)** — *Step 7 of 7*
    *Dive into the SPA engine, routing logic, and CSS structure.*

---

## 🚀 Quick Start (60 Seconds)

1. **Fork & Clone**: `git clone https://github.com/YOUR_USERNAME/Portfolio.git`
2. **Personalize**: Edit **`config/portfolio.config.js`**. This handles your bio, social links, SEO tags, and feature flags.
3. **Run Locally**: `npx serve .` and visit `http://localhost:3000`.

> [!TIP]
> This portfolio is designed to be **fully configurable from the `config/` directory**. You should avoid editing files in `src/` or `index.html` unless you want to modify the core engine.

---

## 📁 Project Structure

```text
Portfolio/
├── config/             ← 🟢 YOUR CONTENT (Bio, Projects, Images, Connect)
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
