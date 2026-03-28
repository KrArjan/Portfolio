/* ============================================================
   boot.js — Boot Screen Animation & Sequence
   Updated for the cinematic terminal boot design.
   ============================================================ */

'use strict';

const Boot = (() => {

  const DURATION = 3200; // total boot time ms

  let onCompleteCallback = null;

  /* ---- Animate the progress bar + percentage label ---- */
  function animateProgress() {
    const bar   = document.getElementById('boot-bar');
    const label = document.getElementById('boot-pct-label');
    if (!bar) return;

    let start = null;

    function step(timestamp) {
      if (!start) start = timestamp;
      const elapsed  = timestamp - start;
      const progress = Math.min(elapsed / DURATION, 1);
      const eased    = easeInOutCubic(progress);
      const value    = Math.round(eased * 100);

      bar.style.width = value + '%';
      if (label) label.textContent = value + '%';

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
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

  /* ---- Cubic ease ---- */
  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  /* ---- Public init ---- */
  function init(onComplete) {
    onCompleteCallback = onComplete;

    animateProgress();
    initRingGlow();

    setTimeout(dismiss, DURATION + 200);
  }

  return { init };

})();
