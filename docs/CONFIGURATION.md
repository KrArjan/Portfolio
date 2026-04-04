# Configuration Reference

Personalizing your portfolio is done through two primary configuration files in the **`config/`** directory. This centralized approach allows you to customize your site without touching any application logic.
 
 - **`portfolio.config.js`**: Controls the frontend content, bio, projects, and tech stack.
 - **`connect.config.js`**: Controls the backend communication settings and notification messages.

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

## Backend Communication (`connect.config.js`)

This file controls how the **Cloudflare Worker** handles incoming contact form submissions.

### Channel Toggles
Enable or disable notification methods globally:

```js
channels: {
  discord_webhook: true,    // Send to your Discord Webhook URL(s)
  discord_dm: true,         // Send DM via Bot Token to User ID(s)
  emailjs: true,            // Send via EmailJS REST API
},
```

### Notification Personalization
Customize the look and content of your notifications.

- **`username` / `avatar_url`**: The identity shown in the Discord message header.
- **`embed`**: Controls the design of the Rich Embed (title, color, footer).
- **Placeholders**: Use `{{name}}`, `{{email}}`, and `{{subject}}` in templates.

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

> [!NOTE]
> Setting `showBootScreen: false` will provide an **instant loading experience**, ideal for production environments where speed is prioritized.

---

## Next Steps
- **[Theming](THEMING.md)** — Customize colors and fonts.
- **[Backend](BACKEND.md)** — Configure your contact form.
- **[Architecture](ARCHITECTURE.md)** — Understand the technical internals.
