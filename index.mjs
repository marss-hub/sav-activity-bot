import { CONFIGDATA } from "./configData.mjs";
import { bot } from "./bot.mjs";
import { logger } from "./logger.mjs";
import { UIDList } from "./UIDList.mjs";

/**
 * INITIALIZATION LOOP
 */
export let onlinePlayers = null;
export let map = null;
let lastMsgTime = 0;

setInterval(async () => {
const response = await fetch(CONFIGDATA.sav_api_url);
console.log(`fetch ${String(new Date())}`)

if (response.status === 200) {
    const responseText = await response.text();
    const data = JSON.parse(responseText);
    
    // Находим в присланном оъекте нужный сервер и его данные - текущие онлайн и карту
    const pubEuServerData = data.find((item) => item.data.ip === CONFIGDATA.tracked_sever_ip);
    onlinePlayers = Number(pubEuServerData.data.cnum);
    map = String(pubEuServerData.data.world);
    const currentTime = Date.now();

    // Если игроков больше чем указано в конфиге и прошло времени больше чем заданный в конфиге интервал - отправить сбщ по списку id юзеров.
    if (onlinePlayers > CONFIGDATA.tracked_quantity_players && currentTime - lastMsgTime > CONFIGDATA.message_interval_ms )  {
        lastMsgTime = currentTime;

        const uidListArr = UIDList.getUIDList();
        (async (uidArr) => {
            for (let uid of uidArr) {
               await bot.sendMessage(uid, `Hey gg is going on! 👋\nPlayers online: ${onlinePlayers}. \nMap: ${map}`);
               await new Promise(resolve => setTimeout(resolve, 100));
            }
        })(uidListArr);
    }
    
} else {
    logger.addLogEntry(`response status: ${response.status} - Неверный статус ответа`)
}

}, CONFIGDATA.server_request_ms);

  await bot.startPolling()

// работает на постоянном хостинге
// перезапускается при падении node
