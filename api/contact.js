/**
 * api/contact.js — Unified Backend Engine
 * ---------------------------------------
 * Supports: Cloudflare Workers, Vercel Functions, Netlify Functions
 * ---------------------------------------
 */

import { WORKER_CONFIG } from '../config/connect.config.js';

/**
 * 🟡 CORE LOGIC (Platform-Agnostic)
 */
export async function contactLogic(body, env, requestHeaders = {}) {
  try {
    const { name, email, subject, message, token, ipv4 } = body;

    // 1. Validation
    if (!env.TURNSTILE_SECRET_KEY) return { status: 500, error: 'BACKEND_CONFIGURATION_INCOMPLETE' };
    if (!token) return { status: 400, error: 'SECURITY_TOKEN_MISSING' };

    // 2. Verify Turnstile
    const verifyFormData = new FormData();
    verifyFormData.append('secret', env.TURNSTILE_SECRET_KEY);
    verifyFormData.append('response', token);
    const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: verifyFormData });
    const verifyJson = await verifyRes.json();
    if (!verifyJson.success) return { status: 403, error: 'SECURITY_VERIFICATION_FAILED' };

    // 3. Prepare Payload
    const placeholders = { name, email, message, subject: subject || 'No Subject' };
    const embedCfg = WORKER_CONFIG.notifications.embed;
    const discordPayload = {
      username: WORKER_CONFIG.notifications.username || "Portfolio Bot",
      avatar_url: WORKER_CONFIG.notifications.avatar_url || "",
      embeds: [{
        title: formatTemplate(embedCfg.titleTemplate, placeholders),
        description: embedCfg.descriptionText,
        color: embedCfg.color || 0x00D0FF,
        fields: [
          { name: "IDENTIFIER", value: `\`${name}\``, inline: true },
          { name: "SECURE_EMAIL", value: `\`${email}\``, inline: true },
          { name: "SUBJECT", value: subject, inline: false },
          { name: "MESSAGE_PAYLOAD", value: message }
        ],
        timestamp: new Date().toISOString(),
        footer: { text: `${embedCfg.footerText} | IP: ${ipv4 || '0.0.0.0'}` }
      }]
    };

    // 4. Parallel Transmission
    const transmissions = [];

    // Discord Webhooks
    if (WORKER_CONFIG.channels.discord_webhook && env.DISCORD_WEBHOOK_URLS) {
      env.DISCORD_WEBHOOK_URLS.split(',').forEach(url => {
        transmissions.push(fetch(url.trim(), { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(discordPayload) }));
      });
    }

    // Discord DMs
    if (WORKER_CONFIG.channels.discord_dm && env.DISCORD_BOT_TOKEN && env.DISCORD_USER_IDS) {
      env.DISCORD_USER_IDS.split(',').forEach(userId => {
        transmissions.push(sendDiscordDM(env.DISCORD_BOT_TOKEN, userId.trim(), discordPayload));
      });
    }

    // EmailJS
    if (WORKER_CONFIG.channels.emailjs && env.EMAILJS_SERVICE_ID && env.EMAILJS_TEMPLATE_ID) {
      transmissions.push(sendEmailJS(env, { from_name: name, from_email: email, subject: (WORKER_CONFIG.notifications.email.subjectPrefix || "") + subject, message: message }));
    }

    const results = await Promise.allSettled(transmissions);
    const failed = results.filter(r => r.status === 'rejected' || (r.value && !r.value.ok)).length;

    return { status: 200, success: true, delivery: (failed > 0 && failed < transmissions.length) ? 'PARTIAL' : 'COMPLETE' };

  } catch (err) {
    console.error("Core Engine Failure:", err);
    return { status: 500, error: 'CORE_PROCESS_FAILURE' };
  }
}

/**
 * 🟢 Node.js WRAPPER (Vercel / Netlify)
 */
export default async function handler(req, res) {
  if (req.method === 'OPTIONS') return res.status(240).end();
  const result = await contactLogic(req.body, process.env, req.headers);
  return res.status(result.status).json(result);
}

// Helpers
async function sendDiscordDM(token, userId, payload) {
    const res = await fetch('https://discord.com/api/v10/users/@me/channels', { method: 'POST', headers: { 'Authorization': `Bot ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ recipient_id: userId }) });
    if (!res.ok) return { ok: false };
    const { id } = await res.json();
    return fetch(`https://discord.com/api/v10/channels/${id}/messages`, { method: 'POST', headers: { 'Authorization': `Bot ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ embeds: payload.embeds }) });
}

async function sendEmailJS(env, params) {
    const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ service_id: env.EMAILJS_SERVICE_ID, template_id: env.EMAILJS_TEMPLATE_ID, user_id: env.EMAILJS_PUBLIC_KEY, template_params: params, ...(env.EMAILJS_PRIVATE_KEY && { accessToken: env.EMAILJS_PRIVATE_KEY }) }) });
    return { ok: res.ok };
}

function formatTemplate(t, p) { return t.replace(/{{(\w+)}}/g, (_, k) => p[k] || ""); }
