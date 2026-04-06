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
    '/src/pages/shell.html',
  ];

  /* ── Page sections placed inside <main> ──────────────────────── */
  const pageParts = [
    '/src/pages/home.html',
    '/src/pages/profile.html',
    '/src/pages/projects.html',
    '/src/pages/stack.html',
    '/src/pages/journey.html',
    '/src/pages/lab.html',
    '/src/pages/connect.html',
    '/src/pages/social.html',
    '/src/pages/404.html',
  ];

  /* ── Elements that must come AFTER <main> in the DOM ─────────── */
  const afterMainParts = [
    '/src/pages/after-main.html',   // footer + toast
  ];

  /* ── App scripts loaded in strict order after DOM is ready ───── */
  const appScripts = [
    '/src/js/particles-init.js', // start particles immediately
    '/config/portfolio.config.js',
    '/src/js/router.js',
    '/src/js/boot.js',
    '/src/js/renderer.js',
    '/src/js/ui.js',
    '/src/js/app.js',
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
      s.onload = resolve;
      s.onerror = () => reject(new Error(`Failed to load: ${src}`));
      document.body.appendChild(s);
    });
  }

  // ────────────────────────────────────────────────────────────────
  // Progress Management (Smooth Interpolation)
  // ────────────────────────────────────────────────────────────────
  const totalAssets = chromeParts.length + pageParts.length + afterMainParts.length + appScripts.length;
  let assetsLoaded = 0;
  let targetProgress = 0;
  let currentProgress = 0;

  function startProgressLoop() {
    const bar = document.getElementById('boot-bar');
    const label = document.getElementById('boot-pct-label');
    if (!bar && !label) return;

    function animate() {
      // Smoothly move currentProgress toward targetProgress (lerp)
      const diff = targetProgress - currentProgress;
      if (diff > 0.1) {
        currentProgress += diff * 0.25; // Easing speed
      } else {
        currentProgress = targetProgress;
      }

      const rounded = Math.ceil(currentProgress);
      if (bar) bar.style.width = `${rounded}%`;
      if (label) label.textContent = `${rounded}%`;

      if (currentProgress < 100) {
        requestAnimationFrame(animate);
      }
    }
    requestAnimationFrame(animate);
  }

  function updateTarget() {
    targetProgress = Math.min((assetsLoaded / totalAssets) * 100, 100);
  }

  // Helper to fetch and track progress
  async function fetchWithProgress(url) {
    try {
      const html = await fetchHtml(url);
      assetsLoaded++;
      updateTarget();
      return html;
    } catch (err) {
      console.error('[loader] failed:', url, err);
      assetsLoaded++; // keep progress moving even on fail
      updateTarget();
      return '';
    }
  }

  // ────────────────────────────────────────────────────────────────
  // Step 1 — Inject chrome partials (shell)
  // ────────────────────────────────────────────────────────────────
  const placeholder = document.getElementById('partials-root');

  // Start progress loop immediately since boot screen is already in DOM
  startProgressLoop();

  // Fetch remaining chrome, page, and footer partials in parallel
  const [chromeRests, pageContents, footerContents] = await Promise.all([
    Promise.all(chromeParts.map(fetchWithProgress)),
    Promise.all(pageParts.map(fetchWithProgress)),
    Promise.all(afterMainParts.map(fetchWithProgress))
  ]);

  // Inject Chrome
  chromeRests.forEach(html => placeholder.before(parseFragment(html)));

  // Inject Pages into <main>
  const main = document.createElement('main');
  main.id = 'main-content';
  main.className = 'main-content';
  main.style.display = 'none';
  pageContents.forEach(html => main.appendChild(parseFragment(html)));

  placeholder.before(main);
  placeholder.remove();

  // Inject After-Main
  footerContents.forEach(html => document.body.appendChild(parseFragment(html)));

  // ────────────────────────────────────────────────────────────────
  // Step 3 — Load app scripts sequentially (each waits for previous)
  // ────────────────────────────────────────────────────────────────
  for (const src of appScripts) {
    try {
      await loadScript(src);
    } catch (err) {
      console.error('[loader] script failed:', src, err);
    } finally {
      assetsLoaded++;
      updateTarget();
    }
  }

})();
