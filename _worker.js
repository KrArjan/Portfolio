/**
 * Cloudflare Worker: Portfolio Backend
 * Handles:
 * 1. Contact Form Submissions (/api/contact) with Discord Webhook & Turnstile Verification
 * 2. Static Asset Serving (Fallback to env.ASSETS)
 */

import { WORKER_CONFIG } from './config/connect.config.js';


export default {
  async fetch(request, env) {
    try {
      const url = new URL(request.url);

      // 1. Handle CORS Pre-flight (OPTIONS)
      if (request.method === "OPTIONS") {
        return new Response(null, {
          status: 204,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '86400',
          }
        });
      }

      // 2. API: Contact Form Submission
      if (url.pathname === "/api/contact" && request.method === "POST") {
        return handleContactForm(request, env);
      }

      // 3. SPA Routing Fallback
      // If the path doesn't look like a file (no extension), serve index.html
      // We check for a dot followed by at least 2-4 extension characters
      const hasExtension = /\.[a-z0-9]{2,4}$/i.test(url.pathname);

      if (!hasExtension && url.pathname !== "/") {
        if (!env.ASSETS) {
          return new Response("ERROR_SPA_ROUTING: env.ASSETS_BINDING_NOT_CONFIGURED. Check wrangler.toml for [assets] binding = 'ASSETS'.", { status: 500 });
        }
        // Force fallback to the root index.html
        return env.ASSETS.fetch(new Request(url.origin, request));
      }

      // 4. Default: Serve static assets
      if (!env.ASSETS) {
        return new Response("ERROR_STATIC_ASSET: env.ASSETS_BINDING_MISSING.", { status: 500 });
      }

      return env.ASSETS.fetch(request);

    } catch (err) {
      console.error("Worker Global Exception:", err);
      return new Response(JSON.stringify({
        error: 'WORKER_RUNTIME_EXCEPTION',
        message: err.message,
        stack: err.stack
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }
};

/**
 * Handles the contact form POST request.
 * Verifies Turnstile token and sends a rich embed to Discord.
 */
async function handleContactForm(request, env) {
  try {
    // 0. Configuration Validation
    if (!env.TURNSTILE_SECRET_KEY || env.TURNSTILE_SECRET_KEY === '' || env.TURNSTILE_SECRET_KEY.includes('PASTE_YOUR')) {
      console.error("Missing TURNSTILE_SECRET_KEY");
      return new Response(JSON.stringify({
        error: 'BACKEND_CONFIGURATION_INCOMPLETE',
        detail: 'TURNSTILE_SECRET_KEY is missing or invalid in environment settings.'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!env.DISCORD_WEBHOOK_URL || env.DISCORD_WEBHOOK_URL === '' || env.DISCORD_WEBHOOK_URL.includes('PASTE_YOUR')) {
      console.error("Missing DISCORD_WEBHOOK_URL");
      return new Response(JSON.stringify({
        error: 'BACKEND_CONFIGURATION_INCOMPLETE',
        detail: 'DISCORD_WEBHOOK_URL is missing or invalid in environment settings.'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const body = await request.json();
    const { name, email, subject, message, token, ipv4 } = body;

    // 1. Verify Turnstile Token
    if (!token) {
      return new Response(JSON.stringify({ error: 'SECURITY_TOKEN_MISSING' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const verifyFormData = new FormData();
    const clientIP = getClientIP(request);
    verifyFormData.append('secret', env.TURNSTILE_SECRET_KEY);
    verifyFormData.append('response', token);
    verifyFormData.append('remoteip', clientIP);

    const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: verifyFormData
    });

    const verifyJson = await verifyRes.json();
    if (!verifyJson.success) {
      return new Response(JSON.stringify({ error: 'SECURITY_VERIFICATION_FAILED' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 2. Prepare Discord Payload
    const placeholders = {
      name: name,
      email: email,
      subject: subject || 'No Subject',
      message: message
    };

    const discordPayload = {
      username: WORKER_CONFIG.notifications.username || "KrArjan Portfolio",
      avatar_url: WORKER_CONFIG.notifications.avatar_url || "https://raw.githubusercontent.com/KrArjan/Portfolio/main/config/images/pfp.png",
      embeds: [{
        title: formatTemplate(WORKER_CONFIG.notifications.embed.titleTemplate, placeholders),
        description: WORKER_CONFIG.notifications.embed.descriptionText || `Source: Portfolio Contact System`,
        color: WORKER_CONFIG.notifications.embed.color || 0x00D0FF,
        fields: [
          { name: "IDENTIFIER", value: `\`${name}\``, inline: true },
          { name: "SECURE_EMAIL", value: `\`${email}\``, inline: true },
          { name: "SUBJECT", value: subject, inline: false },
          { name: "MESSAGE_PAYLOAD", value: message.length > 1024 ? message.substring(0, 1021) + "..." : message }
        ],
        timestamp: new Date().toISOString(),
        footer: {
          text: `${WORKER_CONFIG.notifications.embed.footerText || "KrArjan Terminal"} | IP: ${getClientIP(request, ipv4)}`
        }
      }]
    };

    // 3. Parallel Transmission (Webhook & DM)
    const transmissions = [];

    // Webhook Transmissions (if configured AND enabled)
    if (WORKER_CONFIG.channels.discord_webhook && env.DISCORD_WEBHOOK_URL && !env.DISCORD_WEBHOOK_URL.includes('PASTE_YOUR')) {

      const webhookUrls = env.DISCORD_WEBHOOK_URL.split(',').map(part => {
        // Remove everything after '#' if it exists
        const cleanUrl = part.split('#')[0].trim();
        return cleanUrl;
      }).filter(url => url.length > 0);

      webhookUrls.forEach(url => {
        transmissions.push(fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(discordPayload)
        }));
      });
    }

    // DM Transmission (if configured AND enabled)
    if (WORKER_CONFIG.channels.discord_dm && env.DISCORD_BOT_TOKEN && env.DISCORD_BOT_TOKEN !== '' && env.DISCORD_USER_ID && env.DISCORD_USER_ID !== '' && !env.DISCORD_BOT_TOKEN.includes('PASTE_YOUR')) {

      const userIds = env.DISCORD_USER_ID.split(',').map(part => {
        // Remove everything after '#' if it exists
        const cleanId = part.split('#')[0].trim();
        return cleanId;
      }).filter(id => id.length > 0);

      userIds.forEach(userId => {
        transmissions.push(sendDiscordDM(env.DISCORD_BOT_TOKEN, userId, discordPayload));
      });
    }

    // EmailJS Transmission (REST API)
    if (WORKER_CONFIG.channels.emailjs && env.EMAILJS_SERVICE_ID && env.EMAILJS_TEMPLATE_ID && !env.EMAILJS_SERVICE_ID.includes('PASTE_YOUR')) {
      transmissions.push(sendEmailJS(env, {
        from_name: name,
        from_email: email,
        subject: (WORKER_CONFIG.notifications.email.subjectPrefix || "") + subject,
        message: message
      }));
    }


    const results = await Promise.allSettled(transmissions);
    const failed = results.filter(r => {
      // Check for rejected promises or internal {ok: false} returns
      return r.status === 'rejected' || (r.value && r.value.ok === false);
    });

    if (failed.length === transmissions.length) {
      console.error("All transmissions failed:", results);
      throw new Error('ALL_TRANSMISSIONS_FAILED');
    }

    // 4. Return Success
    return new Response(JSON.stringify({
      success: true,
      message: 'TRANSMISSION_SUCCESS',
      delivery: failed.length > 0 ? 'PARTIAL' : 'COMPLETE',
      details: failed.length > 0 ? "Some Discord deliveries failed. Check logs." : null
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });

  } catch (err) {
    console.error("Worker process error:", err);
    return new Response(JSON.stringify({ error: 'CORE_PROCESS_FAILURE', detail: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

/**
 * Sends a DM to a specific Discord user via the Bot API.
 */
async function sendDiscordDM(token, userId, payload) {
  try {
    // 1. Create DM channel
    const channelRes = await fetch('https://discord.com/api/v10/users/@me/channels', {
      method: 'POST',
      headers: {
        'Authorization': `Bot ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ recipient_id: userId })
    });

    if (!channelRes.ok) {
      const errorData = await channelRes.text();
      console.error("DM Channel Creation Failed:", errorData);
      return { ok: false, error: 'DM_CHANNEL_FAILURE' };
    }

    const channelData = await channelRes.json();
    const channelId = channelData.id;

    // 2. Send Message to the channel
    const messageRes = await fetch(`https://discord.com/api/v10/channels/${channelId}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bot ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ embeds: payload.embeds })
    });

    return messageRes;
  } catch (err) {
    console.error("sendDiscordDM Exception:", err);
    return { ok: false, error: err.message };
  }
}

/**
 * Sends an email via the EmailJS REST API.
 * Uses Service ID, Template ID, and Public Key from the environment.
 */
async function sendEmailJS(env, templateParams) {
  try {
    const payload = {
      service_id: env.EMAILJS_SERVICE_ID,
      template_id: env.EMAILJS_TEMPLATE_ID,
      user_id: env.EMAILJS_PUBLIC_KEY,
      template_params: templateParams,
    };

    // If a private key is provided, include it for extra security
    if (env.EMAILJS_PRIVATE_KEY && !env.EMAILJS_PRIVATE_KEY.includes('PASTE_YOUR')) {
      payload.accessToken = env.EMAILJS_PRIVATE_KEY;
    }

    const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("EmailJS Error:", errorText);
      return { ok: false, error: 'EMAILJS_API_FAILURE' };
    }

    return { ok: true };
  } catch (err) {
    console.error("sendEmailJS Exception:", err);
    return { ok: false, error: err.message };
  }
}

function getClientIP(request, manualOverride = null) {
  if (manualOverride && manualOverride !== '0.0.0.0' && manualOverride !== 'UNKNOWN') {
    return manualOverride;
  }
  return request.headers.get('Cf-Pseudo-IPv4') || request.headers.get('CF-Connecting-IP') || 'UNKNOWN';
}

/**
 * Simple placeholder replacement in strings.
 * Replaces {{key}} with value from params object.
 */
function formatTemplate(template, params) {
  if (!template) return "";
  let result = template;
  for (const [key, value] of Object.entries(params)) {
    // Escape value if it's not a string to avoid issues
    const safeValue = String(value);
    // Use replaceAll or global regex to replace all instances
    result = result.replace(new RegExp(`{{${key}}}`, 'g'), safeValue);
  }
  return result;
}

