import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { seedMessagesTemplates, seedConfigDefaults } from "../seed.js";

export async function initDB() {
  const db = await open({
    filename: "./data.sqlite",
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      number TEXT UNIQUE,
      name TEXT,
      added_at TEXT DEFAULT CURRENT_TIMESTAMP,
      adress TEXT
    )
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      key TEXT UNIQUE NOT NULL,
      text TEXT NOT NULL
      )
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS config (
      key TEXT PRIMARY KEY,
      value TEXT
    )
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS services (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      client_number TEXT,
      status TEXT,
      created_at DATETIME,
      closed_at DATETIME,
      last_message DATETIME
    )
  `);

  const row = await db.get("SELECT COUNT(*) as count FROM messages");
  if (row.count === 0) {
    await seedMessagesTemplates(db);
  }

  const rowConfig = await db.get("SELECT COUNT(*) as count FROM config");
  if (rowConfig.count === 0) {
    await seedConfigDefaults(db);
  }

  return db;
}
