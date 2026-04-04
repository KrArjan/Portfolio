# Architecture & Tech Stack

This project is a high-performance, **zero-dependency Single Page Application (SPA)** built with pure HTML, CSS, and Vanilla JavaScript. This guide explains how the system works under the hood.

## Core Philosophy

- **No Frameworks**: We avoid the overhead of React, Vue, or Angular.
- **No Build Step**: No `npm install`, `vite`, or `webpack` is required.
- **Component-Based**: We use HTML partials to keep the code modular.
- **Fast First Initial Load**: We optimize the boot sequence to render content as quickly as possible.

---

## 1. Loader Logic (`loader.js`)

The `loader.js` script is the first thing that runs. Its job is to:
1.  **Inject Chomes**: Load and inject the `boot.html` and `shell.html`.
2.  **Fetch Partials**: Fetch all `.html` files in `/src/pages/` in parallel.
3.  **Assemble the DOM**: Inject page contents into a single `#main-content` container.
4.  **Load Scripts**: Sequentially load the application logic (Router, Renderer, UI).

---

## 2. Routing (`router.js`)

The project uses **hash-based routing** (`#home`, `#projects`) to handle page transitions.
- **`Router.init()`**: Listens for `hashchange` events.
- **`Router.navTo(page)`**: The central function for navigating. It updates the URL hash and reveals the target section.
- **Animations**: Transition logic is handled in CSS, triggered by visibility classes managed by the Router.

---

## 3. Rendering (`renderer.js`)

The `renderer.js` module is the "Engine" of your portfolio. It takes data from `portfolio.config.js` and injects it into the HTML partials.
- **Dynamic Content**: Sections like Projects, Stack, and Journey are entirely data-driven.
- **Feature Flags**: The Renderer checks `SITE_DATA.features` to intelligently show or hide sections before they are displayed.
- **Context Injection**: Updates site-wide fields like your name, role, and browser title.

---

## 4. UI Interaction (`ui.js`)

The `ui.js` module handles all user-facing interactions:
- **Navigation**: Mobile bottom sheet nav and active link highlighting.
- **Filtering**: Project category filtering logic.
- **Form Submission**: Handling the contact form submission and communicating with the backend.
- **Micro-Animations**: Hover effects, scroll reveals, and progress bars.

---

## 5. CSS Architecture

Styles are organized into a layered system to ensure maintainability:
1.  `variables.css`: Global design tokens.
2.  `base.css`: Resets and typography.
3.  `animations.css`: All @keyframes and reveal transitions.
4.  `layout.css`: Grid systems and flexbox utilities.
5.  `components.css`: Reusable UI components (buttons, cards, navbars).
 
 ---
 
 ## 6. Backend Logic (`_worker.js`)
 
 The backend is a Cloudflare Worker that handles the contact form:
 - **Importing Config**: It imports `connect.config.js` to determine enabled channels and message templates.
 - **Payload Formatting**: It uses form data to populate your custom messages using the `formatTemplate` helper.
 - **Transmission**: Dispatches messages to Discord (Webhook or DM) and EmailJS based on your settings.

---

## Next Steps
- **[Back-end Logic](BACKEND.md)** — Understand how the Contact Form Worker operations.
- **[Configuration](CONFIGURATION.md)** — Master individual field tailoring.
- **[Deployment](DEPLOYMENT.md)** — Finalize your hosting setup.
