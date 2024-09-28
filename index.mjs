import * as fs from "node:fs";
import { CONFIGDATA } from "./configData.mjs";

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
    fs.writeFileSync(CONFIGDATA.log_file_path, `${String(new Date())} \nresponse status: ${response.status} - Неверный статус ответа \n\n`, { flag: "w+" });
    console.log(`${response.status} - Неверный статус ответа`)
}

}, CONFIGDATA.server_request_ms);

