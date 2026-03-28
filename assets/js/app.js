/* ============================================================
   app.js — Main Entry Point
   Bootstraps boot sequence, renderer, router, and UI.
   loader.js guarantees the full DOM is assembled before this runs.
   ============================================================ */

'use strict';

(function () {

  /* 1. Render all dynamic content from data */
  Renderer.init();

  /* 2. Start boot screen animation; on complete — init routing & UI */
  Boot.init(() => {
    Router.init();
    UI.init();

    /* Expose navTo globally for inline onclick attributes */
    window.navTo = (page) => Router.navTo(page);
  });

})();
