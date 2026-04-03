/**
 * loader.js
 * Fetches all HTML partials from pages/, assembles the full DOM,
 * then loads the application scripts in guaranteed order.
 */

(async function () {
  const chromeParts = ['/pages/boot.html', '/pages/shell.html'];
  const pageParts = [
    '/pages/home.html', '/pages/profile.html', '/pages/projects.html',
    '/pages/stack.html', '/pages/journey.html', '/pages/lab.html',
    '/pages/connect.html', '/pages/social.html', '/pages/404.html'
  ];
  const afterMainParts = ['/pages/after-main.html'];
  const appScripts = [
    '/assets/js/particles-init.js', '/assets/js/data.js', '/assets/js/router.js',
    '/assets/js/boot.js', '/assets/js/renderer.js', '/assets/js/ui.js', '/assets/js/app.js'
  ];

  // 1. Calculate total tasks
  const totalTasks = chromeParts.length + pageParts.length + afterMainParts.length + appScripts.length;
  let completedTasks = 0;

  function updateGlobalProgress() {
    completedTasks++;
    const pct = Math.round((completedTasks / totalTasks) * 100);
    window.BOOT_PROGRESS = pct;

    // Update DOM directly if elements are already injected
    const bar = document.getElementById('boot-bar');
    const label = document.getElementById('boot-pct-label');
    if (bar) bar.style.width = pct + '%';
    if (label) label.textContent = pct + '%';

    // If Boot module is ready, let it know
    if (window.Boot && typeof window.Boot.update === 'function') {
      window.Boot.update(pct);
    }
  }

  // Helpers
  async function fetchHtml(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status} — ${url}`);
    const text = await res.text();
    updateGlobalProgress();
    return text;
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
      s.onload = () => {
        updateGlobalProgress();
        resolve();
      };
      s.onerror = () => reject(new Error(`Failed to load: ${src}`));
      document.body.appendChild(s);
    });
  }

  // Step 1 — Inject chrome partials
  const placeholder = document.getElementById('partials-root');
  for (const url of chromeParts) {
    try {
      const html = await fetchHtml(url);
      placeholder.before(parseFragment(html));
    } catch (err) { console.error('[loader] chrome partial failed:', url, err); }
  }

  // Step 2 — Inject page sections
  const main = document.createElement('main');
  main.id = 'main-content';
  main.className = 'main-content';
  main.style.display = 'none';

  for (const url of pageParts) {
    try {
      const html = await fetchHtml(url);
      main.appendChild(parseFragment(html));
    } catch (err) { console.error('[loader] page partial failed:', url, err); }
  }
  placeholder.before(main);
  placeholder.remove();

  // Step 2b — Inject after-main partials
  for (const url of afterMainParts) {
    try {
      const html = await fetchHtml(url);
      document.body.appendChild(parseFragment(html));
    } catch (err) { console.error('[loader] after-main partial failed:', url, err); }
  }

  // Step 3 — Load scripts sequentially
  for (const src of appScripts) {
    try {
      await loadScript(src);
    } catch (err) { console.error('[loader] script failed:', src, err); }
  }

  // FINAL SAFETY UPDATE
  if (window.Boot && typeof window.Boot.update === 'function') {
    window.Boot.update(100);
  }
})();
