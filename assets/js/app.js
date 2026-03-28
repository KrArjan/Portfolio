/* ============================================================
   app.js — Main Entry Point
   Bootstraps boot sequence, renderer, router, and UI
   ============================================================ */

'use strict';

(function () {

  /* ---- Wait for DOM ---- */
  document.addEventListener('DOMContentLoaded', () => {

    /* 1. Render all dynamic content from data */
    Renderer.init();

    /* 2. Start boot screen animation; on complete — init routing & UI */
    Boot.init(() => {
      Router.init();
      UI.init();

      /* Expose navTo globally for inline onclick attributes */
      window.navTo = (page) => Router.navTo(page);
    });

  });

})();
