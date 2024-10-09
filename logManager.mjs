import * as fs from "node:fs";
/**
 * The class is responsible for working with logs - saving, updating, and issuing data
 */
export class LogManager {
  #logPath;
  /**
   * Returns a logger instance that works with the log file at the specified path.
   * @param {string} logPathStr path to log file
   */
  constructor(logPathStr) {
    this.#logPath = logPathStr;
    if (!fs.existsSync(this.#logPath)) {
      fs.closeSync(fs.openSync(this.#logPath, 'w+'));
    }
  }

  /**
   * Makes a log entry
   */
  addLogEntry(msg) {
    fs.appendFileSync(this.#logPath, `${String(new Date())} \n${msg} \n\n`);
  }
}
