/**
 * POST /api/connect
 * Cloudflare Pages Function to handle contact form submissions.
 * Verifies Turnstile token and sends a notification to a Discord User's DMs via a Bot.
 */

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const formData = await request.json();
    const { name, email, subject, message, turnstileResponse } = formData;

    // 1. Basic Validation
    if (!name || !email || !message || !turnstileResponse) {
      return new Response(JSON.stringify({ error: 'MISSING_FIELDS' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 2. Verify Turnstile Token
    const turnstileSecret = env.TURNSTILE_SECRET_KEY;
    if (!turnstileSecret) {
       console.error('TURNSTILE_SECRET_KEY is missing in environment variables.');
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
      return new Response(JSON.stringify({ error: 'CAPTCHA_VERIFICATION_FAILED' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 3. Discord Bot Integration (Send to DMs)
    const botToken = env.DISCORD_BOT_TOKEN;
    const userID = env.DISCORD_USER_ID;

    if (!botToken || !userID) {
      console.error('DISCORD_BOT_TOKEN or DISCORD_USER_ID is missing in environment variables.');
      return new Response(JSON.stringify({ error: 'SERVER_CONFIG_ERROR' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Step A: Create or get the DM channel ID
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
       console.error('Discord DM Channel Error:', err);
       throw new Error('FAILED_TO_OPEN_DM');
    }

    const { id: channelID } = await dmChannelResponse.json();

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
      console.error('Discord Send DM Error:', err);
      throw new Error(`FAILED_TO_SEND_DM: ${discordResponse.status}`);
    }

    return new Response(JSON.stringify({ success: true, message: 'TRANSMISSION_COMPLETE' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Connect API Error:', error);
    return new Response(JSON.stringify({ error: 'INTERNAL_SERVER_ERROR' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
