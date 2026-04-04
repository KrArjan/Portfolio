/* ============================================================
   particles-init.js — Global Particle Background
   Uses tsParticles (loaded via CDN in index.html).
   Colour-matched to the site's cyan + purple token system.
   ============================================================ */

'use strict';

(async function () {

  const config = SITE_DATA.particles || {};

  if (config.enable === false) {
    console.info('[particles] disabled via config — skipping.');
    return;
  }

  await tsParticles.load({
    id: 'particles-bg',
    options: {
      fpsLimit: 60,
      background: {
        color: { value: 'transparent' },
      },

      /* ── Particles ─────────────────────────────────────────────── */
      particles: {
        number: {
          value: config.number || 70,
          density: { enable: true, area: config.density || 800 },
        },
        color: {
          value: config.colors || ['#00f2ff', '#7701d0', '#74f5ff'],
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
          color: (config.colors && config.colors[0]) || '#00f2ff',
          opacity: 0.08,
          width: 0.8,
          triangles: {
            enable: false,
          },
        },

        /* ── Motion ─────────────────────────────────────────────── */
        move: {
          enable: true,
          speed: config.speed || 0.45,
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
            enable: config.interactivity?.hoverMode !== 'none',
            mode: config.interactivity?.hoverMode || 'grab',
          },
          onClick: {
            enable: config.interactivity?.clickMode !== 'none',
            mode: config.interactivity?.clickMode || 'push',
          },
        },
        modes: {
          grab: {
            distance: 180,
            links: { opacity: 0.25, color: (config.colors && config.colors[0]) || '#00f2ff' },
          },
          bubble: { distance: 200, size: 8, duration: 2, opacity: 0.8 },
          repulse: { distance: 200, duration: 0.4 },
          push: { quantity: 4 },
          remove: { quantity: 2 },
        },
      },

      detectRetina: true,
    },
  });

})();
