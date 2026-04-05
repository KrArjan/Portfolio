/* ============================================================
   router.js — SPA Navigation & Page State Management
   ============================================================ */

'use strict';

const Router = (() => {

  let currentPage = 'home';
  let onChangeCallbacks = [];

  /* ---- Public: Navigate to a page ---- */
  function navTo(page) {
    // Access Control: Check if page is enabled in config
    const linkConfig = SITE_DATA.navLinks.find(l => l.id === page);
    if (linkConfig && linkConfig.enabled === false) {
      console.warn(`[router] navigation blocked: page '${page}' is disabled.`);
      if (page !== 'home') navTo('home');
      return;
    }

    if (page === currentPage) return;

    // Hide all sections
    document.querySelectorAll('.page-section').forEach(s => {
      s.classList.remove('active');
    });

    // Show target section
    const target = document.getElementById('page-' + page);
    if (!target) return;
    target.classList.add('active');

    // Update nav links
    document.querySelectorAll('.nav__link').forEach(link => {
      link.classList.toggle('active', link.dataset.page === page);
    });

    // Update drawer links
    document.querySelectorAll('.drawer__link').forEach(link => {
      link.classList.toggle('active', link.dataset.page === page);
    });

    // Update bottom-sheet buttons
    document.querySelectorAll('.bottom-sheet__btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.page === page);
    });

    // Scroll top instantly on page change
    window.scrollTo({ top: 0, behavior: 'auto' });

    // URL update (no hash)
    const newPath = page === 'home' ? '/' : '/' + page;
    history.pushState({ page }, '', newPath);

    const prev = currentPage;
    currentPage = page;

    // Update document title
    const siteName = SITE_DATA?.meta?.title || 'KrArjan';
    const pageLabel = SITE_DATA?.navLinks?.find(l => l.id === page)?.label;
    document.title = pageLabel && page !== 'home' ? `${pageLabel} — ${siteName}` : siteName;

    // Callbacks
    onChangeCallbacks.forEach(cb => cb(page, prev));
  }

  /* ---- Public: Get current page ---- */
  function getCurrent() {
    return currentPage;
  }

  /* ---- Public: Register on-change callback ---- */
  function onChange(cb) {
    onChangeCallbacks.push(cb);
  }

  /* ---- Init: Read hash or default to home ---- */
  function init() {
    const path = window.location.pathname.replace(/^\/|\/$/g, '');
    const hash = window.location.hash.replace(/^#\/?/, '');
    // Dynamically build validPages from navLinks config + built-in pages
    const navIds = (SITE_DATA?.navLinks || []).map(l => l.id);
    const validPages = [...new Set([...navIds, '404', 'home'])];
    const resolved = path || hash || '';
    let startPage = validPages.includes(resolved) ? resolved : (resolved ? '404' : 'home');

    // Access Control: Redirect if startPage is disabled
    const linkConfig = SITE_DATA.navLinks.find(l => l.id === startPage);
    if (linkConfig && linkConfig.enabled === false) {
      startPage = 'home';
    }

    // Clean up hash-based URL to proper path (e.g. /#journey → /journey)
    if (!path && hash && validPages.includes(hash)) {
      const cleanPath = hash === 'home' ? '/' : '/' + hash;
      history.replaceState({ page: hash }, '', cleanPath);
    }

    // Set initial active state
    document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
    const initial = document.getElementById('page-' + startPage);
    if (initial) initial.classList.add('active');

    document.querySelectorAll('.nav__link').forEach(l => {
      l.classList.toggle('active', l.dataset.page === startPage);
    });

    document.querySelectorAll('.bottom-sheet__btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.page === startPage);
    });

    currentPage = startPage;

    // Handle browser back/forward
    window.addEventListener('popstate', (e) => {
      if (e.state && e.state.page) navTo(e.state.page);
    });
  }

  return { navTo, getCurrent, onChange, init };
})();
