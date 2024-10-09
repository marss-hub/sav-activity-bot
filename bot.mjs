import TelegramBot from "node-telegram-bot-api";
import { CONFIGDATA } from "./configData.mjs";
import { UIDList } from "./UIDList.mjs";
import { getServerDataMap, getServerDataOnline } from "./assets.mjs";

/**
 * The module creates and exports a bot instance
 */
export const bot = new TelegramBot(CONFIGDATA.api_key_bot, {
  polling: { interval: 300, autoStart: false },
});

bot.on("text", async (msg) => {
if (String(msg.text).trim() === "/start") {
  UIDList.addUID(msg.chat.id);

  await bot.sendMessage(
    msg.chat.id,
    `Hi, i am a small bot for online checking on Coronavirus Public EU server for Savage Drx game. You can get information by clicking on the buttons:

    /online - online players 
    /map - map on the server
    /menu - open the menu
    
    So that you don't miss the most interesting matches, i will send you messages when will there be more than ${CONFIGDATA.tracked_quantity_players} players online (once every ${(CONFIGDATA.message_interval_ms / 1000) / 60} minutes while there are more than ${CONFIGDATA.tracked_quantity_players} players)`
  );
 } else if (String(msg.text).trim() === "/menu") {
    await bot.sendMessage(msg.chat.id, "Menu on", {
      reply_markup: {
        keyboard: [["/online", "/map", "/info"]],
        resize_keyboard: true,
      },
    });
  } else if (String(msg.text).trim() === "/online") {
    await bot.sendMessage(msg.chat.id, `Players online now: ${getServerDataOnline()}`); // outputs null during the first interval in setinterval
  } else if (String(msg.text).trim() === "/map") {
    await bot.sendMessage(msg.chat.id, `Map right now: ${getServerDataMap()}`); // outputs null during the first interval in setinterval
  } else {
    await bot.sendMessage(
      msg.chat.id,
      `Hi, i am a small bot for online checking on Coronavirus Public EU server for Savage Drx game. You can get information by clicking on the buttons:

      /online - online players 
      /map - map on the server
      /menu - open the menu
      
      So that you don't miss the most interesting matches, i will send you messages when will there be more than ${CONFIGDATA.tracked_quantity_players} players online (once every ${(CONFIGDATA.message_interval_ms / 1000) / 60} minutes while there are more than ${CONFIGDATA.tracked_quantity_players} players)`
    );
  }
});
