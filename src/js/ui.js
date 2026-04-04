/* ============================================================
   ui.js — UI Interactions: Drawer, Filters, Form, Lab Timer
   ============================================================ */

'use strict';

const UI = (() => {

  /* ===================== DRAWER ===================== */


  /* ===================== MOBILE BOTTOM SHEET ===================== */
  function openBottomSheet() {
    document.getElementById('mobile-bottom-sheet')?.classList.add('open');
    document.getElementById('bottom-sheet-overlay')?.classList.add('open');
    document.getElementById('mobile-fab')?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeBottomSheet() {
    document.getElementById('mobile-bottom-sheet')?.classList.remove('open');
    document.getElementById('bottom-sheet-overlay')?.classList.remove('open');
    document.getElementById('mobile-fab')?.classList.remove('open');
    document.body.style.overflow = '';
  }

  function initBottomSheet() {
    const fab = document.getElementById('mobile-fab');
    const overlay = document.getElementById('bottom-sheet-overlay');
    const sheet = document.getElementById('mobile-bottom-sheet');

    fab?.addEventListener('click', () => {
      fab.classList.contains('open') ? closeBottomSheet() : openBottomSheet();
    });

    overlay?.addEventListener('click', closeBottomSheet);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeBottomSheet();
    });

    // Native Drag-to-Close Logic
    let startY = 0;
    let currentY = 0;

    sheet?.addEventListener('touchstart', (e) => {
      // Only drag if the user taps the top header or drag handle
      const isHandle = e.target.closest('.bottom-sheet__header') || e.target.closest('.bottom-sheet__handle');
      if (!isHandle) return;

      startY = e.touches[0].clientY;
      sheet.style.transition = 'none'; // Snappy follow
    }, { passive: true });

    sheet?.addEventListener('touchmove', (e) => {
      if (!startY) return;
      currentY = e.touches[0].clientY;
      const dy = currentY - startY;

      // Only follow dragged motion downwards
      if (dy > 0) {
        sheet.style.transform = `translateY(${dy}px)`;
      }
    }, { passive: true });

    sheet?.addEventListener('touchend', () => {
      if (!startY) return;
      const dy = currentY - startY;

      // Reset styles to use the CSS class transitions again
      sheet.style.transition = '';
      sheet.style.transform = '';

      // If pulled down far enough, close the menu completely
      if (dy > 60) {
        closeBottomSheet();
      }

      startY = 0;
      currentY = 0;
    });

    // Sync active state whenever Router changes page
    // Handle Turnstile rendering in a Single Page App
    Router.onChange((page) => {
      document.querySelectorAll('.bottom-sheet__btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.page === page);
      });
      handleTurnstile(page);
    });
  }

  function handleTurnstile(page) {
    if (page !== 'connect') return;

    const render = () => {
      if (!window.turnstile) return;
      
      const turnstileEl = document.getElementById('connect-turnstile');
      if (!turnstileEl) return;

      // Check if already rendered (has children)
      if (turnstileEl.children.length === 0) {
        try {
          const sitekey = turnstileEl.dataset.sitekey || '0x4AAAAAACxrRyQCBE-RD7A1';
          window.turnstile.render('#connect-turnstile', {
            sitekey: sitekey,
            theme: 'dark',
            callback: function(token) {
              if (window.onSuccess) window.onSuccess(token);
            },
            'expired-callback': function() {
              if (window.onExpired) window.onExpired();
            },
            'error-callback': function() {
              if (window.onError) window.onError();
            }
          });
        } catch (e) {
          console.error("Turnstile render error:", e);
        }
      } else {
        window.turnstile.reset(turnstileEl);
      }
    };

    // If turnstile isn't ready, wait for it
    if (!window.turnstile) {
      let retries = 0;
      const interval = setInterval(() => {
        if (window.turnstile) {
          clearInterval(interval);
          render();
        }
        if (++retries > 10) clearInterval(interval);
      }, 500);
    } else {
      render();
    }
  }

  /* ===================== PROJECT FILTERS ===================== */
  function initFilters() {
    const filterGroup = document.querySelector('.filter-group');
    if (!filterGroup) return;

    filterGroup.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;

      // Update active button
      filterGroup.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      // Show/hide cards
      document.querySelectorAll('.project-card').forEach(card => {
        if (filter === 'all') {
          card.style.display = '';
          card.style.opacity = '1';
        } else {
          const tags = (card.dataset.tags || '').split(',');
          const visible = tags.includes(filter);
          card.style.display = visible ? '' : 'none';
          card.style.opacity = visible ? '1' : '0';
        }
      });
    });
  }

  /* ===================== CONTACT FORM ===================== */
  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    // Define Turnstile callbacks globally for the widget
    window.onSuccess = function () {
      const btn = document.getElementById('connect-submit');
      if (btn) btn.disabled = false;
    };
    window.onExpired = window.onError = function () {
      const btn = document.getElementById('connect-submit');
      if (btn) btn.disabled = true;
    };

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Turnstile Validation
      // 1. Check if the script is loaded
      if (!window.turnstile) {
        showToast('SECURITY_SERVICE_UNAVAILABLE (Check Adblocker)');
        return;
      }

      // 2. Check if the token is present
      const turnstileResponse = window.turnstile.getResponse();
      if (!turnstileResponse) {
        showToast('SECURITY_CHECK_REQUIRED');
        return;
      }

      const btn = form.querySelector('[type="submit"]');
      const success = document.getElementById('form-success');

      // Capture Form Data
      const payload = {
        name: form.querySelector('input[type="text"]').value,
        email: form.querySelector('input[type="email"]').value,
        subject: form.querySelector('.field__input--select').value,
        message: form.querySelector('textarea').value,
        token: turnstileResponse
      };

      // Visual Feedback: Transmitting
      if (btn) {
        btn.disabled = true;
        btn.innerHTML = `<span class="spinner"></span>&nbsp;TRANSMITTING...`;
      }

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (response.ok) {
          form.reset();

          if (success) {
            success.classList.remove('hidden');
            showToast('TRANSMISSION_RECEIVED');
            setTimeout(() => success.classList.add('hidden'), 5000);
          }
        } else {
          console.error("Transmission Error:", result.error);
          showToast(result.error || 'TRANSMISSION_FAILED');
        }

      } catch (error) {
        console.error("Network Error:", error);
        showToast('CONNECTION_STABILITY_ERROR');
      } finally {
        // Always reset Turnstile after every transmission (tokens are single-use)
        if (window.turnstile) {
          window.turnstile.reset();
        }
        if (btn) {
          btn.innerHTML = `<span class="material-symbols-outlined">send</span> Initiate Transmission`;
          // Button stays disabled until Turnstile is solved again
          btn.disabled = true;
        }
      }
    });
  }

  /* ===================== TOAST ===================== */
  function showToast(message, duration = 4000) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.querySelector('.toast__msg').textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), duration);
  }

  /* ===================== LAB TIMER ===================== */
  function initLabTimer() {
    const el = document.getElementById('lab-timer');
    if (!el) return;

    function update() {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');
      el.textContent = `SESSION_LIVE [${h}:${m}:${s}]`;
    }

    update();
    setInterval(update, 1000);
  }

  /* ===================== SCROLL TO TOP ===================== */
  function initScrollTop() {
    const btn = document.getElementById('btn-scroll-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }, { passive: true });

    btn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* ===================== SCROLL REVEAL ===================== */
  function initScrollReveal() {
    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('anim-fade-in-up');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }

  /* ===================== SMOOTH HOVER TILT ===================== */
  function initCardTilt() {
    document.querySelectorAll('.tilt-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateZ(8px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  /* ===================== PROGRESS BARS ANIMATE ===================== */
  function animateProgressBars() {
    document.querySelectorAll('.progress-bar__fill[data-width]').forEach(bar => {
      setTimeout(() => {
        bar.style.width = bar.dataset.width;
      }, 400);
    });
  }

  /* ===================== ANIMATED COUNTERS ===================== */
  function animateCounters() {
    document.querySelectorAll('.count-up[data-target]').forEach(el => {
      const target = parseFloat(el.dataset.target);
      const isInt = Number.isInteger(target);
      const duration = 1200;
      let start = null;

      function step(ts) {
        if (!start) start = ts;
        const p = Math.min((ts - start) / duration, 1);
        const val = target * easeOutExpo(p);
        el.textContent = isInt ? Math.round(val).toLocaleString() : val.toFixed(1);
        if (p < 1) requestAnimationFrame(step);
      }

      requestAnimationFrame(step);
    });
  }

  function easeOutExpo(t) {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  }

  /* ===================== PUBLIC INIT ===================== */
  function init() {
    initBottomSheet();
    initFilters();
    initContactForm();
    initLabTimer();
    initScrollReveal();
    initCardTilt();
    animateProgressBars();
    initScrollTop();

    // Re-run items on page change
    Router.onChange((page) => {
      setTimeout(() => {
        initScrollReveal();
        animateProgressBars();
      }, 100);
    });

    // Handle Turnstile on initial load (if direct entry to connect page)
    setTimeout(() => handleTurnstile(Router.getCurrent()), 500);
  }

  return { init, openBottomSheet, closeBottomSheet, showToast, animateCounters };
})();
