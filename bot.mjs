import TelegramBot from "node-telegram-bot-api";
import { CONFIGDATA } from "./configData.mjs";

/**
 * модуль создает и экспортирует экземпляр бота
 */
export const bot = new TelegramBot(CONFIGDATA.api_key_bot, {
    polling: { interval: 300, autoStart: false },
  });