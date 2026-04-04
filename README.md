# Portfolio Template

A modern, dark-themed developer portfolio — built with pure HTML, CSS, and JavaScript. No frameworks, no build step.

**Fork it. Edit one file. Deploy your own.**

![License](https://img.shields.io/badge/license-MIT-blue)
![Deploy](https://img.shields.io/badge/deploy-Cloudflare%20Pages-orange)

---

## ✨ Features

- **Cinematic boot sequence** — terminal-style loading animation
- **8 page sections** — Home, Profile, Projects, Stack, Journey, Lab, Social, Connect
- **SPA routing** — smooth page transitions, browser history support
- **Particle background** — interactive tsParticles canvas
- **Fully responsive** — mobile-first with bottom sheet navigation
- **Contact form backend** — Discord webhook, DM, and EmailJS integration
- **Scroll animations** — reveal-on-scroll, progress bars, card tilts
- **Zero build step** — no npm needed to run locally

---

## 🚀 Quick Start

### 1. Fork & Clone

```bash
git clone https://github.com/YOUR_USERNAME/Portfolio.git
cd Portfolio
```

### 2. Edit Your Config

Open **`config/site.config.js`** and replace the example data with your own:

```js
meta: {
  name: 'Your Name',
  title: 'Your Name',
  tagline: 'Your tagline here.',
  role: 'Your Role',
  email: 'you@example.com',
  github: 'https://github.com/you',
  // ...
},
```

Replace `config/images/pfp.png` with your profile picture.

### 3. Run Locally

```bash
# No build step needed — just serve the files:
npx serve .
# or
python3 -m http.server 3000
```

Open `http://localhost:3000` 🎉

---

## 📁 Project Structure

```
Portfolio/
├── config/                    ← 🟢 YOUR CONTENT (edit this)
│   ├── site.config.js         ← All personal data
│   └── images/                ← Your images
│       ├── pfp.png
│       └── social/
│
├── src/                       ← 🔵 ENGINE (don't touch)
│   ├── pages/                 ← HTML templates
│   ├── css/                   ← Stylesheets
│   └── js/                    ← Application logic
│
├── index.html                 ← SPA entry point
├── _worker.js                 ← Cloudflare Worker (contact form)
├── wrangler.toml              ← Cloudflare config
└── .env.example               ← Backend secrets template
```

> **Only edit files in `config/`** — that's where all your personal content lives.

---

## 🌐 Deploy

### Cloudflare Pages (Recommended)

1. Push your repo to GitHub
2. Go to [Cloudflare Pages](https://pages.cloudflare.com)
3. Connect your repo → set build output to `/` (root)
4. Add environment secrets (see `.env.example`) in the Cloudflare dashboard
5. Deploy!

### Vercel / Netlify

Works out of the box — just connect your repo. The contact form backend requires Cloudflare Workers though, so the form won't work on other platforms without modification.

### GitHub Pages

1. Go to Settings → Pages → Source: Deploy from branch
2. Select `main` branch, root `/`
3. Note: Contact form backend won't work on GitHub Pages

See **[SETUP.md](SETUP.md)** for detailed deployment guides.

---

## 🎨 Customization

| What to change | Where |
|---|---|
| Name, bio, tagline | `config/site.config.js` → `meta` |
| Projects | `config/site.config.js` → `projects` |
| Tech stack | `config/site.config.js` → `stack` |
| Timeline | `config/site.config.js` → `journey` |
| Social links | `config/site.config.js` → `social` |
| Profile picture | `config/images/pfp.png` |
| Colors & fonts | `src/css/variables.css` |
| Boot sequence | `config/site.config.js` → `bootLog` |

See **[CUSTOMIZATION.md](CUSTOMIZATION.md)** for the full reference.

---

## 🧠 Architecture

### CSS Layer Order
1. `variables.css` — Design tokens (colors, spacing, radii)
2. `base.css` — Reset + typography
3. `animations.css` — @keyframes + animation classes
4. `layout.css` — Grid, flex, spacing
5. `components.css` — UI components (glass cards, buttons, nav)

### JS Module Order
```
particles-init.js → site.config.js → router.js → boot.js → renderer.js → ui.js → app.js
```

Each module is an IIFE — no bundler required.

---

## 📄 Pages

| Route | Page |
|---|---|
| `/` | Home — hero, stats, featured projects |
| `/profile` | Bio, origin story, approach |
| `/projects` | Filterable project grid |
| `/stack` | Languages, tools, infra, learning |
| `/journey` | Development timeline |
| `/lab` | Experiments, active builds |
| `/social` | Social media cards |
| `/connect` | Contact form + direct links |

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feat/my-feature`
3. Commit: `git commit -m 'Add my feature'`
4. Push: `git push origin feat/my-feature`
5. Open a Pull Request

---

## 📜 License

MIT — see [LICENSE](LICENSE) for details.

Built by **KrArjan** — [github.com/KrArjan](https://github.com/KrArjan)
