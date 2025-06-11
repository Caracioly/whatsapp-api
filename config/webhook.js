import { logError, logInfo } from "../logs.js";
import { config } from "./env.js"
import axios from "axios";

async function registerWebhook() {
  const events = ["MESSAGES_UPSERT"];
  try {
    await axios.post(
      `${config.baseUrl}:8080/webhook/set/${config.instance}`,
      {
        webhook: {
          enabled: true,
          url: `${config.baseUrl}:3000/webhook`,
          webhookByEvents: true,
          webhookBase64: false,
          events,
        },
      },
      {
        headers: {
          apikey: config.token,
          "Content-Type": "application/json",
        },
      }
    );
    logInfo(`Webhook registered with events: ${events.join(", ")}`);
  } catch (error) {
    logError("Failed to register webhook", error);
  }
}

export { registerWebhook };