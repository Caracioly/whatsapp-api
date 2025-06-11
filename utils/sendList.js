import { logError, logSend } from "../logs.js";
import { getAllMessagesTemplates } from "../models/getAllMessagesTemplates.js";
import { config } from "../config/env.js";

import axios from "axios";
import { getDataByKey } from "./getDataByKey.js";

function getDataByKey(data, key, fallback = "") {
  return data.find((m) => m.key === key)?.text || fallback;
}

export async function sendList(chatId) {
  const listData = await getAllMessagesTemplates();

  try {
    await axios.post(
      `${config.baseUrl}:8080/message/sendList/${config.instance}`,
      {
        number: chatId,
        title: getDataByKey(listData, "list_title"),
        description: getDataByKey(listData, "list_description"),
        buttonText: getDataByKey(listData, "list_button_text"),
        footerText: getDataByKey(listData, "list_footer_text"),
        sections: [
          {
            title: "Compras",
            rows: [
              {
                title: getDataByKey(listData, "row_comprar_site_title"),
                description: getDataByKey(listData, "row_comprar_site_desc"),
                rowId: "comprar_site",
              },
              {
                title: getDataByKey(listData, "row_comprar_whatsapp_title"),
                description: getDataByKey(
                  listData,
                  "row_comprar_whatsapp_desc"
                ),
                rowId: "comprar_whatsapp",
              },
            ],
          },
          {
            title: "Pagamentos",
            rows: [
              {
                title: getDataByKey(listData, "row_enviar_pix_title"),
                description: getDataByKey(listData, "row_enviar_pix_desc"),
                rowId: "enviar_pix",
              },
            ],
          },
          {
            title: "Outros",
            rows: [
              {
                title: getDataByKey(listData, "row_info_title"),
                description: getDataByKey(listData, "row_info_desc"),
                rowId: "enviar_informacao",
              },
            ],
          },
        ],
      },
      {
        headers: {
          apikey: config.token,
          "Content-Type": "application/json",
        },
      }
    );
    logSend(`List sent to: ${chatId}`);
  } catch (error) {
    logError("Failed to send list", error);
  }
}
