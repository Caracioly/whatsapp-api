import { initDB } from "./db.js";
import { logInfo, logError } from "../logs.js";

export async function saveContact({ number, name }) {
  const db = await initDB();
  const formatedNumber = number.replace(/\D/g, "").replace(/^55/, "");

  try {
    const contactAlreadyExists = await db.get(
      `SELECT * FROM contacts WHERE number = ?`,
      [formatedNumber]
    );

    if (!contactAlreadyExists) {
      await db.run(
        `INSERT INTO contacts (number, name) VALUES (?, ?)`,
        [formatedNumber, name]
      );
      logInfo(`${name} contact has been saved.`);
    }
  } catch (error) {
    logError(`An error occour while trying to save the contact: `, error);
  }
}
