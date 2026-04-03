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

  const totalItems = (chromeParts.length - 1) + pageParts.length + afterMainParts.length + appScripts.length;
  let loadedItems = 0;
  window.__bootProgress = 0;

  function incProgress() {
    loadedItems++;
    window.__bootProgress = Math.min((loadedItems / totalItems) * 100, 100);
  }

  // ─── Boot Animation Engine (Inlined for instant start) ─────────
  let currentProgress = 0;
  const CHASE_SPEED = 0.08;
  const MIN_DURATION = 1500;
  let startTime = performance.now();

  function updateStatus(progress) {
    const rows = document.querySelectorAll('.boot-status-row');
    if (!rows.length) return;
    rows.forEach(r => r.classList.remove('boot-status-row--active', 'anim-pulse'));
    
    let activeIdx = 0;
    if (progress > 80) activeIdx = 2;
    else if (progress > 40) activeIdx = 1;

    const row = rows[activeIdx];
    if (row) row.classList.add('boot-status-row--active', 'anim-pulse');
  }

  function startAnimation() {
    const bar = document.getElementById('boot-bar');
    const label = document.getElementById('boot-pct-label');
    
    function frame() {
      const target = window.__bootProgress || 0;
      currentProgress += (target - currentProgress) * CHASE_SPEED;

      if (bar) bar.style.width = currentProgress.toFixed(1) + '%';
      if (label) label.textContent = Math.round(currentProgress) + '%';
      updateStatus(currentProgress);

      const elapsed = performance.now() - startTime;
      if (target >= 100 && currentProgress >= 99.9 && elapsed >= MIN_DURATION) {
        if (bar) bar.style.width = '100%';
        if (label) label.textContent = '100%';
        dismissBoot();
      } else {
        requestAnimationFrame(frame);
      }
    }
    requestAnimationFrame(frame);
  }

  function dismissBoot() {
    const boot = document.getElementById('boot-screen');
    if (!boot) return;
    boot.style.opacity = '0';
    boot.style.pointerEvents = 'none';
    setTimeout(() => {
      boot.style.display = 'none';
      ['main-nav', 'main-content', 'main-footer', 'sidebar-right'].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
          el.style.removeProperty('display');
          el.classList.add('anim-fade-in');
        }
      });
    }, 600);
  }

  // Helpers
  async function fetchHtml(url) {
    const res = await fetch(url);
    return res.text();
  }

  function parseFragment(html) {
    const tpl = document.createElement('template');
    tpl.innerHTML = html;
    return tpl.content;
  }

  function loadScript(src) {
    return new Promise((resolve) => {
      const s = document.createElement('script');
      s.src = src;
      s.onload = () => { incProgress(); resolve(); };
      document.body.appendChild(s);
    });
  }

  const placeholder = document.getElementById('partials-root');

  // STEP 0 — Priority: Boot Screen
  try {
    const bootHtml = await fetchHtml('/pages/boot.html');
    placeholder.before(parseFragment(bootHtml));
    // START ANIMATION IMMEDIATELY
    startAnimation();
  } catch (err) { console.error(err); }

  // STEP 1 — Shell
  for (const url of chromeParts) {
    if (url === '/pages/boot.html') continue;
    const html = await fetchHtml(url);
    placeholder.before(parseFragment(html));
    incProgress();
  }

  // STEP 2 — Sections
  const main = document.createElement('main');
  main.id = 'main-content';
  main.className = 'main-content';
  main.style.display = 'none';

  for (const url of pageParts) {
    const html = await fetchHtml(url);
    main.appendChild(parseFragment(html));
    incProgress();
  }
  placeholder.before(main);
  placeholder.remove();

  // STEP 2b — After-main
  for (const url of afterMainParts) {
    const html = await fetchHtml(url);
    document.body.appendChild(parseFragment(html));
    incProgress();
  }

  // STEP 3 — Scripts
  for (const src of appScripts) {
    await loadScript(src);
  }

  window.__bootProgress = 100;
})();
