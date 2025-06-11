import { logError, logSend } from "../logs.js";
import { config } from "../config/env.js"
import axios from "axios";

export async function sendMessage(chatId, text) {
  try {
    await axios.post(
      `${config.baseUrl}:8080/message/sendText/${config.instance}`,
      {
        number: chatId,
        text: text,
      },
      {
        headers: {
          apikey: config.token,
          "Content-Type": "application/json",
        },
      }
    );
    logSend(`Message sent to: ${chatId} | Content: "${text}"`);
  } catch (error) {
    logError("Failed to send message", error);
  }
}