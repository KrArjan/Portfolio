/* ============================================================
   data.js — Site Content & Configuration
   All text, project info, tech stack, timeline entries, etc.
   ============================================================ */

'use strict';

const SITE_DATA = {

  /* ===================== META ===================== */
  meta: {
    name:       'KrArjan',
    title:      'KRARJAN // THE_KINETIC_ARCHITECT',
    tagline:    'The Kinetic Architect.',
    role:       'Student Developer & Technical Builder',
    description:'Building software, bots, tools, and digital systems that move the needle.',
    version:    '2.0.4',
    buildRef:   'KR-77-LAB',
    email:      'krarjan@nullbyte.qzz.io',
    github:     'https://github.com/KrArjan',
    discord:    'https://discord.gg/nullbyte',
    site:       'https://nullbyte.qzz.io',
    cpanel:     'https://cpanel.nullbyte.qzz.io',
    authToken:  '0x7701D0_A39C',
    buildSince: '2021',
  },

  /* ===================== STATS ===================== */
  stats: [
    { value: '2021', label: 'Building Since', color: 'var(--primary-container)' },
    { value: '12+',  label: 'Real Projects',  color: 'var(--secondary)' },
    { value: '∞',    label: 'Technical Hours', color: 'var(--tertiary-fixed)' },
    { value: 'MULTI',label: 'Skill Background', color: 'var(--primary-container)' },
  ],

  /* ===================== PROJECTS ===================== */
  projects: [
    {
      id:          'upi-bot',
      title:       'Discord UPI Payment Bot',
      description: 'A sophisticated automated financial gateway bridging Discord UI with UPI interfaces. Handles real-time verification, transaction logging, and error recovery via specialized APIs.',
      category:    ['bots', 'automation'],
      tags:        ['NODE.JS', 'PYTHON', 'REST_API', 'AUTOMATION'],
      status:      'ONGOING_PROCESS',
      uuid:        '4492-UPI-BOT',
      icon:        'payments',
      size:        'large',
      color:       'var(--primary-container)',
    },
    {
      id:          'nullbyte',
      title:       'NullByte',
      description: 'Next-gen web development and specialized Discord automation infrastructure. Founder & developer of the entire ecosystem.',
      category:    ['bots', 'automation', 'web'],
      tags:        ['NODE.JS', 'DISCORD_API'],
      status:      'ONGOING',
      icon:        'smart_toy',
      size:        'medium',
      color:       'var(--secondary)',
      role:        'Founder & Developer',
    },
    {
      id:          'gway-joiner',
      title:       'NullByte Gway Joiner',
      description: 'Multi-account Discord selfbot for giveaway monitoring and automated gateway participation with branched error handling.',
      category:    ['bots', 'automation'],
      tags:        ['NODE.JS', 'SELFBOT', 'discord.js-selfbot-v13'],
      status:      'ONGOING',
      icon:        'bolt',
      size:        'medium',
      color:       'var(--tertiary-fixed)',
    },
    {
      id:          'skycastle',
      title:       'SkyCastle',
      description: 'Technical Operations & System Work. Maintaining architectural stability across distributed nodes and large-scale Discord communities.',
      category:    ['community', 'web'],
      tags:        ['SYSTEM_OPS', 'INFRA'],
      status:      'ONGOING',
      icon:        'dns',
      size:        'medium',
      color:       'var(--secondary)',
    },
    {
      id:          'loftixhost',
      title:       'LoftixHost',
      description: 'Full-stack web development and high-performance Discord bot integration for hosting infrastructure and client management.',
      category:    ['web', 'community'],
      tags:        ['FULL_STACK', 'WEB', 'BOTS'],
      status:      'ONGOING',
      icon:        'cloud_queue',
      size:        'medium',
      color:       'var(--primary-container)',
    },
    {
      id:          'oci-provisioner',
      title:       'OCI ARM Provisioner',
      description: 'Automated Oracle Cloud ARM instance provisioner using PHP script + cron jobs for free-tier capacity monitoring with IST timezone logging.',
      category:    ['automation', 'web'],
      tags:        ['PHP', 'CRON', 'ORACLE_CLOUD'],
      status:      'DEPLOYED',
      icon:        'cloud_sync',
      size:        'medium',
      color:       'var(--primary-container)',
    },
    {
      id:          'coolify-setup',
      title:       'Coolify + Traefik Setup',
      description: 'Self-hosted Coolify deployment on Oracle ARM VPS with Traefik reverse proxy and Cloudflare Origin CA certificates for full HTTPS automation.',
      category:    ['web', 'automation'],
      tags:        ['DOCKER', 'TRAEFIK', 'CLOUDFLARE', 'ARM64'],
      status:      'DEPLOYED',
      icon:        'settings_input_component',
      size:        'medium',
      color:       'var(--secondary)',
    },
  ],

  /* ===================== STACK ===================== */
  stack: {
    languages: ['HTML/CSS', 'JS/TS', 'Node.js', 'Python', 'Java/C/C++', 'C# / PHP', 'SQL / Bash'],
    domains: [
      { label: 'Frontend', value: 'UI Architecture' },
      { label: 'Backend',  value: 'Logic & APIs' },
      { label: 'Payments', value: 'Stripe / UPI' },
      { label: 'Data',     value: 'DB Connections' },
    ],
    bots: [
      { name: 'Discord API',        detail: 'Slash Commands, Buttons, Menus' },
      { name: 'Verification Systems', detail: 'Security & Role Management' },
      { name: 'Payment Automation', detail: 'UPI Transaction Handling' },
      { name: 'Logic Engines',      detail: 'Multi-Server Deployment Logic' },
      { name: 'Selfbot Tooling',    detail: 'discord.js-selfbot-v13' },
    ],
    devTools:   ['GitHub', 'Docker', 'VS Code', 'Figma', 'Proxmox', 'Notion'],
    infra:      ['Pterodactyl', 'Coolify', 'Dokploy', 'Traefik', 'Cloudflare', 'Termius'],
    os:         'Linux (Ubuntu 24.04 ARM64), VPS Management, SSH Security, iptables, Reverse Proxy (Nginx/Traefik), SSL Certificates, Docker networking.',
    community:  'Ticket System Architecture, Staff Hierarchies, Operational Scalability, Advanced Discord Permissions, Support Logic.',
    gaming:     'Minecraft Server Setup, Plugin Configuration, BungeeCord/Velocity Proxying, Permission Orchestration, Custom Configs.',
    learning: [
      { accent: 'Stack Expansion', label: 'Full Stack Dev',      color: 'primary' },
      { accent: 'Architecture',    label: 'Better Backend',      color: 'secondary' },
      { accent: 'Connectivity',    label: 'API Integrations',    color: 'amber' },
      { accent: 'Networking',      label: 'iptables & Linux',    color: 'primary' },
      { accent: 'Logic',           label: 'More Coding',         color: 'secondary' },
    ],
  },

  /* ===================== JOURNEY / TIMELINE ===================== */
  journey: [
    {
      year:        '2021 — Present',
      era:         'Professional Growth',
      title:       'Student Developer & Builder',
      description: 'Transitioned from organizational management into full-stack development. Focused on architecting technical systems, automation bots, and expansive digital platforms.',
      tags:        ['Systems Architecture', 'Python', 'Digital Ops'],
      icon:        'code',
      borderColor: 'var(--primary-container)',
      nodeGlow:    'rgba(0, 242, 255, 0.40)',
      side:        'left',
    },
    {
      year:        '2021 — 2023',
      era:         'Community Leadership',
      title:       'Co-Owner / Operations',
      description: 'Led technical operations for multiple Discord communities. Built permission systems, ticket bots, and managed staff hierarchies across thousands of members.',
      tags:        ['Discord API', 'Community Ops', 'Leadership'],
      icon:        'group',
      borderColor: 'var(--secondary-container)',
      nodeGlow:    'rgba(119, 1, 208, 0.40)',
      side:        'right',
    },
    {
      year:        '2023 — Present',
      era:         'Infrastructure',
      title:       'VPS & Cloud Engineering',
      description: 'Set up production-grade infrastructure on Oracle Cloud ARM64. Configured Docker, Coolify, Traefik with Cloudflare Origin CA. Resolved complex networking conflicts between nftables and iptables on vps-in01.',
      tags:        ['Docker', 'Ubuntu 24.04', 'iptables'],
      icon:        'cloud_queue',
      borderColor: 'var(--tertiary-fixed)',
      nodeGlow:    'rgba(255, 225, 115, 0.30)',
      side:        'left',
    },
    {
      year:        '2024 — Present',
      era:         'Current Focus',
      title:       'Full-Stack & AI Systems',
      description: 'Deep-diving into full-stack development, AI integrations, and building production-ready web applications. Expanding the technical arsenal with React, TypeScript, and modern backend patterns.',
      tags:        ['React / TS', 'AI Integrations', 'Full Stack'],
      icon:        'rocket_launch',
      borderColor: 'var(--primary-container)',
      nodeGlow:    'rgba(0, 242, 255, 0.40)',
      side:        'right',
      isPulsing:   true,
    },
  ],

  /* ===================== LAB PROJECTS ===================== */
  lab: [
    {
      id:          'neural-dash',
      title:       'Neural Dashboard V2',
      description: 'High-performance technical dashboard with real-time backend node monitoring. React + WebSocket architecture for live data visualization.',
      tags:        ['React', 'WebSocket', 'Node.js'],
      status:      'BUILDING',
      progress:    68,
      priority:    '01',
      icon:        'dashboard',
      size:        'large',
      borderColor: 'var(--primary-container)',
    },
    {
      id:          'esp32-monitor',
      title:       'ESP32 Monitor',
      description: 'Temperature + fan PWM control using ESP32/NodeMCU with MQTT, InfluxDB & Grafana dashboard integration.',
      status:      'IDEATION',
      icon:        'memory',
      color:       'var(--tertiary-fixed)',
    },
    {
      id:          'kick-bridge',
      title:       'Kick ↔ Discord Bridge',
      description: 'Reverse-engineered WebSocket relay forwarding Discord channel messages to Kick live chat in real-time.',
      status:      'RESEARCH',
      icon:        'live_tv',
      color:       'var(--secondary)',
    },
    {
      id:          'oci-script',
      title:       'OCI Auto-Provisioner',
      description: 'PHP-based Oracle Cloud ARM capacity monitor with cron scheduling and IST timezone support.',
      status:      'DEPLOYED',
      icon:        'cloud_sync',
      color:       'var(--primary-container)',
    },
    {
      id:          'db-migration',
      title:       'DB Migration Layer',
      description: 'Moving Discord tooling from JSON flat-file storage to SQLite/PostgreSQL with pg library integration.',
      status:      'IN_PROGRESS',
      icon:        'storage',
      color:       'var(--tertiary-fixed)',
    },
  ],

  /* ===================== LAB NOTES ===================== */
  labNotes: [
    { text: 'Fixed ARM64 apt sources → ports.ubuntu.com/ubuntu-ports', color: 'var(--primary-container)' },
    { text: 'Purged firewalld, switched to iptables-legacy on vps-in01', color: 'var(--primary-container)' },
    { text: 'Resolved Coolify TLS config — tls.yaml separate from coolify.yaml', color: 'var(--secondary)' },
    { text: 'Fixed DiscordAPIError 50001 + 10003 in giveaway.js', color: 'var(--secondary)' },
    { text: 'Node 20+ via .nvmrc for discord.js-selfbot-v13@3.7.0', color: 'var(--tertiary-fixed)' },
    { text: '.nixpacks.toml — skip system pkg installs on Dokploy', color: 'var(--tertiary-fixed)' },
  ],

  /* ===================== NAV LINKS ===================== */
  navLinks: [
    { id: 'home',     label: 'Home',     icon: 'home' },
    { id: 'profile',  label: 'Profile',  icon: 'person' },
    { id: 'projects', label: 'Projects', icon: 'code' },
    { id: 'stack',    label: 'Stack',    icon: 'layers' },
    { id: 'journey',  label: 'Journey',  icon: 'timeline' },
    { id: 'lab',      label: 'Lab',      icon: 'science' },
    { id: 'connect',  label: 'Connect',  icon: 'alternate_email' },
  ],

  /* ===================== SOCIAL LINKS ===================== */
  social: [
    { id: 'github',   label: 'GitHub',   icon: 'code',            href: 'https://github.com/KrArjan' },
    { id: 'discord',  label: 'Discord',  icon: 'forum',           href: 'https://discord.gg/nullbyte' },
    { id: 'email',    label: 'Email',    icon: 'alternate_email',  href: 'mailto:krarjan@nullbyte.qzz.io' },
    { id: 'site',     label: 'NullByte', icon: 'language',        href: 'https://nullbyte.qzz.io' },
  ],

  /* ===================== BOOT LOG LINES ===================== */
  bootLog: [
    { text: 'Initializing KrArjan Interface', status: 'OK',     delay: 300 },
    { text: 'Loading Projects',               status: 'PROC...', delay: 900,  isActive: true },
    { text: 'Syncing Modules',               status: 'WAIT',   delay: 1500 },
    { text: 'Booting Portfolio',             status: 'QUEUED', delay: 2100 },
  ],
};

/* Export for use in other modules */
if (typeof module !== 'undefined') module.exports = SITE_DATA;
