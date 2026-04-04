# ⚙️ Configuration Reference
**Step 3 of 7** // Personalizing your content

Personalizing your portfolio is done through primary configuration files in the **`config/`** directory. This centralized approach allows you to customize your site without touching any application logic.

---

## 📂 Core Config Files

1.  **`portfolio.config.js`**: The main brain. Controls your bio, projects, tech stack, and feature flags.
2.  **`theme.config.js`**: The visual core. Controls your colors, fonts, and UI rounding.
3.  **`connect.config.js`**: The communication hub. Controls backend notifications and messages.

---

## 👤 Meta Data

The `meta` object in `portfolio.config.js` controls your personal identity and site-wide labels.

```js
meta: {
  name: 'Your Name',           // Shown on the home page
  role: 'Your Role',           // Professional title
  description: 'A short bio.', // SEO meta description
  email: 'you@example.com',    // Used for contact buttons
  github: 'https://...',       // Primary social links
}
```

---

## 🚀 Feature Flags

Control the visibility and behavior of major UI components using the `features` object:

| Flag | Description |
|---|---|
| `showBootScreen` | Toggles the cinematic terminal startup animation. |
| `showStats` | Toggles the numeric cards on the Home page. |
| `showFeaturedWork` | Toggles the featured projects bento on the Home page. |
| `showContactForm` | Toggles the interactive form on the Connect page. |

> [!TIP]
> Setting `showBootScreen: false` will provide an **instant loading experience**, ideal for production environments where speed is prioritized.

---

## 🛠️ Page Management

You can control which pages are visible and accessible in your portfolio using the `navLinks` array. Each entry supports an `enabled` flag. Setting this to `false` will hide the page from all menus and block direct URL access.

```js
navLinks: [
  { id: 'home', label: 'Home', icon: 'home', enabled: true },
  { id: 'lab',  label: 'Lab',  icon: 'science', enabled: false }, // Hides the Lab page
],
```

---

## 🔗 Sequential Navigation

← **Previous:** [Deployment Guide](DEPLOYMENT.md) | **Next:** [Theming & Design](THEMING.md) →
