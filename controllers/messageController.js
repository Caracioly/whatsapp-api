import { logError, logInfo } from "../logs.js";
import { getMessageByKey, setMessage } from "../models/messageModel.js";

export async function readMessage(req, res) {
  const key = req.params.key;
  const text = await getMessageByKey(key);

  if (!text) {
    logError("Message not found");
    return res.status(404).json({ error: "Message not found" });
  }
  res.json({ key, text });
}

export async function updateMessage(req, res) {
  const key = req.params.key;
  const { text } = req.body;

  if (!text) {
    logError("Text is required");
    return res.status(400).json({ error: "Text is required" });
  }
  await setMessage(key, text);
  logInfo(`${key} updated.`)
  res.json({ key, text });
}
