// utils/logger.js
import axios from "axios";
import fetch from "node-fetch";

const DISCORD_WEBHOOK = "https://discord.com/api/webhooks/1408850633800290355/ePaxWw_slbAwBWyeXey-6mkHtcpL5Ht6EZ1k7kosSp4CdFcEuMGlP1lOGmSpZGL1sDK6";

// ✅ send message to Discord
export async function logToDiscord(message) {
  try {
    await fetch(DISCORD_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: `@everyone\n${message}`,
      }),
    });
  } catch (err) {
    console.error("Failed to send log to Discord:", err.message);
  }
}
