import bodyParser from "body-parser";
import express from "express";
import cors from "cors";

import { initDB } from "./models/db.js";

import { logInfo } from "./logs.js";
import { config } from "./config/env.js";

import { registerWebhook } from "./config/webhook.js";

import { webhookController } from "./controllers/webhookController.js";

import { readMessage, updateMessage } from "./controllers/messageController.js";

import { getMessagesRoute, setMessagesRoute } from "./routes/messages.js";
import {
  setServiceTimeRoute,
  getServiceTimeRoute,
} from "./routes/serviceTime.js";

const app = express();
const router = express.Router();

initDB();

app.use(
  cors({
    origin: "http://127.0.0.1:5500",
  })
);
app.use(bodyParser.json());

app.post("/webhook", webhookController);

router.get("/:key", readMessage);
router.post("/:key", updateMessage);

router.get("/api/messages", getMessagesRoute);
router.post("/api/messages", setMessagesRoute);
router.get("/api/service-time", getServiceTimeRoute);
router.post("/api/service-time", setServiceTimeRoute);

app.use("/", router);

app.listen(config.port, () => {
  logInfo(`Server running on config.port ${config.port}`);
  registerWebhook();
});
