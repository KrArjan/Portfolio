/* ============================================================
   portfolio.config.js — Your Portfolio Content & Configuration
   ============================================================

   🟢 THIS IS THE ONLY FILE YOU NEED TO EDIT.
   
   Replace the example values below with your own information.
   Look for "CHANGE_ME" comments — those are the fields you
   must update before deploying.

   After editing, your portfolio will automatically reflect
   all changes. No need to touch HTML, CSS, or core JS files.
   ============================================================ */

'use strict';

const SITE_DATA = {

  /* ===================== META ===================== *
   * Basic identity info shown across the site.
   * CHANGE_ME: Update all fields with your info.
   * ================================================ */
  meta: {
    name: 'KrArjan',                                     // CHANGE_ME: Your display name
    title: 'KrArjan',                                    // CHANGE_ME: Browser tab title
    tagline: 'Building Since 2021.',                     // CHANGE_ME: Short tagline
    role: 'Student Developer & Technical Builder',       // CHANGE_ME: Your role/title
    description: 'Building software, bots, tools, and digital systems that move the needle.', // CHANGE_ME: SEO meta description
    version: '2.0.4',                                    // Your portfolio version
    buildRef: 'KR-77-LAB',                               // CHANGE_ME: Custom build reference
    email: 'krarjanwork@gmail.com',                      // CHANGE_ME: Your email
    github: 'https://github.com/KrArjan',                // CHANGE_ME: GitHub profile URL
    discord: 'https://discord.gg/nullbyte',              // CHANGE_ME: Discord server invite
    url: 'https://krarjan.dev',                          // CHANGE_ME: Your portfolio URL (used for canonical & OG tags)
    site: 'https://krarjan.dev/projects',                // CHANGE_ME: Your main project/site URL
    cpanel: 'https://cpanel.nullbyte.qzz.io',            // CHANGE_ME: Admin panel (optional)
    ogImage: '/config/images/pfp/pfp.webp',                  // CHANGE_ME: OG/social sharing preview image path
    authToken: '0x7701D0_A39C',                          // Decorative auth token shown in UI
    buildSince: '2021',                                  // CHANGE_ME: Year you started coding
  },

  /* ===================== FEATURES ===================== *
   * Feature flags to toggle sections on/off.
   * ================================================ */
  features: {
    showBootScreen: true,     // Toggle the cinematic loading animation
    showStats: true,          // Toggle the statistic cards on home page
    showFeaturedWork: true,   // Toggle the featured projects bento on home page
    showLabNotes: false,      // Toggle terminal-style log entries on Lab page
    showProjectsFilter: true, // Toggle the filtering buttons on Projects page
    showJourneyTimeline: true,// Toggle the journey entries on the Journey page
    showContactForm: true,    // Toggle the contact form on the Connect page
  },

  /* ===================== SECURITY ===================== *
   * Security settings for contact forms and Turnstile.
   * CHANGE_ME: Update turnstileSiteKey with your public key.
   * ================================================ */
  security: {
    turnstileSiteKey: '0x4AAAAAACxrRyQCBE-RD7A1', // CHANGE_ME: Cloudflare Turnstile Site Key
  },

  /* ===================== PAGES CONTENT ===================== *
   * Detailed content for each page section.
   * Moving these here eliminates hardcoding in HTML files.
   * ================================================ */
  pages: {
    home: {
      hero: {
        badge: 'System_Online // Ver_2.0.4',
        title: 'KrArjan<br><span class="gradient-text">Student Developer.</span>',
        bio: 'I’m a student developer working on bots, web tools, automation systems, and technical projects. I enjoy building things that are useful, organized, and actually solve problems.',
        pfpAlt: 'KrArjan Profile',
        techTags: [
          'JAVASCRIPT / NODE.JS',
          'PYTHON / APIS',
          'BACKEND / SYSTEMS',
          'AUTOMATION / WEB'
        ]
      },
      mission: {
        title: 'MY_CORE',
        bio: 'I enjoy building useful systems through code — from <span style="color:var(--primary-container);">Discord bots and automation tools</span> to <span style="color:var(--secondary);">backend logic and technical projects</span> that are designed to actually be used.',
        cards: [
          {
            title: 'Automation Systems',
            description: 'Building workflows and tools that reduce manual work and make tasks easier to manage.'
          },
          {
            title: 'Backend Development',
            description: 'Working on APIs, logic, databases, and systems that power useful applications.'
          },
          {
            title: 'Technical Systems',
            description: 'Hands-on work with Linux, hosting panels, deployments, reverse proxies, and technical setups.'
          }
        ]
      }
    },
    profile: {
      hero: {
        badge: 'BIO_PROFILE_V2.0.4',
        title: "I'm KrArjan,<br><span class=\"gradient-text\">Student Developer.</span>",
        bios: [
          'I’m a student developer with hands-on experience since 2021. I started by working on Minecraft servers, Discord communities, bots, technical systems, and online projects — which helped me understand how real digital systems work from the ground up.',
          'Over time, I became more interested in coding and building useful things through software, especially bots, automation, technical tools, and backend-focused systems.',
          'Now I’m focused on improving as a developer by building practical projects, learning through real work, and creating things that are actually useful.'
        ]
      },
      story: {
        title: 'How I Started',
        entries: [
          { label: '2021_START', text: 'Started with Minecraft servers and Discord communities. Working on permissions, setup, and structure gave me my first real interest in how systems work.' },
          { label: '2022_GROWTH', text: 'Started focusing more on bots, automation, and technical tools. I began learning how APIs, events, and system workflows work in real projects.' },
          { label: '2023_BUILD', text: 'Moved deeper into coding and software-based projects. Started building more useful systems, tools, and technical workflows through code.' },
          { label: '2024-PRESENT', text: 'Now I’m focused on growing further into software development, backend systems, automation, and better project building.' }
        ]
      },
      skills: {
        title: 'What I Do',
        cards: [
          { title: 'Bot Development', description: 'Building useful Discord bots, automation systems, and structured command-based tools for real use cases.' },
          { title: 'Technical Projects', description: 'Building and managing project-based technical systems, tools, panels, and backend-focused setups.' },
          { title: 'Web & Tool Building', description: 'Working on websites, dashboards, interfaces, and utility-based web projects that are simple, useful, and practical.' },
          { title: 'Automation Systems', description: 'Creating workflows and systems that reduce manual work and make digital tasks easier to manage.' },
          { title: 'Community Systems', description: 'Designing and managing structured Discord/community systems with support, roles, permissions, and organization in mind.' }
        ]
      }
    },
    social: {
      hero: {
        badge: 'DIGITAL PRESENCE // KRARJAN',
        title: 'Social Hub // <br><span class="gradient-text">Find Me Online</span>',
        bio: 'A central place for my projects, profiles, communities, and platforms. Explore where I build, share, and stay active online.'
      }
    },
    journey: {
      hero: {
        badge: 'Status: Evolution_Active',
        title: 'DEVELOPMENT<br><span class="gradient-text">TIMELINE.</span>',
        bio: 'My growth through projects, systems, communities, and development work since 2021.'
      }
    },
    lab: {
      hero: {
        badge: 'EXPERIMENTAL_ZONE',
        title: 'Technical<br><span class="gradient-text">Laboratory.</span>',
        bio: 'A space for research, experimental builds, system tests, and projects that are currently in development.'
      }
    },
    stack: {
      hero: {
        badge: 'SYSTEM_CORE',
        title: 'Technical<br><span class="gradient-text">Architecture.</span>',
        bio: 'The software, languages, tools, and infrastructure I use to build and manage digital systems.'
      },
      sections: {
        languages: 'LANGUAGES & DEVELOPMENT',
        bots: 'BOTS & SYSTEMS',
        tools: 'DEV_TOOLS',
        infra: 'INFRA_CONTROL',
        os: 'OS & NETWORKING',
        community: 'COMMUNITY OPS',
        gaming: 'GAME_INFRA',
        focus: 'CURRENT_FOCUS'
      }
    },
    projects: {
      hero: {
        badge: 'PROJECT_ARCHIVE',
        title: 'WORK // <br><span class="gradient-text">Digital Builds.</span>',
        bio: 'A collection of bots, web tools, automation systems, and technical projects I have built or managed.'
      },
      filters: {
        all: 'ALL_PROJECTS',
        bots: 'BOTS',
        web: 'WEB',
        automation: 'AUTOMATION',
        community: 'COMMUNITY'
      }
    },
    connect: {
      hero: {
        label: 'ESTABLISH_CONNECTION',
        title: "Let's Build<br><span class=\"gradient-text\">Something Great.</span>",
        bio: 'Open to coding projects, technical builds, creative ideas, and opportunities to learn while building real things.'
      },
      form: {
        nameLabel: 'IDENTIFIER_NAME',
        namePlaceholder: 'John Doe',
        emailLabel: 'SECURE_EMAIL',
        emailPlaceholder: 'nexus@example.com',
        subjectLabel: 'TRANSMISSION_SUBJECT',
        messageLabel: 'MESSAGE_PAYLOAD',
        messagePlaceholder: 'Describe the mission parameters...',
        submitBtn: 'Initiate Transmission',
        successMsg: 'TRANSMISSION_RECEIVED // WILL_RESPOND_SOON'
      },
      status: {
        label: 'SYSTEM_STATUS: ONLINE',
        title: 'Direct Channels Open',
        bio: 'Direct protocols below for project inquiries or collaboration requests.'
      },
      latency: {
        title: 'EXPECTED_LATENCY',
        email: '~24h',
        discord: '~1-2h'
      }
    },
    boot: {
      title: 'Initializing KrArjan Interface',
      version: 'KrArjan v2.0.4-stable',
      statuses: [
        'BOOTING PORTFOLIO...',
        'SYNCING MODULES...',
        'LOADING PROJECTS...'
      ],
      footer: {
        link: 'NODE_01_SECURE',
        signal: '100_PERCENT',
        copy: '© 2026 KRARJAN // KINETIC TERMINAL',
        status: 'ESTABLISHING NEURAL_BRIDGE...'
      }
    }
  },

  /* ===================== STATS ===================== *
   * Quick statistics displayed on the home page.
   * CHANGE_ME: Update values and labels.
   * ================================================ */
  stats: [
    { value: '2021', label: 'Started Building', color: 'var(--primary-container)' },
    { value: '10+', label: 'Projects Worked On', color: 'var(--secondary)' },
    { value: '4+', label: 'Years of Experience', color: 'var(--tertiary-fixed)' },
    { value: 'Code + Systems', label: 'Work Focus', color: 'var(--primary-container)' },
  ],

  /* ===================== PROJECTS ===================== *
   * Your project portfolio. Each project needs:
   *   id          — Unique slug (used for featured references)
   *   title       — Display name
   *   description — Short description (1-2 sentences)
   *   category    — Array of tags for filtering: 'bots', 'automation', 'web', 'community'
   *   tags        — Tech stack labels shown on the card
   *   status      — One of: 'BUILDING', 'DEPLOYED', 'ONGOING', 'IN_PROGRESS', 'RESEARCH', 'IDEATION'
   *   icon        — Material Symbols icon name (https://fonts.google.com/icons)
   *   size        — Card size: 'small', 'medium', 'large', 'xl'
   *   color       — Accent color (use CSS variables from the design system)
   *   role        — (Optional) Your role in the project
   *   uuid        — (Optional) Custom identifier shown on the card
   *
   * CHANGE_ME: Replace with your own projects.
   * ================================================ */
  projects: [
    {
      id: 'upi-bot',
      title: 'Discord UPI Payment Bot',
      description: 'A Discord bot built to handle payment workflows using UPI and crypto, with command-based interaction, verification logic, and utility-focused automation.',
      category: ['bots', 'automation'],
      tags: ['NODE.JS', 'PYTHON', 'REST_API', 'AUTOMATION'],
      status: 'BUILDING',
      uuid: '4492-UPI-BOT',
      icon: 'payments',
      size: 'medium',
      color: 'var(--primary-container)',
    },
    {
      id: 'gway-joiner',
      title: 'NullByte Gway Joiner',
      description: 'A Discord automation experiment built around multi-account workflow handling and event-based monitoring.',
      category: ['bots', 'automation'],
      tags: ['NODE.JS', 'SELFBOT', 'discord.js-selfbot-v13'],
      status: 'DEPLOYED',
      icon: 'bolt',
      size: 'medium',
      color: 'var(--tertiary-fixed)',
    },
    {
      id: 'gamerzyash',
      title: 'GamerzYash',
      role: 'Manager',
      description: 'A Commmunity server for GamerzYash YouTuber, i manage the community and server operations.',
      category: ['community'],
      tags: ['COMMUNITY', 'MINECRAFT', 'SOCIAL_MEDIA'],
      status: 'ONGOING',
      icon: 'cloud_queue',
      size: 'medium',
      color: 'var(--primary-container)',
    },
    {
      id: 'nullbyte',
      title: 'NullByte',
      description: 'A coding and development project focused on custom bots, automation systems, web tools, and technical solutions for real use cases.',
      category: ['bots', 'automation', 'web'],
      tags: ['NODE.JS', 'DISCORD_API'],
      status: 'BUILDING',
      icon: 'smart_toy',
      size: 'large',
      color: 'var(--secondary)',
      role: 'Founder & Developer',
    },
    {
      id: 'skycastle',
      title: 'SkyCastle',
      role: 'Executive',
      description: 'A technical brand focused on code server, and development-related services. I manage system operations, technical workflows, and platform-side development.',
      category: ['community', 'web'],
      tags: ['SERVERS', 'INFRA', 'DEVELOPMENT', 'HOSTING', 'SYSADMIN'],
      status: 'ONGOING',
      icon: 'dns',
      size: 'medium',
      color: 'var(--secondary)',
    },
    {
      id: 'loftixhost',
      title: 'LoftixHost',
      role: 'Developer',
      description: 'A Minecraft server hosting brand focused on game hosting, platform management, and technical service operations. I handle management, system administration, and service-side development.',
      category: ['web', 'community'],
      tags: ['HOSTING', 'MINECRAFT', 'SYSADMIN'],
      status: 'ONGOING',
      icon: 'cloud_queue',
      size: 'large',
      color: 'var(--primary-container)',
    },
  ],

  /* ===================== FEATURED WORK ===================== *
   * Project IDs to highlight on the home page hero section.
   * Must match 'id' values from the projects array above.
   * CHANGE_ME: Pick your best 2-3 projects.
   * ================================================ */
  featuredWork: [
    'nullbyte',
    'skycastle',
    'gway-joiner'
  ],

  /* ===================== STACK ===================== *
   * Your technical skills, tools, and infrastructure.
   * CHANGE_ME: Replace with your own tech stack.
   * ================================================ */
  stack: {
    /* Languages & Frameworks you work with */
    languages: [
      { name: 'HTML/CSS', icon: 'html' },
      { name: 'JS/TS', icon: 'javascript' },
      { name: 'Node.js', icon: 'hub' },
      { name: 'Python', icon: 'code' },
      { name: 'Discord.js', icon: 'forum' },
      { name: 'Webhooks', icon: 'webhook' },
      { name: 'SQLite', icon: 'database' },
      { name: 'PostgreSQL', icon: 'database' },
      { name: 'MariaDB', icon: 'database' },
      { name: 'MySQL', icon: 'database' },
      { name: 'Redis', icon: 'database' },
    ],

    /* Your core competency areas */
    domains: [
      { label: 'Frontend', value: 'UI Architecture' },
      { label: 'Backend', value: 'Logic & APIs' },
      { label: 'Payments', value: 'Stripe / UPI' },
      { label: 'Data', value: 'DB Connections' },
    ],

    /* Bot development skills */
    bots: [
      { name: 'Discord API', detail: 'Slash Commands, Buttons, Menus', icon: 'forum' },
      { name: 'Verification Systems', detail: 'Security & Role Management', icon: 'verified_user' },
      { name: 'Payment Automation', detail: 'UPI Transaction Handling', icon: 'payments' },
      { name: 'Logic Engines', detail: 'Multi-Server Deployment Logic', icon: 'memory' },
      { name: 'Selfbot Tooling', detail: 'discord.js-selfbot-v13', icon: 'smart_toy' },
    ],

    /* Development tools you use */
    devTools: [
      { name: 'Antigravity', icon: 'rocket_launch' },
      { name: 'Copilot', icon: 'bolt' },
      { name: 'Claude', icon: 'psychology' },
      { name: 'Gemini', icon: 'auto_awesome' },
      { name: 'ChatGPT', icon: 'forum' },
      { name: 'n8n', icon: 'account_tree' },
      { name: 'Stitch', icon: 'join_inner' },
      { name: 'Git', icon: 'source' },
      { name: 'GitHub', icon: 'code' },
      { name: 'VS Code', icon: 'terminal' },
      { name: 'Replit', icon: 'terminal' },
      { name: 'Codespaces', icon: 'cloud_sync' },
      { name: 'Figma', icon: 'design_services' },
      { name: 'Canva', icon: 'brush' },
      { name: 'Notion', icon: 'article' },
      { name: 'Termius', icon: 'terminal' }
    ],

    /* Infrastructure & cloud platforms */
    infra: [
      { name: 'AWS', icon: 'cloud' },
      { name: 'Oracle Cloud', icon: 'cloud_queue' },
      { name: 'GCP', icon: 'public' },
      { name: 'Azure', icon: 'cloud' },
      { name: 'Digital Ocean', icon: 'water' },
      { name: 'Hetzner', icon: 'server' },
      { name: 'Contabo', icon: 'dns' },
      { name: 'OVHcloud', icon: 'cloud' },
      { name: 'Vercel', icon: 'arrow_upward' },
      { name: 'Netlify', icon: 'web' },
      { name: 'Docker', icon: 'deployed_code' },
      { name: 'Proxmox', icon: 'dns' },
      { name: 'Traefik', icon: 'route' },
      { name: 'Nginx', icon: 'router' },
      { name: 'Cloudflare', icon: 'cloud_done' },
      { name: 'Certbot', icon: 'lock' },
      { name: 'Pterodactyl', icon: 'sports_esports' },
      { name: 'Mythical Dash', icon: 'dashboard' },
      { name: 'Paymenter', icon: 'shopping_cart' },
      { name: 'Coolify', icon: 'cloud_sync' },
      { name: 'Dokploy', icon: 'rocket_launch' }
    ],

    /* Free-text descriptions of your experience areas */
    os: 'Linux-based systems, VPS management, SSH usage, reverse proxies, SSL setup, Docker networking, and general deployment workflows.',
    community: 'Discord server systems, ticket workflows, role setup, permission management, support structure, and technical moderation setups.',
    gaming: 'Minecraft server setup, plugin configuration, proxies, permissions, panel setup, and technical server management.',

    /* What you're currently learning */
    learning: [
      { accent: 'Development', label: 'Full Stack Projects', color: 'primary' },
      { accent: 'Backend', label: 'Better Logic & APIs', color: 'secondary' },
      { accent: 'Automation', label: 'Smarter Workflows', color: 'amber' },
      { accent: 'Systems', label: 'Linux & Deployment', color: 'primary' },
      { accent: 'Growth', label: 'More Real Projects', color: 'secondary' },
    ],
  },

  /* ===================== JOURNEY / TIMELINE ===================== *
   * Your development timeline. Each entry needs:
   *   year         — Time period (e.g., '2021 — PRESENT')
   *   era          — Short label for the era
   *   title        — Heading for the card
   *   description  — What you did during this period
   *   tags         — Key skills/tech from this era
   *   icon         — Material Symbols icon name
   *   borderColor  — CSS color for the card border
   *   nodeGlow     — CSS rgba() for the timeline node glow
   *   side         — 'left' or 'right' (visual layout)
   *   isPulsing    — (Optional) true for the current/active entry
   *
   * CHANGE_ME: Replace with your own timeline.
   * ================================================ */
  journey: [
    {
      year: '2021 — PRESENT',
      era: 'Professional Growth',
      title: 'Professional Growth',
      description: 'Moved from technical setup and community work into more coding-focused development. Built experience through practical projects, experimentation, and real online work.',
      tags: ['Systems Architecture', 'Python', 'Digital Ops'],
      icon: 'code',
      borderColor: 'var(--primary-container)',
      nodeGlow: 'rgba(0, 242, 255, 0.40)',
      side: 'left',
    },
    {
      year: '2021 — 2023',
      era: 'Community Leadership',
      title: 'Community Leadership',
      description: 'Worked on Discord communities through support systems, permissions, role setup, structure, and technical organization.',
      tags: ['Discord API', 'Community Ops', 'Leadership'],
      icon: 'group',
      borderColor: 'var(--secondary-container)',
      nodeGlow: 'rgba(119, 1, 208, 0.40)',
      side: 'right',
    },
    {
      year: '2023 — PRESENT',
      era: 'Infrastructure',
      title: 'VPS & Cloud Engineering',
      description: 'Built hands-on experience with deployment, hosting tools, Linux-based systems, reverse proxy setups, and service management.',
      tags: ['Docker', 'Ubuntu 24.04', 'iptables'],
      icon: 'cloud_queue',
      borderColor: 'var(--tertiary-fixed)',
      nodeGlow: 'rgba(255, 225, 115, 0.30)',
      side: 'left',
    },
    {
      year: '2024 — PRESENT',
      era: 'Current Focus',
      title: 'Full-Stack & AI Systems',
      description: 'Currently exploring full-stack development, automation systems, APIs, AI-assisted tools, and more practical software-focused building.',
      tags: ['React / TS', 'AI Integrations', 'Full Stack'],
      icon: 'rocket_launch',
      borderColor: 'var(--primary-container)',
      nodeGlow: 'rgba(0, 242, 255, 0.40)',
      side: 'right',
      isPulsing: true,
    },
  ],

  /* ===================== LAB PROJECTS ===================== *
   * Experimental / in-progress projects for the Lab page.
   * The first item is featured as the "main" card.
   * CHANGE_ME: Replace with your own experiments.
   * ================================================ */
  lab: [
    {
      id: 'neural-dash',
      title: 'Neural Dashboard V2',
      description: 'A technical dashboard concept focused on real-time monitoring, cleaner UI, and system-based visual tracking.',
      tags: ['React', 'WebSocket', 'Node.js'],
      status: 'BUILDING',
      progress: 68,
      priority: '01',
      icon: 'dashboard',
      size: 'large',
      borderColor: 'var(--primary-container)',
    },
    {
      id: 'esp32-monitor',
      title: 'ESP32 Monitor',
      description: 'A hardware-based monitoring project using ESP32/NodeMCU for temperature tracking and fan control.',
      status: 'IDEATION',
      icon: 'memory',
      color: 'var(--tertiary-fixed)',
    },
    {
      id: 'kick-bridge',
      title: 'Kick ↔ Discord Bridge',
      description: 'A relay-based communication experiment designed to connect Discord messages with external live chat systems.',
      status: 'RESEARCH',
      icon: 'live_tv',
      color: 'var(--secondary)',
    },
    {
      id: 'oci-script',
      title: 'OCI Auto-Provisioner',
      description: 'A cloud utility script built to monitor availability and automate instance-related workflows.',
      status: 'DEPLOYED',
      icon: 'cloud_sync',
      color: 'var(--primary-container)',
    },
    {
      id: 'db-migration',
      title: 'DB Migration Layer',
      description: 'A backend improvement project focused on moving Discord tools from flat-file storage to better structured database systems.',
      status: 'IN_PROGRESS',
      icon: 'storage',
      color: 'var(--tertiary-fixed)',
    },
  ],

  /* ===================== LAB NOTES ===================== *
   * Short log entries displayed on the Lab page
   * (only visible if features.showLabNotes is true).
   * CHANGE_ME: Replace with your own notes.
   * ================================================ */
  labNotes: [
    { text: 'Fixed ARM64 apt sources → ports.ubuntu.com/ubuntu-ports', color: 'var(--primary-container)' },
    { text: 'Purged firewalld, switched to iptables-legacy on vps-in01', color: 'var(--primary-container)' },
    { text: 'Resolved Coolify TLS config — tls.yaml separate from coolify.yaml', color: 'var(--secondary)' },
    { text: 'Fixed DiscordAPIError 50001 + 10003 in giveaway.js', color: 'var(--secondary)' },
    { text: 'Node 20+ via .nvmrc for discord.js-selfbot-v13@3.7.0', color: 'var(--tertiary-fixed)' },
    { text: '.nixpacks.toml — skip system pkg installs on Dokploy', color: 'var(--tertiary-fixed)' },
  ],

  /* ===================== NAV LINKS ===================== *
   * Navigation items. The 'id' must match the page section
   * ID in the HTML (e.g., id="page-home").
   * You can remove pages here to hide them from the nav.
   * ================================================ */
  navLinks: [
    { id: 'home', label: 'Home', icon: 'home', enabled: true },
    { id: 'profile', label: 'Profile', icon: 'person', enabled: true },
    { id: 'projects', label: 'Projects', icon: 'code', enabled: true },
    { id: 'stack', label: 'Stack', icon: 'layers', enabled: true },
    { id: 'journey', label: 'Journey', icon: 'timeline', enabled: true },
    { id: 'lab', label: 'Lab', icon: 'science', enabled: true },
    { id: 'social', label: 'Social', icon: 'hub', enabled: true },
    { id: 'connect', label: 'Connect', icon: 'alternate_email', enabled: true },
  ],

  /* ===================== SOCIAL LINKS ===================== *
   * Social media profiles shown on the Social and Connect pages.
   * Set href to '#' for platforms you haven't set up yet.
   * CHANGE_ME: Replace with your own social links.
   * ================================================ */
  social: [
    { id: 'github', label: 'GitHub', icon: 'code', href: 'https://github.com/KrArjan' },
    { id: 'discord', label: 'Discord', icon: 'forum', href: 'https://discord.com/users/606851356854321171' },
    { id: 'email', label: 'Email', icon: 'alternate_email', href: 'mailto:krarjanwork@gmail.com' },
    { id: 'site', label: 'NullByte', icon: 'language', href: 'https://nullbyte.qzz.io' },
    { id: 'instagram', label: 'Instagram', icon: 'photo_camera', href: '#' },
    { id: 'linkedin', label: 'LinkedIn', icon: 'work', href: '#' },
    { id: 'x', label: 'X', icon: 'close', href: '#' },
    { id: 'reddit', label: 'Reddit', icon: 'forum', href: '#' },
    { id: 'steam', label: 'Steam', icon: 'sports_esports', href: '#' },
    { id: 'spotify', label: 'Spotify', icon: 'music_note', href: '#' },
  ],

  /* ===================== BOOT LOG LINES ===================== *
   * Terminal-style boot messages shown on the loading screen.
   * CHANGE_ME: Customize the boot sequence text.
   * ================================================ */
  bootLog: [
    { text: 'Initializing KrArjan Interface', status: 'OK', delay: 300 },
    { text: 'Loading Projects', status: 'PROC...', delay: 900, isActive: true },
    { text: 'Syncing Modules', status: 'WAIT', delay: 1500 },
    { text: 'Booting Portfolio', status: 'QUEUED', delay: 2100 },
  ],
};

/* Export for use in other modules */
if (typeof module !== 'undefined') module.exports = SITE_DATA;