# 🏗️ Technical Architecture
**Step 7 of 7** // Understanding the engine

This project is a high-performance, **zero-dependency Single Page Application (SPA)** built with pure HTML, CSS, and Vanilla JavaScript. This guide explains how the system works under the hood.

---

## 💎 Core Philosophy

- **No Frameworks**: 100% Vanilla JS for maximum speed and small bundle size.
- **Zero Build Step**: No `npm install` or compilation required; edit and refresh.
- **Modular Paritals**: HTML fragments keep the structure clean and maintainable.
- **Custom Router**: A lightweight, hash-based system for instant transitions.

---

## 1. The Boot Sequence (`loader.js`)

The `loader.js` script is the first module triggered. Its primary responsibilities are:
1.  **Injecting Shells**: Immediately displaying `boot.html` and `shell.html`.
2.  **Parallel Fetching**: Fetching all `.html` pages in `/src/pages/` simultaneously.
3.  **DOM Assembly**: Injecting those pages into a central `#main-content` container.
4.  **Module Loading**: Sequentially loading the remaining application scripts.

---

## 2. The Rendering Engine (`renderer.js`)

The `renderer.js` module is the "Heart" of your portfolio. It maps data from your config files to the DOM.

- **Data Mapping**: Injects your bio, projects, and tech stack into the partials.
- **Dynamic Logic**: Implements the `Theme Engine` to apply your custom design tokens.
- **Feature Control**: Respects the `features` flags to toggle UI sections on or off.

---

## 3. Navigation & Routing (`router.js`)

We use **hash-based routing** to simulate a multi-page feel without full reloads.
- **`navTo(page)`**: The central function for switching views. It updates the URL, manages active link states, and handles scrolling.
- **Access Control**: Automatically blocks access to screens disabled in `portfolio.config.js`.

---

## 4. Interaction Layer (`ui.js`)

The `ui.js` module handles all user-facing events:
- **Mobile UI**: Managing the bottom sheet navigation and gestures.
- **Filtering**: Logic for sorting projects by category.
- **Contact Protocol**: Interacting with the backend worker and managing form states.

---

## 🔗 Sequential Navigation

← **Previous:** [FAQ & Error Reference](FAQ_ERRORS.md) | **Home:** [README](../README.md)
