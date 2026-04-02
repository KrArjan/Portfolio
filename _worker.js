/**
 * PORTFOLIO CONNECTOR - CLOUDFLARE WORKER
 * Handles contact form submissions and Discord Bot integration.
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // API Endpoint: /api/connect
    if (url.pathname === "/api/connect" && request.method === "POST") {
      return handleConnect(request, env);
    }

    // Default: Serve static assets (Pages/Wrangler Assets)
    // If you're using Wrangler Assets, the worker automatically falls back 
    // to asset serving if you don't handle the request.
    return env.ASSETS.fetch(request);
  }
};

async function handleConnect(request, env) {
  try {
    const formData = await request.json();
    const { name, email, subject, message, turnstileResponse } = formData;

    // 1. Validate Turnstile Token
    if (!turnstileResponse) {
      return new Response(JSON.stringify({ error: "Security check required" }), { status: 400 });
    }

    const turnstileVerify = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${env.TURNSTILE_SECRET_KEY}&response=${turnstileResponse}`,
    });

    const turnstileData = await turnstileVerify.json();
    if (!turnstileData.success) {
      return new Response(JSON.stringify({ error: "Security verification failed" }), { status: 403 });
    }

    // 2. Prepare Discord Embed
    const discordMessage = {
      embeds: [{
        title: `🛰️ New Transmission: ${subject}`,
        color: 0x5865F2, // Discord Blurple
        fields: [
          { name: "IDENTIFIER_NAME", value: name, inline: true },
          { name: "SECURE_EMAIL", value: email, inline: true },
          { name: "MESSAGE_PAYLOAD", value: message }
        ],
        footer: { text: "Portfolio Connectivity Protocol" },
        timestamp: new Date().toISOString()
      }]
    };

    // 3. Send to Discord via Bot API
    // Note: env.DISCORD_BOT_TOKEN and env.DISCORD_CHANNEL_ID must be set in Cloudflare secrets
    const discordResponse = await fetch(`https://discord.com/api/v10/channels/${env.DISCORD_CHANNEL_ID}/messages`, {
      method: "POST",
      headers: {
        "Authorization": `Bot ${env.DISCORD_BOT_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(discordMessage),
    });

    if (!discordResponse.ok) {
      const errorText = await discordResponse.text();
      console.error("Discord API Error:", errorText);
      return new Response(JSON.stringify({ error: "Failed to send message to Discord" }), { status: 500 });
    }

    return new Response(JSON.stringify({ success: true, message: "Transmission received" }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (err) {
    console.error("Worker Error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}
