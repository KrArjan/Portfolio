# 🎨 Theming & Design
**Step 4 of 7** // Styling your visual identity

The portfolio's design system is centralized in **`config/theme.config.js`**. This allows you to customize the entire visual identity—colors, fonts, and UI style—without editing any CSS files.

---

## 🎨 Theme Configuration

All design tokens are managed via the `THEME_CONFIG` object in your theme config file.

### 1. Colors
You can customize the surfaces (backgrounds) and the three main accent colors.

```js
colors: {
  surface_dim:  "#131313",  // Main background
  primary:      "#00f2ff",  // Your main accent color
  secondary:    "#dcb8ff",  // Secondary brand color
  tertiary:     "#fff6e4",  // Third brand color
}
```

> [!TIP]
> When you update the **Primary** and **Secondary** colors, the system automatically regenerates all site-wide gradients and glow effects to match your new palette.

### 2. Typography
The portfolio uses Google Fonts. You can easily override the font families:

```js
fonts: {
  headline: "'Space Grotesk', sans-serif",
  body:     "'Manrope', sans-serif",
}
```

---

## 🌈 Design Presets

Copy/paste these values into your `config/theme.config.js` to instantly change the mood:

### 🌲 Forest (Emerald & Gold)
- **Primary**: `#10b981` (Emerald)
- **Secondary**: `#059669`
- **Surface**: `#0b1410`

### 🌅 Sunset (Orange & Pink)
- **Primary**: `#f97316` (Orange)
- **Secondary**: `#db2777`
- **Surface**: `#140b0b`

### 🌌 Midnight (Deep Blue & Silver)
- **Primary**: `#3b82f6` (Blue)
- **Secondary**: `#1d4ed8`
- **Surface**: `#050a14`

---

## 🔧 Advance Customizations (CSS)

The theme configuration works by overriding variables in **`src/css/variables.css`**. If you need granular control over animations or complex layouts, you can modify the core variables there.

---

## 🔗 Sequential Navigation

← **Previous:** [Configuration Reference](CONFIGURATION.md) | **Next:** [Backend & Security](BACKEND.md) →
