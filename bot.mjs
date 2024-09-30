import TelegramBot from "node-telegram-bot-api";
import { CONFIGDATA } from "./configData.mjs";
import { map, onlinePlayers } from "./index.mjs";

/**
 * модуль создает и экспортирует экземпляр бота
 */
export const bot = new TelegramBot(CONFIGDATA.api_key_bot, {
  polling: { interval: 300, autoStart: false },
});

bot.on("text", async (msg) => {
  if (String(msg.text).trim() === "/menu") {
    await bot.sendMessage(msg.chat.id, "Menu on", {
      reply_markup: {
        keyboard: [["/online", "/map", "/info"]],
        resize_keyboard: true,
      },
    });
  } else if (String(msg.text).trim() === "/online") {
    await bot.sendMessage(msg.chat.id, `Players online now: ${onlinePlayers}`); // выводит null во время отработки первого интервала в setinterval
  } else if (String(msg.text).trim() === "/map") {
    await bot.sendMessage(msg.chat.id, `Map right now: ${map}`); // выводит null во время отработки первого интервала в setinterval
  } else {
    await bot.sendMessage(
      msg.chat.id,
      `Hi, i am a lil bot for checking the online on server Coronavirus Public. You can get information by clicking on the buttons:

      /online - online players 
      /map - map on the server
      /menu - open the menu
      
      So that you don't miss the most interesting matches, i will send you messages when will there be more than 20 players online (once every 15 minutes while there are more than 20 players)`
    );
  }
});
