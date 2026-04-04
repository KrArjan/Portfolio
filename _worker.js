/**
 * Cloudflare Worker: Portfolio Backend
 * Handles:
 * 1. Contact Form Submissions (/api/contact) with Discord Webhook, DM & Turnstile Verification
 * 2. Static Asset Serving (Fallback to env.ASSETS)
 */

import { WORKER_CONFIG } from './config/connect.config.js';

export default {
  async fetch(request, env) {
    try {
      const url = new URL(request.url);
      const origin = request.headers.get("Origin");

      // 1. Handle CORS Pre-flight (OPTIONS)
      if (request.method === "OPTIONS") {
        return new Response(null, {
          status: 204,
          headers: {
            'Access-Control-Allow-Origin': getAllowedOrigin(origin, env),
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '86400',
          }
        });
      }

      // 2. API: Contact Form Submission
      if (url.pathname === "/api/contact" && request.method === "POST") {
        const response = await handleContactForm(request, env);
        // Inject CORS headers into the response
        const newHeaders = new Headers(response.headers);
        newHeaders.set('Access-Control-Allow-Origin', getAllowedOrigin(origin, env));
        return new Response(response.body, {
          status: response.status,
          statusText: response.statusText,
          headers: newHeaders
        });
      }

      // 3. SPA Routing Fallback
      const hasExtension = /\.[a-z0-9]{2,4}$/i.test(url.pathname);
      if (!hasExtension && url.pathname !== "/") {
        if (!env.ASSETS) {
          return new Response("ERROR_SPA_ROUTING: env.ASSETS_BINDING_NOT_CONFIGURED", { status: 500 });
        }
        return env.ASSETS.fetch(new Request(url.origin, request));
      }

      // 4. Default: Serve static assets
      if (!env.ASSETS) {
        return new Response("ERROR_STATIC_ASSET: env.ASSETS_BINDING_MISSING.", { status: 500 });
      }

      return env.ASSETS.fetch(request);

    } catch (err) {
      console.error("Worker Global Exception:", err);
      // Mask internal errors for security
      return new Response(JSON.stringify({
        error: 'WORKER_RUNTIME_EXCEPTION',
        code: '500_INTERNAL_SERVER_ERROR'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }
};

/**
 * Handles the contact form POST request.
 */
async function handleContactForm(request, env) {
  try {
    // 0. Configuration Validation
    if (!env.TURNSTILE_SECRET_KEY || env.TURNSTILE_SECRET_KEY === '' || env.TURNSTILE_SECRET_KEY.includes('PASTE_YOUR')) {
      console.error("Missing TURNSTILE_SECRET_KEY");
      return new Response(JSON.stringify({ error: 'BACKEND_CONFIGURATION_INCOMPLETE' }), {
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
    const placeholders = { name, email, message, subject: subject || 'No Subject' };
    const embedCfg = WORKER_CONFIG.notifications.embed;

    const discordPayload = {
      username: WORKER_CONFIG.notifications.username || "KrArjan Portfolio",
      avatar_url: WORKER_CONFIG.notifications.avatar_url || "",
      embeds: [{
        title: formatTemplate(embedCfg.titleTemplate, placeholders),
        description: embedCfg.descriptionText || `Source: Portfolio Contact System`,
        color: embedCfg.color || 0x00D0FF,
        fields: [
          { name: "IDENTIFIER", value: `\`${name}\``, inline: true },
          { name: "SECURE_EMAIL", value: `\`${email}\``, inline: true },
          { name: "SUBJECT", value: subject, inline: false },
          { name: "MESSAGE_PAYLOAD", value: message.length > 1024 ? message.substring(0, 1021) + "..." : message }
        ],
        timestamp: new Date().toISOString(),
        footer: {
          text: `${embedCfg.footerText || "KrArjan Terminal"} | IP: ${getClientIP(request, ipv4)}`
        }
      }]
    };

    // 3. Parallel Transmission
    const transmissions = [];

    // Discord Webhooks
    if (WORKER_CONFIG.channels.discord_webhook && env.DISCORD_WEBHOOK_URL) {
      parseEnvList(env.DISCORD_WEBHOOK_URL).forEach(url => {
        transmissions.push(fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(discordPayload)
        }));
      });
    }

    // Discord DMs
    if (WORKER_CONFIG.channels.discord_dm && env.DISCORD_BOT_TOKEN && env.DISCORD_USER_ID) {
      parseEnvList(env.DISCORD_USER_ID).forEach(userId => {
        transmissions.push(sendDiscordDM(env.DISCORD_BOT_TOKEN, userId, discordPayload));
      });
    }

    // EmailJS
    if (WORKER_CONFIG.channels.emailjs && env.EMAILJS_SERVICE_ID && env.EMAILJS_TEMPLATE_ID) {
      transmissions.push(sendEmailJS(env, {
        from_name: name,
        from_email: email,
        subject: (WORKER_CONFIG.notifications.email.subjectPrefix || "") + subject,
        message: message
      }));
    }

    const results = await Promise.allSettled(transmissions);
    const failedCount = results.filter(r => r.status === 'rejected' || (r.value && r.value.ok === false)).length;

    if (failedCount === transmissions.length && transmissions.length > 0) {
      throw new Error('ALL_TRANSMISSIONS_FAILED');
    }

    return new Response(JSON.stringify({
      success: true,
      message: 'TRANSMISSION_SUCCESS',
      delivery: failedCount > 0 ? 'PARTIAL' : 'COMPLETE'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (err) {
    console.error("Worker process error:", err);
    return new Response(JSON.stringify({ 
      error: 'CORE_PROCESS_FAILURE',
      code: '500_INTERNAL_ERROR' 
    }), {
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
    const channelRes = await fetch('https://discord.com/api/v10/users/@me/channels', {
      method: 'POST',
      headers: {
        'Authorization': `Bot ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ recipient_id: userId })
    });

    if (!channelRes.ok) return { ok: false };

    const { id: channelId } = await channelRes.json();
    return fetch(`https://discord.com/api/v10/channels/${channelId}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bot ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ embeds: payload.embeds })
    });
  } catch (err) {
    return { ok: false };
  }
}

/**
 * Sends an email via EmailJS REST API.
 */
async function sendEmailJS(env, templateParams) {
  try {
    const payload = {
      service_id: env.EMAILJS_SERVICE_ID,
      template_id: env.EMAILJS_TEMPLATE_ID,
      user_id: env.EMAILJS_PUBLIC_KEY,
      template_params: templateParams,
      ...(env.EMAILJS_PRIVATE_KEY && { accessToken: env.EMAILJS_PRIVATE_KEY })
    };

    const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    return { ok: res.ok };
  } catch (err) {
    return { ok: false };
  }
}

/* ── HELPERS ─────────────────────────────────────────────────────────────────────────── */

function parseEnvList(value) {
  if (!value || typeof value !== 'string') return [];
  return value.split(',')
    .map(part => part.split('#')[0].trim())
    .filter(item => item.length > 0 && !item.includes('PASTE_YOUR'));
}

function getClientIP(request, manualOverride = null) {
  if (manualOverride && manualOverride !== '0.0.0.0') return manualOverride;
  return request.headers.get('Cf-Pseudo-IPv4') || request.headers.get('CF-Connecting-IP') || 'UNKNOWN';
}

function getAllowedOrigin(origin, env) {
  if (!origin) return '*';
  // Use env.ALLOWED_ORIGIN if set, otherwise allow but warn in logs
  const allowed = env.ALLOWED_ORIGIN || '*';
  if (allowed === '*' || allowed === origin) return origin;
  return 'null'; // Strict CORS failure
}

function formatTemplate(template, params) {
  if (!template) return "";
  return template.replace(/{{(\w+)}}/g, (_, key) => params[key] || "");
}
