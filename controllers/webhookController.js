import { logEvent } from "../logs.js";
import { saveContact } from "../models/contactModel.js";
import { handleUpsert } from "../handlers/upsertHandler.js";

export async function webhookController(req, res) {
  const eventType = req.body.event || "UNKNOWN_EVENT";
  const chatId = req.body.data?.key?.remoteJid;
  const pushName = req.body.data?.pushName;

  logEvent(`${eventType.toUpperCase()}: ${pushName} (${chatId})`);

  if (chatId && pushName) {
    await saveContact({
      number: chatId,
      name: pushName,
    });
  }

  switch (eventType) {
    case "messages.upsert":
      const message = req.body.data?.message?.conversation;
      const selectedOption =
        req.body.data?.message?.listResponseMessage?.singleSelectReply
          ?.selectedRowId;
      await handleUpsert(chatId, message, selectedOption);
      break;

    default:
      logEvent(`Ignored event: ${eventType}`);
      break;
  }

  res.sendStatus(200);
}
