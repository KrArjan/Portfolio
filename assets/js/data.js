/* ============================================================
   data.js — Site Content & Configuration
   All text, project info, tech stack, timeline entries, etc.
   ============================================================ */

'use strict';

const SITE_DATA = {

  /* ===================== META ===================== */
  meta: {
    name: 'KrArjan',
    title: 'KrArjan',
    tagline: 'Building Since 2021.',
    role: 'Student Developer & Technical Builder',
    description: 'Building software, bots, tools, and digital systems that move the needle.',
    version: '2.0.4',
    buildRef: 'KR-77-LAB',
    email: 'krarjanwork@gmail.com',
    github: 'https://github.com/KrArjan',
    discord: 'https://discord.gg/nullbyte',
    site: 'https://nullbyte.qzz.io',
    cpanel: 'https://cpanel.nullbyte.qzz.io',
    authToken: '0x7701D0_A39C',
    buildSince: '2021',
  },

  /* ===================== STATS ===================== */
  stats: [
    { value: '2021', label: 'Started Building', color: 'var(--primary-container)' },
    { value: '10+', label: 'Projects Worked On', color: 'var(--secondary)' },
    { value: '4+', label: 'Years of Experience', color: 'var(--tertiary-fixed)' },
    { value: 'Code + Systems', label: 'Work Focus', color: 'var(--primary-container)' },
  ],

  /* ===================== PROJECTS ===================== */
  projects: [
    {
      id: 'upi-bot',
      title: 'Discord UPI Payment Bot',
      description: 'A Discord bot built to handle payment workflows using UPI and crypto, with command-based interaction, verification logic, and utility-focused automation.',
      category: ['bots', 'automation'],
      tags: ['NODE.JS', 'PYTHON', 'REST_API', 'AUTOMATION'],
      status: 'ONGOING_PROCESS',
      uuid: '4492-UPI-BOT',
      icon: 'payments',
      size: 'large',
      color: 'var(--primary-container)',
    },
    {
      id: 'nullbyte',
      title: 'NullByte',
      description: 'A development-focused project for building custom Discord bots, coded tools, and useful technical solutions.',
      category: ['bots', 'automation', 'web'],
      tags: ['NODE.JS', 'DISCORD_API'],
      status: 'ONGOING',
      icon: 'smart_toy',
      size: 'medium',
      color: 'var(--secondary)',
      role: 'Founder & Developer',
    },
    {
      id: 'gway-joiner',
      title: 'NullByte Gway Joiner',
      description: 'A Discord automation experiment built around multi-account workflow handling and event-based monitoring.',
      category: ['bots', 'automation'],
      tags: ['NODE.JS', 'SELFBOT', 'discord.js-selfbot-v13'],
      status: 'ONGOING',
      icon: 'bolt',
      size: 'medium',
      color: 'var(--tertiary-fixed)',
    },
    {
      id: 'skycastle',
      title: 'SkyCastle',
      description: 'A technical project involving digital services, platform operations, and system-related management work.',
      category: ['community', 'web'],
      tags: ['SYSTEM_OPS', 'INFRA'],
      status: 'ONGOING',
      icon: 'dns',
      size: 'medium',
      color: 'var(--secondary)',
    },
    {
      id: 'loftixhost',
      title: 'LoftixHost',
      description: 'A project involving web development, Discord systems, and technical platform-related work.',
      category: ['web', 'community'],
      tags: ['FULL_STACK', 'WEB', 'BOTS'],
      status: 'ONGOING',
      icon: 'cloud_queue',
      size: 'medium',
      color: 'var(--primary-container)',
    },
    {
      id: 'oci-provisioner',
      title: 'OCI ARM Provisioner',
      description: 'An automation script built to monitor and provision cloud ARM instances using PHP, scheduling logic, and utility workflows.',
      category: ['automation', 'web'],
      tags: ['PHP', 'CRON', 'ORACLE_CLOUD'],
      status: 'DEPLOYED',
      icon: 'cloud_sync',
      size: 'medium',
      color: 'var(--primary-container)',
    },
    {
      id: 'coolify-setup',
      title: 'Coolify + Traefik Setup',
      description: 'A self-hosted deployment setup built around Coolify, reverse proxy routing, and technical service management.',
      category: ['web', 'automation'],
      tags: ['DOCKER', 'TRAEFIK', 'CLOUDFLARE', 'ARM64'],
      status: 'DEPLOYED',
      icon: 'settings_input_component',
      size: 'medium',
      color: 'var(--secondary)',
    },
  ],

  /* ===================== STACK ===================== */
  stack: {
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
    domains: [
      { label: 'Frontend', value: 'UI Architecture' },
      { label: 'Backend', value: 'Logic & APIs' },
      { label: 'Payments', value: 'Stripe / UPI' },
      { label: 'Data', value: 'DB Connections' },
    ],
    bots: [
      { name: 'Discord API', detail: 'Slash Commands, Buttons, Menus', icon: 'forum' },
      { name: 'Verification Systems', detail: 'Security & Role Management', icon: 'verified_user' },
      { name: 'Payment Automation', detail: 'UPI Transaction Handling', icon: 'payments' },
      { name: 'Logic Engines', detail: 'Multi-Server Deployment Logic', icon: 'memory' },
      { name: 'Selfbot Tooling', detail: 'discord.js-selfbot-v13', icon: 'smart_toy' },
    ],
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

    os: 'Linux-based systems, VPS management, SSH usage, reverse proxies, SSL setup, Docker networking, and general deployment workflows.',

    community: 'Discord server systems, ticket workflows, role setup, permission management, support structure, and technical moderation setups.',

    gaming: 'Minecraft server setup, plugin configuration, proxies, permissions, panel setup, and technical server management.',

    learning: [
      { accent: 'Development', label: 'Full Stack Projects', color: 'primary' },
      { accent: 'Backend', label: 'Better Logic & APIs', color: 'secondary' },
      { accent: 'Automation', label: 'Smarter Workflows', color: 'amber' },
      { accent: 'Systems', label: 'Linux & Deployment', color: 'primary' },
      { accent: 'Growth', label: 'More Real Projects', color: 'secondary' },
    ],
  },

  /* ===================== JOURNEY / TIMELINE ===================== */
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

  /* ===================== LAB PROJECTS ===================== */
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
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'profile', label: 'Profile', icon: 'person' },
    { id: 'projects', label: 'Projects', icon: 'code' },
    { id: 'stack', label: 'Stack', icon: 'layers' },
    { id: 'journey', label: 'Journey', icon: 'timeline' },
    { id: 'lab', label: 'Lab', icon: 'science' },
    { id: 'social', label: 'Social', icon: 'hub' },
    { id: 'connect', label: 'Connect', icon: 'alternate_email' },
  ],

  /* ===================== SOCIAL LINKS ===================== */
  social: [
    { id: 'github', label: 'GitHub', icon: 'code', href: 'https://github.com/KrArjan' },
    { id: 'discord', label: 'Discord', icon: 'forum', href: 'https://discord.gg/nullbyte' },
    { id: 'email', label: 'Email', icon: 'alternate_email', href: 'mailto:krarjan@nullbyte.qzz.io' },
    { id: 'site', label: 'NullByte', icon: 'language', href: 'https://nullbyte.qzz.io' },
  ],

  /* ===================== BOOT LOG LINES ===================== */
  bootLog: [
    { text: 'Initializing KrArjan Interface', status: 'OK', delay: 300 },
    { text: 'Loading Projects', status: 'PROC...', delay: 900, isActive: true },
    { text: 'Syncing Modules', status: 'WAIT', delay: 1500 },
    { text: 'Booting Portfolio', status: 'QUEUED', delay: 2100 },
  ],
};

/* Export for use in other modules */
if (typeof module !== 'undefined') module.exports = SITE_DATA;
