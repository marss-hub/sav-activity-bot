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
    
    // in the received object we find the required server and its data - current online and map
    const pubEuServerData = data.find((item) => item.data.ip === CONFIGDATA.tracked_sever_ip);
    onlinePlayers = Number(pubEuServerData.data.cnum);
    map = String(pubEuServerData.data.world);
    const currentTime = Date.now();

    // If there are more players than specified in the config and more time has passed than the interval specified in the config, send a message to the list of user IDs.
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

