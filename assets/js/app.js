/* ============================================================
   app.js — Main Entry Point
   Bootstraps boot sequence, renderer, router, and UI.
   loader.js guarantees the full DOM is assembled before this runs.
   ============================================================ */

'use strict';

(function () {

  /* 1. Render all dynamic content from data */
  Renderer.init();

  /* 2. Initialize boot sequence; once dismissed — init routing & UI */
  Boot.init(() => {
    Router.init();
    UI.init();

    /* Expose navTo globally for inline onclick attributes */
    window.navTo = (page) => Router.navTo(page);
  });

  /* 3. Manual Dismiss: signal that all assets are loaded and systems ready */
  Boot.dismiss();

})();
