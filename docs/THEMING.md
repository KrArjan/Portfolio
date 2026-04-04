# Theming Guide

The portfolio's design is centered around a modern, dark-themed system. All design tokens (colors, fonts, radii, etc.) are managed in `src/css/variables.css`.

## Core Variables

Modify these values to change the mood of the entire site.

```css
:root {
  /* Primary Tints (Accents) */
  --primary-container: #00f2ff;    /* Cyan accent */
  --secondary-container: #7701d0;  /* Purple accent */
  --tertiary-fixed: #ffe173;       /* Amber accent */

  /* Backgrounds */
  --surface-dim: #131313;          /* Main dark background */
  --surface-low: #1b1b1b;          /* Card/Section background */
  --surface-highest: #333232;      /* Elevated component background */

  /* Surface/Text */
  --on-surface: #e5e2e1;           /* Main body text */
  --on-surface-variant: #b9cacb;   /* Secondary/Dimmed text */
  --outline-variant: #444444;      /* Border color */
}
```

---

## Typography

The portfolio uses two Google Fonts by default:

- **Space Grotesk** (`--font-headline`): Used for navigation, headings, and labels.
- **Manrope** (`--font-body`): Used for body text and descriptions.

### Changing Fonts
1. Open `index.html`.
2. Update the Google Fonts link with your desired typeface.
3. Update the font variables in `src/css/variables.css`:
```css
--font-headline: 'Your Font Name', sans-serif;
--font-body: 'Your Font Name', sans-serif;
```

---

## Border Radii

You can globalize the corner rounding for all cards and buttons.

```css
--radius-xs: 4px;
--radius-sm: 8px;
--radius-md: 12px;
--radius-lg: 16px;
--radius-xl: 20px;
```

---

## Quick Design Presets

### Midnight Blue
```css
--primary-container: #4a9eff;
--secondary-container: #0052cc;
--surface-dim: #050a14;
```

### Emerald Cyber
```css
--primary-container: #00ff88;
--secondary-container: #008855;
--surface-dim: #05140a;
```

### Crimson Dark
```css
--primary-container: #ff4a6a;
--secondary-container: #cc0033;
--surface-dim: #140505;
```

---

## Next Steps
- **[Configuration](CONFIGURATION.md)** — Customize your projects and data.
- **[Backend](BACKEND.md)** — Set up the contact form backend.
- **[Architecture](ARCHITECTURE.md)** — Learn how the CSS layers are structured.
