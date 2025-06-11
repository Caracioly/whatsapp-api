import { isWithinServiceTime } from "../models/services.js";

export async function isInTimeRange(now) {
  const hours = now.getHours();
  const mins = now.getMinutes();

  return isWithinServiceTime(hours, mins);
}
