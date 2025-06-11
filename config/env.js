import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT,
  token: process.env.TOKEN,
  baseUrl: process.env.BASE_URL,
  instance: process.env.INSTANCE_NAME,
};
