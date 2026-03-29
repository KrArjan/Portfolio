/**
 * Standard Cloudflare Worker (_worker.js)
 * Intercepts /api/connect POST requests and serves static assets for all other routes.
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // 1. Route: Handle Contact Form Submission
    if (url.pathname === '/api/connect' && request.method === 'POST') {
      return await handleConnect(request, env);
    }

    // 2. Default: Serve Static Assets from Cloudflare Pages
    // This allows normal site navigation (index.html, assets, etc.) to work as usual.
    return env.ASSETS.fetch(request);
  }
};

/**
 * Ported logic from functions/api/connect.js
 * Verifies Turnstile and sends a Discord DM via a Bot.
 */
async function handleConnect(request, env) {
  try {
    const formData = await request.json();
    const { name, email, subject, message, turnstileResponse } = formData;

    console.log("Transmission Initiated:", { name, email, subject });

    // 1. Basic Validation
    if (!name || !email || !message || !turnstileResponse) {
      console.error("Validation Failed: Missing required fields.");
      return new Response(JSON.stringify({ error: 'MISSING_FIELDS' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 2. Verify Turnstile Token
    const turnstileSecret = env.TURNSTILE_SECRET_KEY;
    if (!turnstileSecret) {
      console.error('SERVER_CONFIG_ERROR: TURNSTILE_SECRET_KEY is missing.');
      return new Response(JSON.stringify({ error: 'SERVER_CONFIG_ERROR' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const verifyURL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
    const verifyResponse = await fetch(verifyURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${encodeURIComponent(turnstileSecret)}&response=${encodeURIComponent(turnstileResponse)}`,
    });

    const verifyResult = await verifyResponse.json();
    if (!verifyResult.success) {
      console.error("Turnstile Verification Failed:", verifyResult['error-codes']);
      return new Response(JSON.stringify({ error: 'CAPTCHA_VERIFICATION_FAILED' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 3. Discord Bot Integration (Send to DMs)
    const botToken = env.DISCORD_BOT_TOKEN;
    const userID = env.DISCORD_USER_ID;

    if (!botToken || !userID) {
      console.error('SERVER_CONFIG_ERROR: DISCORD_BOT_TOKEN or DISCORD_USER_ID is missing.');
      return new Response(JSON.stringify({ error: 'SERVER_CONFIG_ERROR' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Step A: Create or get the DM channel ID
    console.log("Opening DM channel with User ID:", userID);
    const dmChannelResponse = await fetch('https://discord.com/api/v10/users/@me/channels', {
      method: 'POST',
      headers: {
        'Authorization': `Bot ${botToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ recipient_id: userID }),
    });

    if (!dmChannelResponse.ok) {
      const err = await dmChannelResponse.text();
      console.error('Discord API Error (Opening DM Channel):', err);
      return new Response(JSON.stringify({ error: 'FAILED_TO_OPEN_DM', details: err }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { id: channelID } = await dmChannelResponse.json();
    console.log("DM Channel Opened. Channel ID:", channelID);

    // Step B: Send the Embed to the DM Channel
    const discordPayload = {
      embeds: [
        {
          title: `📡 Transmission Received: ${subject || 'General Inquiry'}`,
          description: message,
          color: 0x00f2ff, // Cyan primary
          fields: [
            { name: '👤 Identifier', value: name, inline: true },
            { name: '📧 Secure Email', value: email, inline: true },
          ],
          footer: { text: 'KrArjan Portfolio Interface // Secure Connect' },
          timestamp: new Date().toISOString(),
        },
      ],
    };

    const discordResponse = await fetch(`https://discord.com/api/v10/channels/${channelID}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bot ${botToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(discordPayload),
    });

    if (!discordResponse.ok) {
      const err = await discordResponse.text();
      console.error('Discord API Error (Sending Message):', err);
      return new Response(JSON.stringify({ error: 'FAILED_TO_SEND_DM', details: err }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    console.log("Transmission Successfully Delivered to Discord.");

    return new Response(JSON.stringify({ success: true, message: 'TRANSMISSION_COMPLETE' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Internal Server Error:', error);
    return new Response(JSON.stringify({ error: 'INTERNAL_SERVER_ERROR', message: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
