import { CONFIGDATA } from "./configData.mjs";
import { LogManager } from "./logManager.mjs";

/**
 * модуль создает и экспортирует экземпляр логгера
 */
export const logger = new LogManager(CONFIGDATA.log_file_path);
