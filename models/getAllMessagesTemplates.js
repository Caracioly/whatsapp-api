import { initDB } from "./db.js";

export async function getAllMessagesTemplates() {
  const db = await initDB();

  return db.all("SELECT * FROM messages");
}
