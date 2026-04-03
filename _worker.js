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
    const { name, email, subject, message, token } = await request.json();

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

    // 2. Prepare Discord Webhook Payload
    // Uses Discord Embeds for a premium presentation
    const discordPayload = {
      username: "Nexus Transmission Hub",
      avatar_url: "https://raw.githubusercontent.com/KrArjan/Portfolio/main/favicon.ico", // Attempt to use favicon as avatar
      embeds: [{
        title: `📡 NEW TRANSMISSION_RECEIVED // ${subject.toUpperCase()}`,
        description: `Source: Portfolio Contact System`,
        color: 0x00D0FF, // Cyan/Blue glow
        fields: [
          { name: "IDENTIFIER", value: `\`${name}\``, inline: true },
          { name: "SECURE_EMAIL", value: `\`${email}\``, inline: true },
          { name: "SUBJECT", value: subject, inline: false },
          { name: "MESSAGE_PAYLOAD", value: message.length > 1024 ? message.substring(0, 1021) + "..." : message }
        ],
        timestamp: new Date().toISOString(),
        footer: {
          text: `Nexus Terminal | IP: ${request.headers.get('CF-Connecting-IP') || 'UNKNOWN'}`
        }
      }]
    };

    // 3. Send to Discord
    const discordRes = await fetch(env.DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(discordPayload)
    });

    if (!discordRes.ok) {
      console.error("Discord error:", await discordRes.text());
      throw new Error('DISCORD_TRANSMISSION_FAILED');
    }

    // 4. Return Success
    return new Response(JSON.stringify({ success: true, message: 'TRANSMISSION_SUCCESS' }), {
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
