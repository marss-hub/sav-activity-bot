import { CONFIGDATA } from "./configData.mjs";
import { LogManager } from "./logManager.mjs";

/**
 * The module creates and exports a logger instance
 */
export const logger = new LogManager(CONFIGDATA.log_file_path);
