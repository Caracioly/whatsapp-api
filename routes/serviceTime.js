import { logError } from "../logs.js";
import { getServiceTime, setServiceTime } from "../models/services.js";

export async function setServiceTimeRoute(req, res) {
  try {
    const data = req.body;

    if (data.service_time === undefined) {
      return res.status(400).json({ error: "Missing 'service_time' in body" });
    }

    await setServiceTime(data);
    return res.json({ message: "Service time updated successfully" });
  } catch (error) {
    logError("Failed to set the new service time:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function getServiceTimeRoute(req, res) {
  try {
    const data = await getServiceTime();
    return res.json({ config: data });
  } catch (error) {
    logError("Error trying to get service time:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
