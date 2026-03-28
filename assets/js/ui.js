/* ============================================================
   ui.js — UI Interactions: Drawer, Filters, Form, Lab Timer
   ============================================================ */

'use strict';

const UI = (() => {

  /* ===================== DRAWER ===================== */
  function openDrawer() {
    document.getElementById('mobile-drawer')?.classList.add('open');
    document.getElementById('drawer-overlay')?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    document.getElementById('mobile-drawer')?.classList.remove('open');
    document.getElementById('drawer-overlay')?.classList.remove('open');
    document.body.style.overflow = '';
  }

  function initDrawer() {
    document.getElementById('drawer-overlay')?.addEventListener('click', closeDrawer);
    document.getElementById('btn-menu-open')?.addEventListener('click', openDrawer);
    document.getElementById('btn-menu-close')?.addEventListener('click', closeDrawer);

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeDrawer();
    });
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
          card.style.opacity  = visible ? '1' : '0';
        }
      });
    });
  }

  /* ===================== CONTACT FORM ===================== */
  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      const success = document.getElementById('form-success');

      // Simulate sending
      if (btn) {
        btn.disabled = true;
        btn.innerHTML = `<span class="spinner"></span>&nbsp;TRANSMITTING...`;
      }

      setTimeout(() => {
        form.reset();
        if (btn) {
          btn.disabled = false;
          btn.innerHTML = `<span class="material-symbols-outlined">send</span> Initiate Transmission`;
        }
        if (success) {
          success.classList.remove('hidden');
          showToast('TRANSMISSION_RECEIVED');
          setTimeout(() => success.classList.add('hidden'), 5000);
        }
      }, 1800);
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
        const x = (e.clientX - rect.left) / rect.width  - 0.5;
        const y = (e.clientY - rect.top)  / rect.height - 0.5;
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
    initDrawer();
    initFilters();
    initContactForm();
    initLabTimer();
    initScrollReveal();
    initCardTilt();
    animateProgressBars();

    // Re-run scroll reveal & progress bars on page change
    Router.onChange(() => {
      setTimeout(() => {
        initScrollReveal();
        animateProgressBars();
      }, 100);
    });
  }

  return { init, openDrawer, closeDrawer, showToast, animateCounters };
})();
