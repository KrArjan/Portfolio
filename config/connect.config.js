/* ============================================================
   worker.config.js — Cloudflare Worker Communication Config
   ============================================================
   
   🟢 THIS FILE CONTROLS YOUR BACKEND NOTIFICATIONS.
   
   Use this to enable/disable specific communication channels
   and customize the appearance of incoming messages.
   ============================================================ */

export const WORKER_CONFIG = {

  /* ===================== CHANNELS ===================== *
   * Master toggles for each notification method.
   * Set to 'false' to completely disable a channel.
   * ================================================ */
  channels: {
    discord_webhook: true,    // Send to your Discord Webhook URL(s)
    discord_dm: true,         // Send DM via Bot Token to User ID(s)
    emailjs: true,            // Send via EmailJS REST API
  },

  /* ===================== NOTIFICATIONS ===================== *
   * Customization for the messages received via Discord.
   * You can use the following placeholders in templates:
   * {{subject}} - The user's subject line
   * {{name}}    - The sender's name.
   * {{email}}   - The sender's email address
   * ================================================ */
  notifications: {
    // Identity shown in the Discord message header
    username: "KrArjan Portfolio",
    avatar_url: "https://raw.githubusercontent.com/KrArjan/Portfolio/main/config/images/pfp.webp",

    // Rich Embed styling for Discord
    embed: {
      // The bold title at the top of the embed
      titleTemplate: "📡 NEW TRANSMISSION_RECEIVED // {{subject}}",

      // Secondary description field
      descriptionText: "Source: Portfolio Contact System",

      // Brand color (Hex-style integer, e.g., 0x00D0FF)
      color: 0x00D0FF,

      // Small text at the very bottom
      footerText: "KrArjan Terminal",
    },

    // Email-specific settings
    email: {
      // Text added to the start of the email subject
      subjectPrefix: "[Portfolio Contact] ",
    }
  }
};
