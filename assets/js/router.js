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

    // Smooth scroll top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // History API: Clean URLs instead of hashtags
    // "/" for home, "/projects" for others
    const path = page === 'home' ? '/' : '/' + page;
    history.pushState({ page }, '', path);

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

  /* ---- Init: Read pathname or default to home ---- */
  function init() {
    // Determine page from clean URL pathname
    // e.g., "/projects" -> "projects", "/" -> "home"
    let path = window.location.pathname.replace(/^\/|\/$/g, '');
    if (path === 'index.html') path = ''; // handle index.html directly
    
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

    // Handle browser back/forward (pops from history)
    window.addEventListener('popstate', (e) => {
      const path = window.location.pathname.replace(/^\/|\/$/g, '');
      const page = validPages.includes(path) ? path : (path ? '404' : 'home');
      
      // Navigate without pushing new state
      document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
      const target = document.getElementById('page-' + page);
      if (target) target.classList.add('active');
      
      document.querySelectorAll('.nav__link').forEach(link => {
        link.classList.toggle('active', link.dataset.page === page);
      });
      document.querySelectorAll('.bottom-sheet__btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.page === page);
      });
      
      const prev = currentPage;
      currentPage = page;
      onChangeCallbacks.forEach(cb => cb(page, prev));
    });
  }

  return { navTo, getCurrent, onChange, init };
})();
