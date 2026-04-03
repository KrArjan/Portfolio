/**
 * loader.js
 * Fetches all HTML partials from pages/, assembles the full DOM,
 * then loads the application scripts in guaranteed order.
 *
 * ⚠ Requires an HTTP server (e.g. VS Code Live Server) — fetch()
 *   does not work on the file:// protocol.
 */

(async function () {
  const chromeParts     = ['/pages/boot.html', '/pages/shell.html'];
  const pageParts       = ['/pages/home.html', '/pages/profile.html', '/pages/projects.html', '/pages/stack.html', '/pages/journey.html', '/pages/lab.html', '/pages/connect.html', '/pages/social.html', '/pages/404.html'];
  const afterMainParts  = ['/pages/after-main.html'];
  const appScripts      = ['/assets/js/particles-init.js', '/assets/js/data.js', '/assets/js/router.js', '/assets/js/boot.js', '/assets/js/renderer.js', '/assets/js/ui.js', '/assets/js/app.js'];

  // Calculate total steps (excluding boot.html which we load first)
  const totalItems = (chromeParts.length - 1) + pageParts.length + afterMainParts.length + appScripts.length;
  let loadedItems = 0;

  // Initialize global progress (0-100)
  window.__bootProgress = 0;

  function incProgress() {
    loadedItems++;
    window.__bootProgress = Math.min((loadedItems / totalItems) * 100, 100);
  }

  // Helpers
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
      s.onload = () => { incProgress(); resolve(); };
      s.onerror = () => reject(new Error(`Failed to load: ${src}`));
      document.body.appendChild(s);
    });
  }

  const placeholder = document.getElementById('partials-root');

  // STEP 0 — Priority: Load Boot Screen First
  try {
    const bootHtml = await fetchHtml('/pages/boot.html');
    placeholder.before(parseFragment(bootHtml));
  } catch (err) {
    console.error('[loader] boot screen failed:', err);
  }

  // STEP 1 — Load Other Chrome Partials (Shell)
  for (const url of chromeParts) {
    if (url === '/pages/boot.html') continue;
    try {
      const html = await fetchHtml(url);
      placeholder.before(parseFragment(html));
      incProgress();
    } catch (err) {
      console.error('[loader] chrome partial failed:', url, err);
    }
  }

  // STEP 2 — Build <main>
  const main = document.createElement('main');
  main.id = 'main-content';
  main.className = 'main-content';
  main.style.display = 'none';

  for (const url of pageParts) {
    try {
      const html = await fetchHtml(url);
      main.appendChild(parseFragment(html));
      incProgress();
    } catch (err) {
      console.error('[loader] page partial failed:', url, err);
    }
  }

  placeholder.before(main);
  placeholder.remove();

  // STEP 2b — After-main
  for (const url of afterMainParts) {
    try {
      const html = await fetchHtml(url);
      document.body.appendChild(parseFragment(html));
      incProgress();
    } catch (err) {
      console.error('[loader] after-main partial failed:', url, err);
    }
  }

  // STEP 3 — Scripts
  for (const src of appScripts) {
    try {
      await loadScript(src);
    } catch (err) {
      console.error('[loader] script failed:', src, err);
    }
  }

  // Signal completion (ensure it reaches 100 for rounding)
  window.__bootProgress = 100;
})();
