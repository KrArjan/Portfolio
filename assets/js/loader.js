/**
 * loader.js
 * Fetches all HTML partials from pages/, assembles the full DOM,
 * then loads the application scripts in guaranteed order.
 *
 * ⚠ Requires an HTTP server (e.g. VS Code Live Server) — fetch()
 *   does not work on the file:// protocol.
 */

(async function () {

  /* ── Partials injected directly before <main> ─────────────────── */
  const chromeParts = [
    'pages/boot.html',
    'pages/shell.html',
  ];

  /* ── Page sections placed inside <main> ──────────────────────── */
  const pageParts = [
    'pages/home.html',
    'pages/profile.html',
    'pages/projects.html',
    'pages/stack.html',
    'pages/journey.html',
    'pages/lab.html',
    'pages/connect.html',
    'pages/404.html',
  ];

  /* ── Elements that must come AFTER <main> in the DOM ─────────── */
  const afterMainParts = [
    'pages/after-main.html',   // footer + toast
  ];

  /* ── App scripts loaded in strict order after DOM is ready ───── */
  const appScripts = [
    'assets/js/particles-init.js', // start particles immediately
    'assets/js/data.js',
    'assets/js/router.js',
    'assets/js/boot.js',
    'assets/js/renderer.js',
    'assets/js/ui.js',
    'assets/js/app.js',
  ];

  // ────────────────────────────────────────────────────────────────
  // Helpers
  // ────────────────────────────────────────────────────────────────

  async function fetchHtml(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status} — ${url}`);
    return res.text();
  }

  function parseFragment(html) {
    const tpl = document.createElement('template');
    tpl.innerHTML = html;
    return tpl.content;
  }

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = src;
      s.onload  = resolve;
      s.onerror = () => reject(new Error(`Failed to load: ${src}`));
      document.body.appendChild(s);
    });
  }

  // ────────────────────────────────────────────────────────────────
  // Step 1 — Inject chrome partials (boot screen + shell)
  // ────────────────────────────────────────────────────────────────
  const placeholder = document.getElementById('partials-root');

  for (const url of chromeParts) {
    try {
      const html = await fetchHtml(url);
      placeholder.before(parseFragment(html));
    } catch (err) {
      console.error('[loader] chrome partial failed:', url, err);
    }
  }

  // ────────────────────────────────────────────────────────────────
  // Step 2 — Build <main> and inject page sections
  // ────────────────────────────────────────────────────────────────
  const main = document.createElement('main');
  main.id        = 'main-content';
  main.className = 'main-content';
  main.style.display = 'none';

  for (const url of pageParts) {
    try {
      const html = await fetchHtml(url);
      main.appendChild(parseFragment(html));
    } catch (err) {
      console.error('[loader] page partial failed:', url, err);
    }
  }

  placeholder.before(main);
  placeholder.remove();

  // ────────────────────────────────────────────────────────────────
  // Step 2b — Inject after-main partials (footer, toast) after <main>
  // ────────────────────────────────────────────────────────────────
  for (const url of afterMainParts) {
    try {
      const html = await fetchHtml(url);
      document.body.appendChild(parseFragment(html));
    } catch (err) {
      console.error('[loader] after-main partial failed:', url, err);
    }
  }

  // ────────────────────────────────────────────────────────────────
  // Step 3 — Load app scripts sequentially (each waits for previous)
  // ────────────────────────────────────────────────────────────────
  for (const src of appScripts) {
    try {
      await loadScript(src);
    } catch (err) {
      console.error('[loader] script failed:', src, err);
    }
  }

})();
