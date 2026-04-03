/* ============================================================
   boot.js — Real-Time Boot Sequence
   Updated for smooth "chase" loading based on loader.js progress.
   ============================================================ */

'use strict';

const Boot = (() => {

  const MIN_DURATION = 1500; // Minimum aesthetic time in ms
  const CHASE_SPEED  = 0.08; // How fast the bar 'catches up' (0 to 1)

  let onCompleteCallback = null;
  let startTime = null;
  let currentProgress = 0; // The animated value (0-100)
  let isComplete = false;

  /* ---- Update the status list indicators based on progress ---- */
  function updateStatus(progress) {
    const rows = document.querySelectorAll('.boot-status-row');
    if (!rows.length) return;

    // Reset all
    rows.forEach(r => {
      r.classList.remove('boot-status-row--active', 'anim-pulse');
      const icon = r.querySelector('.material-symbols-outlined');
      if (icon) {
        icon.textContent = 'check_circle';
        icon.style.color = 'var(--primary-fixed)';
      }
    });

    // Determine active row
    let activeIdx = 0;
    if (progress > 80) activeIdx = 2;
    else if (progress > 40) activeIdx = 1;

    const activeRow = rows[activeIdx];
    if (activeRow) {
      activeRow.classList.add('boot-status-row--active', 'anim-pulse');
      const icon = activeRow.querySelector('.material-symbols-outlined');
      if (icon) {
        icon.textContent = 'downloading';
        icon.style.color = 'var(--primary-container)';
      }
    }

    // Mark previous as completed
    for(let i=0; i < activeIdx; i++) {
       const row = rows[i];
       const icon = row.querySelector('.material-symbols-outlined');
       if (icon) {
         icon.textContent = 'check_circle';
         icon.style.color = 'var(--primary-fixed)';
       }
    }
  }

  /* ---- Smooth "chase" animation loop ---- */
  function animate() {
    if (!startTime) startTime = performance.now();
    const now = performance.now();
    const elapsed = now - startTime;

    // The 'target' is the actual measured progress from loader.js
    const targetProgress = window.__bootProgress || 0;

    // Smoothly interpolate towards the target
    const diff = targetProgress - currentProgress;
    currentProgress += diff * CHASE_SPEED;

    // Update UI
    const bar   = document.getElementById('boot-bar');
    const label = document.getElementById('boot-pct-label');
    
    if (bar) bar.style.width = currentProgress.toFixed(1) + '%';
    if (label) label.textContent = Math.round(currentProgress) + '%';

    // Update status rows
    updateStatus(currentProgress);

    // Continue if not deep-finished
    if (targetProgress >= 100 && currentProgress >= 99.9 && elapsed >= MIN_DURATION) {
      if (!isComplete) {
        currentProgress = 100;
        if (bar) bar.style.width = '100%';
        if (label) label.textContent = '100%';
        isComplete = true;
        dismiss();
      }
    } else {
      requestAnimationFrame(animate);
    }
  }

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

  function init(onComplete) {
    onCompleteCallback = onComplete;
    initRingGlow();
    requestAnimationFrame(animate);
  }

  return { init };

})();
