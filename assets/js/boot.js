/* ============================================================
   boot.js — Boot Screen Animation & Sequence
   Updated for real-time progress-based loading.
   ============================================================ */

'use strict';

const Boot = (() => {

  let onCompleteCallback = null;
  let currentPct = 0;
  let isDismissing = false;

  const bar   = document.getElementById('boot-bar');
  const label = document.getElementById('boot-pct-label');

  /* ---- Handlers for progress updates ---- */
  function update(targetPct) {
    if (isDismissing) return;
    
    // Smoothly animate towards target
    // Note: Since loader.js updates the DOM directly for speed,
    // we use this update() primarily for logic and additional effects.
    currentPct = Math.max(currentPct, targetPct);

    if (currentPct >= 100) {
      currentPct = 100;
      finish();
    }
  }

  function finish() {
    if (isDismissing) return;
    isDismissing = true;
    
    // Ensure bar is 100%
    if (bar) bar.style.width = '100%';
    if (label) label.textContent = '100%';

    // Short cinematic pause at 100%
    setTimeout(dismiss, 400);
  }

  /* ---- Pulse the ring glow on hover ---- */
  function initRingGlow() {
    const wrap = document.querySelector('#boot-screen .boot-ring-wrap');
    const glow = document.querySelector('#boot-screen .boot-ring-glow');
    if (!wrap || !glow) return;
    wrap.addEventListener('mouseenter', () => {
      glow.style.background = 'rgba(0,242,255,0.28)';
    });
    wrap.addEventListener('mouseleave', () => {
      glow.style.background = 'rgba(0,242,255,0.18)';
    });
  }

  /* ---- Dismiss boot screen and reveal the site ---- */
  function dismiss() {
    const bootScreen  = document.getElementById('boot-screen');
    const mainNav     = document.getElementById('main-nav');
    const mainContent = document.getElementById('main-content');
    const mainFooter  = document.getElementById('main-footer');
    const sidebar     = document.getElementById('sidebar-right');

    if (bootScreen) {
      bootScreen.style.opacity       = '0';
      bootScreen.style.pointerEvents = 'none';

      setTimeout(() => {
        bootScreen.style.display = 'none';

        [mainNav, mainContent, mainFooter, sidebar].forEach(el => {
          if (el) {
            el.style.removeProperty('display');
            el.classList.add('anim-fade-in');
          }
        });

        if (onCompleteCallback) onCompleteCallback();
      }, 600);
    }
  }

  /* ---- Public init ---- */
  function init(onComplete) {
    onCompleteCallback = onComplete;

    // 1. Hook up the glow
    initRingGlow();

    // 2. Check for pre-existing progress from loader.js (catch up)
    if (window.BOOT_PROGRESS !== undefined) {
      update(window.BOOT_PROGRESS);
    }
  }

  return { init, update };

})();
