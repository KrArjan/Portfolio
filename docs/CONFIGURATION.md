# Configuration Reference

All personal data for your portfolio is stored in **`config/portfolio.config.js`**. This centralized file allows you to customize your site without touching any application logic.

## Meta Data

The `meta` object controls your personal identity and site-wide labels.

```js
meta: {
  name: 'Your Name',           // Your name shown on the home page
  title: 'Your Name',          // Browser tab title
  tagline: 'Your tagline.',    // Main headline on the home page
  role: 'Your Role',           // Professional title
  description: 'A short bio.', // SEO meta description
  version: '2.0.4',            // Portfolio version shown on the badge
  buildRef: 'PRT-X',           // Decorative reference ID
  email: 'you@example.com',    // Used for the Connect page and mailto: links
  github: 'https://github.com/you',
  discord: 'https://discord.gg/invite',
  site: 'https://your-site.com',
  buildSince: '2023',          // Starting year displayed in stats
}
```

---

## Projects

Each project in the `projects` array is displayed on the Projects page.

```js
{
  id: 'my-project',               // Unique slug (lowercase with dashes)
  title: 'My Project',            // Project name
  description: 'What it does.',   // 1-2 sentence overview
  category: ['web', 'automation'],// Used for category filtering
  tags: ['REACT', 'NODE.JS'],     // Tech labels for the project card
  status: 'DEPLOYED',             // See Status Options below
  icon: 'code',                   // Material Symbols icon name
  size: 'medium',                 // Card size: small, medium, large, or xl
  color: 'var(--primary-container)', // Dominant accent color
  role: 'Lead Developer',         // Your role within the project (optional)
  uuid: 'PRJ-101',                // Custom project reference code (optional)
}
```

### Featured Work
To highlight specific projects on the Home page, list their **`id`** strings in the `featuredWork` array:
```js
featuredWork: ['id-1', 'id-2', 'id-3']
```

---

## Tech Stack

The `stack` section is divided into multiple categories:

- **Languages**: Primary programming languages.
- **Domains**: Expertise areas (e.g., Frontend, Cloud).
- **Bot Skills**: Specific skills (e.g., Discord API, Webhooks).
- **Dev Tools**: Essential tools (e.g., VS Code, Docker).
- **Infrastructure**: Cloud and hosting providers.
- **Learning**: Ongoing learning goals.

---

## Feature Flags

Control the visibility and initialization of major UI components using the `features` object:

| Flag | Description |
|---|---|
| `showBootScreen` | True/False. Toggles the cinematic startup animation. |
| `showStats` | True/False. Toggles the numeric cards on the Home page. |
| `showFeaturedWork` | True/False. Toggles the featured projects bento on the Home page. |
| `showLabNotes` | True/False. Toggles terminal-style log entries on the Lab page. |
| `showProjectsFilter` | True/False. Toggles the filtering system on the Projects page. |
| `showJourneyTimeline` | True/False. Toggles the journey entries on the Journey page. |
| `showContactForm` | True/False. Toggles the interactive form on the Connect page. |

---

## Particles

Configure the global background animation via the `particles` object:

```js
particles: {
  enable: true,             // Master toggle for the animation
  colors: ['#00f2ff', '#7701d0'], // Array of hex colors for dots and links
  number: 70,               // Total particle count
  density: 800,             // Lower = more dense
  speed: 0.45,              // Movement speed
  interactivity: {
    hoverMode: 'grab',      // options: grab, bubble, repulse, none
    clickMode: 'push',      // options: push, remove, repulse, none
  }
}
```

---

## Contact & Backend

Personalize the behavior and branding of your contact form and Discord notifications:

```js
contact: {
  // UI Messages
  successMessage: "Custom success text",
  errorMessage: "Custom error text",

  // Discord Branding
  discordUsername: "My Portfolio Bot",
  discordAvatarUrl: "https://example.com/avatar.png",
  
  // Discord Embed Styling
  embedTitle: "New Message",
  embedColor: 0x00FF00, // Hex color as number (0xRRGGBB)
  embedFooter: "Site Terminal",

  // Feature Toggles (Requires Secrets to be set)
  enableDiscordWebhook: true,
  enableDiscordDM: true,
  enableEmailJS: true,
}
---

## Design & Theme (`design`)

Control the visual identity and accent colors of your portfolio at runtime.

| Flag | Description |
|---|---|
| `colors.primary` | Hex code for the primary accent (e.g., Cyan). |
| `colors.secondary` | Hex code for the secondary accent (e.g., Purple). |
| `colors.tertiary` | Hex code for the tertiary accent (e.g., Amber). |
| `colors.surface` | Hex code for the main background color. |
| `glassOpacity` | Decimal (0.01 to 0.1) for card transparency levels. |

## Performance & Timing (`performance`)

Fine-tune the "feel" and animation speeds of your portfolio.

| Flag | Description |
|---|---|
| `bootMinDuration` | Minimum milliseconds to display the cinematic boot screen. |
| `scrollOffset` | Pixel adjustment for the stopping point when navigating to sections. |
| `pageTransitionSpeed`| Duration of the fade-in-up animations for page contents. |

> [!TIP]
> Use a higher `scrollOffset` (e.g., `80`) if you have a fixed header to prevent it from overlapping with your content.

---

## Next Steps
- **[Theming](THEMING.md)** — Customize colors and fonts.
- **[Backend](BACKEND.md)** — Configure your contact form.
- **[Architecture](ARCHITECTURE.md)** — Understand the technical internals.
