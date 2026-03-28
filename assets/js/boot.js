/* ============================================================
   boot.js — Boot Screen Animation & Sequence
   ============================================================ */

'use strict';

const Boot = (() => {

  const DURATION  = 3000; // total boot time ms
  const RING_CIRC = 628;  // SVG circle circumference (r=100)

  let onCompleteCallback = null;

  /* ---- Animate the SVG ring progress ---- */
  function animateRing() {
    const ring = document.getElementById('boot-ring');
    const pct  = document.getElementById('boot-pct');
    const bar  = document.getElementById('boot-bar');
    if (!ring) return;

    let start = null;

    function step(timestamp) {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / DURATION, 1);
      const eased    = easeInOutCubic(progress);
      const value    = Math.round(eased * 100);
      const offset   = RING_CIRC - (eased * RING_CIRC);

      ring.style.strokeDashoffset = offset;
      if (pct)  pct.innerHTML = `${value}<span style="color:var(--primary-container);font-size:1.25rem">%</span>`;
      if (bar)  bar.style.width = value + '%';

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  /* ---- Reveal boot log lines one by one ---- */
  function revealLogLines() {
    const lines = document.querySelectorAll('.boot-log__line');
    lines.forEach((line, i) => {
      const delay = 300 + i * 550;
      setTimeout(() => {
        line.style.opacity = '1';
        line.style.transform = 'translateX(0)';
      }, delay);
    });
  }

  /* ---- Dismiss boot screen and show site ---- */
  function dismiss() {
    const bootScreen = document.getElementById('boot-screen');
    const mainNav    = document.getElementById('main-nav');
    const mainContent = document.getElementById('main-content');
    const mainFooter  = document.getElementById('main-footer');
    const sidebar    = document.getElementById('sidebar-right');

    if (bootScreen) {
      bootScreen.style.opacity = '0';
      bootScreen.style.pointerEvents = 'none';
      setTimeout(() => {
        bootScreen.style.display = 'none';
        // Show site elements
        [mainNav, mainContent, mainFooter, sidebar].forEach(el => {
          if (el) {
            el.style.removeProperty('display');
            el.classList.add('anim-fade-in');
          }
        });
        if (onCompleteCallback) onCompleteCallback();
      }, 500);
    }
  }

  /* ---- Easing function ---- */
  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  /* ---- Public: Init the boot sequence ---- */
  function init(onComplete) {
    onCompleteCallback = onComplete;

    animateRing();
    revealLogLines();

    setTimeout(dismiss, DURATION + 200);
  }

  return { init };
})();
