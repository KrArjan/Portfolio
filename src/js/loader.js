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
    !document.getElementById('main-nav') && '/src/pages/shell',
  ].filter(Boolean);

  /* ── Page sections placed inside <main> ──────────────────────── */
  const pageParts = [
    !document.getElementById('page-home') && '/src/pages/home',
    '/src/pages/profile',
    '/src/pages/projects',
    '/src/pages/stack',
    '/src/pages/journey',
    '/src/pages/lab',
    '/src/pages/connect',
    '/src/pages/social',
    '/src/pages/404',
  ].filter(Boolean);

  /* ── Elements that must come AFTER <main> in the DOM ─────────── */
  const afterMainParts = [
    !document.getElementById('main-footer') && '/src/pages/after-main',
  ].filter(Boolean);

  /* ── App scripts loaded in strict order after DOM is ready ───── */
  const appScripts = [
    '/src/js/particles-init.js',
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
  // Progress Management
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
      const diff = targetProgress - currentProgress;
      if (diff > 0.1) {
        currentProgress += diff * 0.25;
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

  async function fetchWithProgress(url) {
    try {
      const html = await fetchHtml(url);
      assetsLoaded++;
      updateTarget();
      return html;
    } catch (err) {
      console.error('[loader] failed:', url, err);
      assetsLoaded++; 
      updateTarget();
      return '';
    }
  }

  // ────────────────────────────────────────────────────────────────
  // Step 1 — Injection
  // ────────────────────────────────────────────────────────────────
  const placeholder = document.getElementById('partials-root');
  let main = document.getElementById('main-content');
  
  // If no main-content exists, we create one (fallback for other pages/dev)
  if (!main) {
    main = document.createElement('main');
    main.id = 'main-content';
    main.className = 'main-content';
    main.style.display = 'none';
    if (placeholder) placeholder.before(main);
    else document.body.appendChild(main);
  }

  startProgressLoop();

  const [chromeRests, pageContents, footerContents] = await Promise.all([
    Promise.all(chromeParts.map(fetchWithProgress)),
    Promise.all(pageParts.map(fetchWithProgress)),
    Promise.all(afterMainParts.map(fetchWithProgress))
  ]);

  // Inject Chrome (if any fetched)
  chromeRests.forEach(html => {
    if (main) main.before(parseFragment(html));
    else if (placeholder) placeholder.before(parseFragment(html));
  });

  // Inject Pages into <main>
  pageContents.forEach(html => main.appendChild(parseFragment(html)));

  // Inject After-Main
  footerContents.forEach(html => document.body.appendChild(parseFragment(html)));

  // Cleanup placeholder if it exists
  if (placeholder) placeholder.remove();

  // ────────────────────────────────────────────────────────────────
  // Step 3 — Scripts
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
