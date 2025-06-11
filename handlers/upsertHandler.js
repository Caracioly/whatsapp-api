import { sendList } from "../utils/sendList.js";
import { sendMessage } from "../utils/sendMessage.js";
import { logInfo } from "../logs.js";
import { getDataByKey } from "../utils/getDataByKey.js";
import { getAllMessagesTemplates } from "../models/getAllMessagesTemplates.js";
import { isInTimeRange } from "../services/serviceTime.js";

export async function handleUpsert(chatId, message, selectedOption) {
  const now = new Date();

  if (message?.toLowerCase() === "oi") {
    await sendList(chatId);
    
    if (!isInTimeRange(now)) return; // trocar isso
  
    return;
  }

  // iniciar um novo atendimento

  const messagesTemplates = await getAllMessagesTemplates();

  if (selectedOption) {
    logInfo(`${chatId} selected option: ${selectedOption}`);

    const responses = {
      comprar_site: "option_site",
      comprar_whatsapp: "option_whatsApp",
      enviar_pix: "option_pix",
      enviar_informacao: "option_info",
      default: "option_unknow",
    };

    const key = responses[selectedOption] || responses.default;
    const reply = getDataByKey(messagesTemplates, key);

    await sendMessage(chatId, reply);
  }
}
