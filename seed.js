import { logInfo } from "./logs.js";

const defaultMessages = {
  "list_title": "Olá, seja muito bem-vindo!",
  "list_description": "Informamos que nossas tele-entregas podem ter atraso devido ao número reduzido de motoboys.",
  "list_button_text": "Abrir menu",
  "list_footer_text": "Selecione uma opção",
  
  "option_site": "Perfeito! Acesse nosso site: https://supermercadosomar.com.br/home",
  "option_whatsApp": "Nosso atendimento no WhatsApp é feito por este número. Envie sua mensagem!",
  "option_pix": "Envie seu comprovante PIX diretamente aqui.",
  "option_info": "Conte pra gente sua dúvida, reclamação ou sugestão.",
  "option_unknow": "Desculpe, não entendi sua escolha.",
  
  "row_comprar_site_title": "Comprar pelo Site",
  "row_comprar_site_desc": "Acesse nosso site e compre online.",
  "row_comprar_whatsapp_title": "Comprar pelo WhatsApp",
  "row_comprar_whatsapp_desc": "Fale com um atendente no WhatsApp.",
  "row_enviar_pix_title": "Enviar Comprovante PIX",
  "row_enviar_pix_desc": "Envie seu comprovante de pagamento PIX.",
  "row_info_title": "Informações / Reclamações / Sugestões",
  "row_info_desc": "Fale conosco."
};

export async function seedMessagesTemplates(db) {
  for (const [key, text] of Object.entries(defaultMessages)) {
    try {
      await db.run(
        `INSERT INTO messages (key, text) VALUES (?, ?)
        ON CONFLICT(key) DO NOTHING`,
        [key, text]
      );
      logInfo(`Inserted message: ${key}`);
    } catch (err) {
      if (!err.message.includes("UNIQUE constraint failed")) {
        console.error("Error inserting message", key, err);
      }
    }
  }
}

const defaultConfigs = {
  "service_time": "true",
  "service_start_hour": "9",
  "service_start_minute": "0",
  "service_end_hour": "18",
  "service_end_minute": "0"
};

export async function seedConfigDefaults(db) {
  for (const [key, value] of Object.entries(defaultConfigs)) {
    try {
      await db.run(
        `INSERT INTO config (key, value) VALUES (?, ?)
         ON CONFLICT(key) DO NOTHING`,
        [key, value]
      );
      logInfo(`Inserted config: ${key} = ${value}`);
    } catch (err) {
      if (!err.message.includes("UNIQUE constraint failed")) {
        console.error("Error inserting config", key, err);
      }
    }
  }
}

