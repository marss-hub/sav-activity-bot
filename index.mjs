import { bot } from "./bot.mjs";
import { init } from "./assets.mjs";

/**
 * INITIALIZATION
 */
await init();
await bot.startPolling();
