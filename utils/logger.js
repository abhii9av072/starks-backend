// utils/logger.js
import axios from "axios";

const DISCORD_WEBHOOK = process.env.DISCORD_WEBHOOK;

export const logToDiscord = async (message) => {
  if (!DISCORD_WEBHOOK) return;

  try {
    await axios.post(DISCORD_WEBHOOK, {
      content: `@everyone\n${message}`
    });
  } catch (err) {
    console.error("❌ Failed to send log to Discord:", err.message);
  }
};
