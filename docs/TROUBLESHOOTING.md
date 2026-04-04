# Troubleshooting & FAQ

Encountering issues? This guide covers the most common problems and their solutions.

## Common Issues & Solutions

| Issue | Solution |
|---|---|
| **Blank page** | You are likely using the `file://` protocol. Start an HTTP server (see [Getting Started](GETTING_STARTED.md)). |
| **404 on refresh** | Your host needs SPA fallback configured. Cloudflare Pages handles this automatically via `wrangler.toml`. |
| **Contact form error** | Ensure all **Secret** environment variables are set correctly in your host's dashboard (see [Backend](BACKEND.md)). |
| **Images not loading** | Check that files are in `config/images/` and the filenames match exactly (case-sensitive). |
| **Styles broken** | Clear your browser cache (`Ctrl + Shift + R`) to ensure you're loading the latest CSS. |
| **Old data showing** | If you've updated `portfolio.config.js`, try a hard reload to bypass any cached scripts. |

---

## FAQ

### 1. Can I use this on GitHub Pages?
**Yes**, but with caveats:
- The contact form will not work, as GitHub Pages is static and does not support Workers.
- You should use hash-based routing (`/#projects`) for deep-linking.

### 2. Why is there a loading screen?
The cinematic boot sequence is designed to show the progress of loading HTML and JS assets. It ensures a smooth experience once the site is revealed. You can disable it by setting `showBootScreen: false` in `portfolio.config.js`.

### 3. How do I change the default colors?
Colors are managed in `src/css/variables.css`. See the **[Theming Guide](THEMING.md)** for a full reference.

### 4. How do I add a new project?
Add a new object to the `projects` array in `config/portfolio.config.js`. See the **[Configuration Reference](CONFIGURATION.md)** for the available fields.

### 5. My Turnstile widget isn't showing up.
Ensure you've added your **Site Key** to `portfolio.config.js` and that your **Secret Key** is correctly configured in your hosting environment.

---

## Still Need Help?
If you're still experiencing issues, reach out at **[support@yourname.com](mailto:support@yourname.com)** or open an issue on your repository.
