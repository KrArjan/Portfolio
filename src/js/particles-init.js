/* ============================================================
   particles-init.js — Global Particle Background
   Uses tsParticles (loaded via CDN in index.html).
   Colour-matched to the site's cyan + purple token system.
   ============================================================ */

'use strict';

(async function () {

  if (typeof tsParticles === 'undefined') {
    console.warn('[particles] tsParticles not loaded — skipping.');
    return;
  }

  // Reduce particle count on mobile for performance
  const isMobile = window.innerWidth < 768;

  await tsParticles.load({
    id: 'particles-bg',
    options: {
      fpsLimit: 30,       // 30fps is imperceptible for subtle bg particles
      pauseOnBlur: true,  // Suspend when tab is not focused
      background: {
        color: { value: 'transparent' },
      },

      /* ── Particles ─────────────────────────────────────────────── */
      particles: {
        number: {
          value: isMobile ? 35 : 55,
          density: { enable: true, area: 800 },
        },
        color: {
          value: ['#00f2ff', '#7701d0', '#74f5ff'],
        },
        opacity: {
          value: { min: 0.08, max: 0.35 },
          animation: {
            enable: true,
            speed: 0.6,
            sync: false,
          },
        },
        size: {
          value: { min: 1, max: 2.5 },
        },
        shape: { type: 'circle' },

        /* ── Links ─────────────────────────────────────────────── */
        links: {
          enable: true,
          distance: 160,
          color: '#00f2ff',
          opacity: 0.08,
          width: 0.8,
          triangles: {
            enable: false,
          },
        },

        /* ── Motion ─────────────────────────────────────────────── */
        move: {
          enable: true,
          speed: 0.45,
          direction: 'none',
          random: true,
          straight: false,
          outModes: { default: 'bounce' },
          attract: { enable: false },
        },
      },

      /* ── Interactivity ──────────────────────────────────────── */
      interactivity: {
        detectsOn: 'window',
        events: {
          onHover: {
            enable: false,
            mode: 'grab',
          },
          onClick: {
            enable: false,
            mode: 'push',
          },
        },
        modes: {
          grab: {
            distance: 180,
            links: { opacity: 0.25, color: '#00f2ff' },
          },
          push: { quantity: 2 },
        },
      },

      detectRetina: true,
    },
  });

})();
