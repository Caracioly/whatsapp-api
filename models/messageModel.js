import { initDB } from "./db.js";

export async function getMessageByKey(key) {
  const db = await initDB();
  const row = await db.get("SELECT text FROM messages WHERE key = ?", [key]);

  return row?.text || null;
}

export async function setMessage(key, text) {
  const db = await initDB();
  const messageAlreadyExists = await db.get(
    "SELECT 1 FROM messages WHERE key = ?",
    [key]
  );

  if (messageAlreadyExists) {
    await db.run("UPDATE messages SET text = ? WHERE  key = ?", [text, key]);
  } else {
    await db.run("INSERT INTO messages (key, text) VALUES (? ,?)", [key, text]);
  }
}
