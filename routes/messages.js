import { logError } from "../logs.js";
import { getAllMessagesTemplates } from "../models/getAllMessagesTemplates.js";
import { setMessage } from "../models/messageModel.js";

export async function getMessagesRoute(req, res) {
  try {
    const messagesTemplates = await getAllMessagesTemplates();

    if (!messagesTemplates || messagesTemplates.length === 0) {
      return res.status(404).json({ error: "No messages found" });
    }

    const messages = {};
    for (const row of messagesTemplates) {
      messages[row.key] = row.text;
    }

    return res.json(messages);
  } catch (error) {
    logError("Error trying to get messages:", error);
    return res.status(500).json({ error: "Internal Error" });
  }
}

export async function setMessagesRoute(req, res) {
  try {
    const messages = req.body;

    if (!messages || typeof messages !== "object") {
      return res.status(400).json({ error: "Invalid payload" });
    }

    for (const key in messages) {
      const text = messages[key];
      if (typeof text === "string" && text.trim() !== "") {
        await setMessage(key, text);
      }
    }

    res.json({ message: "Messages updated successfully" });
  } catch (error) {
    logError("Error updating messages:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
