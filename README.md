# KRARJAN // THE_KINETIC_ARCHITECT
### Portfolio Website — Full-Stack Structure

---

## 📁 Project Structure

```
krarjan-portfolio/
│
├── index.html                  ← Main SPA shell (all pages live here)
│
├── assets/
│   ├── css/
│   │   ├── variables.css       ← Design tokens: colors, spacing, radii, z-index
│   │   ├── base.css            ← CSS reset, typography scale, global utilities
│   │   ├── animations.css      ← All @keyframes, animation classes, hover effects
│   │   ├── layout.css          ← Grid system, containers, bento layouts, flexbox utils
│   │   └── components.css      ← Reusable UI: glass, buttons, badges, nav, footer, etc.
│   │
│   ├── js/
│   │   ├── data.js             ← All site content (projects, stack, timeline, social…)
│   │   ├── router.js           ← SPA routing: page switching, history API, hash support
│   │   ├── boot.js             ← Boot screen animation (SVG ring, log lines, dismiss)
│   │   ├── renderer.js         ← Dynamic HTML injection from data.js
│   │   ├── ui.js               ← Interactions: drawer, filters, form, timer, scroll reveal
│   │   └── app.js              ← Entry point: bootstrap order
│   │
│   ├── images/                 ← (add your images/avatars/og-image here)
│   └── fonts/                  ← (add self-hosted fonts here if needed)
│
└── README.md                   ← This file
```

---

## 🧠 Architecture Decisions

### CSS Layer Order
1. **variables.css** — Design tokens only; no selectors that output styles
2. **base.css** — Reset + typography; relies on variables
3. **animations.css** — Keyframes + animation utility classes
4. **layout.css** — Grid/flex/spacing; purely structural
5. **components.css** — Visual components (glass, buttons, nav, etc.)

No class conflicts possible because layers have clearly separated responsibilities.

### JS Module Order (script load)
```
data.js → router.js → boot.js → renderer.js → ui.js → app.js
```
Each module is an IIFE returning a public API. No ES Modules (works without a bundler).

| Module | Responsibility |
|---|---|
| `data.js` | Single source of truth for all content |
| `router.js` | Show/hide page sections, update nav active state, history API |
| `boot.js` | SVG ring animation, log line reveals, dismiss to site |
| `renderer.js` | Read `SITE_DATA`, inject HTML into placeholder `id` elements |
| `ui.js` | Drawer toggle, filter buttons, contact form, lab timer, scroll reveal |
| `app.js` | Boots everything in correct order |

---

## 🎨 Design System

### Color Tokens (in variables.css)
| Token | Value | Usage |
|---|---|---|
| `--primary-container` | `#00f2ff` | Cyan accent, glows, active states |
| `--secondary-container` | `#7701d0` | Purple energy, gradients |
| `--tertiary-fixed` | `#ffe173` | Amber status indicators |
| `--surface-dim` | `#131313` | Base background |
| `--on-surface` | `#e5e2e1` | Primary text |
| `--on-surface-variant` | `#b9cacb` | Secondary text |

### Typography
- **Headlines / Labels**: `Space Grotesk` — tight tracking, engineered feel
- **Body**: `Manrope` — highly legible, warm

---

## 🚀 How to Run

**No build step needed** — pure HTML/CSS/JS.

```bash
# Option 1: Python server
python3 -m http.server 3000

# Option 2: Node.js
npx serve .

# Option 3: VS Code
# Install "Live Server" extension, right-click index.html → Open with Live Server
```

Then open `http://localhost:3000`

---

## 📄 Pages

| Route Hash | Page |
|---|---|
| `#home` | Landing — hero, stats, featured projects, mission |
| `#profile` | Bio story, origin timeline, what I do |
| `#projects` | Filterable project showcase grid |
| `#stack` | Languages, tools, infra, bots, currently learning |
| `#journey` | Visual development timeline 2021→present |
| `#lab` | Active workspace, experiments, lab notes |
| `#connect` | Contact form + social links |

---

## ✏️ Customization

All content lives in **`assets/js/data.js`** — edit that file to:
- Add/remove projects
- Update tech stack
- Change social links
- Edit bio text
- Modify timeline entries

No need to touch HTML or CSS for content changes.

---

## 🗂️ Adding Images

Place images in `assets/images/` and reference them in `data.js`:
```js
projects: [
  {
    id: 'my-project',
    image: 'assets/images/my-project.jpg',
    ...
  }
]
```

Then update `renderer.js` to inject `<img>` tags where needed.

---

**© 2025 KRARJAN // BUILT_FOR_THE_NEXT_ERA**
