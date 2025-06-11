import { initDB } from "./db.js";

export async function isWithinServiceTime(currentHour, currentMinute) {
  const db = await initDB();

  const serviceTimeRow = await db.get(
    "SELECT value FROM config WHERE key = 'service_time'"
  );
  const serviceTime = serviceTimeRow ? JSON.parse(serviceTimeRow.value) : true;

  if (!serviceTime) return true;

  const startHour = await db.get(
    "SELECT value FROM config WHERE key = 'service_start_hour'"
  );
  const startMin = await db.get(
    "SELECT value FROM config WHERE key = 'service_start_min'"
  );
  const endHour = await db.get(
    "SELECT value FROM config WHERE key = 'service_end_hour'"
  );
  const endMin = await db.get(
    "SELECT value FROM config WHERE key = 'service_end_min'"
  );

  if (!startHour || !startMin || !endHour || !endMin) return true;

  const now = currentHour * 60 + currentMinute;
  const start = Number(startHour.value) * 60 + Number(startMin.value);
  const end = Number(endHour.value) * 60 + Number(endMin.value);

  return now >= start && now < end;
}

export async function setServiceTime(data) {
  if (data == null) return;

  const db = await initDB();
  await db.run(`UPDATE config SET value = ? WHERE key = 'service_time'`, [
    JSON.stringify(data.service_time),
  ]);

  await db.run(
    `UPDATE CONFIG SET value = ? WHERE key = 'service_start_hour'`,
    JSON.stringify(data.service_start_hour)
  );

  await db.run(
    `UPDATE CONFIG SET value = ? WHERE key = 'service_start_minute'`,
    JSON.stringify(data.service_start_minute)
  );

  await db.run(
    `UPDATE CONFIG SET value = ? WHERE key = 'service_end_hour'`,
    JSON.stringify(data.service_end_hour)
  );

  await db.run(
    `UPDATE CONFIG SET value = ? WHERE key = 'service_end_minute'`,
    JSON.stringify(data.service_end_minute)
  );
}

export async function getServiceTime() {
  const db = await initDB();

  const keys = [
    "service_time",
    "service_start_hour",
    "service_start_minute",
    "service_end_hour",
    "service_end_minute",
  ];

  const config = {};

  for (const key of keys) {
    const row = await db.get("SELECT value FROM config WHERE key = ?", [key]);
    config[key] = row.value;
  }

  return config;
}

export async function changeServiceTime(
  serviceTime,
  startHour,
  startMinute,
  endHour,
  endMinute
) {
  if (
    serviceTime == null ||
    startHour == null ||
    startMinute == null ||
    endHour == null ||
    endMinute == null
  )
    return;

  const db = await initDB();
  await Promise.all([
    db.run("UPDATE config SET value = ? WHERE key = 'service_time'", [
      serviceTime,
    ]),
    db.run("UPDATE config SET value = ? WHERE key = 'service_start_hour'", [
      startHour,
    ]),
    db.run("UPDATE config SET value = ? WHERE key = 'service_start_min'", [
      startMinute,
    ]),
    db.run("UPDATE config SET value = ? WHERE key = 'service_end_hour'", [
      endHour,
    ]),
    db.run("UPDATE config SET value = ? WHERE key = 'service_end_min'", [
      endMinute,
    ]),
  ]);
}
