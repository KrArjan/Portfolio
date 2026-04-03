/**
 * Cloudflare Worker: Portfolio Backend
 * Handles:
 * 1. Contact Form Submissions (/api/contact) with Discord Webhook & Turnstile Verification
 * 2. Static Asset Serving (Fallback to env.ASSETS)
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // API: Contact Form Submission
    if (url.pathname === "/api/contact" && request.method === "POST") {
      return handleContactForm(request, env);
    }

    // Fallback: Serve static assets
    // The [assets] directory specified in wrangler.toml is automatically handled by env.ASSETS
    return env.ASSETS.fetch(request);
  }
};

/**
 * Handles the contact form POST request.
 * Verifies Turnstile token and sends a rich embed to Discord.
 */
async function handleContactForm(request, env) {
  try {
    // 0. Configuration Validation
    if (!env.TURNSTILE_SECRET_KEY || env.TURNSTILE_SECRET_KEY.includes('PASTE_YOUR')) {
      console.error("Missing TURNSTILE_SECRET_KEY");
      return new Response(JSON.stringify({ 
        error: 'BACKEND_CONFIGURATION_INCOMPLETE',
        detail: 'TURNSTILE_SECRET_KEY is missing or invalid in environment settings.'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!env.DISCORD_WEBHOOK_URL || env.DISCORD_WEBHOOK_URL.includes('PASTE_YOUR')) {
      console.error("Missing DISCORD_WEBHOOK_URL");
      return new Response(JSON.stringify({ 
        error: 'BACKEND_CONFIGURATION_INCOMPLETE',
        detail: 'DISCORD_WEBHOOK_URL is missing or invalid in environment settings.'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { name, email, subject, message, token, theme } = await request.json();

    // 1. Verify Turnstile Token
    if (!token) {
      return new Response(JSON.stringify({ error: 'SECURITY_TOKEN_MISSING' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const verifyFormData = new FormData();
    verifyFormData.append('secret', env.TURNSTILE_SECRET_KEY);
    verifyFormData.append('response', token);
    verifyFormData.append('remoteip', request.headers.get('CF-Connecting-IP'));

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
    const branding = theme || {};
    const discordPayload = {
      username: branding.username || "Nexus Transmission Hub",
      avatar_url: branding.avatarUrl || "https://raw.githubusercontent.com/KrArjan/Portfolio/main/favicon.ico",
      embeds: [{
        title: `📡 NEW TRANSMISSION_RECEIVED // ${subject.toUpperCase()}`,
        description: `Source: Portfolio Contact System`,
        color: branding.embedColor || 0x00D0FF,
        fields: [
          { name: "IDENTIFIER", value: `\`${name}\``, inline: true },
          { name: "SECURE_EMAIL", value: `\`${email}\``, inline: true },
          { name: "SUBJECT", value: subject, inline: false },
          { name: "MESSAGE_PAYLOAD", value: message.length > 1024 ? message.substring(0, 1021) + "..." : message }
        ],
        timestamp: new Date().toISOString(),
        footer: {
          text: `${branding.footerText || 'Nexus Terminal'} | IP: ${request.headers.get('CF-Connecting-IP') || 'UNKNOWN'}`
        }
      }]
    };

    // 3. Parallel Transmission (Webhook & DM)
    const transmissions = [];

    // Webhook Transmissions (if configured)
    if (env.DISCORD_WEBHOOK_URL && !env.DISCORD_WEBHOOK_URL.includes('PASTE_YOUR')) {
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

    // DM Transmission (if configured)
    if (env.DISCORD_BOT_TOKEN && env.DISCORD_USER_ID && !env.DISCORD_BOT_TOKEN.includes('PASTE_YOUR')) {
      // Split by comma and ensures each ID is clean of comments/whitespace
      const userIds = env.DISCORD_USER_ID.split(',').map(part => {
        // Remove everything after '#' if it exists
        const cleanId = part.split('#')[0].trim();
        return cleanId;
      }).filter(id => id.length > 0);

      userIds.forEach(userId => {
        transmissions.push(sendDiscordDM(env.DISCORD_BOT_TOKEN, userId, discordPayload));
      });
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
