/* ============================================================
   boot.js — Boot Screen Animation & Sequence
   Updated for the cinematic terminal boot design.
   ============================================================ */

'use strict';

const Boot = (() => {

  let onCompleteCallback = null;

  /* ---- Animate the progress bar + percentage label ---- */
  // DEPRECATED: Progress is now handled by loader.js in real-time.
  function setComplete() {
    const bar   = document.getElementById('boot-bar');
    const label = document.getElementById('boot-pct-label');
    if (bar) bar.style.width = '100%';
    if (label) label.textContent = '100%';
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
  function dismiss(instant = false) {
    const bootScreen  = document.getElementById('boot-screen');
    const mainNav     = document.getElementById('main-nav');
    const mainContent = document.getElementById('main-content');
    const mainFooter  = document.getElementById('main-footer');
    const sidebar     = document.getElementById('sidebar-right');

    if (bootScreen) {
      if (instant) {
        bootScreen.style.display = 'none';
        [mainNav, mainContent, mainFooter, sidebar].forEach(el => {
          if (el) el.style.removeProperty('display');
        });
        if (onCompleteCallback) onCompleteCallback();
        return;
      }

      setComplete();
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
      }, 800);
    }
  }

  /* ---- Public init ---- */
  function init(onComplete) {
    onCompleteCallback = onComplete;
    initRingGlow();
  }

  return { init, dismiss };

})();
