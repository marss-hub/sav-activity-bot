import * as fs from "node:fs";
import TelegramBot from "node-telegram-bot-api";
import { CONFIGDATA } from "./configData.mjs";
import { LogManager } from "./logManager.mjs";

/**
 * INITIALIZATION BOT
 */
const bot = new TelegramBot(CONFIGDATA.api_key_bot, {
    polling: { interval: 300, autoStart: false },
  });

/**
 * INITIALIZATION LOGGER
 */
const logger = new LogManager(CONFIGDATA.log_file_path);

/**
 * INITIALIZATION LOOP
 */

let lastMsgTime = 0;

setInterval(async () => {
const response = await fetch(CONFIGDATA.sav_api_url);
console.log(`fetch ${String(new Date())}`)

if (response.status === 200) {
    const responseText = await response.text();
    const data = JSON.parse(responseText);
    
    const pubEuServerData = data.find((item) => item.data.ip === CONFIGDATA.tracked_sever_ip);
    const onlinePlayers = Number(pubEuServerData.data.cnum);
    const currentTime = Date.now();

    if (/*onlinePlayers > CONFIGDATA.tracked_quantity_players && */currentTime - lastMsgTime > CONFIGDATA.message_interval_ms )  {
        lastMsgTime = currentTime;
        // отправить сбщ ботом об онлайне
        console.log(`типа бот. В онлайне: ${onlinePlayers}`);
    }
    
} else {
    logger.addLogEntry(`esponse status: ${response.status} - Неверный статус ответа`)
    console.log(`${response.status} - Неверный статус ответа`)
}

}, CONFIGDATA.server_request_ms);

  await bot.startPolling()


// отправляет инфо ВСЕМ контактам
// перезапускается при падении системы https://wiki.merionet.ru/articles/planirovshhik-cron-zapusk-programm-po-raspisaniyu/
// работает на постоянном хостинге