# Customization Guide

Everything you need to know about personalizing this portfolio.

---

## Table of Contents

- [Config File Reference](#config-file-reference)
- [Projects](#projects)
- [Tech Stack](#tech-stack)
- [Timeline](#timeline)
- [Social Links](#social-links)
- [Images](#images)
- [Colors & Theme](#colors--theme)
- [Typography](#typography)
- [Pages](#pages)
- [Boot Sequence](#boot-sequence)
- [Feature Flags](#feature-flags)
- [Icons Reference](#icons-reference)

---

## Config File Reference

All content is in **`config/portfolio.config.js`**. The file is structured with clearly labeled sections, each controlling a different part of the site.

### Meta

```js
meta: {
  name: 'Your Name',           // Display name across the site
  title: 'Your Name',          // Browser tab title
  tagline: 'Your tagline.',    // Shown below your name on the home page
  role: 'Your Role',           // Subtitle / job title
  description: 'A short bio.', // Used for SEO meta description
  version: '1.0.0',            // Shown on the home page badge
  buildRef: 'MY-REF',          // Decorative reference code
  email: 'you@example.com',    // Used on the Connect page
  github: 'https://github.com/you',
  discord: 'https://discord.gg/yourserver',
  site: 'https://your-site.com',
  buildSince: '2020',          // Year displayed in stats
}
```

---

## Projects

Each project in the `projects` array appears as a card on the Projects page:

```js
{
  id: 'my-project',               // Unique slug (use lowercase-dashes)
  title: 'My Project',            // Display name
  description: 'What it does.',   // 1-2 sentences
  category: ['web', 'automation'],// Used for filter buttons
  tags: ['REACT', 'NODE.JS'],     // Tech labels on the card
  status: 'BUILDING',             // See status options below
  icon: 'code',                   // Material Symbols icon name
  size: 'medium',                 // Card size (see options below)
  color: 'var(--primary-container)', // Accent color
  role: 'Lead Developer',         // Optional: your role
  uuid: 'PRJ-001',                // Optional: custom ID badge
}
```

### Available Statuses
| Status | Badge Color |
|---|---|
| `BUILDING` | Cyan |
| `DEPLOYED` | Cyan |
| `ONGOING` | Amber |
| `IN_PROGRESS` | Purple |
| `RESEARCH` | Purple |
| `IDEATION` | Neutral |

### Card Sizes
| Size | Grid Span | Min Height |
|---|---|---|
| `small` | 4 columns | 220px |
| `medium` | 4 columns | 260px |
| `large` | 8 columns | 260px |
| `xl` | 8 columns | 340px |

### Featured Work

The `featuredWork` array controls which projects appear on the home page:

```js
featuredWork: ['project-id-1', 'project-id-2', 'project-id-3']
```

These IDs must match the `id` field in your projects array.

---

## Tech Stack

The `stack` section has multiple sub-sections:

### Languages
```js
languages: [
  { name: 'Python', icon: 'code' },
  { name: 'JavaScript', icon: 'javascript' },
]
```

### Domains
```js
domains: [
  { label: 'Frontend', value: 'React / Vue' },
  { label: 'Backend', value: 'Node.js / Django' },
]
```

### Bot Skills
```js
bots: [
  { name: 'Discord API', detail: 'Slash Commands, Buttons', icon: 'forum' },
]
```

### Dev Tools
```js
devTools: [
  { name: 'VS Code', icon: 'terminal' },
  { name: 'Docker', icon: 'deployed_code' },
]
```

### Infrastructure
```js
infra: [
  { name: 'AWS', icon: 'cloud' },
  { name: 'Cloudflare', icon: 'cloud_done' },
]
```

### Currently Learning
```js
learning: [
  { accent: 'Category', label: 'What you are learning', color: 'primary' },
  // color options: 'primary', 'secondary', 'amber'
]
```

---

## Timeline

The `journey` array powers the Journey page:

```js
{
  year: '2023 — PRESENT',           // Time period
  era: 'Current Focus',             // Short label
  title: 'Full-Stack Development',  // Card heading
  description: 'What you did.',     // Paragraph text
  tags: ['React', 'Node.js'],       // Skill tags
  icon: 'code',                     // Material icon
  borderColor: 'var(--primary-container)', // Card border color
  nodeGlow: 'rgba(0, 242, 255, 0.40)',     // Timeline node glow
  side: 'left',                     // Display side (alternates)
  isPulsing: true,                  // Optional: animated pulse effect
}
```

### Available Colors for Timeline
| Variable | Color |
|---|---|
| `var(--primary-container)` | Cyan (#00f2ff) |
| `var(--secondary-container)` | Purple (#7701d0) |
| `var(--tertiary-fixed)` | Amber (#ffe173) |

---

## Social Links

```js
social: [
  { id: 'github', label: 'GitHub', icon: 'code', href: 'https://github.com/you' },
  { id: 'discord', label: 'Discord', icon: 'forum', href: 'https://discord.gg/your-server' },
  // Set href to '#' for platforms you haven't set up
]
```

The Social page also has hardcoded featured cards (GitHub, Discord, LinkedIn, Instagram) in `src/pages/social.html`. To customize those large cards, edit the HTML directly.

---

## Images

### Profile Picture
- Replace `config/images/pfp.png`
- Recommended: square image, at least 400×400px
- PNG format with transparency works best

### Social Card Backgrounds
- Located in `config/images/social/`
- Used as background images on the large social cards
- Recommended: 1200×800px, dark or moody aesthetics work best

### Adding New Images
1. Place images in `config/images/`
2. Reference them in `portfolio.config.js` or page HTML:
```html
<img src="/config/images/my-image.png" alt="Description">
```

---

## Colors & Theme

Edit `src/css/variables.css` to change the color palette:

```css
:root {
  /* Primary Colors */
  --primary-container: #00f2ff;    /* Main cyan accent */
  --secondary-container: #7701d0;  /* Purple accent */
  --tertiary-fixed: #ffe173;       /* Amber accent */

  /* Backgrounds */
  --surface-dim: #131313;          /* Page background */
  --surface-low: #1b1b1b;          /* Card backgrounds */

  /* Text */
  --on-surface: #e5e2e1;           /* Primary text */
  --on-surface-variant: #b9cacb;   /* Secondary text */
}
```

### Quick Theme Presets

**Blue Theme:**
```css
--primary-container: #4a9eff;
--secondary-container: #0052cc;
```

**Green Theme:**
```css
--primary-container: #00ff88;
--secondary-container: #008855;
```

**Red/Pink Theme:**
```css
--primary-container: #ff4a6a;
--secondary-container: #cc0033;
```

---

## Typography

The portfolio uses two Google Fonts, loaded in `index.html`:

| Font | Usage |
|---|---|
| **Space Grotesk** | Headlines, labels, navigation |
| **Manrope** | Body text, descriptions |

To change fonts:

1. Update the Google Fonts import in `index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=Your+Font:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

2. Update the CSS variables in `src/css/variables.css`:
```css
--font-headline: 'Your Font', sans-serif;
--font-body: 'Your Font', sans-serif;
```

---

## Pages

### Removing a Page

1. Remove the entry from `navLinks` in `config/portfolio.config.js`
2. Remove the corresponding partial from `src/pages/`
3. Remove the page from `pageParts` array in `src/js/loader.js`
4. Remove the page from `validPages` array in `src/js/router.js`

### Adding a New Page

1. Create a new HTML file in `src/pages/`:
```html
<section id="page-mypage" class="page-section">
  <div class="section-lg">
    <div class="container">
      <h1 class="display-lg">My Page</h1>
      <!-- Your content -->
    </div>
  </div>
</section>
```

2. Add it to `pageParts` in `src/js/loader.js`:
```js
const pageParts = [
  // ...existing pages...
  '/src/pages/mypage.html',
];
```

3. Add it to `navLinks` in `config/portfolio.config.js`:
```js
{ id: 'mypage', label: 'My Page', icon: 'star' },
```

4. Add it to `validPages` in `src/js/router.js`:
```js
const validPages = ['home', ..., 'mypage'];
```

---

## Boot Sequence

Customize the terminal-style boot animation:

```js
bootLog: [
  { text: 'Initializing Systems', status: 'OK', delay: 300 },
  { text: 'Loading Data', status: 'PROC...', delay: 900, isActive: true },
  { text: 'Syncing', status: 'WAIT', delay: 1500 },
  { text: 'Ready', status: 'QUEUED', delay: 2100 },
],
```

- `text` — message displayed in the terminal
- `status` — status indicator (OK, PROC..., WAIT, QUEUED, etc.)
- `delay` — milliseconds before this line appears
- `isActive` — shows a pulsing indicator

---

## Feature Flags

```js
features: {
  showLabNotes: false,  // Toggle lab notes section on the Lab page
}
```

---

## Icons Reference

This portfolio uses [Material Symbols](https://fonts.google.com/icons?icon.set=Material+Symbols). Browse the full icon library to find icons for your projects, stack, and navigation.

Common icons used:
| Icon Name | Usage |
|---|---|
| `code` | Programming, GitHub |
| `terminal` | CLI, dev tools |
| `cloud` | Cloud platforms |
| `database` | Data, databases |
| `forum` | Communication, Discord |
| `rocket_launch` | Launch, deploy |
| `science` | Lab, experiments |
| `layers` | Stack, tech |
| `timeline` | Journey, history |
| `hub` | Social, connections |
