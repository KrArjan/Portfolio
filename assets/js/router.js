/* ============================================================
   router.js — SPA Navigation & Page State Management
   ============================================================ */

'use strict';

const Router = (() => {

  let currentPage = 'home';
  let onChangeCallbacks = [];

  /* ---- Public: Navigate to a page ---- */
  function navTo(page) {
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

    // Scroll top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // URL update (no hash)
    const newPath = page === 'home' ? '/' : '/' + page;
    history.pushState({ page }, '', newPath);

    const prev = currentPage;
    currentPage = page;

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
    const validPages = ['home','profile','projects','stack','journey','lab','connect','404'];
    const startPage = validPages.includes(path) ? path : (path ? '404' : 'home');

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
