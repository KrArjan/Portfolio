/* ============================================================
   renderer.js — Dynamic HTML Rendering from SITE_DATA
   ============================================================ */

'use strict';

const Renderer = (() => {

  /* ===================== HELPERS ===================== */

  function icon(name, cls = '') {
    return `<span class="material-symbols-outlined${cls ? ' ' + cls : ''}">${name}</span>`;
  }

  function badge(text, type = 'cyan') {
    return `<span class="badge badge-${type}">${text}</span>`;
  }

  function techTag(text) {
    return `<span class="tech-tag">${text}</span>`;
  }

  function statusBadge(status) {
    const map = {
      'ONGOING_PROCESS': 'amber',
      'ONGOING':         'amber',
      'DEPLOYED':        'cyan',
      'IN_PROGRESS':     'purple',
      'RESEARCH':        'purple',
      'IDEATION':        'neutral',
      'BUILDING':        'cyan',
    };
    return badge(status, map[status] || 'neutral');
  }

  /* ===================== NAV ===================== */

  function renderNav() {
    const { navLinks, meta } = SITE_DATA;

    const linksHTML = navLinks.map(l =>
      `<a href="#" class="nav__link" data-page="${l.id}"
         onclick="Router.navTo('${l.id}'); return false;">${l.label}</a>`
    ).join('');

    const drawerHTML = navLinks.map(l =>
      `<a href="#" class="drawer__link" data-page="${l.id}"
         onclick="Router.navTo('${l.id}'); UI.closeDrawer(); return false;">
         ${icon(l.icon)} ${l.label}
       </a>`
    ).join('');

    document.getElementById('nav-links').innerHTML    = linksHTML;
    document.getElementById('drawer-nav').innerHTML   = drawerHTML;
    document.getElementById('sidebar-icons').innerHTML = navLinks.map(l =>
      `<span class="sidebar-right__icon material-symbols-outlined"
             title="${l.label}"
             onclick="Router.navTo('${l.id}')">${l.icon}</span>`
    ).join('');
  }

  /* ===================== FOOTER ===================== */

  function renderFooter() {
    const { navLinks } = SITE_DATA;
    const html = navLinks.map(l =>
      `<a href="#" class="footer__link"
         onclick="Router.navTo('${l.id}'); return false;">${l.label}</a>`
    ).join('');
    document.getElementById('footer-links').innerHTML = html;
  }

  /* ===================== HOME STATS ===================== */

  function renderStats() {
    const container = document.getElementById('stats-row');
    if (!container) return;

    container.innerHTML = SITE_DATA.stats.map(s => `
      <div class="stat-card glass bg-surface-low">
        <p class="stat-card__value" style="color:${s.color}">${s.value}</p>
        <p class="stat-card__label">${s.label}</p>
      </div>
    `).join('');
  }

  /* ===================== PROJECTS ===================== */

  function renderProjects() {
    const container = document.getElementById('projects-grid');
    if (!container) return;

    container.innerHTML = SITE_DATA.projects.map(p => {
      const isLarge = p.size === 'large';
      const colClass = isLarge ? 'col-8' : 'col-4';

      return `
        <div class="project-card glass-card glow-border-inset ${colClass} reveal"
             data-tags="${p.category.join(',')}"
             style="padding: ${isLarge ? '32px' : '24px'}; min-height: ${isLarge ? '320px' : '220px'}; display:flex; flex-direction:column;">

          <div style="position:absolute;top:0;right:0;padding:24px;opacity:0.08;pointer-events:none;">
            ${icon(p.icon, '')} <!-- decorative bg icon via CSS -->
            <span class="material-symbols-outlined" style="font-size:5rem;color:${p.color}">${p.icon}</span>
          </div>

          <div class="flex gap-sm" style="margin-bottom:20px; flex-wrap:wrap;">
            ${statusBadge(p.status)}
            ${p.uuid ? `<span style="color:var(--on-surface-variant);font-family:var(--font-headline);font-size:0.55rem;letter-spacing:0.15em;text-transform:uppercase;align-self:center;">UUID: ${p.uuid}</span>` : ''}
            ${p.role ? `<span style="color:var(--primary-container);font-family:var(--font-headline);font-size:0.55rem;letter-spacing:0.15em;text-transform:uppercase;align-self:center;">${p.role}</span>` : ''}
          </div>

          <h3 class="headline-${isLarge ? 'lg' : 'md'}" style="color:var(--primary);margin-bottom:12px;font-family:var(--font-headline);transition:transform 0.25s;">
            ${p.title}
          </h3>

          <p class="body-sm" style="color:var(--on-surface-variant);margin-bottom:20px;max-width:480px;">
            ${p.description}
          </p>

          <div class="project-card__tech" style="margin-top:auto;">
            ${p.tags.map(t => techTag(t)).join('')}
          </div>
        </div>
      `;
    }).join('');
  }

  /* ===================== FEATURED PROJECTS (HOME) ===================== */

  function renderFeatured() {
    const container = document.getElementById('featured-grid');
    if (!container) return;

    const [main, ...rest] = SITE_DATA.projects.slice(0, 3);
    const sideItems = rest.slice(0, 2);

    container.innerHTML = `
      <div class="bento-featured__main glass-card glow-border-inset project-card rounded-lg" style="position:relative;overflow:hidden;padding:32px;display:flex;flex-direction:column;justify-content:flex-end;min-height:380px;">
        <div style="position:absolute;top:20px;right:20px;opacity:0.08;">
          <span class="material-symbols-outlined" style="font-size:8rem;color:var(--primary-container)">${main.icon}</span>
        </div>
        <div style="position:absolute;inset:0;background:linear-gradient(to top, var(--surface-dim) 30%, transparent);"></div>
        <div style="position:relative;z-index:1;">
          <span style="font-family:var(--font-headline);font-size:0.55rem;letter-spacing:0.25em;text-transform:uppercase;color:var(--tertiary-fixed);display:block;margin-bottom:12px;">AUTOMATION ENGINE</span>
          <h4 class="headline-lg" style="color:#fff;margin-bottom:8px;font-family:var(--font-headline);">${main.title}</h4>
          <p class="body-sm" style="color:var(--on-surface-variant);max-width:420px;margin-bottom:20px;">${main.description}</p>
          <button class="btn btn-ghost btn-sm" onclick="Router.navTo('projects')">Details</button>
        </div>
      </div>

      <div class="bento-featured__side">
        ${sideItems.map(p => `
          <div class="glass-card glow-border-inset project-card rounded-lg" style="padding:24px;display:flex;flex-direction:column;justify-content:flex-end;position:relative;overflow:hidden;">
            <div style="position:absolute;top:12px;right:12px;opacity:0.15;">
              <span class="material-symbols-outlined" style="font-size:4rem;color:${p.color}">${p.icon}</span>
            </div>
            <h5 class="headline-sm" style="color:var(--primary);margin-bottom:6px;font-family:var(--font-headline);">${p.title}</h5>
            <p class="body-sm" style="color:var(--on-surface-variant);margin-bottom:12px;">${p.description.slice(0,80)}...</p>
            <span style="font-family:var(--font-headline);font-size:0.5rem;letter-spacing:0.25em;text-transform:uppercase;color:var(--primary-container);">${p.tags.join(' // ')}</span>
          </div>
        `).join('')}
      </div>
    `;
  }

  /* ===================== STACK ===================== */

  function renderStack() {
    const s = SITE_DATA.stack;

    // Languages chips
    const langEl = document.getElementById('stack-languages');
    if (langEl) {
      langEl.innerHTML = s.languages.map(l =>
        `<span class="skill-chip">${l}</span>`
      ).join('');
    }

    // Domain mini-cards
    const domEl = document.getElementById('stack-domains');
    if (domEl) {
      domEl.innerHTML = s.domains.map(d => `
        <div style="padding:12px;background:rgba(32,31,31,0.5);border-radius:var(--radius-sm);display:flex;flex-direction:column;gap:4px;">
          <span style="font-family:var(--font-headline);font-size:0.55rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--tertiary-fixed);">${d.label}</span>
          <span style="font-family:var(--font-headline);font-size:0.75rem;color:var(--on-surface);">${d.value}</span>
        </div>
      `).join('');
    }

    // Bot skills
    const botEl = document.getElementById('stack-bots');
    if (botEl) {
      botEl.innerHTML = s.bots.map(b => `
        <li style="display:flex;align-items:flex-start;gap:12px;margin-bottom:16px;">
          <span style="width:6px;height:6px;border-radius:50%;background:var(--primary-container);flex-shrink:0;margin-top:6px;"></span>
          <div>
            <p style="font-family:var(--font-headline);font-size:0.8rem;font-weight:600;color:var(--on-surface);margin-bottom:2px;">${b.name}</p>
            <p class="body-sm" style="color:var(--on-surface-variant);">${b.detail}</p>
          </div>
        </li>
      `).join('');
    }

    // Dev tools
    const toolEl = document.getElementById('stack-devtools');
    if (toolEl) {
      toolEl.innerHTML = s.devTools.map(t =>
        `<span style="padding:8px;background:rgba(53,53,52,0.4);border:1px solid var(--outline-variant);border-radius:var(--radius-sm);font-family:var(--font-headline);font-size:0.55rem;letter-spacing:0.1em;text-transform:uppercase;text-align:center;">${t}</span>`
      ).join('');
    }

    // Infra chips
    const infraEl = document.getElementById('stack-infra');
    if (infraEl) {
      infraEl.innerHTML = s.infra.map(t =>
        `<span style="display:inline-block;padding:6px 12px;background:rgba(0,242,255,0.08);color:var(--primary-container);border:1px solid rgba(0,242,255,0.2);border-radius:var(--radius-sm);font-family:var(--font-headline);font-size:0.6rem;letter-spacing:0.1em;text-transform:uppercase;margin:4px;">${t}</span>`
      ).join('');
    }

    // Learning
    const learnEl = document.getElementById('stack-learning');
    if (learnEl) {
      const colorMap = { primary: 'var(--primary-container)', secondary: 'var(--secondary-container)', amber: 'var(--tertiary-fixed)' };
      learnEl.innerHTML = s.learning.map(l => `
        <div style="background:rgba(42,42,42,0.4);padding:16px;border-left:2px solid ${colorMap[l.color]};border-radius:var(--radius-sm);display:flex;flex-direction:column;gap:6px;">
          <span style="font-family:var(--font-headline);font-size:0.5rem;letter-spacing:0.2em;text-transform:uppercase;color:${colorMap[l.color]};">${l.accent}</span>
          <p style="font-family:var(--font-headline);font-size:0.875rem;font-weight:600;color:var(--on-surface);">${l.label}</p>
        </div>
      `).join('');
    }
  }

  /* ===================== JOURNEY ===================== */

  function renderJourney() {
    const container = document.getElementById('timeline-entries');
    if (!container) return;

    container.innerHTML = SITE_DATA.journey.map((entry, i) => {
      const isRight = i % 2 !== 0;
      return `
        <div class="timeline__entry reveal" style="margin-bottom:96px;position:relative;display:flex;flex-direction:column;align-items:flex-start;">

          <!-- Node -->
          <div class="timeline__node" style="border:2px solid ${entry.borderColor};box-shadow:0 0 15px ${entry.nodeGlow};${entry.isPulsing ? 'animation:pulse 2s ease-in-out infinite;' : ''}">
            ${icon(entry.icon, '')}
            <span class="material-symbols-outlined" style="color:${entry.borderColor};font-size:1.25rem;">${entry.icon}</span>
          </div>

          <!-- Card -->
          <div class="timeline__card glass-card" style="background:rgba(28,27,27,0.65);border-left:1px solid ${entry.borderColor};width:calc(100% - 72px);margin-left:72px;padding:32px;border-radius:var(--radius-sm);">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap;gap:8px;">
              <span style="font-family:var(--font-headline);font-size:0.55rem;letter-spacing:0.2em;text-transform:uppercase;color:${entry.borderColor};">${entry.era}</span>
              <span style="font-family:var(--font-headline);font-size:0.6rem;font-style:italic;color:var(--outline-variant);">${entry.year}</span>
            </div>
            <h3 class="headline-md" style="font-family:var(--font-headline);margin-bottom:16px;color:var(--on-surface);">${entry.title}</h3>
            <p class="body-sm" style="color:var(--on-surface-variant);line-height:1.7;margin-bottom:20px;">${entry.description}</p>
            <div style="display:flex;flex-wrap:wrap;gap:8px;">
              ${entry.tags.map(t => `
                <span style="padding:4px 10px;background:var(--surface-highest);font-family:var(--font-headline);font-size:0.5rem;letter-spacing:0.15em;text-transform:uppercase;color:var(--primary-fixed);border-radius:var(--radius-sm);">${t}</span>
              `).join('')}
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  /* ===================== LAB ===================== */

  function renderLab() {
    const container = document.getElementById('lab-grid');
    if (!container) return;

    const [main, ...rest] = SITE_DATA.lab;
    const statusColors = {
      'BUILDING':    'var(--primary-container)',
      'DEPLOYED':    'var(--primary-container)',
      'IN_PROGRESS': 'var(--tertiary-fixed)',
      'RESEARCH':    'var(--secondary)',
      'IDEATION':    'var(--on-surface-variant)',
    };

    container.innerHTML = `
      <!-- Main large card -->
      <div class="col-8 glass glow-border-left reveal" style="padding:32px;position:relative;overflow:hidden;min-height:300px;display:flex;flex-direction:column;justify-content:space-between;">
        <div style="position:absolute;top:0;right:0;padding:16px;font-family:var(--font-headline);font-size:0.5rem;letter-spacing:0.3em;text-transform:uppercase;color:var(--primary-container);opacity:0.4;">PRIORITY_01</div>
        <div>
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:20px;">
            <span class="material-symbols-outlined" style="color:var(--primary-container);">${main.icon}</span>
            <h3 style="font-family:var(--font-headline);font-size:1.25rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;">Currently Building: ${main.title}</h3>
          </div>
          <p class="body-sm" style="color:var(--on-surface-variant);max-width:480px;margin-bottom:24px;">${main.description}</p>
          <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:24px;">
            ${(main.tags || []).map(t => `
              <span style="padding:6px 14px;background:rgba(42,42,42,0.6);border:1px solid rgba(0,242,255,0.2);font-family:var(--font-headline);font-size:0.55rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--primary-container);border-radius:var(--radius-sm);">${t}</span>
            `).join('')}
          </div>
        </div>
        <div>
          <div style="display:flex;justify-content:space-between;font-family:var(--font-headline);font-size:0.55rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--on-surface-variant);margin-bottom:8px;">
            <span>Build Progress</span><span style="color:var(--primary-container);">${main.progress}%</span>
          </div>
          <div class="progress-bar">
            <div class="progress-bar__fill" data-width="${main.progress}%" style="width:0%"></div>
          </div>
        </div>
      </div>

      <!-- Side small cards -->
      ${rest.map(p => `
        <div class="col-4 glass-card glow-border-inset reveal" style="padding:24px;display:flex;flex-direction:column;justify-content:space-between;min-height:240px;border:1px solid rgba(255,255,255,0.05);border-radius:var(--radius-md);">
          <div>
            <span class="material-symbols-outlined" style="color:${p.color || 'var(--primary-container)'};font-size:2rem;margin-bottom:12px;display:block;">${p.icon}</span>
            <h4 style="font-family:var(--font-headline);font-size:1rem;font-weight:700;color:var(--primary);margin-bottom:8px;">${p.title}</h4>
            <p class="body-sm" style="color:var(--on-surface-variant);">${p.description}</p>
          </div>
          <span class="badge" style="margin-top:16px;align-self:flex-start;background:rgba(0,0,0,0.3);color:${statusColors[p.status] || 'var(--on-surface-variant)'};border:1px solid currentColor;">${p.status}</span>
        </div>
      `).join('')}

      <!-- Lab Notes -->
      <div class="col-12 glass glow-border-top reveal" style="padding:32px;">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:24px;">
          <span class="material-symbols-outlined" style="color:var(--primary-container);">terminal</span>
          <h3 style="font-family:var(--font-headline);font-size:1.1rem;font-weight:700;">LAB_NOTES // Recent Activity</h3>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px;">
          ${SITE_DATA.labNotes.map(n => `
            <div style="display:flex;align-items:flex-start;gap:8px;">
              <span style="color:${n.color};flex-shrink:0;margin-top:2px;font-family:var(--font-headline);">›</span>
              <span class="body-sm" style="color:var(--on-surface-variant);font-family:monospace;">${n.text}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  /* ===================== SOCIAL LINKS ===================== */

  function renderSocial() {
    const container = document.getElementById('social-grid');
    if (!container) return;

    container.innerHTML = SITE_DATA.social.map(s => `
      <a href="${s.href}" target="_blank" rel="noopener noreferrer"
         class="glass-card hover-lift"
         style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;padding:24px;border:1px solid rgba(255,255,255,0.05);border-radius:var(--radius-md);transition:all 0.3s;">
        <span class="material-symbols-outlined" style="font-size:2rem;color:#4a4a4a;transition:color 0.2s;"
              onmouseenter="this.style.color='var(--primary-container)'" onmouseleave="this.style.color='#4a4a4a'">${s.icon}</span>
        <span style="font-family:var(--font-headline);font-size:0.55rem;letter-spacing:0.25em;text-transform:uppercase;color:#4a4a4a;">${s.label}</span>
      </a>
    `).join('');
  }

  /* ===================== PUBLIC INIT ===================== */

  function init() {
    renderNav();
    renderFooter();
    renderStats();
    renderFeatured();
    renderProjects();
    renderStack();
    renderJourney();
    renderLab();
    renderSocial();
  }

  return { init };
})();
